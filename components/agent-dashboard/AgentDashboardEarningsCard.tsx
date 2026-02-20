import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import RankInfoIcon from '../ui/icons/rank/RankInfoIcon'
import { AGENT_DASHBOARD } from './constants'

interface AgentDashboardEarningsCardProps {
	earnedToday?: string
	points?: string
	accumulatedEarnings?: string
	giftIncome?: string
	onWithdraw?: () => void
}

const PROGRESS_MARKERS = [
	{ percent: '0%', value: '0' },
	{ percent: '5%', value: '200K' },
	{ percent: '10%', value: '300K' },
	{ percent: '15%', value: '500k' },
]

export function AgentDashboardEarningsCard({
	earnedToday = '0',
	points = '316,999',
	accumulatedEarnings = '30,134,554',
	giftIncome = '1234567890',
	onWithdraw,
}: AgentDashboardEarningsCardProps) {
	return (
		<View style={styles.card}>
			<View
				style={{
					backgroundColor: '#fff',
				}}
			>
				<View style={styles.topSection}>
					<View style={styles.earnedToday}>
						<View style={styles.valueRow}>
							<Text style={styles.label}>Earned Today</Text>
							<CoinIcon size='18' />
							<RankInfoIcon size='18' color='#000' />
						</View>
						<View style={styles.valueRow}>
							<Text style={styles.value}>{earnedToday}</Text>
						</View>
					</View>
					<View style={styles.divider} />
					<View style={styles.pointsSection}>
						<View style={styles.valueRow}>
							<Text style={styles.label}>Points</Text>
							<CoinIcon size='18' />

							<Pressable
								style={styles.withdrawButton}
								onPress={onWithdraw}
								android_ripple={null}
							>
								<Text style={styles.withdrawText}>Withdraw</Text>
							</Pressable>
						</View>
						<View style={styles.pointsRow}>
							<Text style={styles.value}>{points}</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.accumulatedRow}>
				<Text style={styles.label}>Accumulated Earnings:</Text>
				<Text style={styles.accumulatedValue}>{accumulatedEarnings}</Text>
			</View>
			<View
				style={{
					backgroundColor: '#fff',
					paddingVertical: 10,
					borderRadius: 12,
				}}
			>
				<View style={styles.progressWrap}>
					<View style={styles.markersPercentRow}>
						{PROGRESS_MARKERS.map(m => (
							<Text key={m.percent} style={styles.markerPercent}>
								{m.percent}
							</Text>
						))}
					</View>
					<View style={styles.progressBarContainer}>
						<View style={styles.progressBar} />
						<View style={styles.markersDotsRow}>
							{PROGRESS_MARKERS.map(m => (
								<View key={m.percent} style={styles.markerDot} />
							))}
						</View>
					</View>
					<View style={styles.markersValueRow}>
						{PROGRESS_MARKERS.map(m => (
							<View key={m.percent} style={styles.markerValueCell}>
								<CoinIcon size='10' />
								<Text style={styles.markerValue}>{m.value}</Text>
							</View>
						))}
					</View>
				</View>
				<View style={styles.giftRow}>
					<Text style={styles.giftLabel}>Gift income in the past 7 days: </Text>
					<CoinIcon size='10' />
					<Text style={styles.giftValue}>{giftIncome}</Text>
				</View>
				<Text style={styles.giftSubtext}>Has reached the highest ratio</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: AGENT_DASHBOARD.screenPadding,
		marginBottom: AGENT_DASHBOARD.sectionGap,
		paddingVertical: AGENT_DASHBOARD.cardPadding,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
	},
	topSection: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		backgroundColor: '#fff',
		marginBottom: 12,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		overflow: 'hidden',
	},
	earnedToday: {
		marginLeft: 10,
		marginTop: 10,
		flex: 1,
	},
	divider: {
		width: 1,
		height: 30,
		alignSelf: 'center',
		backgroundColor: '#000',
		marginRight: 32,
	},
	pointsSection: {
		flex: 1,
		marginRight: 10,
		marginTop: 10,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		marginBottom: 4,
		marginRight: 3,
	},
	valueRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
	},
	value: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
	pointsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 8,
	},
	withdrawButton: {
		height: 20,
		paddingHorizontal: AGENT_DASHBOARD.withdrawButtonPaddingHorizontal,
		borderTopLeftRadius: 14,
		borderTopRightRadius: AGENT_DASHBOARD.withdrawButtonBorderRadius,
		borderBottomRightRadius: AGENT_DASHBOARD.withdrawButtonBorderRadius,
		backgroundColor: AGENT_DASHBOARD.withdrawButtonBackground,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start',
	},
	withdrawText: {
		fontSize: AGENT_DASHBOARD.withdrawButtonFontSize,
		fontWeight: AGENT_DASHBOARD.withdrawButtonFontWeight,
		color: AGENT_DASHBOARD.withdrawButtonTextColor,
	},
	accumulatedRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginBottom: 12,
		backgroundColor: '#C4DFF7',
	},
	accumulatedValue: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	progressWrap: {
		paddingHorizontal: AGENT_DASHBOARD.cardPadding,
		marginBottom: 12,
	},
	markersPercentRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 6,
		paddingHorizontal: 0,
	},
	progressBarContainer: {
		height: 24,
		position: 'relative',
		justifyContent: 'center',
		marginBottom: 6,
	},
	progressBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 9,
		height: AGENT_DASHBOARD.progressBarHeight,
		backgroundColor: AGENT_DASHBOARD.progressBarBg,
		borderRadius: 5,
	},
	markersDotsRow: {
		position: 'absolute',
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 0,
	},
	markerDot: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: AGENT_DASHBOARD.progressMarkerBg,
	},
	markerPercent: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	markersValueRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	markerValueCell: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	markerValue: {
		fontSize: 10,
		color: '#000',
		fontWeight: fontWeights.medium,
	},
	giftRow: {
		paddingHorizontal: AGENT_DASHBOARD.cardPadding,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginBottom: 4,
	},
	giftLabel: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: AGENT_DASHBOARD.labelColor,
	},
	giftValue: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	giftSubtext: {
		paddingHorizontal: AGENT_DASHBOARD.cardPadding,
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: AGENT_DASHBOARD.labelColor,
	},
})
