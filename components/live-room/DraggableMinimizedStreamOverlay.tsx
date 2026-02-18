import { useLiveStreamStore } from '@/store/liveStream.store'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useRef } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const PAD = 12
const MINI_SIZE = 64
const TITLE_HEIGHT = 20
const MINI_BOX_HEIGHT = MINI_SIZE + TITLE_HEIGHT

export function DraggableMinimizedStreamOverlay() {
	const insets = useSafeAreaInsets()
	const minimizedStreamId = useLiveStreamStore(s => s.minimizedStreamId)
	const minimizedStreamImage = useLiveStreamStore(s => s.minimizedStreamImage)
	const minimizedStreamTitle = useLiveStreamStore(s => s.minimizedStreamTitle)
	const clearMinimizedStream = useLiveStreamStore(s => s.clearMinimizedStream)

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)
	const boundsRef = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 })
	const hasInitialized = useRef(false)

	useEffect(() => {
		if (!minimizedStreamId) return
		const minX = insets.left + PAD
		const minY = insets.top + PAD
		const maxX = SCREEN_WIDTH - insets.right - MINI_SIZE - PAD
		const maxY = SCREEN_HEIGHT - insets.bottom - MINI_BOX_HEIGHT - PAD
		const maxXClamped = Math.max(minX, maxX)
		const maxYClamped = Math.max(minY, maxY)
		boundsRef.current = {
			minX,
			minY,
			maxX: maxXClamped,
			maxY: maxYClamped,
		}
		if (!hasInitialized.current) {
			hasInitialized.current = true
			const initX = maxXClamped
			const centerY = (SCREEN_HEIGHT - MINI_BOX_HEIGHT) / 2
			const initY = Math.max(minY, Math.min(maxYClamped, centerY))
			offsetX.value = initX
			offsetY.value = initY
		}
	}, [minimizedStreamId, insets])

	useEffect(() => {
		if (!minimizedStreamId) {
			hasInitialized.current = false
			translateX.value = 0
			translateY.value = 0
		}
	}, [minimizedStreamId])

	const clampAndSave = useCallback(
		(proposedX: number, proposedY: number) => {
			const { minX, minY, maxX, maxY } = boundsRef.current
			const x = Math.min(Math.max(proposedX, minX), maxX)
			const y = Math.min(Math.max(proposedY, minY), maxY)
			translateX.value = 0
			translateY.value = 0
			offsetX.value = x
			offsetY.value = y
		},
		[offsetX, offsetY, translateX, translateY],
	)

	const openStream = useCallback(() => {
		if (!minimizedStreamId) return
		const streamIdToOpen = minimizedStreamId
		clearMinimizedStream()
		router.push(`/live/${streamIdToOpen}` as const)
	}, [minimizedStreamId, clearMinimizedStream])

	const onPanEndJS = useCallback(
		(
			translationX: number,
			translationY: number,
			proposedX: number,
			proposedY: number,
		) => {
			const isTap = Math.abs(translationX) < 12 && Math.abs(translationY) < 12
			if (isTap) openStream()
			else clampAndSave(proposedX, proposedY)
		},
		[openStream, clampAndSave],
	)

	const tapGesture = Gesture.Tap().onEnd(() => {
		runOnJS(openStream)()
	})

	const panGesture = Gesture.Pan()
		.minDistance(15)
		.onUpdate(e => {
			translateX.value = e.translationX
			translateY.value = e.translationY
		})
		.onEnd(e => {
			const proposedX = offsetX.value + e.translationX
			const proposedY = offsetY.value + e.translationY
			runOnJS(onPanEndJS)(e.translationX, e.translationY, proposedX, proposedY)
		})

	const composed = Gesture.Race(tapGesture, panGesture)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offsetX.value + translateX.value },
			{ translateY: offsetY.value + translateY.value },
		],
	}))

	if (!minimizedStreamId) return null

	return (
		<View
			style={[StyleSheet.absoluteFill, styles.overlayRoot]}
			pointerEvents='box-none'
		>
			<GestureDetector gesture={composed}>
				<Animated.View
					style={[
						styles.miniBox,
						{ width: MINI_SIZE, height: MINI_BOX_HEIGHT },
						animatedStyle,
					]}
				>
					{minimizedStreamImage ? (
						<Image
							source={{ uri: minimizedStreamImage }}
							style={styles.miniImage}
							resizeMode='cover'
						/>
					) : (
						<View style={[styles.miniPlaceholder, styles.miniImage]} />
					)}
					<Text style={styles.miniTitle} numberOfLines={1}>
						{minimizedStreamTitle || 'Live'}
					</Text>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayRoot: {
		zIndex: 9999,
		elevation: 9999,
	},
	miniBox: {
		position: 'absolute',
		left: 0,
		top: 0,
		borderRadius: 12,
		overflow: 'hidden',
	},
	miniImage: {
		width: MINI_SIZE,
		height: MINI_SIZE,
		borderRadius: 12,
	},
	miniPlaceholder: {
		backgroundColor: '#2C2C2E',
	},
	miniTitle: {
		color: '#FFFFFF',
		fontSize: 11,
		textAlign: 'center',
		paddingHorizontal: 4,
		height: TITLE_HEIGHT,
	},
})
