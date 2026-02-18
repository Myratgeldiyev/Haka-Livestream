# Production-Grade Livestream Architecture

React Native (Expo dev build) + Agora SDK 4.x. Single engine, single source of truth, no duplicate joins, no race conditions.

---

## 1. Backend Contract

**OWNER**
- `POST video/streams/`  
- Response: `{ id, rtc_token, channel_name, uid }`

**VIEWER**
- `POST video/streams/:id/enter_stream/`  
- Response: `{ role, rtc_token, channel_name, uid }`

---

## 2. Ideal Store Schema (Zustand)

Single source of truth for livestream + Agora. Extensible for co-host, multi-broadcaster, PK, admin.

```ts
// Core identity & role
role: 'owner' | 'admin' | 'listener' | null   // From backend or set on start. Owner = only publisher.
streamId: string | null                        // Backend stream id (room id). Set on startStream/enterStream.
channelName: string | null                     // Agora channel name. Set from API response.
localUid: number | null                       // This device's Agora UID. Set on join success.
ownerAgoraUid: number | null                   // Owner's Agora UID. Owner: set from start response. Viewer: set from onRemoteVideoStateChanged(DECODING) for the publishing uid.

// Video state (Agora-driven; do not derive from backend)
localVideoEnabled: boolean                    // Owner only. true = enableLocalVideo(true), false = enableLocalVideo(false). Controls publish; UI shows camera when true.
ownerVideoAvailable: boolean                  // Viewer only. true when remote uid === ownerAgoraUid and state === DECODING. Drives RemoteVideoView vs fallback.

// Connection & stream lifecycle
connectionState: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnecting' | 'failed'
streamState: 'idle' | 'live' | 'ended'         // ended = owner left or stream terminated; viewers show "stream ended".

// Error (single slot; clear on next success or reset)
errorState: { code: string; message: string } | null

// Optional for UI (can live in same store or separate)
streamDetails: LiveStreamDetailsResponse | null
streamMessages: ChatMessage[]
streamSlots: Record<number, StreamSlot>
streamMuted: boolean
// ... rest of app-specific state
```

**Field semantics**

| Field | Owner | Viewer | Notes |
|-------|--------|--------|--------|
| role | Set to `'owner'` on start | From enter_stream `role` | Only owner publishes video. |
| streamId | From start response `id` | From route/enter_stream | Same for both. |
| channelName | From start response | From enter_stream response | Same channel. |
| localUid | From start response `uid` | From enter_stream `uid` | This client's Agora UID. |
| ownerAgoraUid | Same as localUid after start | Set when remote DECODING for publisher | Viewer uses this for setupRemoteVideo(uid). |
| localVideoEnabled | true/false per toggle | N/A (never call enableLocalVideo) | Owner: drives enableLocalVideo and local preview. |
| ownerVideoAvailable | N/A | true when owner's remote stream is DECODING | Viewer: drives remote video vs ImageBackground. |
| connectionState | connecting → connected; leave → disconnecting → idle | Same | Single state for "are we in channel?". |
| streamState | live while in room; ended when leave | live while owner present; ended when owner leaves | Viewers infer ended via onUserOffline(ownerUid) or streamState from backend if you add it later. |
| errorState | Set on join/leave/toggle failure | Set on join failure | Clear on next success or reset. |

---

## 3. State Machine

**States**

- **idle** – Not in a stream; no join in progress.
- **creating** – Owner: startStream() in progress (API + joinChannel).
- **joining** – Viewer: enterStream() in progress (API + joinChannel).
- **connected** – In channel (join success); owner may or may not be publishing video yet.
- **streaming** – Owner: connected + localVideoEnabled true. Viewer: connected + ownerVideoAvailable true (optional; can derive from connected + ownerVideoAvailable).
- **reconnecting** – (Future) Agora reconnecting.
- **ended** – Stream over (owner left or explicit end); leaveChannel done, state reset.
- **error** – Last operation failed; errorState set.

**Allowed transitions**

