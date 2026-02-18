import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ACTIVITY_CENTRE } from './constants'

interface ActivityCentreStatusBadgeProps {
	label: string
}

export function ActivityCentreStatusBadge({
	label,
}: ActivityCentreStatusBadgeProps) {
	return (
		<View style={styles.badge}>
			<Text style={styles.text}>{label}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	badge: {
		backgroundColor: ACTIVITY_CENTRE.statusBadgeBg,
		paddingVertical: ACTIVITY_CENTRE.statusBadgePaddingV,
		paddingHorizontal: ACTIVITY_CENTRE.statusBadgePaddingH,
		borderRadius: 16,
	},
	text: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
		color: ACTIVITY_CENTRE.statusBadgeText,
	},
})
