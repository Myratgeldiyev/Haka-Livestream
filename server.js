
import fs from "fs";
import http from "http";
import https from "https";
import express from "express";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import db from "./db.js"; // expects exported mysql2/promise pool
import axios from "axios";
import bodyParser from "body-parser";

// ---- Load environment ----
dotenv.config();

const APP_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const WS_PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : null; // optional separate ws port
const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  console.error("FATAL: JWT_SECRET not set in environment");
  process.exit(1);
}
const TRUSTED_ORIGINS = (process.env.TRUSTED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean); // e.g. "https://app.example.com,http://localhost:3000"
const ALLOW_ORIGIN_WILDCARD = TRUSTED_ORIGINS.length === 0; // if none provided allow all (not recommended)
const USE_HTTPS = process.env.USE_HTTPS === "1" || process.env.USE_HTTPS === "true";

// Multipliers
const MULTIPLIERS = {
  BLUE: 1.95,
  RED: 1.95,
  PAIR: 9.5,
  SEQUENCE: 15,
  COLOR: 10,
  PURESEQ: 100,
  SET: 100,
};

// ---- Utilities & DB helpers ----
function safeSend(ws, payload) {
  try {
    ws.send(JSON.stringify(payload));
  } catch (err) {
    console.warn("Failed to send ws message:", err?.message);
  }
}

// db queries - uses pool from db.js (mysql2/promise)
async function getUser(userId) {
  const [rows] = await db.query(
    "SELECT id, username, balance, profile_pic FROM RoyalBattleUsers WHERE id = ? LIMIT 1",
    [userId]
  );
  return rows[0] || null;
}

async function CreateUser(userId, name, balance) {
  await db.query(
    "INSERT IGNORE INTO RoyalBattleUsers(id,username,balance,profile_pic) VALUES(?,?,?,?)",
    [userId, name, balance, null]
  );
  return getUser(userId);
}

async function addBalanceTx(conn, username, amount) {
  // expects a mysql2 connection with transaction started
  await conn.execute("UPDATE RoyalBattleUsers SET balance = balance + ? WHERE username = ?", [amount, username]);
}

async function deductBalanceTx(conn, username, amount) {
  // deduct only if sufficient balance, return affectedRows
  const [res] = await conn.execute(
    "UPDATE RoyalBattleUsers SET balance = balance - ? WHERE username = ? AND balance >= ?",
    [amount, username, amount]
  );
  return res.affectedRows;
}

async function getBalance(username) {
  const [rows] = await db.query("SELECT balance FROM RoyalBattleUsers WHERE username = ? LIMIT 1", [username]);
  return rows[0] ? rows[0].balance : null;
}

async function getAllBalances() {
  const [rows] = await db.query("SELECT username, balance FROM RoyalBattleUsers");
  return rows;
}

async function getRoundId() {
  // NOTE: This is a simple approach — for absolute concurrency safety use auto_increment in DB and insert first.
  const [rows] = await db.query("SELECT MAX(roundId) as maxId FROM RoyalBattleRounds");
  return (rows[0].maxId || 0) + 1;
}

async function saveRound(round) {
  const { roundId, winner, hand, blueHand, redHand } = round;
  await db.query(
    "INSERT INTO RoyalBattleRounds(roundId,winner,hand,blueHandType,redHandType) VALUES(?,?,?,?,?)",
    [roundId, winner, hand, blueHand, redHand]
  );
}

async function getRecentRounds(limit) {
  const [rows] = await db.query(
    "SELECT winner, createdAt FROM RoyalBattleRounds ORDER BY createdAt DESC LIMIT ?",
    [limit]
  );
  return rows;
}

async function getRecentHands(limit) {
  const [rows] = await db.query(
    "SELECT hand, createdAt FROM RoyalBattleRounds ORDER BY createdAt DESC LIMIT ?",
    [limit]
  );
  return rows;
}

// ---- Game logic (unchanged but tidy) ----
function evaluateHand(cards) {
  const values = cards.map((c) => "23456789TJQKA".indexOf(c[0]));
  const suits = cards.map((c) => c[1]);
  values.sort((a, b) => a - b);

  const isFlush = suits.every((s) => s === suits[0]);
  const isStraight = values[2] - values[0] === 2 && new Set(values).size === 3;

  if (new Set(values).size === 1) return { rank: 6, name: "SET" };
  if (isStraight && isFlush) return { rank: 5, name: "PURESEQ" };
  if (isStraight) return { rank: 4, name: "SEQUENCE" };
  if (isFlush) return { rank: 3, name: "COLOR" };
  if (new Set(values).size === 2) return { rank: 2, name: "PAIR" };

  return { rank: 1, name: "HIGHCARD" };
}

