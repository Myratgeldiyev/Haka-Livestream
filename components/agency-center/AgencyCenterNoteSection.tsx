import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENCY_CENTER } from './constants'

export function AgencyCenterNoteSection() {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{AGENCY_CENTER.noteTitle}</Text>
			{AGENCY_CENTER.noteItems.map((item, index) => (
				<View key={index} style={styles.itemRow}>
					<Text style={styles.itemNumber}>{index + 1}.</Text>
					<Text style={styles.itemText}>{item}</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: AGENCY_CENTER.screenPadding,
		paddingBottom: spacing.xxl,
	},
	heading: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
		marginBottom: spacing.md,
		textAlign: 'center',
	},
	itemRow: {
		flexDirection: 'row',
		marginBottom: spacing.sm,
		alignItems: 'flex-start',
	},
	itemNumber: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		marginRight: spacing.xs,
		fontWeight: fontWeights.semibold,
	},
	itemText: {
		flex: 1,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
	},
})
