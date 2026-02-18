import { Card } from '@/components/ui/Card'
import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface WalletCardProps {
	label?: number
	icon: React.ReactNode
	action?: string
	bg: string
	color: string
	route?: Href
}

export function WalletCard({
	label,
	icon,
	action,
	bg,
	color,
	route,
}: WalletCardProps) {
	const router = useRouter()

	const handlePress = () => {
		if (!route) return
		router.push(route)
	}

	return (
		<Card onPress={handlePress} style={styles.container}>
			<View style={styles.iconContainer}>
				{icon}
				{label !== undefined && <Text style={styles.label}>{label}</Text>}
			</View>

			<View style={styles.textContainer}>
				{action && (
					<Text style={[styles.action, { backgroundColor: bg, color }]}>
						{action}
					</Text>
				)}
			</View>
		</Card>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.md,
		minHeight: spacing.xxxl * 3,
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.xs,
	},
	textContainer: {
		alignItems: 'center',
	},
	label: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.semibold,
		color: profileColors.text.primary,
	},
	action: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.md,
		borderRadius: spacing.md,
		fontWeight: fontWeights.medium,
	},
})
