import { getEmojiConfig, isAnimatedEmoji } from '@/constants/emoji'
import { getSvgaUri } from '@/components/emoji/svgaPlayer'
import { SvgaWebView } from '@/components/emoji/SvgaWebView'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'

export interface EmojiSvgaOverlayProps {
	queue: string[]
	onConsumed?: (id: string) => void
	onComplete?: () => void
}

export function EmojiSvgaOverlay({
	queue,
	onConsumed,
	onComplete,
}: EmojiSvgaOverlayProps) {
	const [playing, setPlaying] = useState<string | null>(null)
	const consumedRef = useRef<Set<string>>(new Set())
	const queueRef = useRef<string[]>([])

	queueRef.current = queue

	const playNext = useCallback(() => {
		const ids = queueRef.current.filter(
			id => isAnimatedEmoji(id) && !consumedRef.current.has(id)
		)
		if (ids.length === 0) {
			console.log('[EmojiSvgaOverlay] queue empty, onComplete')
			// #region agent log
			fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					location: 'EmojiSvgaOverlay.tsx:playNext',
					message: 'queue empty onComplete',
					data: {},
					timestamp: Date.now(),
					hypothesisId: 'H4',
				}),
			}).catch(() => {})
			// #endregion
			onComplete?.()
			return
		}
		const next = ids[0]
		consumedRef.current.add(next)
		setPlaying(next)
		onConsumed?.(next)
		console.log('[EmojiSvgaOverlay] playing next', next)
	}, [onConsumed, onComplete])

	useEffect(() => {
		if (queue.length === 0) return
		console.log('[EmojiSvgaOverlay] queue received', queue.length, queue)
		// #region agent log
		fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'EmojiSvgaOverlay.tsx:queue',
				message: 'queue set',
				data: { queueLength: queue.length, ids: queue },
				timestamp: Date.now(),
				hypothesisId: 'H5',
			}),
		}).catch(() => {})
		// #endregion
		consumedRef.current = new Set()
		playNext()
	}, [queue, playNext])

	useEffect(() => {
		if (!playing) return
		const t = setTimeout(() => {
			console.log('[EmojiSvgaOverlay] timeout fallback for', playing)
			setPlaying(null)
			playNext()
		}, 2500)
		return () => clearTimeout(t)
	}, [playing, playNext])

	const handleFinished = useCallback(() => {
		console.log('[EmojiSvgaOverlay] handleFinished', playing)
		setPlaying(null)
		playNext()
	}, [playing, playNext])

	if (!playing) return null

	const uri = getSvgaUri(playing)

	if (!uri) {
		console.warn('[EmojiSvgaOverlay] no URI for', playing, '- advancing')
		handleFinished()
		return null
	}

	// WebView-only path (native SVGA removed)
	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			<View style={styles.playerWrap}>
				<SvgaWebView
					uri={uri}
					onFinished={handleFinished}
					style={styles.player}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	playerWrap: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
	player: {
		width: Platform.OS === 'ios' ? 200 : 200,
		height: Platform.OS === 'ios' ? 200 : 200,
	},
})