function compareHands(blueCards, redCards) {
  const blue = evaluateHand(blueCards);
  const red = evaluateHand(redCards);

  if (blue.rank > red.rank)
    return { winner: "BLUE", hand: blue.name, blueHand: blue.name, redHand: red.name };
  if (red.rank > blue.rank)
    return { winner: "RED", hand: red.name, blueHand: blue.name, redHand: red.name };

  const values = (c) =>
    c.map((x) => "23456789TJQKA".indexOf(x[0])).sort((a, b) => b - a);
  const bVals = values(blueCards);
  const rVals = values(redCards);

  for (let i = 0; i < 3; i++) {
    if (bVals[i] > rVals[i])
      return { winner: "BLUE", hand: blue.name, blueHand: blue.name, redHand: red.name };
    if (rVals[i] > bVals[i])
      return { winner: "RED", hand: red.name, blueHand: blue.name, redHand: red.name };
  }

  return { winner: "TIE", hand: "SPLIT", blueHand: blue.name, redHand: red.name };
}

function dealCards() {
  const suits = ["H", "D", "S", "C"];
  const ranks = "23456789TJQKA".split("");
  const deck = [];
  for (let r of ranks) for (let s of suits) deck.push(r + s);
  // Fisher-Yates shuffle (better than sort(() => Math.random()-0.5))
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, 3);
}

// ---- Room state ----
const room = {
  players: [], // { id, username, ws }
  bets: [], // { id, username, area, amount }
};

// Broadcast helper
function broadcast(data) {
  for (const p of room.players) {
    safeSend(p.ws, data);
  }
}

// Leaderboards
function buildFullRoundLeaderboard(payouts) {
  return payouts
    .slice()
    .sort((a, b) => b.prize - a.prize)
    .map((p, i) => ({
      rank: i + 1,
      username: p.username,
      prize: p.prize,
      profilePic: p.profilePic,
    }));
}

async function buildFullRoomLeaderboard() {
  const players = [];
  for (const p of room.players) {
    const u = await getUser(p.id);
    if (u) {
      players.push({
        username: u.username,
        balance: u.balance,
        profilePic: u.profile_pic || null,
      });
    }
  }
  players.sort((a, b) => b.balance - a.balance);
  return players.map((p, i) => ({
    rank: i + 1,
    username: p.username,
    balance: p.balance,
    profilePic: p.profilePic,
  }));
}

// ---- Express app ----
const app = express();
app.use(bodyParser.json());

// security & middleware
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.LOG_FORMAT || "combined"));

