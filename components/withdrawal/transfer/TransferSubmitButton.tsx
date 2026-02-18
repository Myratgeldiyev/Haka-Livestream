import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const BUTTON_BG = '#6f42c1'

interface TransferSubmitButtonProps {
	onPress: () => void
	disabled?: boolean
}

export function TransferSubmitButton({
	onPress,
	disabled = false,
}: TransferSubmitButtonProps) {
	return (
		<Pressable
			style={[styles.button, disabled && styles.buttonDisabled]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.text}>Transfer</Text>
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
		textTransform: 'uppercase',
	},
})
