import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { AUTHENTICATION, BIND_EMAIL } from '../constants'

interface BindEmailCardProps {
	value: string
	onChangeText: (value: string) => void
	onNext: () => void
}

export function BindEmailCard({
	value,
	onChangeText,
	onNext,
}: BindEmailCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{BIND_EMAIL.label}</Text>
			<TextInput
				style={styles.input}
				placeholder={BIND_EMAIL.placeholder}
				placeholderTextColor={BIND_EMAIL.placeholderColor}
				value={value}
				onChangeText={onChangeText}
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
				returnKeyType="done"
			/>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && styles.buttonPressed,
				]}
				onPress={onNext}
			>
				<Text style={styles.buttonLabel}>{BIND_EMAIL.nextButtonLabel}</Text>
			</Pressable>
		</View>
	)
}

const CARD_HEIGHT = 246

const styles = StyleSheet.create({
	card: {
		backgroundColor: AUTHENTICATION.cardBg,
		borderRadius: BIND_EMAIL.cardRadius,
		height: CARD_HEIGHT,
		padding: spacing.xl,
		width: '100%',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.12,
				shadowRadius: 12,
			},
			android: {
				elevation: 6,
			},
		}),
	},
	label: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.lg,
		color: BIND_EMAIL.labelColor,
		marginBottom: spacing.md,
	},
	input: {
		borderWidth: 1,
		borderColor: BIND_EMAIL.inputBorderColor,
		borderRadius: 12,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.input.paddingVertical - 4,
		marginBottom: spacing.xl,
		minHeight: spacing.input.minHeight,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: BIND_EMAIL.labelColor,
	},
	button: {
		backgroundColor: BIND_EMAIL.buttonBg,
		borderRadius: BIND_EMAIL.cardRadius,
		paddingVertical: spacing.button.vertical,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonPressed: {
		opacity: 0.9,
	},
	buttonLabel: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.lg,
		color: AUTHENTICATION.primaryButtonText,
	},
})
