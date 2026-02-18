import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Easing,
	Image,
	ImageBackground,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { CoinIcon } from '../ui/icons'
import ChartIconFri from '../ui/icons/invite-friends/chartIconFri'
import FriDiamondIcon from '../ui/icons/invite-friends/FriDiamondIcon'
import {
	CARD_MARGIN_H,
	CARD_MAX_WIDTH,
	HAND_IMAGE_HEIGHT,
	HAND_IMAGE_WIDTH,
	INVITE_FRIENDS,
} from './constants'

const CTA_FLOAT_OFFSET = 6
const CTA_FLOAT_DURATION = 1200

function AnimatedCtaButton() {
	const translateY = useRef(new Animated.Value(0)).current
	useEffect(() => {
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(translateY, {
					toValue: -CTA_FLOAT_OFFSET,
					duration: CTA_FLOAT_DURATION,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.ease),
				}),
				Animated.timing(translateY, {
					toValue: 0,
					duration: CTA_FLOAT_DURATION,
					useNativeDriver: true,
					easing: Easing.inOut(Easing.ease),
				}),
			])
		)
		loop.start()
		return () => loop.stop()
	}, [translateY])
	return (
		<Animated.View
			style={[styles.ctaButton, { transform: [{ translateY }] }]}
			collapsable={false}
		>
			<LinearGradient
				colors={[...INVITE_FRIENDS.ctaGradient]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={StyleSheet.absoluteFill}
			/>
			<Text style={styles.ctaText}>{INVITE_FRIENDS.inviteCtaText}</Text>
		</Animated.View>
	)
}

const OUTLINE_STROKE = 2
const OUTLINE_OFFSETS: [number, number][] = [
	[-OUTLINE_STROKE, -OUTLINE_STROKE],
	[-OUTLINE_STROKE, 0],
	[-OUTLINE_STROKE, OUTLINE_STROKE],
	[0, -OUTLINE_STROKE],
	[0, OUTLINE_STROKE],
	[OUTLINE_STROKE, -OUTLINE_STROKE],
	[OUTLINE_STROKE, 0],
	[OUTLINE_STROKE, OUTLINE_STROKE],
]

/** Text with thick white border/outline for Game Reward hero. */
function TextWithOutline({
	children,
	fillColor,
	style,
}: {
	children: string
	fillColor: string
	style?: object
}) {
	return (
		<View style={outlineStyles.wrap}>
			{OUTLINE_OFFSETS.map(([x, y], i) => (
				<Text
					key={i}
					style={[style, outlineStyles.stroke, { left: x, top: y }]}
				>
					{children}
				</Text>
			))}
			<Text style={[style, { color: fillColor }]}>{children}</Text>
		</View>
	)
}

const outlineStyles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'visible',
	},
	stroke: {
		position: 'absolute',
		color: '#FFFFFF',
	},
})

