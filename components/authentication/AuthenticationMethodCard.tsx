import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { AUTHENTICATION } from './constants'

interface AuthenticationMethodCardProps {
	icon: React.ReactNode
	title: string
	description: string
	buttonLabel: string
	onPress?: () => void
}

export function AuthenticationMethodCard({
	icon,
	title,
	description,
	buttonLabel,
	onPress,
}: AuthenticationMethodCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.iconBox}>{icon}</View>
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.description} numberOfLines={2}>
					{description}
				</Text>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && styles.buttonPressed,
				]}
				onPress={onPress}
			>
				<Text style={styles.buttonLabel}>{buttonLabel}</Text>
			</Pressable>
		</View>
	)
}

const iconBoxSize =
	typeof AUTHENTICATION.iconBoxSize === 'number'
		? AUTHENTICATION.iconBoxSize
		: spacing.icon.xlarge

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: AUTHENTICATION.cardBg,
		borderRadius: AUTHENTICATION.cardRadius,
		padding: spacing.card,
		marginHorizontal: spacing.screen.horizontal,
		marginBottom: spacing.md,
		...Platform.select({
			ios: {
				shadowColor: AUTHENTICATION.cardShadow,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.08,
				shadowRadius: 8,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	iconBox: {
		width: iconBoxSize,
		height: iconBoxSize,
		borderRadius: AUTHENTICATION.iconBoxRadius,
		backgroundColor: AUTHENTICATION.primary,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: spacing.md,
	},
	content: {
		flex: 1,
		minWidth: 0,
	},
	title: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.lg,
		color: AUTHENTICATION.textPrimary,
		marginBottom: spacing.xs,
	},
	description: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.sm,
		color: AUTHENTICATION.textSecondary,
	},
	button: {
		backgroundColor: AUTHENTICATION.primary,
		paddingVertical: AUTHENTICATION.buttonPaddingV,
		paddingHorizontal: AUTHENTICATION.buttonPaddingH,
		borderRadius: AUTHENTICATION.buttonRadius,
		alignSelf: 'center',
	},
	buttonPressed: {
		opacity: 0.85,
	},
	buttonLabel: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		lineHeight: lineHeights.sm,
		color: AUTHENTICATION.primaryButtonText,
	},
})