```
idle
  → creating   (owner: startStream)
  → joining   (viewer: enterStream)

creating
  → connected (join success)
  → idle      (startStream failed or aborted)
  → error     (API or Agora error)

joining
  → connected (join success)
  → idle      (enterStream failed or aborted)
  → error     (API or Agora error)

connected
  → streaming (owner: localVideoEnabled true; viewer: ownerVideoAvailable true — optional)
  → ended     (leaveStream / owner left)
  → error     (Agora error)

streaming
  → connected (owner: localVideoEnabled false; viewer: ownerVideoAvailable false)
  → ended     (leaveStream / owner left)
  → error     (Agora error)

reconnecting
  → connected (reconnect success)
  → ended     (give up or stream ended)
  → error     (reconnect failed)

ended
  → idle      (reset / clearStream)

error
  → idle      (reset / clearStream)
  → creating  (retry start)
  → joining   (retry enter)
```

**Invalid transitions**

- Any state → creating/joining while already creating/joining (double start/enter).
- connected/streaming → creating/joining without going through ended/idle first (no rejoin; must leave then start/enter again).
- ended/error → connected without going through idle and a new creating/joining.

**Triggers**

- **startStream** → creating.
- **enterStream** → joining.
- **onJoinChannelSuccess** → connected (and set localUid, ownerAgoraUid for owner).
- **localVideoOn** (owner) → streaming (or stay connected with localVideoEnabled true).
- **localVideoOff** (owner) → connected; viewers get remoteVideoStopped → ownerVideoAvailable false.
- **remoteVideoDecoding** (viewer, uid === ownerAgoraUid) → ownerVideoAvailable true.
- **remoteVideoStopped** (viewer, uid === ownerAgoraUid) → ownerVideoAvailable false.
- **ownerLeft** (viewer: onUserOffline(ownerUid)) → streamState ended, then leaveChannel → ended.
- **viewerLeft** / **leaveStream** → disconnecting → leaveChannel → ended → idle (reset).
- **networkLost** (future) → reconnecting.
- **reconnected** (future) → connected.

---

## 4. Owner / Viewer Event Matrix

| Event | Owner behavior | Viewer behavior | Store mutation | Agora action |
|-------|----------------|-----------------|----------------|--------------|
| **startStream** | Request camera; API POST; enableVideo(); joinChannel(); enableLocalVideo(true) | N/A | role=owner; streamId; channelName; connectionState=creating→connected; localUid; ownerAgoraUid; localVideoEnabled=true | createEngine (if null); enableVideo; joinChannel; enableLocalVideo(true) |
| **enterStream** | N/A | API POST; joinChannel(); no enableLocalVideo | role=response.role; streamId; channelName; connectionState=joining→connected; localUid | createEngine (if null); joinChannel (autoSubscribeVideo true); never enableLocalVideo |
| **joinSuccess** | Set localUid, ownerAgoraUid; localVideoEnabled true | Set localUid; ownerAgoraUid still unknown until first DECODING | connectionState=connected; localUid set; (owner) ownerAgoraUid=localUid, localVideoEnabled=true | — |
| **localVideoOn** | enableLocalVideo(true) | N/A | localVideoEnabled=true | enableLocalVideo(true) |
| **localVideoOff** | enableLocalVideo(false) | N/A | localVideoEnabled=false | enableLocalVideo(false) |
| **remoteVideoDecoding** | N/A (or ignore) | uid === ownerAgoraUid → show video | ownerVideoAvailable=true | — |
| **remoteVideoStopped** | N/A | uid === ownerAgoraUid → hide video | ownerVideoAvailable=false | — |
| **ownerLeft** | N/A | onUserOffline(ownerUid) | streamState=ended; then leaveChannel in handler | — |
| **viewerLeft** | — | leaveStream() | connectionState=disconnecting; then ended; reset | leaveChannel(); release |
| **owner leaveStream** | leaveStream() | N/A | connectionState=disconnecting; streamState=ended; full reset | leaveChannel(); release |
| **networkLost** | (future) | (future) | connectionState=reconnecting | — |
| **reconnected** | (future) | (future) | connectionState=connected | — |

