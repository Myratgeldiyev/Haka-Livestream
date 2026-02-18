import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENCY_CENTER } from './constants'

interface AgencyCenterMethodLabelBadgeProps {
	label: string
}

export function AgencyCenterMethodLabelBadge({
	label,
}: AgencyCenterMethodLabelBadgeProps) {
	return (
		<View style={styles.badge}>
			<Text style={styles.text}>{label}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	badge: {
		alignSelf: 'stretch',
		backgroundColor: AGENCY_CENTER.methodBadgeBg,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: spacing.md,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: AGENCY_CENTER.methodBadgeText,
		textAlign: 'center',
	},
})