export function InviteFriendsContent() {
	return (
		<View style={styles.wrapper}>
			<View style={styles.hero}>
				<View style={styles.heroImageWrap}>
					<Image
						source={INVITE_FRIENDS.handImage}
						style={styles.handImage}
						resizeMode='contain'
						accessibilityLabel='Game reward'
					/>
					<View style={styles.heroOverlay}>
						<TextWithOutline
							fillColor={INVITE_FRIENDS.heroOverlayOrange}
							style={styles.heroGameReward}
						>
							{INVITE_FRIENDS.gameRewardText}
						</TextWithOutline>
						<TextWithOutline
							fillColor={INVITE_FRIENDS.heroOverlayPurple}
							style={styles.heroUpgrade}
						>
							{INVITE_FRIENDS.upgradeText}
						</TextWithOutline>
					</View>
				</View>
				<Text style={styles.slogan}>{INVITE_FRIENDS.heroSlogan}</Text>
			</View>

			{/* Global Shareholder Bonus card (inv-fri-card background) */}
			<View style={styles.cardWrap}>
				<Text style={styles.cardTitle}>{INVITE_FRIENDS.sectionTitle}</Text>
				<Text style={styles.cardSubtitle}>
					{INVITE_FRIENDS.shareholderSubtitle}
				</Text>
				<ImageBackground
					source={INVITE_FRIENDS.cardBackgroundImage}
					style={styles.card}
					resizeMode='stretch'
					imageStyle={styles.cardImageStyle}
				>
					<View />
					<Text style={styles.cardBigNumber}>
						{INVITE_FRIENDS.shareholderAmount}
					</Text>
					{/* Details row: card içinde en altta, parıltılı, ortada */}
					<View style={styles.detailsRowWrap}>
						<View style={styles.detailsRow}>
							<View style={styles.detailItem}>
								<CoinIcon size='12' />
								<Text style={styles.detailText}>
									{INVITE_FRIENDS.shareholderDetailValue}
								</Text>
							</View>
							<View style={styles.detailItem}>
								<View style={styles.personIcon} />
								<Text style={styles.detailText}>
									{INVITE_FRIENDS.shareholderUserName}
								</Text>
							</View>
							<View style={styles.detailItem}>
								<Text style={styles.heartIcon}>♥</Text>
								<Text style={styles.detailText}>
									{INVITE_FRIENDS.shareholderDivided}
								</Text>
							</View>
							<View style={styles.detailItem}>
								<CoinIcon size='12' />
								<Text style={styles.detailText}>
									{INVITE_FRIENDS.shareholderDetailValue}
								</Text>
							</View>
							<Pressable style={styles.rankButton}>
								<Text style={styles.rankButtonText}>
									{INVITE_FRIENDS.rankButtonText}
								</Text>
							</Pressable>
						</View>
					</View>
				</ImageBackground>
			</View>

			{/* Game Rebate card – radial-like gradient, glow, rebate-text left, tree + dashed lines right, Reward 1 tag with tail */}
			<View style={[styles.cardWrap, styles.gameRebateGlowWrap]}>
				<LinearGradient
					colors={[...INVITE_FRIENDS.gameRebateGradient]}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={[styles.gameRebateCard, styles.gameRebateCardBorder]}
				>
					<View style={styles.gameRebateBadgeWrap}>
						<View style={styles.gameRebateBadge}>
							<Text style={styles.gameRebateBadgeText}>
								{INVITE_FRIENDS.gameRebateRewardLabel}
							</Text>
						</View>
						<View style={styles.gameRebateBadgeTail} />
					</View>
					<View style={styles.gameRebateRow}>
						<View style={styles.gameRebateLeft}>
							<Text style={styles.gameRebateTitle}>
								{INVITE_FRIENDS.gameRebateTitle}
							</Text>
							<Text style={styles.gameRebateDesc}>
								{INVITE_FRIENDS.gameRebateDesc1}
							</Text>
							<Text style={styles.gameRebateDesc}>
								{INVITE_FRIENDS.gameRebateDesc2}
							</Text>
						</View>
						<View style={styles.gameRebateTree}>
							<GameRebateTree />
						</View>
					</View>
				</LinearGradient>
			</View>

			{/* Invite Friends CTA button – gradient color shift animation */}
			<Pressable style={styles.ctaWrap}>
				<AnimatedCtaButton />
			</Pressable>

			{/* Shareholder / Game Rebate section: bg #FDF9DE, tabs outside card, space-between */}
			<View style={styles.shareholderSectionWrap}>
				<View style={styles.tabsRow}>
					<Text style={styles.tabActive}>
						{INVITE_FRIENDS.tabShareholderBonus}
					</Text>
					<Text style={styles.tabInactive}>{INVITE_FRIENDS.tabGameRebate}</Text>
				</View>
				<View style={styles.shareholderCardInner}>
					<Text style={styles.dateRange}>{INVITE_FRIENDS.dateRange}</Text>
					<Text style={styles.rebateInfo}>
						{INVITE_FRIENDS.currentRebateLabel}{' '}
						<Text style={styles.rebateValue}>
							{INVITE_FRIENDS.currentRebateValue}
						</Text>{' '}
						{INVITE_FRIENDS.historicalMax}
					</Text>
					<View style={styles.progressSection}>
						<View style={styles.progressLabelsRow}>
							{INVITE_FRIENDS.progressLabels.map((l, i) => (
								<Text key={i} style={styles.progressLabelText}>
									{l}
								</Text>
							))}
						</View>
						<View style={styles.progressBarTrackWrap}>
							<View style={styles.progressBarTrack} />
							<View style={styles.progressBarDotsRow}>
								{INVITE_FRIENDS.progressLabels.map((_, i) => (
									<View key={i} style={styles.progressBarDotCell}>
										<View
											style={[
												styles.progressBarDot,
												i === INVITE_FRIENDS.progressLabels.length - 1 &&
													styles.progressBarDotActive,
											]}
										/>
									</View>
								))}
							</View>
						</View>
						<View style={styles.progressValuesRow}>
							{INVITE_FRIENDS.progressValues.map((v, i) => (
								<View key={i} style={styles.progressValueBadge}>
									<CoinIcon size='12' />
									<Text style={styles.progressValueBadgeText}>{v}</Text>
								</View>
							))}
						</View>
					</View>
					<View style={styles.validBetsBox}>
						<ChartIconFri />
						<View style={styles.validBetsContent}>
							<View style={styles.validBetsRow}>
								<Text style={styles.validBetsText}>
									{INVITE_FRIENDS.validBetsLabel}{' '}
								</Text>
								<FriDiamondIcon />
								<Text style={styles.yellowNumber}>
									{INVITE_FRIENDS.validBetsValue}
								</Text>
							</View>
							<View style={styles.validBetsRow}>
								<Text style={styles.needProgressText}>
									{INVITE_FRIENDS.needToProgressLabel}{' '}
								</Text>
								<FriDiamondIcon />
								<Text style={styles.yellowNumber}>
									{INVITE_FRIENDS.validBetsValue}
								</Text>
								<Text style={styles.needProgressText}>
									{' '}
									{INVITE_FRIENDS.needToProgressSuffix}
								</Text>
							</View>
						</View>
					</View>
				</View>
				{/* Real-Time Income Commission card – light orange, no shadow */}
				<View style={[styles.cardWrap, styles.incomeCard]}>
					<Image
						style={{ width: 40, height: 40 }}
						source={require('assets/images/lucky-bag.png')}
					/>
					<View style={styles.incomeTitleRow}>
						<Text style={styles.incomeTitle}>
							{INVITE_FRIENDS.incomeCommissionTitle}
						</Text>
						<View style={styles.incomeAmountBadge}>
							<CoinIcon size='12' />
							<Text style={styles.incomeAmountBadgeText}>
								{INVITE_FRIENDS.incomeCommissionAmount}
							</Text>
						</View>
					</View>
					<Pressable style={styles.collectButton}>
						<Text style={styles.collectButtonText}>
							{INVITE_FRIENDS.collectButtonText}
						</Text>
					</Pressable>
				</View>
			</View>

			{/* Reward Data card */}
			<View style={[styles.cardWrap, styles.detailCard]}>
				<View style={styles.rewardDataHeader}>
					<Text style={styles.cardTitle}>{INVITE_FRIENDS.rewardDataTitle}</Text>
					<Pressable>
						<Text style={styles.detailsLink}>
							{INVITE_FRIENDS.rewardDataDetails}
						</Text>
					</Pressable>
				</View>
				<View style={styles.rewardListOuter}>
					<View style={styles.rewardListInner}>
						<RewardRow
							label={INVITE_FRIENDS.totalReward}
							value={INVITE_FRIENDS.rewardAmountPlaceholder}
						/>
						<RewardRow
							label={INVITE_FRIENDS.shareholderBonusLabel}
							value={INVITE_FRIENDS.rewardAmountPlaceholder}
						/>
						<RewardRow
							label={INVITE_FRIENDS.tier1Rebate}
							value={INVITE_FRIENDS.rewardAmountPlaceholder}
						/>
						<RewardRow
							label={INVITE_FRIENDS.tier2Rebate}
							value={INVITE_FRIENDS.rewardAmountPlaceholder}
						/>
					</View>
				</View>
			</View>

			{/* My Invitation link */}
			<Pressable style={styles.myInvitationWrap}>
				<Text style={styles.myInvitationText}>
					{INVITE_FRIENDS.myInvitationText}
				</Text>
			</Pressable>
		</View>
	)
}

