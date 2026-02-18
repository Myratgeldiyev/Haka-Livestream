import {
	PK_COLORS,
	PK_START_OVERLAY,
} from '@/components/pk-start-overlay/constants'
import { usePKStartOverlayGesture } from '@/components/pk-start-overlay/hooks/usePKStartOverlayGesture'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
	Dimensions,
	Image,
	Pressable,
	Animated as RNAnimated,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import ChatKeepIcon from '../ui/icons/chat/ChatKeepIcon'
import ScorePkIcon from '../ui/icons/chat/ScorePkIcon'
import SeatPkIcon from '../ui/icons/chat/seatPkIcon'
import AudionsIcon2 from '../ui/icons/live-stream/audionsIcon2'
import PkPrizeYIcon from '../ui/icons/live-stream/PkPrizeYIcon'
import PkVsIcon from '../ui/icons/live-stream/PkVsIcon'
import { CameraView } from './CameraView'
import { PKBattleRivalSlot } from './PKBattleRivalSlot'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
const CARD_WIDTH = PK_START_OVERLAY.expanded.width
const CARD_HEIGHT = 160
const MINI_SIZE = PK_START_OVERLAY.mini.size
const MINI_AVATAR_SIZE = PK_START_OVERLAY.mini.avatarSize
const CAMERA_AREA_HEIGHT = 432
const HALF_WIDTH = SCREEN_WIDTH / 2
const AVATAR_SIZE = PK_START_OVERLAY.expanded.avatarSize

const DEFAULT_AVATAR = require('@/assets/images/games/room-avatar.png')

const GRADIENT_COLORS = [
	'rgba(233, 30, 120, 0.88)',
	'rgba(194, 24, 91, 0.88)',
	'rgba(57, 73, 171, 0.88)',
	'rgba(92, 107, 192, 0.88)',
] as const

function formatScore(n: number): string {
	return n.toLocaleString('en-US')
}

