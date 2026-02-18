import IndiaFlagRounded from '@/components/ui/flags/indiaFlagRounded'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { AUTHENTICATION, BIND_PHONE } from '../constants'

interface BindPhoneCardProps {
	value: string
	onChangeText: (value: string) => void
	onNext: () => void
}

export function BindPhoneCard({
	value,
	onChangeText,
	onNext,
}: BindPhoneCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{BIND_PHONE.label}</Text>
			<View style={styles.inputRow}>
				<View style={styles.flagWrap}>
					<IndiaFlagRounded size={24} />
				</View>
				<TextInput
					style={styles.input}
					placeholder={BIND_PHONE.placeholder}
					placeholderTextColor={BIND_PHONE.placeholderColor}
					value={value}
					onChangeText={onChangeText}
					keyboardType='phone-pad'
					returnKeyType='done'
				/>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					pressed && styles.buttonPressed,
				]}
				onPress={onNext}
			>
				<Text style={styles.buttonLabel}>{BIND_PHONE.nextButtonLabel}</Text>
			</Pressable>
		</View>
	)
}

const CARD_HEIGHT = 246

const styles = StyleSheet.create({
	card: {
		backgroundColor: AUTHENTICATION.cardBg,
		borderRadius: BIND_PHONE.cardRadius,
		height: CARD_HEIGHT,
		padding: spacing.xl,
		marginTop: 80,
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
		color: BIND_PHONE.labelColor,
		marginBottom: spacing.md,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: BIND_PHONE.inputBorderColor,
		borderRadius: 12,
		paddingHorizontal: spacing.md,
		marginBottom: spacing.xl,
		minHeight: spacing.input.minHeight,
	},
	flagWrap: {
		marginRight: spacing.sm,
	},
	input: {
		flex: 1,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: BIND_PHONE.labelColor,
		paddingVertical: spacing.input.paddingVertical - 4,
	},
	button: {
		backgroundColor: BIND_PHONE.buttonBg,
		borderRadius: BIND_PHONE.cardRadius,
		paddingVertical: spacing.button.vertical,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
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
