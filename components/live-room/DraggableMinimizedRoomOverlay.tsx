import { useLiveChatStore } from '@/store/liveChat.store'
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

export function DraggableMinimizedRoomOverlay() {
	const insets = useSafeAreaInsets()
	const minimizedRoomId = useLiveChatStore(s => s.minimizedRoomId)
	const minimizedRoomImage = useLiveChatStore(s => s.minimizedRoomImage)
	const minimizedRoomTitle = useLiveChatStore(s => s.minimizedRoomTitle)
	const clearMinimized = useLiveChatStore(s => s.clearMinimized)

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)
	const boundsRef = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 })
	const hasInitialized = useRef(false)

	useEffect(() => {
		if (!minimizedRoomId) return
		// #region agent log
		fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'DraggableMinimizedRoomOverlay:useEffect',
				message: 'Overlay visible effect',
				data: { minimizedRoomId },
				timestamp: Date.now(),
				hypothesisId: 'H2,H3',
			}),
		}).catch(() => {})
		// #endregion
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

			fetch(
				'http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'DraggableMinimizedRoomOverlay:initPos',
						message: 'Bounds and init position',
						data: {
							minimizedRoomId,
							minX,
							maxX: maxXClamped,
							minY,
							maxY: maxYClamped,
							initX,
							initY,
							SCREEN_WIDTH,
							SCREEN_HEIGHT,
						},
						timestamp: Date.now(),
						hypothesisId: 'H4',
					}),
				},
			).catch(() => {})
			// #endregion
		}
	}, [minimizedRoomId, insets])

	useEffect(() => {
		if (!minimizedRoomId) {
			hasInitialized.current = false
			translateX.value = 0
			translateY.value = 0
		}
	}, [minimizedRoomId])

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

	const openRoom = useCallback(() => {
		// #region agent log
		fetch('http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'openRoom:entry',
				message: 'openRoom called',
				data: { minimizedRoomId },
				timestamp: Date.now(),
				hypothesisId: 'tap',
			}),
		}).catch(() => {})
		// #endregion
		if (!minimizedRoomId) return
		const roomIdToOpen = minimizedRoomId
		clearMinimized()
		try {
			router.push(`/chat/${roomIdToOpen}` as const)
			// #region agent log
			fetch(
				'http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'openRoom:afterPush',
						message: 'router.push done',
						data: { roomIdToOpen },
						timestamp: Date.now(),
						hypothesisId: 'route',
					}),
				},
			).catch(() => {})
			// #endregion
		} catch (err: any) {
			// #region agent log
			fetch(
				'http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'openRoom:catch',
						message: 'router.push error',
						data: { err: String(err?.message ?? err) },
						timestamp: Date.now(),
						hypothesisId: 'route',
					}),
				},
			).catch(() => {})
			// #endregion
		}
	}, [minimizedRoomId, clearMinimized])

	const onPanEndJS = useCallback(
		(
			translationX: number,
			translationY: number,
			proposedX: number,
			proposedY: number,
		) => {
			const isTap = Math.abs(translationX) < 12 && Math.abs(translationY) < 12
			// #region agent log
			fetch(
				'http://127.0.0.1:7242/ingest/e6ec9360-18b9-43f9-b0d1-d7aeb146e6ef',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'onPanEndJS',
						message: 'Pan end',
						data: { translationX, translationY, isTap },
						timestamp: Date.now(),
						hypothesisId: 'tap',
					}),
				},
			).catch(() => {})
			// #endregion
			if (isTap) openRoom()
			else clampAndSave(proposedX, proposedY)
		},
		[openRoom, clampAndSave],
	)

	const tapGesture = Gesture.Tap().onEnd(() => {
		runOnJS(openRoom)()
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

	if (!minimizedRoomId) return null

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
					{minimizedRoomImage ? (
						<Image
							source={{ uri: minimizedRoomImage }}
							style={styles.miniImage}
							resizeMode='cover'
						/>
					) : (
						<View style={[styles.miniPlaceholder, styles.miniImage]} />
					)}
					<Text style={styles.miniTitle} numberOfLines={1}>
						{minimizedRoomTitle || ''}
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
