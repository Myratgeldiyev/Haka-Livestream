import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	PanResponder,
	Pressable,
	StyleSheet,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MusicPlayerOverlay } from './MusicPlayerOverlay'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const BOTTOM_BAR_OFFSET = 80
const PAD = 8

interface DraggableMusicPlayerProps {
	visible: boolean
	trackName: string
	trackUri: string
	roomId?: string
	/** When true, use video stream API for play/stop music. */
	isStreamMode?: boolean
	onClose: () => void
	onOpenPlaylist?: () => void
}

export function DraggableMusicPlayer({
	visible,
	trackName,
	trackUri,
	roomId,
	isStreamMode = false,
	onClose,
	onOpenPlaylist,
}: DraggableMusicPlayerProps) {
	const insets = useSafeAreaInsets()
	const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
	const offset = useRef({ x: 0, y: 0 }).current
	const dragEnabledRef = useRef(false)
	const touchStartTimeRef = useRef(0)
	const savedOffsetBeforeCollapseRef = useRef<{ x: number; y: number } | null>(
		null
	)
	const wasCollapsedRef = useRef(false)
	const [cardSize, setCardSize] = useState({ width: 0, height: 0 })
	const [isCollapsed, setIsCollapsed] = useState(false)

	const clamp = (value: number, min: number, max: number) =>
		Math.min(Math.max(value, min), max)

	const bounds = useMemo(() => {
		const minX = insets.left + PAD
		const minY = insets.top + PAD
		const maxX = SCREEN_WIDTH - insets.right - cardSize.width - PAD
		const maxY =
			SCREEN_HEIGHT - insets.bottom - BOTTOM_BAR_OFFSET - cardSize.height - PAD
		return {
			minX,
			minY,
			maxX: Math.max(minX, maxX),
			maxY: Math.max(minY, maxY),
		}
	}, [
		cardSize.height,
		cardSize.width,
		insets.bottom,
		insets.left,
		insets.right,
		insets.top,
	])

	const hasSetInitialPosition = useRef(false)

	const ensureInitialPosition = () => {
		if (hasSetInitialPosition.current) return
		if (cardSize.width <= 0 || cardSize.height <= 0) return
		hasSetInitialPosition.current = true
		const x = clamp(
			(SCREEN_WIDTH - cardSize.width) / 2,
			bounds.minX,
			bounds.maxX
		)
		const y = clamp(bounds.maxY, bounds.minY, bounds.maxY)
		offset.x = x
		offset.y = y
		position.setValue({ x, y })
	}

	useEffect(() => {
		if (visible && cardSize.width > 0 && cardSize.height > 0) {
			ensureInitialPosition()
		}
		if (!visible) {
			hasSetInitialPosition.current = false
			offset.x = 0
			offset.y = 0
			position.setValue({ x: 0, y: 0 })
			setIsCollapsed(false)
		}
	}, [visible, cardSize.width, cardSize.height])

	useEffect(() => {
		if (isCollapsed && cardSize.width > 0 && cardSize.height > 0) {
			const x = clamp(
				(SCREEN_WIDTH - cardSize.width) / 2,
				bounds.minX,
				bounds.maxX
			)
			const y = clamp(bounds.maxY, bounds.minY, bounds.maxY)
			offset.x = x
			offset.y = y
			position.setValue({ x, y })
		}
	}, [isCollapsed, cardSize.width, cardSize.height])

	const MINI_WIDTH = 70

	useEffect(() => {
		if (isCollapsed) {
			wasCollapsedRef.current = true
			return
		}
		if (
			wasCollapsedRef.current &&
			savedOffsetBeforeCollapseRef.current &&
			cardSize.width > MINI_WIDTH
		) {
			wasCollapsedRef.current = false
			const saved = savedOffsetBeforeCollapseRef.current
			savedOffsetBeforeCollapseRef.current = null
			const x = clamp(saved.x, bounds.minX, bounds.maxX)
			const y = clamp(saved.y, bounds.minY, bounds.maxY)
			offset.x = x
			offset.y = y
			position.setValue({ x, y })
		}
	}, [isCollapsed, cardSize.width, cardSize.height])

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => false,
				onMoveShouldSetPanResponder: (_evt, _gestureState) => {
					const elapsed = Date.now() - touchStartTimeRef.current
					if (elapsed > 220) {
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
					} else {
						const elapsed = Date.now() - touchStartTimeRef.current
						if (
							elapsed < 250 &&
							Math.abs(gesture.dx) < 5 &&
							Math.abs(gesture.dy) < 5
						) {
							setIsCollapsed(false)
						}
					}
				},
				onPanResponderTerminate: () => {
					position.flattenOffset()
					dragEnabledRef.current = false
				},
			}),
		[bounds.maxX, bounds.maxY, bounds.minX, bounds.minY, position]
	)

	const DRAG_MIN_MS = 260

	const collapsedPanResponder = useMemo(
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
					if (!dragEnabledRef.current && elapsed > DRAG_MIN_MS) {
						dragEnabledRef.current = true
					}
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
						setIsCollapsed(false)
					}
				},
				onPanResponderTerminate: () => {
					position.flattenOffset()
					if (!dragEnabledRef.current) {
						setIsCollapsed(false)
					}
					dragEnabledRef.current = false
				},
			}),
		[bounds.maxX, bounds.maxY, bounds.minX, bounds.minY, position]
	)

	const handleCollapse = useCallback(() => {
		savedOffsetBeforeCollapseRef.current = { x: offset.x, y: offset.y }
		setIsCollapsed(true)
	}, [offset.x, offset.y])

	const handleRequestClose = useCallback(() => {
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
			onClose()
		})
	}, [bounds.maxX, offset, position.x, position.y, onClose])

	if (!visible) return null

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents='box-none'>
			<Animated.View
				style={[
					styles.wrapper,
					{ transform: position.getTranslateTransform() },
				]}
				pointerEvents='box-none'
			>
				<View
					onLayout={e => {
						const { width, height } = e.nativeEvent.layout
						if (width === cardSize.width && height === cardSize.height) return
						setCardSize({ width, height })
					}}
				>
					{!isCollapsed && (
						<Pressable
							style={styles.dragHandle}
							delayLongPress={220}
							onLongPress={() => {
								ensureInitialPosition()
								dragEnabledRef.current = true
							}}
							onPress={() => {}}
							{...panResponder.panHandlers}
						/>
					)}
					<View
						style={isCollapsed ? styles.collapsedWrapper : undefined}
						onLayout={!isCollapsed ? ensureInitialPosition : undefined}
						{...(isCollapsed
							? collapsedPanResponder.panHandlers
							: panResponder.panHandlers)}
					>
						<MusicPlayerOverlay
							visible
							trackName={trackName}
							trackUri={trackUri}
							onClose={handleRequestClose}
							mode='inline'
							roomId={roomId}
							isStreamMode={isStreamMode}
							isCollapsed={isCollapsed}
							onCollapse={handleCollapse}
							onExpand={() => setIsCollapsed(false)}
							onOpenPlaylist={onOpenPlaylist}
						/>
					</View>
				</View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		left: 0,
		top: -30,
	},
	dragHandle: {
		height: 18,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		// backgroundColor: 'rgba(0,0,0,0.12)',
		marginBottom: 6,
	},
	collapsedWrapper: {
		alignSelf: 'flex-start',
	},
})
