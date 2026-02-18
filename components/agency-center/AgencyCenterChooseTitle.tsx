import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENCY_CENTER } from './constants'

export function AgencyCenterChooseTitle() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{AGENCY_CENTER.chooseTitle}</Text>
			<Text style={styles.subtitle}>{AGENCY_CENTER.chooseSubtitle}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.screen.horizontal,
		marginBottom: spacing.lg,
		alignItems: 'center',
	},
	title: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	subtitle: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: AGENCY_CENTER.subtitleText,
		fontStyle: 'italic',
		marginTop: spacing.xs,
	},
})
