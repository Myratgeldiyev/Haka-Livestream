import { fontSizes, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DESCRIPTION =
	'Stat according to the Monthly EXP points of family members'

export function FamilyDescriptionBar() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{DESCRIPTION}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E5E7EB',
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.screen.horizontal,
		marginHorizontal: spacing.screen.horizontal,
		marginBottom: spacing.md,
		borderRadius: 8,
	},
	text: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		textAlign: 'center',
	},
})
