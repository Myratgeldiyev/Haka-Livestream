import { LinearGradient } from 'expo-linear-gradient'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import ScorePkIcon from '../ui/icons/chat/ScorePkIcon'
import SeatPkIcon from '../ui/icons/chat/seatPkIcon'
import { PK_COLORS, PK_START_OVERLAY } from './constants'
import type { PKStartOverlayExpandedProps, PKUser } from './types'

const DEBOUNCE_MS = 220
const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 }

function formatScore(n: number): string {
	return n.toLocaleString('en-US')
}

function HangUpIcon({ size = 22 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path d='M7 5h10v2H7V5zm0 4h10v10H7V9z' fill={PK_COLORS.white} />
		</Svg>
	)
}

function PKAvatar({ user, size }: { user: PKUser; size: number }) {
	const source = user.avatarUri ? { uri: user.avatarUri } : user.avatarSource
	if (!source) {
		return (
			<View
				style={[
					styles.avatarWrap,
					styles.avatarPlaceholder,
					{ width: size, height: size },
				]}
			>
				<View style={[styles.avatar, { width: size, height: size }]} />
				<View style={styles.starBadge}>
					<Text style={styles.starText}>★</Text>
				</View>
			</View>
		)
	}
	return (
		<View style={[styles.avatarWrap, { width: size, height: size }]}>
			<Image
				source={source}
				style={[styles.avatar, { width: size, height: size }]}
				resizeMode='cover'
			/>
			<View style={styles.starBadge}>
				<Text style={styles.starText}>★</Text>
			</View>
		</View>
	)
}

function ActionCircle({
	onPress,
	children,
}: {
	onPress: () => void
	children?: React.ReactNode
}) {
	const lastRef = useRef(0)
	const handlePress = useCallback(() => {
		const now = Date.now()
		if (now - lastRef.current < DEBOUNCE_MS) return
		lastRef.current = now
		onPress()
	}, [onPress])
	return (
		<Pressable onPress={handlePress} hitSlop={HIT_SLOP}>
			<SeatPkIcon />
		</Pressable>
	)
}

function CollapseCircle({
	onPress,
	children,
}: {
	onPress: () => void
	children?: React.ReactNode
}) {
	const lastRef = useRef(0)
	const handlePress = useCallback(() => {
		const now = Date.now()
		if (now - lastRef.current < DEBOUNCE_MS) return
		lastRef.current = now
		onPress()
	}, [onPress])
	return (
		<Pressable
			style={({ pressed }) => [
				styles.collapseBtn,
				pressed && styles.circleBtnPressed,
			]}
			onPress={handlePress}
			hitSlop={HIT_SLOP}
		>
			{children ?? <View style={styles.circleBtnInner} />}
		</Pressable>
	)
}
const COUNTDOWN_SECONDS = 5 * 60

function formatTime(remainingSeconds: number): string {
	const m = Math.floor(remainingSeconds / 60)
	const s = remainingSeconds % 60
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function PKStartOverlayExpandedInner({
	userA,
	userB,
	onCollapse,
	onSendGift,
	onCallEnd,
	videoPlaying = false,
	onEnterPKBattle,
}: PKStartOverlayExpandedProps) {
	const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS)

	useEffect(() => {
		if (remaining <= 0) {
			onCallEnd?.()
			return
		}
		const id = setInterval(() => {
			setRemaining(s => {
				const next = Math.max(0, s - 1)
				if (next === 0) clearInterval(id)
				return next
			})
		}, 1000)
		return () => clearInterval(id)
	}, [remaining, onCallEnd])

	const scoreA = userA.score
	const scoreB = userB.score
	const total = scoreA + scoreB
	const ratioA = total > 0 ? scoreA / total : 0.5

	// When intro video is playing, use lower opacity so video is visible behind
	const gradientOpacity = videoPlaying ? 0.5 : 0.88
	const gradientColors = [
		`rgba(233, 30, 120, ${gradientOpacity})`,
		`rgba(194, 24, 91, ${gradientOpacity})`,
		`rgba(57, 73, 171, ${gradientOpacity})`,
		`rgba(92, 107, 192, ${gradientOpacity})`,
	]

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={gradientColors}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradient}
			>
				<View style={styles.badge}>
					<ScorePkIcon />
					<Text style={styles.badgeTime}>{formatTime(remaining)}</Text>
				</View>

				<View style={styles.main}>
					<View style={styles.sideLeft}>
						<PKAvatar
							user={userA}
							size={PK_START_OVERLAY.expanded.avatarSize}
						/>
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
								style={[styles.scoreBarContent, styles.scoreBarContentLeft]}
							>
								<Text style={styles.scoreBarStar}>★</Text>
								<Text style={styles.scoreBarScoreText}>
									{formatScore(userA.score)}
								</Text>
							</View>
							<View style={styles.scoreBarHighlightBottom} />
						</View>

						<View style={styles.scoreBarDivider} />

						<View style={[styles.scoreBarSection, { flex: 1 - ratioA }]}>
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
								style={[styles.scoreBarContent, styles.scoreBarContentRight]}
							>
								<Text style={styles.scoreBarScoreText}>
									{formatScore(userB.score)}
								</Text>
								<Text style={styles.scoreBarStar}>★</Text>
							</View>
							<View style={styles.scoreBarHighlightBottom} />
						</View>
					</View>

					<View style={styles.sideRight}>
						<CollapseCircle onPress={onCollapse} />
						<PKAvatar
							user={userB}
							size={PK_START_OVERLAY.expanded.avatarSize}
						/>
					</View>
				</View>

				<View style={styles.bottom}>
					{onEnterPKBattle ? (
						<Pressable
							style={({ pressed }) => [
								styles.baslaBtn,
								pressed && styles.baslaBtnPressed,
							]}
							onPress={onEnterPKBattle}
							hitSlop={HIT_SLOP}
						>
							<Text style={styles.baslaBtnText}>Basla</Text>
						</Pressable>
					) : null}
					<ActionCircle onPress={() => {}} />
					<ActionCircle onPress={() => {}} />
					<ActionCircle onPress={() => {}} />
					<Pressable
						style={({ pressed }) => [
							styles.sendGiftBtn,
							pressed && styles.sendGiftBtnPressed,
						]}
						onPress={onSendGift}
						hitSlop={HIT_SLOP}
					>
						<Text style={styles.sendGiftText}>Send gift</Text>
					</Pressable>
					<Pressable
						style={({ pressed }) => [
							styles.callEndBtn,
							pressed && styles.callEndBtnPressed,
						]}
						onPress={onCallEnd}
						hitSlop={HIT_SLOP}
					>
						<HangUpIcon />
					</Pressable>
					<ActionCircle onPress={() => {}} />
					<ActionCircle onPress={() => {}} />
					<ActionCircle onPress={() => {}} />
				</View>
			</LinearGradient>
		</View>
	)
}

