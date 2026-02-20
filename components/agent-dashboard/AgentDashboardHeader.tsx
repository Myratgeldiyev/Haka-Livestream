import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import AgentCoinSellerIcon from '../ui/icons/agent-dashboard/AgentCoinSellerIcon'
import AgentNotificationIcon from '../ui/icons/agent-dashboard/AgentNotificationIcon'
import AgentProgressIcon from '../ui/icons/agent-dashboard/AgentProgressIcon'
import AgentRankIcon from '../ui/icons/agent-dashboard/AgentRankIcon'
import AgentRateIcon from '../ui/icons/agent-dashboard/AgentRateIcon'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'
import { AGENT_DASHBOARD } from './constants'

const PROGRESS_ICON_SIZE = 75

interface AgentDashboardHeaderProps {
	onBack?: () => void
	userName?: string
	progressPercent?: number
	progressPillText?: string
	earningRequires?: string
}

export function AgentDashboardHeader({
	onBack,
	userName = 'Samir Rider',
	progressPercent = 4,
	progressPillText = 'A: 8%',
	earningRequires = '17,000,000',
}: AgentDashboardHeaderProps) {
	const insets = useSafeAreaInsets()
	const topInset = insets.top

	return (
		<View
			style={[styles.wrapper, { marginTop: -topInset, paddingTop: topInset }]}
		>
			<LinearGradient
				colors={[
					AGENT_DASHBOARD.headerGradientStart,
					AGENT_DASHBOARD.headerGradientEnd,
					'transparent',
				]}
				locations={[0, 0.45, 1]}
				style={[
					styles.gradient,
					{ marginTop: -topInset, paddingTop: topInset + spacing.md },
				]}
			>
				<View style={styles.topRow}>
					<Pressable onPress={onBack} style={styles.backButton} hitSlop={12}>
						<LeftArrowIcon props='' color='#000' />
					</Pressable>
					<View style={styles.topRight}>
						<View style={''}>
							<AgentRankIcon />
						</View>
						<AgentNotificationIcon />
					</View>
				</View>
			</LinearGradient>
			<View style={styles.userRow}>
				<View style={styles.userLeft}>
					<Text style={styles.userName}>{userName}</Text>
					<View style={styles.badges}>
						<View style={styles.badgeB}>
							<Text style={styles.badgeBText}>B</Text>
						</View>
						<AgentCoinSellerIcon />
					</View>
				</View>
				<ImageBackground
					source={require('@/assets/images/agent-bg.png')}
					style={styles.progressCard}
					resizeMode='cover'
				>
					<View style={styles.progressIconWrap}>
						<AgentProgressIcon
							width={PROGRESS_ICON_SIZE}
							height={PROGRESS_ICON_SIZE}
							style={styles.progressIconSvg}
						/>
						<View style={styles.progressPercentCenter} pointerEvents='none'>
							<Text style={styles.progressPercentText}>{progressPercent}</Text>
							<Text style={{ fontSize: 10, color: '#5F22D9' }}>%</Text>
						</View>
					</View>
					<View style={styles.progressTextBlock}>
						<View style={styles.progressPill}>
							<AgentRateIcon />
							<Text style={styles.progressPillText}>{progressPillText}</Text>
						</View>
						<View style={styles.progressEarningRow}>
							<Text style={styles.progressLabel}>Earning requires</Text>
							<CoinIcon size='10' />
						</View>
						<View style={styles.progressValueRow}>
							<Text style={styles.progressValue}>
								{earningRequires}
								{'>>'}
							</Text>
						</View>
					</View>
				</ImageBackground>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingBottom: spacing.lg,
	},
	gradient: {
		marginHorizontal: -AGENT_DASHBOARD.screenPadding,
		paddingBottom: 24,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		marginBottom: spacing.md,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	backChevron: {
		fontSize: 28,
		color: AGENT_DASHBOARD.headerTextColor,
		fontWeight: fontWeights.bold,
	},
	topRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	agentChip: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 8,
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	agentChipText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.headerTextColor,
	},
	iconButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	userRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'transparent',
	},
	userLeft: {
		flex: 1,
		textAlign: 'center',
	},
	userName: {
		fontSize: fontSizes.xxxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
		marginBottom: 4,
		marginRight: 40,
		textAlign: 'center',
	},
	badges: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	badgeB: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#2196F3',
		alignItems: 'center',
		paddingHorizontal: 6,
		justifyContent: 'center',
		marginBottom: 10,
	},
	badgeBText: {
		fontSize: 12,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.headerTextColor,
	},
	badgeCoinSeller: {
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 999,
		backgroundColor: '#E65100',
	},
	badgeCoinSellerText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.headerTextColor,
	},
	progressCard: {
		minWidth: 173,
		maxHeight: 65,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 0,
		paddingHorizontal: 3,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.06)',
		overflow: 'hidden',
	},
	progressIconWrap: {
		width: PROGRESS_ICON_SIZE,
		height: PROGRESS_ICON_SIZE,
	},
	progressIconSvg: {
		position: 'absolute',
	},
	progressPercentCenter: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	progressPercentText: {
		fontSize: 36,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.progressRingPurple,
	},
	progressTextBlock: {
		flex: 1,
		alignItems: 'flex-start',
	},
	progressPill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#C8C4E9',
		paddingVertical: 1,
		paddingHorizontal: 10,
		borderRadius: 16,
		alignSelf: 'flex-start',
	},
	progressPillText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.bold,
		color: '#1A1A1A',
	},
	progressEarningRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		alignSelf: 'flex-start',
	},
	progressLabel: {
		fontSize: fontSizes.xs,
		textAlign: 'center',
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xs,
		color: '#1A1A1A',
	},
	progressValueRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	dollarIcon: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#FF2D55',
		alignItems: 'center',
		justifyContent: 'center',
	},
	dollarIconText: {
		fontSize: 16,
		textAlign: 'center',

		fontWeight: fontWeights.bold,
		color: '#FBBF24',
	},
	progressValue: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.earningRequiresColor,
	},
})
