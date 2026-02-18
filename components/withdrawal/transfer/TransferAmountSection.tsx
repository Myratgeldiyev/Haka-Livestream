import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface TransferAmountSectionProps {
	value: string
	onChangeText: (text: string) => void
}

export function TransferAmountSection({
	value,
	onChangeText,
}: TransferAmountSectionProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>Transfer</Text>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder=''
				placeholderTextColor='#9CA3AF'
				keyboardType='decimal-pad'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: '700',
		color: '#111111',
		marginBottom: 8,
	},
	input: {
		fontSize: 16,
		color: '#111111',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		paddingVertical: 14,
		paddingHorizontal: 14,
		minHeight: 48,
	},
})
