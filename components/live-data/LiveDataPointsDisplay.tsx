import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from './constants'

interface LiveDataPointsDisplayProps {
	points: string
}

export function LiveDataPointsDisplay({ points }: LiveDataPointsDisplayProps) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.value} numberOfLines={1}>
				{points}
			</Text>
			<Text style={styles.label}>Won Points</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		marginVertical: 8,
	},
	value: {
		fontSize: 42,
		lineHeight: lineHeights.display,
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.valueColor,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
		marginTop: 10,
	},
})
