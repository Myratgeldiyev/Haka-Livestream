import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import HostCheckIcon from '../ui/icons/host-centre/HostCheckIcon'
import HostInfoIcon from '../ui/icons/host-centre/HostInfoIcon'
import HostMicIcon from '../ui/icons/host-centre/HostMicIcon'
import { HOST_CENTRE } from './constants'

interface HostCentreHostOnMicCardProps {
	minutesDone?: number
	minutesTotal?: number
	points?: string
	pointsTarget?: string
	coinBalance?: string
	giftIncome?: string
	hourlyIncome?: string
	upgradeRates?: string[]
	progressPercent?: number
	stillNeedRate?: string
	onRulePress?: () => void
}

export function HostCentreHostOnMicCard({
	minutesDone = 23,
	minutesTotal = 120,
	points = '3.2k',
	pointsTarget = '0',
	coinBalance = '1000',
	giftIncome = '5,000',
	hourlyIncome = '500/h',
	upgradeRates = ['600/h', '600/h', '600/h'],
	progressPercent = 35,
	stillNeedRate = '600/h',
	onRulePress,
}: HostCentreHostOnMicCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.titleRow}>
				<HostMicIcon />
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.title}>Host on Mic for 2 Hours</Text>
						<HostInfoIcon />
					</View>
					<View style={styles.progressCol}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<HostCheckIcon />
							<Text style={styles.checkText}>
								{minutesDone}/{minutesTotal} mins
							</Text>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<HostCheckIcon />
								<Text style={styles.checkText}>
									{points}/{pointsTarget} points
								</Text>
							</View>
							<View style={styles.lockedButton}>
								<Text style={styles.lockedText}>Locked</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginLeft: 4,
							}}
						>
							<CoinIcon size='16' />
							<Text style={styles.coinValue}>{coinBalance}</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.incomeSection}>
				<View style={{ flex: 1 }}>
					<View style={styles.incomeRow}>
						<Text style={styles.bullet}>■</Text>
						<Text style={styles.incomeLabel}>Gift Income</Text>
						<View style={styles.badge}>
							<Text style={styles.badgeText}>Last 7 days</Text>
						</View>
					</View>
					<Text style={styles.coinRow}>
						<CoinIcon size='12' />
						<Text style={styles.coinValue}>{giftIncome}</Text>
					</Text>
				</View>
				<View style={{ flex: 1 }}>
					<View style={styles.incomeRow}>
						<Text style={styles.bullet}>■</Text>
						<Text style={styles.incomeLabel}>Hourly Income</Text>
					</View>
					<Text style={styles.coinRow}>
						<CoinIcon size='12' />
						<Text style={styles.coinValue}>{hourlyIncome}</Text>
					</Text>
				</View>
			</View>

			<View style={styles.upgradeSection}>
				<Text style={styles.upgradeLabel}>Upgrade to</Text>
				<View style={styles.upgradeButtons}>
					{upgradeRates.map((rate, i) => (
						<View key={i} style={styles.upgradeBtn}>
							<CoinIcon size='12' />
							<Text style={styles.upgradeBtnText}>{rate}</Text>
						</View>
					))}
				</View>
			</View>

			<View style={styles.progressBarWrap}>
				<View
					style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
				/>
			</View>

			<View style={styles.footer}>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
					<Text style={styles.stillNeed}>Still need</Text>
					<CoinIcon size='12' />
					<Text style={styles.coinPurple}>{stillNeedRate}</Text>
				</View>

				<Pressable onPress={onRulePress} style={styles.ruleRow}>
					<Text style={styles.ruleText}>Rule</Text>
					<Text style={styles.arrow}>›</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: HOST_CENTRE.screenPadding,
		marginBottom: spacing.md,
		padding: spacing.lg,
		backgroundColor: HOST_CENTRE.hostOnMicCardBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.hostOnMicCardBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.md,
		gap: 8,
	},
	micCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: HOST_CENTRE.micCircleBg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	micIcon: {
		fontSize: 22,
	},
	title: {
		flex: 1,
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: HOST_CENTRE.textDark,
	},
	helpCircle: {
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: '#9E9E9E',
		alignItems: 'center',
		justifyContent: 'center',
	},
	helpText: {
		fontSize: fontSizes.sm,
		color: '#fff',
		fontWeight: fontWeights.bold,
	},
	progressRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: spacing.md,
	},
	progressCol: {
		gap: 2,

		alignItems: 'flex-start',
	},
	checkText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: HOST_CENTRE.textDark,
	},
	coinRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginTop: 2,
	},
	coinIcon: {
		fontSize: fontSizes.sm,
		color: '#E67E22',
	},
	coinValue: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: HOST_CENTRE.textDark,
	},
	lockedButton: {
		backgroundColor: HOST_CENTRE.lockedButtonBg,
		paddingVertical: 6,
		paddingHorizontal: 18,
		borderRadius: HOST_CENTRE.buttonBorderRadius,
	},
	lockedText: {
		fontSize: fontSizes.sm,
		color: '#fff',
		fontWeight: fontWeights.bold,
	},
	incomeSection: {
		marginBottom: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
	},
	incomeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		marginBottom: 2,
	},
	bullet: {
		fontSize: 10,
		color: HOST_CENTRE.bulletPurple,
	},
	incomeLabel: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: HOST_CENTRE.textDark,
	},
	badge: {
		backgroundColor: '#E0E0E0',
		paddingVertical: 2,
		paddingHorizontal: 8,

		marginLeft: 4,
	},
	badgeText: {
		fontSize: fontSizes.xs,
		color: HOST_CENTRE.textDark,
	},
	upgradeSection: {
		marginBottom: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	upgradeLabel: {
		fontSize: fontSizes.md,
		color: HOST_CENTRE.textDark,
		marginBottom: 6,
	},
	upgradeButtons: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: 8,
	},
	upgradeBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: HOST_CENTRE.upgradeButtonBg,
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: HOST_CENTRE.buttonBorderRadius,
		gap: 4,
	},
	upgradeBtnText: {
		fontSize: fontSizes.sm,
		color: '#fff',
		fontWeight: fontWeights.medium,
	},
	progressBarWrap: {
		height: 8,
		backgroundColor: HOST_CENTRE.progressTrackBg,
		borderRadius: 4,
		overflow: 'hidden',
		marginBottom: spacing.sm,
	},
	progressBarFill: {
		height: '100%',
		backgroundColor: HOST_CENTRE.progressFillBg,
		borderRadius: 4,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	stillNeed: {
		fontSize: fontSizes.sm,
		color: HOST_CENTRE.textDark,
	},
	coinPurple: {
		color: HOST_CENTRE.textPurple,
		fontWeight: fontWeights.semibold,
	},
	ruleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	ruleText: {
		fontSize: fontSizes.sm,
		color: HOST_CENTRE.textPurple,
		fontWeight: fontWeights.medium,
	},
	arrow: {
		fontSize: 16,
		color: HOST_CENTRE.textDark,
	},
})
