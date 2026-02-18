import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, PanResponder } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const PAD = 8
const DRAG_THRESHOLD_MS = 220

export function usePKStartOverlayGesture(
	cardSize: { width: number; height: number },
	onSnapComplete?: () => void,
	options?: { isMini?: boolean; onMiniTap?: () => void }
) {
	const { isMini = false, onMiniTap } = options ?? {}
	const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
	const offset = useRef({ x: 0, y: 0 }).current
	const dragEnabledRef = useRef(false)
	const touchStartTimeRef = useRef(0)

	const [bounds, setBounds] = useState({
		minX: PAD,
		minY: PAD,
		maxX: SCREEN_WIDTH - PAD,
		maxY: SCREEN_HEIGHT - PAD,
	})

	const clamp = useCallback((v: number, min: number, max: number) => {
		return Math.min(Math.max(v, min), max)
	}, [])

	const updateBounds = useCallback((w: number, h: number) => {
		const fullWidth = w >= SCREEN_WIDTH - 2 * PAD
		setBounds({
			minX: fullWidth ? 0 : PAD,
			minY: PAD,
			maxX: fullWidth ? 0 : Math.max(PAD, SCREEN_WIDTH - w - PAD),
			maxY: Math.max(PAD, SCREEN_HEIGHT - h - PAD),
		})
	}, [])

	useEffect(() => {
		if (bounds.minX === 0 && bounds.maxX === 0) {
			const cy = (SCREEN_HEIGHT - cardSize.height) / 2
			offset.x = 0
			offset.y = cy
			position.setValue({ x: 0, y: cy })
		}
	}, [bounds.minX, bounds.maxX, cardSize.height])

	const setPosition = useCallback(
		(x: number, y: number) => {
			const cx = clamp(x, bounds.minX, bounds.maxX)
			const cy = clamp(y, bounds.minY, bounds.maxY)
			offset.x = cx
			offset.y = cy
			position.setValue({ x: cx, y: cy })
		},
		[bounds, clamp, offset, position]
	)

	const centerX = (SCREEN_WIDTH - cardSize.width) / 2
	const centerY = (SCREEN_HEIGHT - cardSize.height) / 2

	const snapToRight = useCallback(() => {
		const targetX = bounds.maxX
		const targetY = offset.y
		position.flattenOffset()
		offset.x = targetX
		offset.y = targetY
		Animated.parallel([
			Animated.timing(position.x, {
				toValue: targetX,
				duration: 220,
				useNativeDriver: true,
			}),
			Animated.timing(position.y, {
				toValue: targetY,
				duration: 220,
				useNativeDriver: true,
			}),
		]).start(() => {
			onSnapComplete?.()
		})
	}, [bounds.maxX, offset, position.x, position.y, onSnapComplete])

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => false,
				onMoveShouldSetPanResponder: () => {
					const elapsed = Date.now() - touchStartTimeRef.current
					if (elapsed > DRAG_THRESHOLD_MS) {
						dragEnabledRef.current = true
						return true
					}
					return dragEnabledRef.current
				},
				onPanResponderGrant: () => {
					touchStartTimeRef.current = Date.now()
					position.setOffset({ x: offset.x, y: offset.y })
					position.setValue({ x: 0, y: 0 })
				},
				onPanResponderMove: Animated.event(
					[null, { dx: position.x, dy: position.y }],
					{ useNativeDriver: false }
				),
				onPanResponderRelease: (_evt, gesture) => {
					position.flattenOffset()
					if (dragEnabledRef.current) {
						const nextX = clamp(offset.x + gesture.dx, bounds.minX, bounds.maxX)
						const nextY = clamp(offset.y + gesture.dy, bounds.minY, bounds.maxY)
						offset.x = nextX
						offset.y = nextY
						position.setValue({ x: nextX, y: nextY })
						dragEnabledRef.current = false
					}
				},
				onPanResponderTerminate: () => {
					position.flattenOffset()
					dragEnabledRef.current = false
				},
			}),
		[bounds, clamp, offset, position]
	)

	const miniPanResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => true,
				onMoveShouldSetPanResponder: () => false,
				onPanResponderGrant: () => {
					touchStartTimeRef.current = Date.now()
					dragEnabledRef.current = false
					position.setOffset({ x: offset.x, y: offset.y })
					position.setValue({ x: 0, y: 0 })
				},
				onPanResponderMove: (_, gestureState) => {
					const elapsed = Date.now() - touchStartTimeRef.current
					if (elapsed > DRAG_THRESHOLD_MS) dragEnabledRef.current = true
					if (dragEnabledRef.current) {
						position.setValue({ x: gestureState.dx, y: gestureState.dy })
					}
				},
				onPanResponderRelease: (_evt, gesture) => {
					position.flattenOffset()
					if (dragEnabledRef.current) {
						const nextX = clamp(offset.x + gesture.dx, bounds.minX, bounds.maxX)
						const nextY = clamp(offset.y + gesture.dy, bounds.minY, bounds.maxY)
						offset.x = nextX
						offset.y = nextY
						position.setValue({ x: nextX, y: nextY })
						dragEnabledRef.current = false
					} else {
						onMiniTap?.()
					}
				},
				onPanResponderTerminate: () => {
					position.flattenOffset()
					if (!dragEnabledRef.current) onMiniTap?.()
					dragEnabledRef.current = false
				},
			}),
		[bounds, clamp, offset, position, onMiniTap]
	)

	return {
		position,
		offset,
		bounds,
		centerX,
		centerY,
		setPosition,
		updateBounds,
		snapToRight,
		panResponder,
		miniPanResponder,
		isMini,
	}
}
