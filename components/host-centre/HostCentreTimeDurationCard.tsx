import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HOST_CENTRE } from './constants'

interface HostCentreTimeDurationCardProps {
	hours?: number
	minutes?: number
}

export function HostCentreTimeDurationCard({
	hours = 5,
	minutes = 30,
}: HostCentreTimeDurationCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>Time duration</Text>
			<Text style={styles.value}>
				{hours} / h {minutes} / m
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: HOST_CENTRE.screenPadding,
		marginBottom: spacing.md,
		padding: spacing.md,
		backgroundColor: HOST_CENTRE.cardLightPurpleBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.cardRedBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: HOST_CENTRE.textDark,
	},
	value: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: HOST_CENTRE.textDark,
	},
})