// CORS: configure allowed origins in .env via TRUSTED_ORIGINS
const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow server-to-server or non-browser requests
    if (ALLOW_ORIGIN_WILDCARD) return cb(null, true);
    if (TRUSTED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked origin: " + origin), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// rate limiter for REST endpoints
const apiLimiter = rateLimit({
  windowMs: 1000 * 10, // 10s
  max: 50, // limit each IP to 50 requests per 10s
});
app.use("/payment", apiLimiter);

// Health checks
app.get("/healthz", (req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.get("/readyz", (req, res) => res.json({ ready: true }));

// Payment callbacks
app.post("/payment/success", async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });

  try {
    const user = await getUser(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Use a transaction to be safe
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      await addBalanceTx(conn, user.username, Number(amount));
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    // Notify user if online
    const player = room.players.find((p) => p.id === userId);
    if (player) {
      const updated = await getUser(userId);
      safeSend(player.ws, { type: "BALANCE_UPDATED", balance: updated.balance });
    }
    console.log(`Payment successful: ${user.username} +${amount}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Payment success error:", err);
    res.status(500).json({ error: "internal_error" });
  }
});

app.post("/payment/failure", (req, res) => {
  const { userId, reason } = req.body;
  console.warn("Payment failed", userId, reason);
  const player = room.players.find((p) => p.id === userId);
  if (player) safeSend(player.ws, { type: "PAYMENT_FAILED", reason });
  res.json({ received: true });
});

// Expose a small admin/read endpoint (very limited)
app.get("/admin/balances", async (req, res) => {
  try {
    const balances = await getAllBalances();
    res.json({ count: balances.length });
  } catch (err) {
    res.status(500).json({ error: "internal_error" });
  }
});

// ---- HTTP(S) server + WebSocket server ----
const server = http.createServer(app);

// ws server attached to same server so both use same host/port
const wss = new WebSocketServer({ noServer: true, clientTracking: true });

// upgrade handling with origin validation
server.on("upgrade", (req, socket, head) => {
  const origin = req.headers.origin;

  if (!ALLOW_ORIGIN_WILDCARD && origin && !TRUSTED_ORIGINS.includes(origin)) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});
// WebSocket connection handling
wss.on("connection", async (ws, req) => {
  // Allow token via query param or Authorization header (Bearer)
  const url = new URL(req.url, `http://${req.headers.host}`);
  const tokenParam = url.searchParams.get("token");
  const authHeader = req.headers.authorization;
  const token = tokenParam || (authHeader && authHeader.split(" ")[1]);

  let user;
  let assignedUserId;
  try {
    if (token) {
      const decoded = jwt.verify(token, SECRET);
      assignedUserId = decoded.userId || decoded.id;
      user = await getUser(assignedUserId);
      if (!user) {
        // create account if not exists
        await CreateUser(assignedUserId, decoded.username || `User${assignedUserId}`, 1000);
        user = await getUser(assignedUserId);
      }
    } else {
      // guest flow
      const guestId = Date.now() + Math.floor(Math.random() * 1000);
      const guestName = "Guest" + guestId.toString().slice(-6);
      assignedUserId = guestId;
      await CreateUser(assignedUserId, guestName, 1000);
      user = await getUser(assignedUserId);
    }
  } catch (err) {
    safeSend(ws, { type: "ERROR", message: "Authentication failed" });
    ws.close();
    return;
  }

  const player = { id: user.id, username: user.username, ws };
  room.players.push(player);

  safeSend(ws, { type: "WELCOME", username: user.username, balance: user.balance, profilePic: user.profile_pic || null });
  broadcast({ type: "PLAYER_JOINED", username: user.username });

  ws.on("message", async (raw) => {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      safeSend(ws, { type: "ERROR", message: "invalid_json" });
      return;
    }
    await handleMessage(ws, user, data).catch(err => {
      console.error("handleMessage error:", err);
      safeSend(ws, { type: "ERROR", message: "internal_error" });
    });
  });

  ws.on("close", () => {
    room.players = room.players.filter((p) => p.ws !== ws);
    broadcast({ type: "PLAYER_LEFT", username: user.username });
  });
});

// ---- Message handler (bets/payment/sync) ----
async function handleMessage(ws, user, data) {
  const type = data && data.type;
  switch (type) {
    case "BUYCOIN": {
      // Example: call external payment provider and return session id
      try {
        const response = await axios.post(process.env.PAYMENT_START_URL || "https://live-streaming-app.com/api/payment/start", {
          userId: user.id,
          username: user.username,
          callbackUrl: process.env.PAYMENT_CALLBACK_URL || `http://your-server.com:${APP_PORT}/payment/success`,
        }, { timeout: 5000 });

        safeSend(ws, { type: "PAYMENT_INITIATED", paymentSessionId: response.data.sessionId || null });
      } catch (err) {
        console.error("Payment start failed:", err?.message);
        safeSend(ws, { type: "ERROR", message: "Unable to start payment" });
      }
      break;
    }

    case "BET": {
      const { area, amount } = data;
      if (!area || !amount || typeof amount !== "number" || amount <= 0) {
        safeSend(ws, { type: "ERROR", message: "invalid_bet" });
        return;
      }

      // Use a DB transaction to safely deduct balance
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();
        const userRow = await getUser(user.id);
        if (!userRow) throw new Error("user_not_found");

        const deducted = await deductBalanceTx(conn, userRow.username, amount);
        if (!deducted) {
          await conn.rollback();
          safeSend(ws, { type: "ERROR", message: "Insufficient balance" });
          return;
        }

        // commit deduction
        await conn.commit();

        const betId = Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36);
        room.bets.push({ id: betId, username: userRow.username, area, amount });

        const newUser = await getUser(user.id);
        broadcast({ type: "BET_PLACED", username: userRow.username, area, amount, balance: newUser.balance });
      } catch (err) {
        try { await conn.rollback(); } catch(_) {}
        console.error("BET error:", err);
        safeSend(ws, { type: "ERROR", message: "bet_failed" });
      } finally {
        conn.release();
      }
      break;
    }

    case "SYNC": {
      const recentRounds = await getRecentRounds(15);
      const recentHands = await getRecentHands(16);
      const balance = (await getUser(user.id)).balance;
      safeSend(ws, { type: "SYNC", recentRounds, recentHands, balance, lastState: currentState });
      break;
    }

    default:
      safeSend(ws, { type: "ERROR", message: "unknown_type" });
  }
}

// ---- Game loop ----
let currentState = null;