function formatTime(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = seconds % 60
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function HangUpIcon({ size = 22 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path d='M7 5h10v2H7V5zm0 4h10v10H7V9z' fill={PK_COLORS.white} />
		</Svg>
	)
}

function PKAvatar({ size }: { size: number }) {
	return (
		<View style={[styles.avatarWrap, { width: size, height: size }]}>
			<Image
				source={DEFAULT_AVATAR}
				style={[styles.avatar, { width: size, height: size }]}
				resizeMode='cover'
			/>
			<View style={styles.starBadge}>
				<Text style={styles.starText}>★</Text>
			</View>
		</View>
	)
}

const SEAT_BORDER_LEFT = [
	PK_COLORS.pink,
	PK_COLORS.yellow,
	'rgba(255,255,255,0.4)',
] as const
const SEAT_BORDER_RIGHT = [
	'rgba(255,255,255,0.4)',
	PK_COLORS.yellow,
	PK_COLORS.yellow,
] as const

function SeatRow({ borders }: { borders: readonly string[] }) {
	return (
		<View style={styles.seatRow}>
			{borders.map((borderColor, i) => (
				<Pressable key={i} style={[styles.seatCircle, { borderColor }]}>
					<SeatPkIcon width={12} height={12} />
				</Pressable>
			))}
		</View>
	)
}

export interface LivePKOverlayProps {
	visible: boolean
	scoreA?: number
	scoreB?: number
	winCountA?: number
	winCountB?: number
	onClose: () => void
	onEnterPKBattle: () => void
	onSendGift?: () => void
	/** Rendered on top of overlay (e.g. TopUserInfo + TopRightControls) so it stays visible */
	renderTopBar?: () => React.ReactNode
}

export function LivePKOverlay({
	visible,
	scoreA = 12766678,
	scoreB = 12766678,
	winCountA = 0,
	winCountB = 0,
	onClose,
	onEnterPKBattle,
	onSendGift,
	renderTopBar,
}: LivePKOverlayProps) {
	const [timeLeft, setTimeLeft] = useState(282)
	const [isMinimized, setIsMinimized] = useState(false)

	const cardSize = useMemo(
		() =>
			isMinimized
				? { width: MINI_SIZE, height: MINI_SIZE }
				: { width: CARD_WIDTH, height: CARD_HEIGHT },
		[isMinimized],
	)
	const insets = useSafeAreaInsets()

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
		isMini: isMinimized,
		onMiniTap: () => setIsMinimized(false),
	})

	const panHandlers = isMinimized
		? miniPanResponder.panHandlers
		: panResponder.panHandlers

	useEffect(() => {
		if (!visible || timeLeft <= 0) return
		const t = setInterval(() => {
			setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1))
		}, 1000)
		return () => clearInterval(t)
	}, [visible, timeLeft])

	useEffect(() => {
		if (visible && timeLeft <= 0) {
			onClose()
		}
	}, [visible, timeLeft, onClose])

	useEffect(() => {
		if (visible) setTimeLeft(282)
	}, [visible])

	useLayoutEffect(() => {
		if (!visible || cardSize.width === 0) return
		updateBounds(cardSize.width, cardSize.height)
	}, [visible, cardSize.width, cardSize.height, updateBounds])

	useEffect(() => {
		if (!visible) return
		const yBelowCamera = insets.top + CAMERA_AREA_HEIGHT + 8
		setPosition(centerX, yBelowCamera)
	}, [visible, centerX, insets.top, setPosition])

	useEffect(() => {
		if (isMinimized) snapToRight()
	}, [isMinimized, snapToRight])

	useEffect(() => {
		if (!visible) setIsMinimized(false)
	}, [visible])

	if (!visible) return null

	const total = scoreA + scoreB
	const ratioA = total > 0 ? scoreA / total : 0.5

	const fixedFrameSize = { width: cardSize.width, height: cardSize.height }

	return (
		<View style={styles.wrapper} pointerEvents='box-none'>
			{renderTopBar ? (
				<View style={styles.topBarSlot} pointerEvents='box-none'>
					{renderTopBar()}
				</View>
			) : null}
			<View
				style={[
					styles.fixedCameraSection,
					{
						top: insets.top,
						height: CAMERA_AREA_HEIGHT,
					},
				]}
				pointerEvents='box-none'
			>
				<View style={styles.camerasRow}>
					<View style={styles.cameraHalf}>
						<View style={styles.cameraContent}>
							<CameraView />
						</View>
						<View style={styles.cameraIconsRowLeft}>
							<AudionsIcon2 width={62} height={62} />
							<AudionsIcon2 width={62} height={62} />
						</View>
					</View>
					<View style={styles.cameraHalf}>
						<View style={styles.cameraContent}>
							<PKBattleRivalSlot pointsCount={160} username='Swxy154' />
						</View>
						<View style={styles.cameraIconsRowRight}>
							<AudionsIcon2 width={62} height={62} />
							<AudionsIcon2 width={62} height={62} />
						</View>
					</View>
				</View>
			</View>
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
					<View style={styles.contentWrap} {...panHandlers} collapsable={false}>
						{isMinimized ? (
							<View
								style={[
									styles.miniContainer,
									{ width: MINI_SIZE, height: MINI_SIZE },
								]}
							>
								<View style={[styles.miniHalf, styles.miniLeft]}>
									<Image
										source={DEFAULT_AVATAR}
										style={[
											styles.miniAvatar,
											{ width: MINI_AVATAR_SIZE, height: MINI_AVATAR_SIZE },
										]}
										resizeMode='cover'
									/>
									<Text style={styles.miniScore} numberOfLines={1}>
										{formatScore(scoreA)}
									</Text>
								</View>
								<View style={[styles.miniHalf, styles.miniRight]}>
									<Image
										source={DEFAULT_AVATAR}
										style={[
											styles.miniAvatar,
											{ width: MINI_AVATAR_SIZE, height: MINI_AVATAR_SIZE },
										]}
										resizeMode='cover'
									/>
									<Text style={styles.miniScore} numberOfLines={1}>
										{formatScore(scoreB)}
									</Text>
								</View>
							</View>
						) : (
							<View style={styles.container}>
								<LinearGradient
									colors={GRADIENT_COLORS}
									start={{ x: 0, y: 0.5 }}
									end={{ x: 1, y: 0.5 }}
									style={styles.gradient}
								>
									<View style={styles.topRightIcons}>
										<Pressable
											style={({ pressed }) => [
												styles.iconCircle,
												pressed && styles.iconCirclePressed,
											]}
											onPress={() => setIsMinimized(true)}
										>
											<ChatKeepIcon size={'12'} />
										</Pressable>
										<Pressable
											style={({ pressed }) => [
												styles.iconCircle,
												pressed && styles.iconCirclePressed,
											]}
											onPress={onClose}
										>
											<Ionicons name='power-outline' size={12} color='#FFF' />
										</Pressable>
									</View>
									<View style={styles.badge}>
										<ScorePkIcon />
										<Text style={styles.badgeTime}>{formatTime(timeLeft)}</Text>
									</View>

									<View style={styles.main}>
										<View style={styles.sideLeft}>
											<PKAvatar size={AVATAR_SIZE} />
											<SeatRow borders={SEAT_BORDER_LEFT} />
										</View>

										<View style={styles.scoreBarWrap}>
											<View style={[styles.scoreBarSection, { flex: ratioA }]}>
												<LinearGradient
													colors={[
														PK_COLORS.scoreBarRedLight,
														PK_COLORS.scoreBarRed,
														PK_COLORS.scoreBarRedDark,
													]}
													start={{ x: 0.5, y: 0 }}
													end={{ x: 0.5, y: 1 }}
													style={StyleSheet.absoluteFill}
												/>
												<View style={styles.scoreBarHighlightTop} />
												<View
													style={[
														styles.scoreBarContent,
														styles.scoreBarContentLeft,
													]}
												>
													<Text style={styles.scoreBarStar}>★</Text>
													<Text style={styles.scoreBarScoreText}>
														{formatScore(scoreA)}
													</Text>
												</View>
												<View style={styles.scoreBarHighlightBottom} />
											</View>

											<View
												style={[styles.scoreBarSection, { flex: 1 - ratioA }]}
											>
												<LinearGradient
													colors={[
														PK_COLORS.scoreBarBlueLight,
														PK_COLORS.scoreBarBlue,
														PK_COLORS.scoreBarBlueDark,
													]}
													start={{ x: 0.5, y: 0 }}
													end={{ x: 0.5, y: 1 }}
													style={StyleSheet.absoluteFill}
												/>
												<View style={styles.scoreBarHighlightTop} />
												<View
													style={[
														styles.scoreBarContent,
														styles.scoreBarContentRight,
													]}
												>
													<Text style={styles.scoreBarScoreText}>
														{formatScore(scoreB)}
													</Text>
													<Text style={styles.scoreBarStar}>★</Text>
												</View>
												<View style={styles.scoreBarHighlightBottom} />
											</View>

											<View style={styles.scoreBarVs}>
												<PkVsIcon width={28} height={24} />
											</View>
										</View>

										<View style={styles.sideRight}>
											<PKAvatar size={AVATAR_SIZE} />
											<SeatRow borders={SEAT_BORDER_RIGHT} />
										</View>
									</View>

									<View style={styles.bottom}>
										<Pressable
											style={({ pressed }) => [
												styles.sendGiftBtn,
												pressed && styles.sendGiftBtnPressed,
											]}
											onPress={onSendGift ?? (() => {})}
										>
											<PkPrizeYIcon />
											<Text style={styles.sendGiftText}>Send gift</Text>
										</Pressable>
										<Pressable
											style={({ pressed }) => [
												styles.callEndBtn,
												pressed && styles.callEndBtnPressed,
											]}
											onPress={onClose}
										>
											<HangUpIcon />
										</Pressable>
									</View>
								</LinearGradient>
							</View>
						)}
					</View>
				</View>
			</RNAnimated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		zIndex: 9999,
		elevation: 9999,
	},
	topBarSlot: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100000,
		elevation: 100000,
	},
	draggable: {
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 10,
		elevation: 10,
	},
	fixedFrame: {
		overflow: 'hidden',
		position: 'relative',
	},
	contentWrap: {
		alignSelf: 'flex-start',
	},
	fixedCameraSection: {
		position: 'absolute',
		left: 0,
		right: 0,
		overflow: 'hidden',
		zIndex: 1,
		elevation: 1,
	},
	camerasRow: {
		flexDirection: 'row',
		width: SCREEN_WIDTH,
		flex: 1,
		height: '100%',
		borderRadius: 10,
		overflow: 'hidden',
	},
	cameraHalf: {
		width: HALF_WIDTH,
		flex: 1,
		flexDirection: 'column',
		overflow: 'hidden',
	},
	cameraContent: {
		flex: 1,
		overflow: 'hidden',
	},
	cameraIconsRowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 8,
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	cameraIconsRowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 8,
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	container: {
		width: CARD_WIDTH,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: PK_COLORS.scoreBarHighlight,
	},
	gradient: {
		paddingBottom: 8,
		paddingHorizontal: 6,
		borderRadius: 0,
	},
	topRightIcons: {
		position: 'absolute',
		top: 6,
		right: 8,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		zIndex: 5,
	},
	iconCircle: {
		width: 22,
		height: 22,
		borderRadius: 14,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconCirclePressed: {
		opacity: 0.8,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: PK_COLORS.badgeBg,
		paddingVertical: 1,
		paddingHorizontal: 5,
	},
	badgeTime: {
		fontSize: 10,
		fontWeight: '600',
		color: PK_COLORS.white,
	},
	main: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	sideLeft: {
		width: AVATAR_SIZE,
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingLeft: 0,
	},
	sideRight: {
		width: AVATAR_SIZE,
		alignItems: 'center',
		alignSelf: 'flex-end',
		paddingRight: 0,
	},
	avatarWrap: {
		position: 'relative',
		borderRadius: 10,
		overflow: 'hidden',
	},
	avatar: {
		borderRadius: 10,
	},
	starBadge: {
		position: 'absolute',
		left: 2,
		bottom: 2,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 6,
		width: 16,
		height: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	starText: {
		fontSize: 10,
		color: PK_COLORS.scoreStar,
	},
	seatRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		marginTop: 4,
	},
	seatCircle: {
		width: 20,
		height: 20,
		borderRadius: 12,
		borderWidth: 1.5,
		backgroundColor: 'rgba(255,255,255,0.15)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreBarWrap: {
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
		height: 12,
		borderWidth: 1,
		borderColor: PK_COLORS.scoreBarBorder,
		overflow: 'hidden',
		alignSelf: 'center',
		minWidth: 0,
	},
	scoreBarSection: {
		overflow: 'hidden',
		justifyContent: 'center',
	},
	scoreBarVs: {
		position: 'absolute',
		left: '50%',
		marginLeft: -14,
		top: 0,
		bottom: 0,
		width: 28,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
	},
	scoreBarHighlightTop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: PK_COLORS.scoreBarHighlight,
	},
	scoreBarHighlightBottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 1,
		backgroundColor: PK_COLORS.scoreBarHighlight,
	},
	scoreBarContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		zIndex: 1,
	},
	scoreBarContentLeft: {
		justifyContent: 'flex-start',
		paddingLeft: 4,
	},
	scoreBarContentRight: {
		justifyContent: 'flex-end',
		paddingRight: 4,
	},
	scoreBarStar: {
		fontSize: 8,
		color: PK_COLORS.scoreStar,
	},
	scoreBarScoreText: {
		fontSize: 8,
		fontWeight: '700',
		color: '#000',
	},
	bottom: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12,
	},
	sendGiftBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: PK_COLORS.yellow,
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 8,
	},
	miniContainer: {
		flexDirection: 'row',
		borderRadius: PK_START_OVERLAY.mini.borderRadius,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: PK_COLORS.scoreBarHighlight,
	},
	miniHalf: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 6,
	},
	miniLeft: {
		backgroundColor: PK_COLORS.pink,
	},
	miniRight: {
		backgroundColor: PK_COLORS.blue,
	},
	miniAvatar: {
		borderRadius: 8,
		marginBottom: 4,
	},
	miniScore: {
		fontSize: 10,
		fontWeight: '700',
		color: PK_COLORS.white,
	},
	sendGiftBtnPressed: {
		opacity: 0.85,
	},
	sendGiftText: {
		fontSize: 10,
		fontWeight: '700',
		color: '#1a1a1a',
	},
	callEndBtn: {
		width: 28,
		height: 28,
		borderRadius: 24,
		backgroundColor: PK_COLORS.red,
		justifyContent: 'center',
		alignItems: 'center',
	},
	callEndBtnPressed: {
		opacity: 0.9,
	},
})
