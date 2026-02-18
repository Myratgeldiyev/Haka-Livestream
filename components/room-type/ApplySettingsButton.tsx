import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface ApplySettingsButtonProps {
	onPress?: () => void
}

export function ApplySettingsButton({ onPress }: ApplySettingsButtonProps) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
			onPress={onPress}
		>
			<Text style={styles.text}>Apply Settings</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#7C4DFF',
		borderRadius: 12,
		marginHorizontal: 42,
		paddingVertical: 16,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	text: {
		fontSize: 18,
		fontWeight: '600',
		color: '#FFFFFF',
	},
})
