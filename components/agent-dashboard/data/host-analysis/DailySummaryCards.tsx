import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'

export interface DailySummaryItem {
	id: string
	label: string
	value: number
}

const DEFAULT_ITEMS: DailySummaryItem[] = [
	{ id: 'today', label: 'Today', value: 5 },
	{ id: 'yesterday', label: 'Yesterday', value: 5 },
	{ id: 'same_week', label: 'Same day last week', value: 5 },
]

interface DailySummaryCardsProps {
	items?: DailySummaryItem[]
	selectedId?: string
	onSelect?: (id: string) => void
}

export function DailySummaryCards({
	items = DEFAULT_ITEMS,
	selectedId = 'today',
	onSelect,
}: DailySummaryCardsProps) {
	return (
		<View style={styles.row}>
			{items.map(item => {
				const isSelected = selectedId === item.id
				return (
					<Pressable
						key={item.id}
						style={[styles.card, isSelected && styles.cardSelected]}
						onPress={() => onSelect?.(item.id)}
						accessibilityRole='button'
						accessibilityState={{ selected: isSelected }}
					>
						<Text style={styles.label} numberOfLines={1}>
							{item.label}
						</Text>
						<Text style={styles.value}>{item.value}</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		gap: 10,
	},
	card: {
		flex: 1,
		borderRadius: 8,
		backgroundColor: AGENT_DASHBOARD.hostAnalysisDailyCardBg,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: '#E5E5E5',
		gap: 4,
		minWidth: 0,
	},
	cardSelected: {
		backgroundColor: AGENT_DASHBOARD.hostAnalysisDailyCardSelectedBg,
	},
	label: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.labelColor,
	},
	value: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
