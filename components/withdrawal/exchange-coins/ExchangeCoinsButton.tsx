import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const BUTTON_BG = '#7C4DFF'

interface ExchangeCoinsButtonProps {
	onPress: () => void
	disabled?: boolean
}

export function ExchangeCoinsButton({
	onPress,
	disabled = false,
}: ExchangeCoinsButtonProps) {
	return (
		<Pressable
			style={[styles.button, disabled && styles.buttonDisabled]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.text}>Exchange Coins</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: BUTTON_BG,
		borderRadius: 24,
		minHeight: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	text: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
	},
})
