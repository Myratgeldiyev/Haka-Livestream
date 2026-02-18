# SVGA Emoji – WebView Setup & Debugging

## Why the previous setup failed

1. **Native SVGA never loaded in Expo Go**  
   `react-native-svga-player` was only loaded when `EXPO_PUBLIC_ENABLE_NATIVE_SVGA=1` and in standalone/bare builds. In Expo Go that flag is unset, so `getSvgaPlayerComponent()` returned `null`.

2. **WebView path depended on a valid URI**  
   `EmojiSvgaOverlay` used `useWebView = uri != null && !useNative`. The URI came from `resolveAssetUri(config.source)` with `source = require('@/assets/emoji/.../file.svga')`.  
   `Image.resolveAssetSource(require(...))` can return `null` or a non-loadable URI for non-image assets (e.g. `.svga`) in some Metro/Expo setups, so `uri` was often `null` and nothing rendered.

3. **Local SVGA in WebView**  
   Even when Metro returns a URI (e.g. `http://localhost:8081/...`), the WebView’s document is from `source={{ html }}` (opaque/origin-less). Loading that URI from inside the WebView can hit CORS or security restrictions, so the SVGA file sometimes failed to load with no visible error.

4. **Error path didn’t advance the queue**  
   If the WebView’s SVGA script failed (load error, parse error), it posted `{ type: 'error' }` but the overlay only handled `type: 'finished'`. So the queue didn’t advance and the next animation didn’t start.

5. **Expo Go and WebView**  
   The comment “Expo Go does not include it” for `react-native-webview` was wrong; Expo Go does include it. The real problems were the URI and error handling above.

## Current setup (WebView-only)

- **Native SVGA is no longer used.** All playback goes through `SvgaWebView`.
- **URI resolution** is in `getSvgaUri(emojiId)` in `svgaPlayer.ts`:
  1. `config.remoteUrl` if set (per-emoji remote URL).
  2. Else `resolveAssetUri(config.source)` (Metro/local).
  3. Else, if `EXPO_PUBLIC_SVGA_BASE_URL` is set: `base + encodeURIComponent(id) + '.svga'`.
- **Reliable playback:** Prefer **remote URLs** (set `EXPO_PUBLIC_SVGA_BASE_URL` or `remoteUrl` on config) so the WebView always has a loadable URL.

## Using remote URLs

**Option A – Base URL (all SVGA from one host):**

```bash
# .env or app config
EXPO_PUBLIC_SVGA_BASE_URL=https://your-cdn.com/svga/
```

Then host files so that `https://your-cdn.com/svga/<emojiId>.svga` is valid. For ids with special characters (e.g. `emotion-4`), the file name on the server must match the encoded id (e.g. `emotion-4.svga`).

**Option B – Per-emoji URL in config:**

In `constants/emoji.ts`, add `remoteUrl` to any SVGA emoji:

```ts
{ id: 'claping', type: 'svga', category: 'NORMAL', source: require('...'), remoteUrl: 'https://your-cdn.com/svga/claping.svga' },
```

## Debugging

1. **Console logs**  
   - `[EmojiSvgaOverlay] queue received` – queue length and ids when a message is sent.  
   - `[EmojiSvgaOverlay] playing next <id>` – which emoji is being played.  
   - `[SvgaWebView] mount uri=...` – URI passed to the WebView.  
   - `[SvgaWebView] onFinished` – animation finished.  
   - `[SvgaWebView] error <reason>` – load/parse error.  
   - `[EmojiSvgaOverlay] no URI for <id>` – `getSvgaUri` returned null (configure remote or check Metro asset).

2. **Debug log file**  
   Instrumentation sends events to the debug ingest endpoint. After reproducing, check `.cursor/debug.log` (NDJSON) for `hypothesisId` entries (e.g. H1–H5) to see queue, mount, finished, and error events.

3. **Reproduction**  
   - Open a live room.  
   - Open emoji picker, choose an animated (SVGA) emoji, send the message.  
   - You should see overlay logs and, if the URI is loadable, the animation.  
   - If you see `no URI` or `error`, set a remote URL (base or per-emoji) and try again.

## Metro and .svga assets

`metro.config.js` already includes `svga` in `assetExts`, so `.svga` files are bundled. Playback still works best with remote URLs so the WebView can load them without Metro/origin issues.
