import CoinIcon from '@/components/ui/icons/withdrawal/CoinIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from '../constants'

interface LiveDataMonthlyThreeMonthCardProps {
	amount?: string
}

export function LiveDataMonthlyThreeMonthCard({
	amount = '0',
}: LiveDataMonthlyThreeMonthCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.label} numberOfLines={2}>
				Total earning in the past 3 month (excluding platform rewards):
			</Text>
			<View style={styles.rightRow}>
				<Text style={styles.value} numberOfLines={1}>
					{amount}
				</Text>
				<CoinIcon size="16" />
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
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: LIVE_DATA.weeklyCardShadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 6,
		elevation: 3,
	},
	label: {
		flex: 1,
		minWidth: 0,
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
		marginRight: 12,
	},
	rightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	value: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.valueColor,
	},
})
