# Live Stream ve Agora Lojigi – Detaylı Analiz

Bu dokümanda projedeki **livestream** ve **Agora** entegrasyonunun tam akışı, state yapısı ve dosya bazlı özeti yer alıyor.

---

## 1. Genel Mimari

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           KULLANICI AKIŞLARI                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  OWNER (Yayıncı)                    │  VIEWER (İzleyici)                     │
│  live-start → startStream()         │  (tabs)/live → kart tıkla               │
│  → API: POST video/streams/          │  → /live/[roomId]                       │
│  → Agora: joinChannelWithVideo      │  → enterStream(streamId)                │
│  → router.replace(/live/:id)        │  → API: POST enter_stream               │
│  → [roomId]: CameraView (expo)      │  → Agora: joinChannelWithVideo          │
│  → Agora yayın yapar (viewer’lara)  │  → [roomId]: RemoteVideoView (ownerUid)│
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Backend:** `video/streams/` ve alt endpoint’ler (start, enter, leave, messages, mute, vb.).
- **State:** Tek merkez `store/liveStream.store.ts` (Zustand).
- **Agora:** Tekil engine, `services/agora/agora.service.ts` (join/leave, event handler’lar, callback’ler).
- **UI:** `app/(main)/live/live-start.tsx` (yayına başlama), `app/(main)/live/[roomId].tsx` (oda ekranı).

---

## 2. Backend API Katmani

### 2.1 Endpoint’ler (`api/endpoints.ts`)

| Endpoint | Metod | Açıklama |
|----------|--------|----------|
| `video/streams/` | POST | Yayın başlat → **LiveStreamResponse** (id, rtc_token, uid, channel_name, …) |
| `video/streams/:id/` | GET | Stream detayı → **LiveStreamDetailsResponse** (owner, room_image, agora_channel_name, …) |
| `video/streams/:id/leave_room/` | POST | Odadan çık (backend’e bildir) |
| `video/streams/:id/enter_stream/` | POST | Odaya gir (izleyici) → **EnterStreamResponse** (role, rtc_token, channel_name, uid) |
| `video/streams/:id/stream_users/` | GET | Odadaki kullanıcılar (slot’lar için) |
| `video/streams/:id/check_if_muted/` | GET | Kendi mute durumu |
| `video/streams/:id/mute_myself/` | POST | Kendini sustur |
| `video/streams/:id/unmute_myself/` | POST | Susturmayı kaldır |
| `video/streams/:id/messages/` | GET / POST | Mesajlar |
| `video/streams/:id/toggle_video/` | POST | Video aç/kapa (backend’e bildirim) |
| `video/nearby/` | GET | Yakındaki canlı yayınlar |
| + diğerleri (add_user_as_admin, play_music, stop_music, upload_room_image, …) |

### 2.2 Önemli Tipler (`api/live-stream/lives.types.ts`)

- **LiveStreamResponse** (start stream cevabı): `id`, `title`, `description`, `display_id`, `room_image`, **`rtc_token`**, **`uid`**, **`channel_name`**.
- **LiveStreamDetailsResponse**: `id`, `title`, `agora_channel_name`, `room_image`, **`owner`** (username, user_id, profile_picture, …).
- **EnterStreamResponse**: **`role`** (`'owner' | 'admin' | 'listener'`), **`rtc_token`**, **`channel_name`**, **`uid`** (string).
- **LiveStreamListItem**: Liste ve nearby için aynı detay tipi.

### 2.3 API Çağrıları (`api/live-stream/lives.api.ts`)

- `livesApi.startStream(payload?)` → Backend’e POST atar, **LiveStreamResponse** döner (token + channel + uid burada gelir).
- `livesApi.getStreamDetails(streamId)` → **LiveStreamDetailsResponse** (owner bilgisi burada).
- `livesApi.enterStream(id)` → **EnterStreamResponse** (viewer için token + channel + uid + role).
- `livesApi.leaveRoom(id)` → Odadan çıkışı backend’e bildirir.
- Diğer tüm stream aksiyonları (mute, messages, toggle_video, …) ilgili endpoint’lere yönlendirilir.

---

## 3. Store: `store/liveStream.store.ts`

### 3.1 State Özeti

