import React, {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { Animated as RNAnimated, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { DEFAULT_PK_USERS, PK_START_OVERLAY } from './constants'
import { usePKStartOverlayAnimation } from './hooks/usePKStartOverlayAnimation'
import { usePKStartOverlayGesture } from './hooks/usePKStartOverlayGesture'
import { PKStartOverlayExpanded } from './PKStartOverlayExpanded'
import { PKStartOverlayMini } from './PKStartOverlayMini'
import { PKStartOverlayStart } from './PKStartOverlayStart'
import { PKStartVideo } from './PKStartVideo'
import type { PKStartOverlayMode, PKStartOverlayProps } from './types'

function getCardSize(mode: PKStartOverlayMode) {
	switch (mode) {
		case 'start':
			return {
				width: PK_START_OVERLAY.startCard.width,
				height: PK_START_OVERLAY.startCard.minHeight + 24,
			}
		case 'expanded':
			return {
				width: PK_START_OVERLAY.expanded.width,
				height:
					PK_START_OVERLAY.expanded.contentHeight ??
					PK_START_OVERLAY.expanded.minHeight + 100,
			}
		case 'mini':
			return {
				width: PK_START_OVERLAY.mini.size,
				height: PK_START_OVERLAY.mini.size,
			}
		default:
			return getCardSize('start')
	}
}

function PKStartOverlayInner({
	visible,
	onClose,
	userA = DEFAULT_PK_USERS.userA,
	userB = DEFAULT_PK_USERS.userB,
	initialMode = 'start',
	onEnterPKBattle,
}: PKStartOverlayProps) {
	const [mode, setMode] = useState<PKStartOverlayMode>(initialMode)
	const [pkVideoEnded, setPkVideoEnded] = useState(false)
	const mountDoneRef = useRef(false)

	const cardSize = useMemo(() => getCardSize(mode), [mode])

	const {
		mountStyle,
		contentOpacityStyle,
		animateMount,
		animateToExpanded,
		animateToMini,
		animateExpandFromMini,
	} = usePKStartOverlayAnimation()

	const handleExpandFromMini = useCallback(() => {
		setMode('expanded')
	}, [])

	const {
		position,
		centerX,
		centerY,
		setPosition,
		updateBounds,
		snapToRight,
		panResponder,
		miniPanResponder,
	} = usePKStartOverlayGesture(cardSize, undefined, {
		isMini: mode === 'mini',
		onMiniTap: handleExpandFromMini,
	})

	useEffect(() => {
		if (visible) {
			setMode(initialMode)
			setPkVideoEnded(false)
			mountDoneRef.current = false
		}
	}, [visible, initialMode])

	useLayoutEffect(() => {
		if (!visible || cardSize.width === 0) return
		updateBounds(cardSize.width, cardSize.height)
	}, [visible, mode, cardSize.width, cardSize.height, updateBounds])

	useEffect(() => {
		if (!visible) return
		animateMount()
		mountDoneRef.current = true
	}, [visible, animateMount])

	useEffect(() => {
		if (!visible || !mountDoneRef.current) return
		if (mode === 'expanded' || mode === 'start') {
			setPosition(centerX, centerY)
		}
	}, [mode, centerX, centerY, setPosition, visible])

	const handleStartRandom = useCallback(() => {
		animateToExpanded(() => {
			setMode('expanded')
		})
	}, [animateToExpanded])

	const handleCollapse = useCallback(() => {
		animateToMini(() => {
			setMode('mini')
		})
	}, [animateToMini])

	useEffect(() => {
		if (mode === 'mini') {
			snapToRight()
		}
	}, [mode, snapToRight])

	const handleCallEnd = useCallback(() => {
		onClose?.()
	}, [onClose])

	const handleSendGift = useCallback(() => {}, [])

	if (!visible) return null

	const panHandlers =
		mode === 'mini' ? miniPanResponder.panHandlers : panResponder.panHandlers

	const fixedFrameSize = { width: cardSize.width, height: cardSize.height }

	return (
		<View style={styles.wrapper} pointerEvents='box-none'>
			<RNAnimated.View
				style={[
					styles.draggable,
					fixedFrameSize,
					{
						transform: position.getTranslateTransform(),
					},
				]}
				pointerEvents='box-none'
			>
				<View style={[styles.fixedFrame, fixedFrameSize]}>
					{mode === 'expanded' && !pkVideoEnded && (
						<View style={styles.videoLayer}>
							<PKStartVideo
								width={fixedFrameSize.width}
								height={fixedFrameSize.height}
								onEnd={() => setPkVideoEnded(true)}
							/>
						</View>
					)}
					<Animated.View
						style={[mountStyle, styles.overlayContent]}
						pointerEvents='box-none'
					>
						<View
							style={styles.contentWrap}
							{...panHandlers}
							collapsable={false}
						>
							<Animated.View style={contentOpacityStyle}>
								{mode === 'start' && (
									<PKStartOverlayStart onStartRandom={handleStartRandom} />
								)}
								{mode === 'expanded' && (
									<PKStartOverlayExpanded
										userA={userA}
										userB={userB}
										onCollapse={handleCollapse}
										onSendGift={handleSendGift}
										onCallEnd={handleCallEnd}
										videoPlaying={!pkVideoEnded}
										onEnterPKBattle={onEnterPKBattle}
									/>
								)}
								{mode === 'mini' && (
									<PKStartOverlayMini
										userA={userA}
										userB={userB}
										onExpand={handleExpandFromMini}
									/>
								)}
							</Animated.View>
						</View>
					</Animated.View>
				</View>
			</RNAnimated.View>
		</View>
	)
}

export const PKStartOverlay = memo(PKStartOverlayInner)

const styles = StyleSheet.create({
	wrapper: {
		...StyleSheet.absoluteFillObject,
		zIndex: 10000,
		elevation: 10000,
	},
	draggable: {
		position: 'absolute',
		left: 0,
		top: 0,
	},
	fixedFrame: {
		overflow: 'hidden',
		position: 'relative',
	},
	videoLayer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 0,
		backgroundColor: 'transparent',
	},
	overlayContent: {
		zIndex: 1,
		position: 'relative',
	},
	contentWrap: {
		alignSelf: 'flex-start',
	},
})
