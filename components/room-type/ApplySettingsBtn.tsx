import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface ApplySettingsButtonProps {
	onPress?: () => void
}

export function ApplySettingsBtn({ onPress }: ApplySettingsButtonProps) {
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
		position: 'absolute',
		bottom: 0,
		width: '70%',
		backgroundColor: '#7C4DFF',
		borderRadius: 20,
		paddingVertical: 16,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
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