| Alan | Tip | Açıklama |
|------|-----|----------|
| **liveStream** | LiveStreamResponse \| null | Sadece **owner** için dolu; start stream cevabı (id, rtc_token, uid, channel_name, …). |
| **streamDetails** | LiveStreamDetailsResponse \| null | GET stream detayı (owner, room_image, title, description, …). Hem owner hem viewer için fetch edilir. |
| **currentStreamRole** | 'owner' \| 'admin' \| 'listener' \| null | enterStream cevabındaki role; owner için start’ta 'owner' set edilir. |
| **isJoined** | boolean | Agora kanalına başarıyla join olundu mu. |
| **isLoading** | boolean | startStream sırasında true. |
| **error** | string \| null | Son hata mesajı. |
| **viewerRtcToken / viewerChannelName / viewerUid** | string \| null, string \| null, number \| null | Sadece **viewer** için; enterStream cevabından gelir. |
| **ownerAgoraUid** | number \| null | Owner’ın Agora UID’si. startStream’de set edilir; viewer tarafında **onRemoteVideoStateChanged** ile DECODING gelen uid de yazılır (hangi remote’un owner olduğu). |
| **ownerVideoAvailable** | boolean | Viewer için: owner’ın video stream’i decode edilebiliyor mu (DECODING = true). |
| **localOwnerVideoAvailable** | boolean | Owner için: local video state CAPTURING/ENCODING mi (Agora callback’ten). |
| **streamMuted** | boolean | Ses kapalı mı (checkIfMuted + mute/unmute API). |
| **streamMessages** | ChatMessage[] | Oda mesajları. |
| **streamSlots** | Record<number, StreamSlot> | Sağ panel slot’ları (getStreamUsers → setStreamSlotsFromResponse). |
| **minimizedStreamId / Image / Title** | … | Minimize edilmiş yayın bilgisi. |
| **pendingMinimizedStream** | { streamId, imageUrl, title } \| null | “Keep” ile çıkınca bir sonraki açılışta minimize olarak restore edilecek. |

### 3.2 Kritik Aksiyonlar

- **startStream()**  
  - Kamera izni → `initializeAuth()` → `resetAgoraEngine()`.  
  - `livesApi.startStream()` → **LiveStreamResponse**.  
  - Store: `liveStream`, `currentStreamRole: 'owner'`, **ownerAgoraUid: uid**.  
  - `joinChannelWithVideoPromise(appId, rtc_token, channel_name, uid)` (Agora’ya owner olarak join).  
  - Store: `isJoined: true`, `localOwnerVideoAvailable: true`.  
  - Return: liveStream (id ile yönlendirme yapılır).

- **enterStream(streamId)**  
  - `initializeAuth()` → `resetAgoraEngine()`.  
  - `livesApi.enterStream(streamId)` → **EnterStreamResponse** (role, rtc_token, channel_name, uid).  
  - Store: `currentStreamRole`, **viewerRtcToken**, **viewerChannelName**, **viewerUid**.  
  - `joinChannelWithVideoPromise(appId, res.rtc_token, res.channel_name, uid)` (Agora’ya viewer olarak join).  
  - Store: `isJoined: true`.  
  - Viewer kendi kamerasını açmaz; sadece dinleyici/izleyici.

- **clearStream()**  
  - Tüm stream state’ini sıfırlar: liveStream, streamDetails, currentStreamRole, isJoined, viewer*, ownerAgoraUid, ownerVideoAvailable, localOwnerVideoAvailable, streamMessages, streamSlots, error, vb.  
  - **Agora leave/release burada yapılmaz**; ekranda `leaveChannel()` çağrılır.

- **leaveRoom(streamId)**  
  - Sadece backend’e `livesApi.leaveRoom(streamId)` çağrısı. Agora leave yine UI tarafında.

---

## 4. Agora Servisi: `services/agora/agora.service.ts`

### 4.1 Engine ve Hayat Döngüsü

- **Tekil engine:** `let engine: IRtcEngine | null = null` (modül seviyesi).
- **getAgoraEngine(appId):**  
  - Engine yoksa: `createAgoraRtcEngine()` → `initialize({ appId })` → `enableAudio()` → `setChannelProfile(0)`.  
  - Hep aynı instance döner.
- **resetAgoraEngine():**  
  - Varsa: `leaveChannel()` → `release()` → engine = null, handlerRegistered = false, callback’ler null.  
  - Yeni bir start veya enter öncesi temizlik için kullanılır.
- **leaveChannel():**  
  - Aynı temizlik (leave + release + null + callback’leri sıfırlama).  
  - Oda ekranından çıkarken (owner veya viewer) bir kez çağrılmalı.

### 4.2 Join Akışları