function RewardRow({ label, value }: { label: string; value: string }) {
	return (
		<View style={styles.rewardRow}>
			<Text style={styles.rewardRowLabel}>{label}</Text>
			<CoinIcon size='12' />
			<Text style={styles.rewardRowValue}>{value}</Text>
		</View>
	)
}

/** User icon inside oval: circular head + curved torso (black silhouette) */
function TreePersonIcon() {
	return (
		<View style={styles.treePersonWrap}>
			<View style={styles.treePersonHead} />
			<View style={styles.treePersonBody} />
		</View>
	)
}

/** Single node: white oval + black person icon, centered in slot */
function TreeOvalNode({ id }: { id: string }) {
	return (
		<View key={id} style={styles.treeOval}>
			<TreePersonIcon />
		</View>
	)
}

/** T-shaped connector: vertical down, horizontal branch, two verticals to children */
function TreeConnectorT({
	width,
	segmentHeight = 8,
}: {
	width: number
	segmentHeight?: number
}) {
	if (width <= 0) return null
	const half = width / 2
	const quarter = width / 4
	return (
		<View
			style={[styles.treeConnectorTWrap, { width, height: segmentHeight * 2 }]}
		>
			<View
				style={[
					styles.treeDashedLine,
					styles.treeDashedV,
					{ left: half - 0.5, top: 0, height: segmentHeight },
				]}
			/>
			<View
				style={[
					styles.treeDashedLine,
					styles.treeDashedH,
					{ top: segmentHeight, width },
				]}
			/>
			<View
				style={[
					styles.treeDashedLine,
					styles.treeDashedV,
					{ left: quarter - 0.5, top: segmentHeight, height: segmentHeight },
				]}
			/>
			<View
				style={[
					styles.treeDashedLine,
					styles.treeDashedV,
					{
						left: half + quarter - 0.5,
						top: segmentHeight,
						height: segmentHeight,
					},
				]}
			/>
		</View>
	)
}

