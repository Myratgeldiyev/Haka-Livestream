import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

interface AddHostFilterBarProps {
	periodLabel?: string
	onPeriodPress?: () => void
	onDatePress?: () => void
	onTypePress?: () => void
}

export function AddHostFilterBar({
	periodLabel = 'Last 30 days',
	onPeriodPress,
	onDatePress,
	onTypePress,
}: AddHostFilterBarProps) {
	return (
		<View style={styles.row}>
			<Pressable
				style={[styles.filterChip]}
				onPress={onPeriodPress}
				accessibilityRole='button'
				accessibilityLabel={`Period: ${periodLabel}`}
			>
				<Text style={styles.periodText} numberOfLines={1}>
					{periodLabel}
				</Text>
			</Pressable>
			<Pressable
				style={[
					styles.filterChip,
					{ borderLeftWidth: 1, borderLeftColor: '#d9d9d9' },
				]}
				onPress={onDatePress}
				accessibilityRole='button'
				accessibilityLabel='Select date'
			>
				<Ionicons
					name='calendar-outline'
					size={16}
					color={AGENT_DASHBOARD.labelColor}
				/>
				<Text style={styles.greyText}>Select date</Text>
			</Pressable>
			<Pressable
				style={styles.filterChip}
				onPress={onTypePress}
				accessibilityRole='button'
				accessibilityLabel='Filter by type'
			>
				<Text style={styles.typeText}>All Type</Text>
				<Ionicons
					name='chevron-down'
					size={16}
					color={AGENT_DASHBOARD.valueColor}
				/>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingBottom: 10,
	},
	filterChip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	periodText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.addHostFilterPurple,
	},
	greyText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.labelColor,
	},
	typeText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.valueColor,
	},
})
