import React, { useCallback, useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'

/** Lazy load WebView so app does not crash when RNCWebViewModule is not in the native binary (e.g. some Expo Go builds). */
let WebViewComponent: React.ComponentType<{
	source: { html: string } | { uri: string }
	scrollEnabled?: boolean
	style?: object
	backgroundColor?: string
	opacity?: number
	onMessage?: (event: { nativeEvent: { data: string } }) => void
	originWhitelist?: string[]
	javaScriptEnabled?: boolean
	allowsInlineMediaPlayback?: boolean
	allowsFullscreenVideo?: boolean
}> | null = null
try {
	const RNW = require('react-native-webview')
	WebViewComponent = RNW.WebView ?? RNW.default ?? null
} catch {
	WebViewComponent = null
}

const SVGA_SCRIPT_URL =
	'https://cdn.jsdelivr.net/npm/svgaplayerweb@2.3.2/build/svga.min.js'

function buildHtml(uri: string): string {
	const escaped = uri
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
		.replace(/"/g, '\\"')
		.replace(/\r/g, '')
		.replace(/\n/g, '\\n')
	return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; background: transparent !important; }
    #demoCanvas { width: 100%; height: 100%; display: block; background: transparent; }
  </style>
</head>
<body style="background: transparent !important;">
  <canvas id="demoCanvas"></canvas>
  <script src="${SVGA_SCRIPT_URL}"><\/script>
  <script>
    (function() {
      var uri = "${escaped}";
      if (!uri) {
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', reason: 'no_uri' }));
        return;
      }
      try {
        var player = new SVGA.Player('#demoCanvas');
        var parser = new SVGA.Parser('#demoCanvas');
        parser.load(uri, function(videoItem) {
          player.setVideoItem(videoItem);
          player.startAnimation();
          player.onFinished(function() {
            if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'finished' }));
          });
        }, function(err) {
          if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', reason: String(err && err.message || err) }));
        });
      } catch (e) {
        if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', reason: String(e && e.message || e) }));
      }
    })();
  <\/script>
</body>
</html>
`
}

export interface SvgaWebViewProps {
	uri: string
	onFinished?: () => void
	style?: object
}

export function SvgaWebView({
	uri,
	onFinished,
	style,
}: SvgaWebViewProps) {
	// #region agent log
	useEffect(() => {
		console.log('[SvgaWebView] mount uri=', uri ? `${uri.substring(0, 60)}...` : 'null')
		fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'SvgaWebView.tsx:mount',
				message: 'SvgaWebView mount',
				data: { uriLength: uri?.length ?? 0, uriPrefix: uri ? uri.substring(0, 80) : null },
				timestamp: Date.now(),
				hypothesisId: 'H1',
			}),
		}).catch(() => {})
	}, [uri])
	// #endregion

	const onMessage = useCallback(
		(event: { nativeEvent: { data: string } }) => {
			try {
				const msg = JSON.parse(event.nativeEvent.data)
				if (msg.type === 'finished') {
					console.log('[SvgaWebView] onFinished')
					// #region agent log
					fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							location: 'SvgaWebView.tsx:onMessage',
							message: 'SVGA finished',
							data: { type: msg.type },
							timestamp: Date.now(),
							hypothesisId: 'H2',
						}),
					}).catch(() => {})
					// #endregion
					onFinished?.()
				} else if (msg.type === 'error') {
					console.warn('[SvgaWebView] error', msg.reason ?? msg)
					// #region agent log
					fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							location: 'SvgaWebView.tsx:onMessage',
							message: 'SVGA error',
							data: { type: msg.type, reason: msg.reason },
							timestamp: Date.now(),
							hypothesisId: 'H3',
						}),
					}).catch(() => {})
					// #endregion
					onFinished?.()
				}
			} catch (_e) {
				onFinished?.()
			}
		},
		[onFinished]
	)

	const html = buildHtml(uri)

	if (WebViewComponent == null) return null

	return (
		<View style={[styles.wrap, style]} collapsable={false}>
			<WebViewComponent
				source={{ html }}
				scrollEnabled={false}
				style={[styles.webview, Platform.OS === 'android' && styles.webviewAndroid]}
				backgroundColor="transparent"
				opacity={1}
				onMessage={onMessage}
				originWhitelist={['*']}
				javaScriptEnabled
				allowsInlineMediaPlayback
				allowsFullscreenVideo={false}
			/>
		</View>
	)
}


const styles = StyleSheet.create({
	wrap: {
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	webview: {
		backgroundColor: 'transparent',
		flex: 1,
		minHeight: 100,
		opacity: 1,
	},
	webviewAndroid: {
		// Android WebView often needs explicit transparent background
		backgroundColor: 'transparent',
	},
})
