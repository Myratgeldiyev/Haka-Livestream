import { CoinIcon } from '@/components/ui/icons'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from '../constants'

interface LiveDataWeeklySummaryCardProps {
	totalDuration?: string
	totalEarnings?: string
}

export function LiveDataWeeklySummaryCard({
	totalDuration = '00:00',
	totalEarnings = '0',
}: LiveDataWeeklySummaryCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.half}>
				<Text style={styles.value} numberOfLines={1}>
					{totalDuration}
				</Text>
				<Text style={styles.label} numberOfLines={1}>
					Total Duration (h/min)
				</Text>
			</View>
			<View style={styles.divider} />
			<View style={styles.half}>
				<View style={styles.earningsRow}>
					<Text style={styles.value} numberOfLines={1}>
						{totalEarnings}
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
					<CoinIcon size='16' />
					<Text style={styles.label} numberOfLines={1}>
						Total Earnings
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: LIVE_DATA.weeklyCardBg,
		borderRadius: LIVE_DATA.weeklyCardBorderRadius,
		padding: LIVE_DATA.cardPadding,
		marginHorizontal: LIVE_DATA.screenPadding,
		marginTop: 12,
		flexDirection: 'row',
		alignItems: 'center',
		shadowColor: LIVE_DATA.weeklyCardShadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 6,
		elevation: 3,
	},
	half: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 0,
	},
	divider: {
		width: 1,
		alignSelf: 'stretch',
		backgroundColor: LIVE_DATA.weeklyDividerColor,
		marginVertical: 4,
	},
	value: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.valueColor,
	},
	label: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
		marginTop: 4,
	},
	earningsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
	},
	earningsIcon: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: LIVE_DATA.earningsIconOuter,
		alignItems: 'center',
		justifyContent: 'center',
	},
	earningsIconInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: LIVE_DATA.earningsIconInner,
	},
})
