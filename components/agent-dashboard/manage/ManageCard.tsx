import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MANAGE } from './constants'

interface ManageCardProps {
	title: string
	children: ReactNode
	showAccent?: boolean
	/** When true, use a full light orange border instead of top-left accent only. */
	accentFullBorder?: boolean
}

export function ManageCard({
	title,
	children,
	showAccent = false,
	accentFullBorder = false,
}: ManageCardProps) {
	return (
		<View
			style={[
				styles.card,
				showAccent && !accentFullBorder && styles.cardAccent,
				showAccent && accentFullBorder && styles.cardAccentFullBorder,
			]}
		>
			<Text style={styles.title}>{title}</Text>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFFFFF',
		borderRadius: MANAGE.cardBorderRadius,
		padding: MANAGE.cardPadding,
		shadowColor: MANAGE.shadowColor,
		shadowOffset: MANAGE.shadowOffset,
		shadowOpacity: MANAGE.shadowOpacity,
		shadowRadius: MANAGE.shadowRadius,
		elevation: MANAGE.elevation,
	},
	cardAccent: {
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderTopLeftRadius: MANAGE.cardBorderRadius,
		borderColor: MANAGE.accentColor,
	},
	cardAccentFullBorder: {
		borderWidth: 1,
		borderColor: MANAGE.accentBorderColor,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: MANAGE.labelColor,
		marginBottom: 16,
	},
})
