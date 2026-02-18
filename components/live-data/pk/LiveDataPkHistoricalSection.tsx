import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from '../constants'

interface LiveDataPkHistoricalSectionProps {
	emptyMessage?: string
}

export function LiveDataPkHistoricalSection({
	emptyMessage = 'No record invite friends to PK',
}: LiveDataPkHistoricalSectionProps) {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Historical record</Text>
			<Text style={styles.message}>{emptyMessage}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginHorizontal: LIVE_DATA.screenPadding,
		marginTop: 24,
		marginBottom: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.valueColor,
		marginBottom: 8,
	},
	message: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.inactiveColor,
	},
})
