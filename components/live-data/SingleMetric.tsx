import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from './constants'

interface SingleMetricProps {
	value: string
	label: string
}

export function SingleMetric({ value, label }: SingleMetricProps) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.value} numberOfLines={1}>
				{value}
			</Text>
			<Text style={styles.label} numberOfLines={1}>
				{label}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		marginTop: 20,
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