---

## 5. Sequence Diagrams (Text)

### A) Owner start flow

```
Owner                Store                 Agora Service           Backend
  |                     |                         |                    |
  | startStream()       |                         |                    |
  |-------------------->| connectionState=creating|                    |
  |                     |------------------------>| getAgoraEngine()  |
  |                     |                         | (create if null)   |
  |                     |                         | enableVideo()     |
  |                     |<---------------------------------------------| POST video/streams/
  |                     |                         |                    |
  |                     | joinChannel(token, ch, uid)                  |
  |                     |------------------------>| joinChannel()     |
  |                     |                         | enableLocalVideo(true) |
  |                     |                         |                    |
  |                     |     onJoinChannelSuccess|                    |
  |                     |<------------------------|                   |
  |                     | connectionState=connected|                    |
  |                     | localUid, ownerAgoraUid, localVideoEnabled=true
  |<--------------------|                         |                    |
  | (navigate to /live/:id)                        |                    |
```

### B) Viewer join flow

```
Viewer               Store                 Agora Service           Backend
  |                     |                         |                    |
  | enterStream(id)     |                         |                    |
  |-------------------->| connectionState=joining |                    |
  |                     |<---------------------------------------------| POST enter_stream
  |                     |                         |                    |
  |                     | joinChannel(token, ch, uid)                  |
  |                     |------------------------>| getAgoraEngine()  |
  |                     |                         | joinChannel()     |
  |                     |                         | (no enableLocalVideo)
  |                     |     onJoinChannelSuccess|                    |
  |                     |<------------------------|                   |
  |                     | connectionState=connected, localUid set      |
  |                     |                         |                    |
  |                     |   onRemoteVideoStateChanged(uid, DECODING)    |
  |                     |<------------------------|                   |
  |                     | ownerAgoraUid=uid, ownerVideoAvailable=true   |
  |<--------------------|                         |                    |
  | (show RemoteVideoView)                         |                    |
```

### C) Owner camera toggle flow

```
Owner                Store                 Agora
  |                     |                     |
  | toggleCamera(false) |                     |
  |-------------------->| localVideoEnabled=false
  |                     |-------------------->| enableLocalVideo(false)
  |                     |                     |
  | (UI: show fallback) |                     |
  |                     |   (viewers get onRemoteVideoStateChanged STOPPED)
  |                     |                     |
  | toggleCamera(true)  |                     |
  |-------------------->| localVideoEnabled=true
  |                     |-------------------->| enableLocalVideo(true)
  |                     |                     |
  | (UI: show camera)   |   (viewers get DECODING)
```

### D) Owner leave flow

```
Owner                Store                 Agora                Viewers
  |                     |                     |                     |
  | leaveStream()       |                     |                     |
  |-------------------->| connectionState=disconnecting            |
  |                     |-------------------->| leaveChannel()      |
  |                     |                     | release()            |
  |                     | streamState=ended   |                     |
  |                     | reset all stream state                    |
  |                     |                     |                     |
  |                     |                     |   onUserOffline(ownerUid)
  |                     |                     |-------------------->| streamState=ended
  |                     |                     |                     | leaveChannel()
  |                     |                     |                     | reset
```

---

## 6. Single Source of Truth Strategy

**What controls UI rendering**

- **Role:** From store `role` (owner vs viewer). Determines which flow (camera toggle vs remote video).
- **Connection:** `connectionState === 'connected'` → show room UI; otherwise show loading/error/ended.
- **Owner video on screen:** Store `localVideoEnabled`. When true → show local camera (CameraView or RtcSurfaceView uid 0); when false → show fallback (room image). Do not read from Agora directly in the tree; Agora only updates store via callbacks.
- **Viewer video on screen:** Store `ownerVideoAvailable` and `ownerAgoraUid`. When `ownerVideoAvailable` true → RemoteVideoView(ownerAgoraUid); when false → ImageBackground. Again, UI only reads store.