const TREE_SEGMENT_HEIGHT = 8
const TREE_ROW_GAP = 6

function GameRebateTree() {
	const [layoutWidth, setLayoutWidth] = useState(0)
	const oval = (id: string) => (
		<View key={id} style={styles.treeSlot}>
			<TreeOvalNode id={id} />
		</View>
	)
	return (
		<View
			style={styles.treeWrap}
			onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
		>
			<View style={styles.treeRow}>{oval('1')}</View>
			<View
				style={[
					styles.treeConnectorRow,
					layoutWidth > 0 && { height: TREE_SEGMENT_HEIGHT * 2 },
				]}
			>
				{layoutWidth > 0 && (
					<TreeConnectorT
						width={layoutWidth}
						segmentHeight={TREE_SEGMENT_HEIGHT}
					/>
				)}
			</View>
			<View style={styles.treeRow}>
				{oval('2a')}
				{oval('2b')}
			</View>
			<View
				style={[
					styles.treeConnectorRow,
					styles.treeConnectorRow2to4,
					layoutWidth > 0 && { height: TREE_SEGMENT_HEIGHT * 2 },
				]}
			>
				{layoutWidth > 0 && (
					<>
						<View style={{ width: layoutWidth / 2 }}>
							<TreeConnectorT
								width={layoutWidth / 2}
								segmentHeight={TREE_SEGMENT_HEIGHT}
							/>
						</View>
						<View style={{ width: layoutWidth / 2 }}>
							<TreeConnectorT
								width={layoutWidth / 2}
								segmentHeight={TREE_SEGMENT_HEIGHT}
							/>
						</View>
					</>
				)}
			</View>
			<View style={styles.treeRow}>
				{[oval('4a'), oval('4b'), oval('4c'), oval('4d')]}
			</View>
			<View
				style={[
					styles.treeConnectorRow,
					styles.treeConnectorRow4to8,
					layoutWidth > 0 && { height: TREE_SEGMENT_HEIGHT * 2 },
				]}
			>
				{layoutWidth > 0 &&
					Array.from({ length: 4 }, (_, i) => (
						<View key={i} style={{ width: layoutWidth / 4 }}>
							<TreeConnectorT
								width={layoutWidth / 4}
								segmentHeight={TREE_SEGMENT_HEIGHT}
							/>
						</View>
					))}
			</View>
			<View style={styles.treeRow}>
				{Array.from({ length: 8 }, (_, i) => oval(`8-${i}`))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.lg,
		paddingBottom: spacing.xxl,
	},
	hero: {
		alignItems: 'center',
		marginBottom: spacing.xl,
	},
	heroImageWrap: {
		position: 'relative',
		marginBottom: 2,
		width: HAND_IMAGE_WIDTH,
		marginHorizontal: -spacing.screen.horizontal,
		alignSelf: 'stretch',
	},
	handImage: {
		width: HAND_IMAGE_WIDTH,
		height: HAND_IMAGE_HEIGHT,
	},
	heroOverlay: {
		position: 'absolute',
		bottom: '25%',
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	heroGameReward: {
		fontSize: 46,
		fontWeight: fontWeights.bold,
		fontStyle: 'italic',
		letterSpacing: 1,
		marginBottom: 4,
	},
	heroUpgrade: {
		fontSize: 46,
		fontWeight: fontWeights.bold,
		fontStyle: 'italic',
		letterSpacing: 1,
	},
	slogan: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.medium,
		color: '#000',
		textAlign: 'center',
		marginTop: 2,
	},
	cardWrap: {
		alignSelf: 'center',
		width: '100%',
		maxWidth: CARD_MAX_WIDTH,
		marginHorizontal: CARD_MARGIN_H,
		backgroundColor: '#FFD7AB',
		marginBottom: spacing.lg,
		borderRadius: 16,
		overflow: 'hidden',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	card: {
		minHeight: 180,
		padding: spacing.xl,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	cardImageStyle: { borderRadius: 16 },
	cardTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
		marginBottom: spacing.xs,
		textAlign: 'center',
	},
	cardSubtitle: {
		textAlign: 'center',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#666',
	},
	cardBigNumber: {
		alignSelf: 'center',
		fontSize: 28,
		fontWeight: '800',
		color: '#fff',
		marginVertical: spacing.sm,
	},
	detailsRowWrap: {
		width: '100%',
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.sm,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
	},
	detailsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.sm,
	},
	detailItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	detailText: {
		fontSize: fontSizes.xs,
		color: '#fff',
	},
	personIcon: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#333',
	},
	heartIcon: {
		fontSize: 12,
		color: '#000',
	},
	rankButton: {
		backgroundColor: '#FFF869',
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
		borderRadius: 12,
	},
	rankButtonText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#FEB032',
	},
	gameRebateGlowWrap: {
		borderRadius: 20,
	},
	gameRebateCard: {
		padding: spacing.xl,
		paddingTop: spacing.lg + 4,
		position: 'relative',
		borderRadius: 16,
		minHeight: 140,
	},
	gameRebateCardBorder: {
		borderWidth: 1,
		borderColor: INVITE_FRIENDS.gameRebateBorder,
	},
	gameRebateBadgeWrap: {
		position: 'absolute',
		top: spacing.sm,
		right: spacing.sm,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	gameRebateBadge: {
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderRadius: 8,
	},
	gameRebateBadgeTail: {
		position: 'absolute',
		left: 8,
		bottom: -5,
		width: 0,
		height: 0,
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderTopWidth: 6,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderTopColor: INVITE_FRIENDS.gameRebateTagBg,
	},
	gameRebateBadgeText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.regular,
		color: INVITE_FRIENDS.gameRebateTagText,
	},
	gameRebateRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	gameRebateLeft: {
		width: '50%',
		minWidth: 0,
		justifyContent: 'center',
		paddingRight: spacing.sm,
		gap: 2,
	},
	gameRebateTitle: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	gameRebateDesc: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	gameRebateTree: {
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 0,
	},
	treeWrap: {
		width: '100%',
		alignItems: 'center',
		gap: TREE_ROW_GAP,
	},
	treeRow: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	treeSlot: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	treeConnectorRow: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	treeConnectorRow2to4: {
		gap: 0,
	},
	treeConnectorRow4to8: {
		gap: 0,
	},
	treeConnectorTWrap: {
		position: 'relative',
	},
	treeDashedLine: {
		borderStyle: 'dashed',
		backgroundColor: 'transparent',
	},
	treeDashedV: {
		position: 'absolute',
		width: 1,
		borderLeftWidth: 1,
		borderLeftColor: '#000',
	},
	treeDashedH: {
		position: 'absolute',
		left: 0,
		height: 1,
		borderTopWidth: 1,
		borderTopColor: '#000',
	},
	treePersonWrap: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	treeOval: {
		width: 24,
		height: 14,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	treePersonHead: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#000',
	},
	treePersonBody: {
		width: 5,
		height: 4,
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
		backgroundColor: '#000',
		marginTop: 0.5,
	},
	ctaWrap: {
		alignSelf: 'center',
		width: '100%',
		maxWidth: CARD_MAX_WIDTH,
		marginBottom: spacing.xl,
		borderRadius: 14,
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.12,
				shadowRadius: 8,
			},
			android: { elevation: 4 },
		}),
	},
	ctaButton: {
		position: 'relative',
		width: '100%',
		minHeight: 52,
		overflow: 'hidden',
		paddingVertical: spacing.button.largeVertical,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 14,
	},
	ctaText: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
		zIndex: 1,
	},
	detailCard: {
		backgroundColor: INVITE_FRIENDS.cardBgLight,
		padding: spacing.xl,
	},
	shareholderSectionWrap: {
		alignSelf: 'center',
		width: '100%',
		maxWidth: CARD_MAX_WIDTH,
		marginHorizontal: CARD_MARGIN_H,
		marginBottom: spacing.lg,
		backgroundColor: '#FDF9DE',
		borderRadius: 16,
		paddingTop: spacing.md,
		paddingHorizontal: spacing.md,
		paddingBottom: 0,
		overflow: 'hidden',
		justifyContent: 'center',
	},
	tabsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	shareholderCardInner: {
		width: '100%',
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		padding: spacing.xs,

		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		overflow: 'hidden',
	},
	detailCardWhite: {
		backgroundColor: '#fff',
		padding: spacing.xl,
	},
	tabActive: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	tabInactive: {
		fontSize: fontSizes.md,
		color: '#999',
	},
	dateRange: {
		fontSize: fontSizes.sm,
		color: '#000',
		marginBottom: spacing.sm,
	},
	rebateInfo: {
		fontSize: fontSizes.sm,
		color: '#000',
		marginBottom: spacing.md,
	},
	rebateValue: {
		fontWeight: fontWeights.bold,
		color: INVITE_FRIENDS.redHighlight,
	},
	progressSection: {
		marginBottom: spacing.md,
	},
	progressLabelsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	progressLabelText: {
		fontSize: 11,
		color: '#000',
	},
	progressBarTrackWrap: {
		position: 'relative',
		height: 10,
		justifyContent: 'center',
		marginVertical: 2,
	},
	progressBarTrack: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 6,
		borderRadius: 3,
		backgroundColor: INVITE_FRIENDS.yellowProgressTrack,
	},
	progressBarDotsRow: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	progressBarDotCell: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	progressBarDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#fff',
		borderWidth: 1.5,
		borderColor: INVITE_FRIENDS.yellowProgressDotBorder,
	},
	progressBarDotActive: {
		backgroundColor: INVITE_FRIENDS.yellowProgressTrack,
		borderColor: INVITE_FRIENDS.yellowProgressTrack,
	},
	progressValuesRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 6,
		paddingHorizontal: 0,
	},
	progressValueBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 36,
		borderRadius: 12,
		gap: 2,
	},
	progressValueBadgeText: {
		fontSize: 10,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	validBetsBox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: INVITE_FRIENDS.validBetsBoxBg,
		borderRadius: 12,
		padding: spacing.sm,
		gap: spacing.sm,
	},
	validBetsIconWrap: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	validBetsContent: {
		flex: 1,
		gap: 2,
	},
	validBetsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	validBetsText: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	yellowNumber: {
		fontWeight: fontWeights.bold,
		color: INVITE_FRIENDS.yellowHighlight,
	},
	needProgressText: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	incomeCard: {
		marginTop: 10,
		backgroundColor: '#F9C97D',
		padding: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	incomeIconWrap: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	moneyBagIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#C4A574',
	},
	incomeTitleRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 6,
		minWidth: 0,
	},
	incomeTitle: {
		flex: 1,
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#D1723A',
		minWidth: 0,
	},
	incomeAmountBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 2,
		flexShrink: 0,
	},
	incomeAmountBadgeText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.bold,
		color: '#fff',
	},
	collectButton: {
		backgroundColor: '#FCE4BE',
		paddingHorizontal: spacing.sm,
		paddingVertical: 6,
		borderRadius: 18,
		flexShrink: 0,
	},
	collectButtonText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: '#D47942',
	},
	rewardDataHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.md,
	},
	detailsLink: {
		fontSize: fontSizes.sm,
		color: '#620719',
		fontWeight: fontWeights.semibold,
	},
	rewardListOuter: {
		padding: spacing.sm,
	},
	rewardListInner: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: spacing.sm,
		gap: spacing.sm,
	},
	rewardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	rewardRowLabel: {
		fontSize: fontSizes.sm,
		color: '#000',
		flex: 1,
	},
	rewardRowValue: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	myInvitationWrap: {
		alignItems: 'center',
		paddingVertical: spacing.xl,
	},
	myInvitationText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
})
