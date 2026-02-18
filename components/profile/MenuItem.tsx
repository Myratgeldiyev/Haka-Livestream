import { Card } from '@/components/ui/Card'
import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface MenuItemProps {
	label: string
	icon: React.ReactNode
	onPress?: () => void
}

export function MenuItem({ label, icon, onPress }: MenuItemProps) {
	return (
		<Card onPress={onPress} style={styles.container}>
			<View style={styles.iconContainer}>{icon}</View>
			<Text style={styles.label}>{label}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.sm,
		minHeight: spacing.xxxl * 2.8,
		padding: spacing.md,
	},
	iconContainer: {
		width: spacing.icon.medium,
		height: spacing.icon.medium,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: profileColors.text.primary,
		textAlign: 'center',
	},
})
