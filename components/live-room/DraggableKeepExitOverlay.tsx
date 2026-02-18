import { fontSizes, fontWeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
	Gesture,
	GestureDetector,
	Pressable,
} from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ChatKeepIcon from '../ui/icons/chat/ChatKeepIcon'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const PAD = 12
const BORDER_RADIUS = 12
const CONTAINER_BG = '#2C2C2E'
const ICON_CIRCLE_BG = '#444444'

export interface DraggableKeepExitOverlayProps {
	visible: boolean
	onKeep: () => void
	onExit: () => void
}

export function DraggableKeepExitOverlay({
	visible,
	onKeep,
	onExit,
}: DraggableKeepExitOverlayProps) {
	const insets = useSafeAreaInsets()
	const [cardSize, setCardSize] = useState({ width: 0, height: 0 })

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)

	const boundsRef = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 })
	const hasInitialized = useRef(false)

	useEffect(() => {
		if (!visible || cardSize.width <= 0 || cardSize.height <= 0) return
		const minX = 0
		const maxX = Math.max(0, SCREEN_WIDTH - cardSize.width)
		const minY = insets.top + PAD
		const maxY = SCREEN_HEIGHT - insets.bottom - cardSize.height - PAD
		boundsRef.current = {
			minX,
			minY,
			maxX,
			maxY: Math.max(minY, maxY),
		}
		if (!hasInitialized.current) {
			hasInitialized.current = true
			offsetX.value = (SCREEN_WIDTH - cardSize.width) / 2
			offsetY.value = Math.min(Math.max(insets.top + PAD, minY), maxY)
		}
	}, [visible, cardSize.width, cardSize.height, insets])

	useEffect(() => {
		if (!visible) {
			hasInitialized.current = false
			translateX.value = 0
			translateY.value = 0
		}
	}, [visible])

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

	const panGesture = Gesture.Pan()
		.minDistance(20)
		.onUpdate(e => {
			translateX.value = e.translationX
			translateY.value = e.translationY
		})
		.onEnd(e => {
			const proposedX = offsetX.value + e.translationX
			const proposedY = offsetY.value + e.translationY
			runOnJS(clampAndSave)(proposedX, proposedY)
		})

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offsetX.value + translateX.value },
			{ translateY: offsetY.value + translateY.value },
		],
	}))

	if (!visible) return null

	return (
		<View
			style={[StyleSheet.absoluteFill, styles.overlayRoot]}
			pointerEvents='box-none'
		>
			<GestureDetector gesture={panGesture}>
				<Animated.View
					style={[styles.wrapper, animatedStyle]}
					onLayout={e => {
						const { width, height } = e.nativeEvent.layout
						if (
							width > 0 &&
							height > 0 &&
							(width !== cardSize.width || height !== cardSize.height)
						) {
							setCardSize({ width, height })
						}
					}}
				>
					<View style={styles.container}>
						<Pressable
							style={({ pressed }) => [
								styles.button,
								pressed && styles.buttonPressed,
							]}
							onPress={onKeep}
							android_ripple={null}
						>
							<View style={styles.iconCircle}>
								<ChatKeepIcon />
							</View>
							<Text style={styles.label}>Keep</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								styles.button,
								pressed && styles.buttonPressed,
							]}
							onPress={onExit}
							android_ripple={null}
						>
							<View style={styles.iconCircle}>
								<Ionicons name='power-outline' size={30} color='#FFF' />
							</View>
							<Text style={styles.label}>Exit</Text>
						</Pressable>
					</View>
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
	wrapper: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: SCREEN_WIDTH * 0.9,
		paddingHorizontal: 10,
	},
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 32,
		backgroundColor: CONTAINER_BG,
		borderRadius: BORDER_RADIUS,
		paddingVertical: 20,
		paddingHorizontal: 28,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
		minWidth: 72,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	iconCircle: {
		width: 46,
		height: 46,
		borderRadius: 999,
		backgroundColor: ICON_CIRCLE_BG,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.medium,
		color: '#FFFFFF',
	},
})
