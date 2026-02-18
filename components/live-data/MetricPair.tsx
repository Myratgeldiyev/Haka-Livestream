import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from './constants'

interface MetricPairProps {
	leftValue: string
	leftLabel: string
	rightValue: string
	rightLabel: string
}

export function MetricPair({
	leftValue,
	leftLabel,
	rightValue,
	rightLabel,
}: MetricPairProps) {
	return (
		<View style={styles.row}>
			<View style={[styles.cell, styles.cellCenter]}>
				<Text style={styles.value} numberOfLines={1}>
					{leftValue}
				</Text>
				<Text style={styles.label} numberOfLines={1}>
					{leftLabel}
				</Text>
			</View>
			<View style={[styles.cell, styles.cellCenter]}>
				<Text style={styles.value} numberOfLines={1}>
					{rightValue}
				</Text>
				<Text style={styles.label} numberOfLines={1}>
					{rightLabel}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16,
	},
	cell: {
		flex: 1,
		minWidth: 0,
	},
	cellCenter: {
		alignItems: 'center',
	},
	value: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.valueColor,
	},
	label: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
		marginTop: 2,
	},
})
