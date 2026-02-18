import { getLottieSource, isAnimatedEmoji } from '@/constants/emoji'
import LottieView from 'lottie-react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const LOTTIE_SIZE = 200
const TIMEOUT_MS = 3000

export interface EmojiLottieOverlayProps {
	queue: string[]
	onConsumed?: () => void
	onComplete?: () => void
}

export function EmojiLottieOverlay({
	queue,
	onConsumed,
	onComplete,
}: EmojiLottieOverlayProps) {
	const [playing, setPlaying] = useState<string | null>(null)
	const consumedRef = useRef<Set<string>>(new Set())
	const queueRef = useRef<string[]>([])

	queueRef.current = queue

	const playNext = useCallback(() => {
		const ids = queueRef.current.filter(
			id => isAnimatedEmoji(id) && !consumedRef.current.has(id)
		)
		if (ids.length === 0) {
			onComplete?.()
			return
		}
		const next = ids[0]
		const source = getLottieSource(next)
		if (source == null) {
			console.warn('[EmojiLottieOverlay] unknown or non-lottie id, skipping:', next)
			consumedRef.current.add(next)
			playNext()
			return
		}
		consumedRef.current.add(next)
		setPlaying(next)
		onConsumed?.()
	}, [onConsumed, onComplete])

	useEffect(() => {
		if (queue.length === 0) return
		consumedRef.current = new Set()
		playNext()
	}, [queue, playNext])

	useEffect(() => {
		if (!playing) return
		const t = setTimeout(() => {
			setPlaying(null)
			playNext()
		}, TIMEOUT_MS)
		return () => clearTimeout(t)
	}, [playing, playNext])

	const handleAnimationFinish = useCallback(() => {
		setPlaying(null)
		playNext()
	}, [playNext])

	if (!playing) return null

	const source = getLottieSource(playing)
	if (source == null) {
		handleAnimationFinish()
		return null
	}

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			<View style={styles.wrap}>
				<LottieView
					source={source}
					autoPlay
					loop={false}
					onAnimationFinish={handleAnimationFinish}
					style={styles.lottie}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
	lottie: {
		width: LOTTIE_SIZE,
		height: LOTTIE_SIZE,
	},
})