async function gameLoop() {
  let roundId = await getRoundId();
  while (true) {
    const bettingTime = Number(process.env.BET_TIME || 19);
    const resultTime = Number(process.env.RESULT_TIME || 15);

    const recentRounds = await getRecentRounds(15);
    const recentHands = await getRecentHands(16);

    // Betting countdown
    for (let i = bettingTime; i > 0; i--) {
      currentState = {
        type: "ROUND_STATE",
        roundId,
        state: "BETTING",
        secondsLeft: i,
        recentRounds,
        recentHands,
        bets: [...room.bets],
      };
      broadcast(currentState);
      await new Promise(r => setTimeout(r, 1000));
    }

    // Produce cards and evaluate
    const blueCards = dealCards();
    const redCards = dealCards();
    const { winner, hand, blueHand, redHand } = compareHands(blueCards, redCards);

    // Payouts: compute and apply (each payout is a credit)
    const payouts = [];
    for (const bet of room.bets) {
      let payout = 0;
      if (Object.prototype.hasOwnProperty.call(MULTIPLIERS, bet.area)) {
        if (bet.area === winner) payout = bet.amount * MULTIPLIERS[bet.area];
        else if (bet.area === hand) payout = bet.amount * MULTIPLIERS[bet.area];
      }
      if (payout > 0) {
        // credit user
        try {
          const conn = await db.getConnection();
          try {
            await conn.beginTransaction();
            await addBalanceTx(conn, bet.username, payout);
            await conn.commit();
          } catch (err) {
            await conn.rollback();
            console.error("credit failed for", bet.username, err);
          } finally {
            conn.release();
          }
        } catch (err) {
          console.error("db conn error credit:", err);
        }
      }
      payouts.push({ betId: bet.id, bet: bet.amount, prize: payout, username: bet.username || "unknown" });
    }

    payouts.sort((a, b) => b.prize - a.prize);

    // build top winners
    const topWinners = [];
    for (let i = 0; i < Math.min(3, payouts.length); i++) {
      const w = payouts[i];
      if (!w.username) continue;
      try {
        const [rows] = await db.query("SELECT profile_pic FROM RoyalBattleUsers WHERE username = ? LIMIT 1", [w.username]);
        topWinners.push({
          rank: i + 1,
          username: w.username,
          prize: w.prize,
          bet: w.bet,
          profilePic: rows[0] ? rows[0].profile_pic || null : null,
        });
      } catch (err) {
        console.error("topWinners error:", err);
      }
    }

    const RoundLeaderboardEntry = buildFullRoundLeaderboard(payouts);
    let RoomLeaderboardEntry = [];
    try {
      RoomLeaderboardEntry = await buildFullRoomLeaderboard();
    } catch (err) {
      console.error("Error building room leaderboard:", err);
    }

    const allBalance = await getAllBalances();

    // Results countdown and broadcast
    for (let i = resultTime; i > 0; i--) {
      const state = {
        type: "ROUND_STATE",
        roundId,
        state: "RESULTS",
        secondsLeft: i,
        winner,
        hand,
        blueHand,
        redHand,
        blueCards,
        redCards,
        recentRounds,
        recentHands,
        bets: room.bets,
        payouts,
        topWinners,
        fullRoundLeaderboard: RoundLeaderboardEntry,
        fullRoomLeaderboard: RoomLeaderboardEntry,
        allBalance,
      };
      try {
        broadcast(state);
      } catch (err) {
        console.error("Broadcast RESULTS error:", err);
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    // Summary and cleanup
    currentState = {
      type: "ROUND_SUMMARY",
      bets: room.bets,
      payouts,
      topWinners,
      fullRoundLeaderboard: RoundLeaderboardEntry,
      fullRoomLeaderboard: RoomLeaderboardEntry,
    };

    room.bets = [];
    await saveRound({ roundId, winner, hand, blueHand, redHand });
    roundId++;
  }
}

// Start server and game loop
server.listen(APP_PORT, () => {
  console.log(`Server listening on ${USE_HTTPS ? "https" : "http"}://0.0.0.0:${APP_PORT}`);
  // Attach game loop without blocking startup
  gameLoop().catch(err => console.error("Game loop crashed:", err));
});

// graceful shutdown
async function shutdown() {
  console.log("Shutting down...");
  try {
    wss.clients.forEach(ws => {
      try { ws.close(1001, "server_shutdown"); } catch {}
    });
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
    setTimeout(() => {
      console.warn("Forcing shutdown");
      process.exit(1);
    }, 10_000);
  } catch (err) {
    console.error("Shutdown error:", err);
    process.exit(1);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
