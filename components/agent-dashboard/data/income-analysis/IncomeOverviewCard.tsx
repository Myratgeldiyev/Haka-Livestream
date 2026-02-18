import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'

interface IncomeOverviewCardProps {
	label: string
	value: string
	selected?: boolean
	onPress?: () => void
}

export function IncomeOverviewCard({
	label,
	value,
	selected = false,
	onPress,
}: IncomeOverviewCardProps) {
	const content = (
		<View style={styles.content}>
			<Text style={styles.label} numberOfLines={1}>
				{label}
			</Text>
			<Text style={styles.value} numberOfLines={1}>
				{value}
			</Text>
		</View>
	)

	if (onPress) {
		return (
			<Pressable
				style={[styles.card, selected && styles.cardSelected]}
				onPress={onPress}
				accessibilityRole="button"
				accessibilityState={{ selected }}
			>
				{content}
			</Pressable>
		)
	}

	return (
		<View style={[styles.card, selected && styles.cardSelected]}>
			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		backgroundColor: AGENT_DASHBOARD.cardBg,
		padding: AGENT_DASHBOARD.cardPadding,
		minWidth: 0,
	},
	cardSelected: {
		backgroundColor: AGENT_DASHBOARD.incomeOverviewCardSelectedBg,
	},
	content: {
		gap: 4,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
	},
	value: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
