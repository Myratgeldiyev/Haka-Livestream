import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const BUTTON_BG = '#5F22D9'

interface WithdrawNowButtonProps {
	onPress: () => void
	disabled?: boolean
}

export function WithdrawNowButton({
	onPress,
	disabled = false,
}: WithdrawNowButtonProps) {
	return (
		<Pressable
			style={[styles.button, disabled && styles.buttonDisabled]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.text}>Withdraw now</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: BUTTON_BG,
		width: '80%',
		borderRadius: 30,
		minHeight: 52,
		paddingHorizontal: 48,
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