**What controls video rendering**

- **Owner:** One place sets publish: `localVideoEnabled` → `enableLocalVideo(localVideoEnabled)`. One place sets preview: same flag drives "show camera" vs "show fallback". So one boolean controls both publish and local preview.
- **Viewer:** `ownerVideoAvailable` drives "show remote video" vs "show fallback". `ownerAgoraUid` is the uid passed to setupRemoteVideo/RtcSurfaceView. Both come from store; store is updated only by onRemoteVideoStateChanged.

**How viewer detects owner video**

- Viewer does **not** use backend to know if owner video is on. Backend can be eventually consistent or laggy.
- Viewer subscribes to **onRemoteVideoStateChanged**. When `state === DECODING` and we don't yet have an owner UID, treat that uid as owner (first publisher). When we already have `ownerAgoraUid`, only accept DECODING/STOPPED for that uid to set `ownerVideoAvailable`. So: first remote DECODING → set ownerAgoraUid and ownerVideoAvailable=true; same uid STOPPED/FAILED → ownerVideoAvailable=false. No backend call for "is owner video on?".

**Why viewer must not depend on backend for video state**

- Backend may not expose a real-time "owner video on/off" signal; Agora already gives that via remote video state.
- Avoiding backend for this keeps UI in sync with what is actually being decoded; no double source (Agora vs API) and no races.

**Atomic updates**

- Every Agora callback that updates store should do a single `set()` with all fields that must change together (e.g. connectionState + localUid + ownerAgoraUid on join success). No multi-step mutations that can be interleaved with other events.

---

## 7. Safe Agora Event Handling (Implementation Outline)

Requirements:

- Single engine instance; no duplicate join (guard with connectionState).
- Guard against null engine before any engine call.
- One-time handler registration; callbacks stored in refs so store updates are always current.
- Atomic store updates in callbacks.
- Owner: enableVideo() before join; enableLocalVideo(true) after join (or in join success).
- Viewer: never enableLocalVideo; autoSubscribeVideo true.

---

## 8. Safe Agora Event Handling Code

### 8.1 createAgoraEngine (singleton)

```ts
// services/agora/agora.service.ts
let engine: IRtcEngine | null = null

export const getAgoraEngine = async (appId: string) => {
  if (engine) return engine
  engine = createAgoraRtcEngine()
  engine.initialize({ appId })
  engine.enableAudio()
  engine.setChannelProfile(0)
  return engine
}
```

Use `getAgoraEngine(process.env.EXPO_PUBLIC_AGORA_APP_ID!)` before any join. Single instance; call `resetAgoraEngine()` before a new start/enter to release and clear.

### 8.2 startStream (owner) — store action with guards

```ts
// In store: guard so no duplicate join
startStream: async () => {
  const state = getState()
  if (state.connectionState === 'creating' || state.connectionState === 'connected') {
    throw new Error('Already creating or in channel')
  }
  set({ connectionState: 'creating', errorState: null })
  try {
    const permission = await Camera.requestCameraPermissionsAsync()
    if (permission.status !== 'granted') throw new Error('Camera permission denied')
    await initializeAuth()
    await resetAgoraEngine()

    const res = await livesApi.startStream({ title: 'Live', description: '' })
    const uid = Number(res.uid)
    if (Number.isNaN(uid)) throw new Error('Invalid UID')

    set({
      role: 'owner',
      streamId: res.id,
      channelName: res.channel_name,
      ownerAgoraUid: uid,
      localVideoEnabled: true,
    })

    const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
    await new Promise<void>((resolve, reject) => {
      joinChannelWithVideo(appId, res.rtc_token, res.channel_name, uid, resolve, reject)
    })

    set({
      connectionState: 'connected',
      streamState: 'live',
      localUid: uid,
      errorState: null,
    })
    return res
  } catch (e) {
    set({
      connectionState: 'idle',
      errorState: { code: 'START_FAILED', message: e instanceof Error ? e.message : 'Unknown' },
    })
    throw e
  }
}
```

