import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

export interface DataMetricItem {
	label: string
	value: string
}

const COLUMNS = 3

interface DataMetricGridProps {
	items: DataMetricItem[]
	columns?: number
}

export function DataMetricGrid({
	items,
	columns = COLUMNS,
}: DataMetricGridProps) {
	const rows: DataMetricItem[][] = []
	for (let i = 0; i < items.length; i += columns) {
		rows.push(items.slice(i, i + columns))
	}
	return (
		<View style={styles.grid}>
			{rows.map((row, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{row.map((item, cellIndex) => (
						<View
							key={`${item.label}-${rowIndex}-${cellIndex}`}
							style={styles.cell}
						>
							<Text
								style={styles.label}
								numberOfLines={2}
							>
								{item.label}
							</Text>
							<Text
								style={styles.value}
								numberOfLines={1}
							>
								{item.value}
							</Text>
						</View>
					))}
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	grid: {
		gap: AGENT_DASHBOARD.dataGridGap,
	},
	row: {
		flexDirection: 'row',
		gap: AGENT_DASHBOARD.dataGridGap,
	},
	cell: {
		flex: 1,
		gap: 4,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
	},
	value: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