- **joinChannel** (ses only):  
  - `joinChannel(rtcToken, channelName, uid, { autoSubscribeAudio: true, autoSubscribeVideo: false })`.  
  - Projede **kullanılmıyor**; canlı yayın her zaman **joinChannelWithVideo** ile.

- **joinChannelWithVideo** (yayın + izleme):  
  - `getAgoraEngine(appId)` → `eng.enableVideo()`.  
  - Event handler bir kez register edilir (`handlerRegistered`):  
    - **onJoinChannelSuccess** → callback’e “joined” bildirir (store’daki promise resolve).  
    - **onError** → reject.  
    - **onRemoteVideoStateChanged(uid, state, reason, elapsed)** → `remoteVideoStateCallback(uid, state, reason)` (viewer’da owner video state’i için).  
    - **onLocalVideoStateChanged(state, errorCode)** → `localVideoStateCallback(state, errorCode)` (owner’da local video state için).  
  - `eng.joinChannel(rtcToken, channelName, uid, { autoSubscribeAudio: true, autoSubscribeVideo: true })`.  
  - Sonra `eng.enableLocalVideo(true)` (publisher’da local kameranın açık olması için).

### 4.3 Video State Sabitleri (Agora)

- **Remote:** 0 = STOPPED, 1 = STARTING, 2 = DECODING, 3 = FAILED, 4 = FROZEN.  
- **Local:** 0 = STOPPED, 1 = CAPTURING, 2 = ENCODING, 3 = FAILED.

### 4.4 Callback API’si

- **setRemoteVideoStateCallback(cb | null):** Viewer tarafında, remote (owner) video state değişince çağrılır; store `ownerAgoraUid` ve `ownerVideoAvailable` güncellenir.
- **setLocalVideoStateCallback(cb | null):** Owner tarafında, local video state değişince çağrılır; store `localOwnerVideoAvailable` güncellenir.
- **setupLocalVideo():** `engine.setupLocalVideo({ uid: 0, renderMode: 1 })`. Şu an UI’da owner için **CameraView** (expo) kullanıldığı için bu opsiyonel; ileride RtcSurfaceView local preview için kullanılırsa gerekebilir.

### 4.5 Ses

- **muteLocalAudio()** / **unmuteLocalAudio():** Mikrofonu Agora tarafında mute/unmute (backend’deki mute durumu ayrı; checkIfMuted / muteMyself / unmuteMyself API’leri ile senkron tutulur).

---

## 5. UI Akışları

### 5.1 Yayına Başlama (Owner): `app/(main)/live/live-start.tsx`

- Ekran: Oda adı, duyuru, oda resmi (opsiyonel), **CameraView** (expo-camera) ile ön izleme.
- **“Go to live”** → `handleGoToLive()`:  
  - Varsa eski stream için `leaveRoom` + `clearStream`.  
  - **startStream()** (kamera izni + API + Agora join + store güncellemesi).  
  - İsteğe bağlı: `uploadRoomImage(id, payload)`, `updateStream(id, { title, description })`.  
  - **router.replace(`/live/${id}`)** → Oda ekranına geçilir; store’da `liveStream` ve `isStreamMode === true` olur.

### 5.2 Oda Ekranı: `app/(main)/live/[roomId].tsx`

- **streamId:** `liveStream?.id ?? roomId` (owner kendi id’siyle gelir; viewer URL’deki roomId ile).
- **isStreamMode:** `!!liveStream` (true = bu cihaz yayını başlatan owner).
- **userRole:**  
  - isStreamMode ise `'owner'`.  
  - Değilse: streamDetails.owner.user_id === mevcut user_id ise `'owner'`, else currentStreamRole’e göre `'admin'` veya `'listener'`.

**Focus/Effect’ler:**

- `fetchStreamDetails(liveStream?.id ?? roomId)` (owner ve viewer).
- `getStreamMessages(streamId)`, `getStreamUsers(streamId)` → `setStreamSlotsFromResponse`, `checkIfMuted(streamId)` → `setStreamMuted`.
- **Viewer için:** `!isStreamMode && streamId` → **enterStream(streamId)** (Agora’ya viewer olarak join).
- **Viewer için:** `setRemoteVideoStateCallback` → DECODING’te `setOwnerAgoraUid(uid)` + `setOwnerVideoAvailable(true)`; STOPPED/FAILED’da `setOwnerVideoAvailable(false)`.
- **Owner için:** `setLocalVideoStateCallback` → CAPTURING/ENCODING’te `setLocalOwnerVideoAvailable(true)`, diğerlerinde false.
- Unmount / çıkış: `setRemoteVideoStateCallback(null)`, `setLocalVideoStateCallback(null)`, **leaveChannel()**, owner ise **clearStream()**, viewer ise `setOwnerAgoraUid(null)` + `setOwnerVideoAvailable(false)`.