### 8.3 enterStream (viewer) — store action with guards

```ts
// In store: use joinChannelAsViewer (no enableLocalVideo)
enterStream: async (streamId: string) => {
  const state = getState()
  if (state.connectionState === 'joining' || state.connectionState === 'connected') {
    throw new Error('Already joining or in channel')
  }
  set({ connectionState: 'joining', errorState: null })
  try {
    await initializeAuth()
    await resetAgoraEngine()

    const res = await livesApi.enterStream(streamId)
    const uid = Number(res.uid)
    if (Number.isNaN(uid)) throw new Error('Invalid UID')

    set({
      role: res.role,
      streamId,
      channelName: res.channel_name,
      localUid: uid,
    })

    const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
    await new Promise<void>((resolve, reject) => {
      joinChannelAsViewer(appId, res.rtc_token, res.channel_name, uid, resolve, reject)
    })

    set({
      connectionState: 'connected',
      streamState: 'live',
      errorState: null,
    })
    return res
  } catch (e) {
    set({
      connectionState: 'idle',
      errorState: { code: 'ENTER_FAILED', message: e instanceof Error ? e.message : 'Unknown' },
    })
    throw e
  }
}
```

### 8.4 toggleCamera (owner only)

```ts
// services/agora/agora.service.ts
export const enableLocalVideo = async (enabled: boolean) => {
  if (!engine) return
  engine.enableLocalVideo(enabled)
}

// Store action
toggleCamera: async (enabled: boolean) => {
  const state = getState()
  if (state.role !== 'owner') return
  await enableLocalVideo(enabled)
  set({ localVideoEnabled: enabled })
}
```

### 8.5 leaveStream (owner or viewer)

```ts
// Store action: single leave, then full reset
leaveStream: async () => {
  set({ connectionState: 'disconnecting' })
  await leaveChannel()
  set({
    ...DEFAULT_LIVESTREAM_CONNECTION,
    connectionState: 'idle',
    streamState: 'ended',
  })
  // Also clear streamDetails, messages, etc. (clearStream())
}
```

### 8.6 onRemoteVideoStateChanged handler

```ts
// types/livestream.types.ts: REMOTE_VIDEO_STATE.DECODING = 2, STOPPED = 0, FAILED = 3

function createOnRemoteVideoStateChanged(set, getOwnerAgoraUid) {
  return (uid, state, _reason) => {
    if (state === 2) { // DECODING
      set({ ownerAgoraUid: uid, ownerVideoAvailable: true })
    } else if (state === 0 || state === 3) { // STOPPED, FAILED
      const current = getOwnerAgoraUid()
      if (current !== null && uid === current) {
        set({ ownerVideoAvailable: false })
      }
    }
  }
}
```

Register in UI: `setRemoteVideoStateCallback(createOnRemoteVideoStateChanged(set, () => getState().ownerAgoraUid))`, and clear on unmount: `setRemoteVideoStateCallback(null)`.

### 8.7 onLocalVideoStateChanged handler (owner only)

```ts
// LOCAL_VIDEO_STATE.CAPTURING = 1, ENCODING = 2, STOPPED = 0, FAILED = 3

function createOnLocalVideoStateChanged(set) {
  return (state) => {
    const enabled = state === 1 || state === 2
    set({ localVideoEnabled: enabled })
  }
}
```

Register when role is owner; clear on unmount.

---

## 9. Extensibility (co-host, multi-broadcaster, PK, admin)

- **role:** Already `owner | admin | listener`; admin can be extended for moderation.
- **ownerAgoraUid** can become **publisherUids: number[]** for multi-broadcaster; UI iterates and shows one or more RemoteVideoView/setupRemoteVideo.
- **streamState** can include `'pk'` and extra PK state (e.g. opponent stream id, scores) in a separate slice or same store.
- **connectionState** already supports reconnecting for network loss.
- Keep "single publisher" logic in one place (e.g. "primaryOwnerUid" or first publisher) so that "owner video" vs "co-host video" is a small extension (e.g. map uid → role from streamUsers).
