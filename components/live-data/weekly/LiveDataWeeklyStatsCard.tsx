import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from '../constants'

interface StatCellProps {
	value: string
	label: string
}

function StatCell({ value, label }: StatCellProps) {
	return (
		<View style={styles.cell}>
			<Text style={styles.value} numberOfLines={1}>
				{value}
			</Text>
			<Text style={styles.label} numberOfLines={2}>
				{label}
			</Text>
		</View>
	)
}

export interface LiveDataWeeklyStats {
	newFans: string
	newFansClub: string
	giftingThisWeek: string
	unfollowersThisWeek: string
}

interface LiveDataWeeklyStatsCardProps {
	stats?: LiveDataWeeklyStats
}

const DEFAULT_STATS: LiveDataWeeklyStats = {
	newFans: '0',
	newFansClub: '0',
	giftingThisWeek: '0',
	unfollowersThisWeek: '0',
}

export function LiveDataWeeklyStatsCard({
	stats = DEFAULT_STATS,
}: LiveDataWeeklyStatsCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.row}>
				<StatCell value={stats.newFans} label="The number of new fans" />
				<View style={styles.vDivider} />
				<StatCell
					value={stats.newFansClub}
					label="The number of new fans club"
				/>
			</View>
			<View style={styles.hDivider} />
			<View style={styles.row}>
				<StatCell value={stats.giftingThisWeek} label="Gifting this week" />
				<View style={styles.vDivider} />
				<StatCell
					value={stats.unfollowersThisWeek}
					label="Number of Un-followers this week"
				/>
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
		shadowColor: LIVE_DATA.weeklyCardShadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 6,
		elevation: 3,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	cell: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		minWidth: 0,
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
		textAlign: 'center',
	},
	vDivider: {
		width: 1,
		backgroundColor: LIVE_DATA.weeklyDividerColor,
	},
	hDivider: {
		height: 1,
		backgroundColor: LIVE_DATA.weeklyDividerColor,
	},
})
