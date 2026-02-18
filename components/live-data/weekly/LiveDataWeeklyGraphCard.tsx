import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from '../constants'
import type { WeeklyChartPoint } from './LiveDataWeeklyLineChart'
import { LiveDataWeeklyLineChart } from './LiveDataWeeklyLineChart'

interface LiveDataWeeklyGraphCardProps {
	weekLabel?: string
	userId?: string
	chartData?: WeeklyChartPoint[]
	onWeekPress?: () => void
}

export function LiveDataWeeklyGraphCard({
	weekLabel = 'Current Week',
	userId = '000000',
	chartData,
	onWeekPress,
}: LiveDataWeeklyGraphCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Pressable
					onPress={onWeekPress}
					style={styles.weekSelector}
					accessibilityLabel='Select week'
					accessibilityRole='button'
				>
					<Text style={styles.weekText} numberOfLines={1}>
						{weekLabel}
					</Text>
					<Ionicons
						name='chevron-down'
						size={16}
						color={LIVE_DATA.valueColor}
					/>
				</Pressable>
				<Text style={styles.idText} numberOfLines={1}>
					ID: {userId}
				</Text>
			</View>
			<LiveDataWeeklyLineChart data={chartData} />
			<View style={styles.legend}>
				<View style={styles.legendItem}>
					<View
						style={[
							styles.legendDot,
							{ backgroundColor: LIVE_DATA.chartPointsColor },
						]}
					/>
					<Text style={styles.legendText}>Points</Text>
				</View>
				<View style={styles.legendItem}>
					<View
						style={[
							styles.legendDot,
							{ backgroundColor: LIVE_DATA.chartDurationColor },
						]}
					/>
					<Text style={styles.legendText}>
						Live broadcast duration (minutes)
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
		shadowColor: LIVE_DATA.weeklyCardShadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 6,
		elevation: 3,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
	},
	weekSelector: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		flex: 1,
		minWidth: 0,
	},
	weekText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: LIVE_DATA.valueColor,
	},
	idText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
		marginLeft: 8,
	},
	legend: {
		alignItems: 'flex-start',
		alignSelf: 'center',
		gap: 16,
		marginTop: 12,
		paddingTop: 12,
		flexWrap: 'wrap',
	},
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#FFEBEB',
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	legendDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
	},
	legendText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
	},
})