**Çıkış:**

- Back / “Exit”: `leaveChannel()` + owner ise `clearStream()`, viewer ise sadece video flag’leri sıfırlanır; ardından `leaveRoom(streamId)` (backend) ve `router.back()`.
- “Keep”: `setPendingMinimizedStream` + `router.navigate('/(tabs)/live')` (leaveChannel/clearStream yine aynı mantıkla çağrılır).

### 5.3 Görüntü Render Mantığı (Ana Alan)

- **PK overlay / battle** açıksa: Özel layout (PKBattleLayout veya ImageBackground ile duyuru/chat).
- **Normal mod:**  
  - **Owner:** Arka plan olarak **CameraView** (expo-camera). Kendi kamerasını burada görür; Agora aynı anda yayın yapar (viewer’lar Agora stream’ini görür).  
  - **Viewer:**  
    - `ownerAgoraUid` set ve **ownerVideoAvailable** true ise: **RemoteVideoView** (ownerUid = ownerAgoraUid, videoAvailable = true, roomImage fallback).  
    - Aksi halde: **ImageBackground** (room_image veya chat-room-bg.png).

Overlay’ler (TopUserInfo, TopRightControls, RightControlPanel, AnnouncementBox, ChatList, RoomBottomBar) hep aynı **commonContent** ile video/arka planın üstünde.

---

## 6. Viewer Video: `components/live-stream/RemoteVideoView.tsx`

- **ownerUid:** Agora’daki owner UID (store’daki `ownerAgoraUid`).
- **videoAvailable:** Store’daki `ownerVideoAvailable` (DECODING geldi mi).
- **roomImage:** Fallback arka plan (stream room_image veya varsayılan).
- **videoAvailable false:** Sadece **ImageBackground** + children.
- **videoAvailable true:**  
  - `engine.setupRemoteVideo({ uid: ownerUid, renderMode: 1 })` (bir kez).  
  - **RtcSurfaceView** `canvas={{ uid: ownerUid, renderMode: 1 }}` + children.

Böylece izleyici yalnızca owner’ın Agora stream’ini görür; kendi kamerası hiç açılmaz.

---

## 7. Veri Akışı Özeti

| Olay | Backend API | Store Güncellemesi | Agora |
|------|-------------|--------------------|--------|
| Owner yayın başlatır | POST video/streams/ → LiveStreamResponse | liveStream, currentStreamRole, ownerAgoraUid | resetAgoraEngine → joinChannelWithVideo(owner token, uid) → enableLocalVideo(true) |
| Owner odaya girer | - | Zaten dolu | Zaten join (live-start’ta) |
| Viewer odaya girer | POST enter_stream → EnterStreamResponse | currentStreamRole, viewerRtcToken/ChannelName/Uid | resetAgoraEngine → joinChannelWithVideo(viewer token, uid) |
| Viewer owner video görür | - | onRemoteVideoStateChanged → ownerAgoraUid, ownerVideoAvailable | DECODING = true, STOPPED/FAILED = false |
| Owner çıkar | POST leave_room (opsiyonel) | clearStream() | leaveChannel() |
| Viewer çıkar | POST leave_room (opsiyonel) | ownerAgoraUid/ownerVideoAvailable sıfırlanır | leaveChannel() |

---

## 8. Özet Tablo

| Konu | Owner | Viewer |
|------|--------|--------|
| **streamId** | liveStream.id (startStream cevabı) | URL’den roomId |
| **isStreamMode** | true | false |
| **Agora join** | startStream() içinde (live-start’ta) | enterStream() ([roomId] useFocusEffect) |
| **Token/channel/uid** | LiveStreamResponse | EnterStreamResponse |
| **Görüntü** | CameraView (expo-camera) | RemoteVideoView(ownerAgoraUid) veya ImageBackground |
| **ownerAgoraUid** | startStream’de kendi uid | onRemoteVideoStateChanged(DECODING) ile set |
| **Çıkış** | leaveChannel + clearStream + leaveRoom | leaveChannel + leaveRoom, flag’ler sıfırlanır |

Bu yapı, mevcut livestream ve Agora lojikinin tam analizidir; geliştirme veya hata ayıklama için tek referans olarak kullanılabilir.
