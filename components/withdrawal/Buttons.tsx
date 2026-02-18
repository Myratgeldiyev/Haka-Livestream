import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

export type ButtonType = 'primary' | 'outline' | 'disabled'

interface ButtonProps {
	title: string
	type?: ButtonType
	onPress?: () => void
}

export function Button({ title, type = 'primary', onPress }: ButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			disabled={type === 'disabled'}
			style={[
				styles.base,
				type === 'primary' && styles.primary,
				type === 'outline' && styles.outline,
				type === 'disabled' && styles.disabled,
			]}
		>
			<Text
				style={[
					styles.text,
					type === 'outline' && styles.outlineText,
					type === 'disabled' && styles.disabledText,
				]}
			>
				{title}
			</Text>
		</Pressable>
	)
}
const styles = StyleSheet.create({
	base: {
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 12,
	},
	primary: {
		backgroundColor: '#6D28D9',
	},
	outline: {
		borderWidth: 1,
		borderColor: '#6D28D9',
		backgroundColor: '#FFF',
	},
	disabled: {
		backgroundColor: '#E5E7EB',
	},
	text: {
		color: '#FFF',
		fontWeight: '600',
		fontSize: 16,
	},
	outlineText: {
		color: '#6D28D9',
	},
	disabledText: {
		color: '#9CA3AF',
	},
})