export const PKStartOverlayExpanded = memo(PKStartOverlayExpandedInner)

const styles = StyleSheet.create({
	container: {
		width: PK_START_OVERLAY.expanded.width,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: PK_COLORS.scoreBarHighlight,
	},
	gradient: {
		paddingBottom: 8,
		paddingHorizontal: 6,
		borderRadius: 0,
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
		marginBottom: 8,
	},
	sideLeft: {
		width: PK_START_OVERLAY.expanded.avatarSize,
		alignItems: 'center',
		alignSelf: 'flex-start',
		paddingLeft: 0,
	},
	sideRight: {
		width: PK_START_OVERLAY.expanded.avatarSize,
		alignItems: 'center',
		alignSelf: 'flex-end',
		paddingRight: 0,
	},
	usernameText: {
		fontSize: 11,
		fontWeight: '600',
		color: PK_COLORS.white,
		marginTop: 4,
		maxWidth: PK_START_OVERLAY.expanded.avatarSize + 8,
	},
	avatarWrap: {
		position: 'relative',
		borderRadius: 10,
		overflow: 'hidden',
	},
	avatar: {
		borderRadius: 10,
	},
	avatarPlaceholder: {
		backgroundColor: 'rgba(255,255,255,0.2)',
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
	iconsRow: {
		flexDirection: 'row',
		gap: 4,
		marginTop: 4,
	},
	circleBtn: {
		width: 18,
		height: 18,
		borderRadius: 14,
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	circleBtnPressed: {
		opacity: 0.7,
	},
	circleBtnInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: PK_COLORS.iconMuted,
	},
	scoreBarWrap: {
		flex: 1,
		flexDirection: 'row',
		height: 12,

		borderWidth: 1,
		borderColor: PK_COLORS.scoreBarBorder,
		overflow: 'hidden',
		alignSelf: 'center',
		minWidth: 0,
	},
	scoreBarDivider: {
		width: 1,
		backgroundColor: PK_COLORS.scoreBarBorder,
	},
	scoreBarSection: {
		overflow: 'hidden',
		justifyContent: 'center',
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
	},
	scoreBarContentRight: {
		justifyContent: 'flex-end',
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
	baslaBtn: {
		backgroundColor: PK_COLORS.blue,
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderRadius: 20,
	},
	baslaBtnPressed: {
		opacity: 0.85,
	},
	baslaBtnText: {
		fontSize: 12,
		fontWeight: '700',
		color: PK_COLORS.white,
	},
	sendGiftBtn: {
		backgroundColor: PK_COLORS.yellow,
		paddingVertical: 2,
		paddingHorizontal: 5,
		borderRadius: 20,
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
	collapseBtn: {
		position: 'absolute',
		top: -25,
		right: 5,
		width: 18,
		height: 18,
		borderRadius: 14,
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
