import { fontSizes, fontWeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FireRoomPlay from '../ui/icons/room-play/FireRoomPlay'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const PAD = 12
const GRADIENT_COLORS = ['#4A7FD4', '#7B5FC7', '#9B59B6'] as const

function formatCountdown(remainingSeconds: number): string {
	const m = Math.floor(remainingSeconds / 60)
	const s = remainingSeconds % 60
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export interface DraggableCalculatorCountdownProps {
	visible: boolean
	durationMinutes: number | null
	onClose?: () => void
}

export function DraggableCalculatorCountdown({
	visible,
	durationMinutes,
	onClose,
}: DraggableCalculatorCountdownProps) {
	const insets = useSafeAreaInsets()
	const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
	const [remainingSeconds, setRemainingSeconds] = useState(() =>
		typeof durationMinutes === 'number' ? durationMinutes * 60 : 0,
	)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const offsetX = useSharedValue(0)
	const offsetY = useSharedValue(0)
	const translateX = useSharedValue(0)
	const translateY = useSharedValue(0)
	const boundsRef = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 })
	const hasInitialized = useRef(false)

	useEffect(() => {
		if (!visible) return
		if (typeof durationMinutes === 'number')
			setRemainingSeconds(durationMinutes * 60)
	}, [visible, durationMinutes])

	useEffect(() => {
		if (!visible || durationMinutes === null) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
			return
		}
		intervalRef.current = setInterval(() => {
			setRemainingSeconds(prev => {
				if (prev <= 1) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current)
						intervalRef.current = null
					}
					onClose?.()
					return 0
				}
				return prev - 1
			})
		}, 1000)
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [visible, durationMinutes, onClose])

	useEffect(() => {
		if (!visible || cardSize.width <= 0 || cardSize.height <= 0) return
		const minX = PAD
		const maxX = Math.max(PAD, SCREEN_WIDTH - cardSize.width - PAD)
		const minY = insets.top + PAD
		const maxY = SCREEN_HEIGHT - insets.bottom - cardSize.height - PAD
		boundsRef.current = {
			minX,
			maxX,
			minY,
			maxY: Math.max(minY, maxY),
		}
		if (!hasInitialized.current) {
			hasInitialized.current = true
			offsetX.value = PAD
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

	const panGesture = Gesture.Pan()
		.minDistance(8)
		.onUpdate(e => {
			translateX.value = e.translationX
			translateY.value = e.translationY
		})
		.onEnd(e => {
			const proposedX = offsetX.value + e.translationX
			const proposedY = offsetY.value + e.translationY
			const { minX, minY, maxX, maxY } = boundsRef.current
			const clampedX = Math.min(Math.max(proposedX, minX), maxX)
			const clampedY = Math.min(Math.max(proposedY, minY), maxY)
			offsetX.value = clampedX
			offsetY.value = clampedY
			translateX.value = 0
			translateY.value = 0
		})

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: offsetX.value + translateX.value },
			{ translateY: offsetY.value + translateY.value },
		],
	}))

	if (!visible) return null

	const displayText =
		durationMinutes === null ? '∞' : formatCountdown(remainingSeconds)

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
					<LinearGradient
						colors={[...GRADIENT_COLORS]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.pill}
					>
						<View style={styles.iconWrap}>
							<FireRoomPlay size='46' />
						</View>
						<Text style={styles.timeText}>{displayText}</Text>
					</LinearGradient>
				</Animated.View>
			</GestureDetector>
		</View>
	)
}

const styles = StyleSheet.create({
	overlayRoot: {
		zIndex: 9998,
		elevation: 9998,
	},
	wrapper: {
		position: 'absolute',
		left: 0,
		top: 0,
	},
	pointer: {
		position: 'absolute',
		top: -6,
		left: '50%',
		marginLeft: -6,
		width: 0,
		height: 0,
		borderLeftWidth: 6,
		borderRightWidth: 6,
		borderBottomWidth: 6,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: GRADIENT_COLORS[1],
	},
	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 2,
		paddingHorizontal: 6,
		borderRadius: 24,
		gap: 10,
	},
	iconWrap: {
		width: 28,
		height: 28,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	timeText: {
		fontSize: fontSizes.sm,
		lineHeight: 16,
		fontWeight: fontWeights.bold,
		color: '#FFFFFF',
	},
})
