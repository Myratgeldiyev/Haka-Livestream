import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const HELPER_TEXT = 'Please confirm the receiver nickname and ID.'

interface TransferReceiverSectionProps {
	value: string
	onChangeText: (text: string) => void
}

export function TransferReceiverSection({
	value,
	onChangeText,
}: TransferReceiverSectionProps) {
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
				<Text style={{ color: 'red' }}>*</Text>

				<Text style={styles.label}>Receiver</Text>
			</View>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder='ID'
				placeholderTextColor='#9CA3AF'
				keyboardType='default'
			/>
			<View style={styles.underline} />
			<Text style={styles.helper}>{HELPER_TEXT}</Text>
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
	},
	input: {
		fontSize: 16,
		color: '#111111',
		paddingVertical: 8,
		paddingHorizontal: 0,
	},
	underline: {
		height: 1,
		backgroundColor: '#D1D5DB',
		marginBottom: 6,
	},
	helper: {
		fontSize: 13,
		color: '#9CA3AF',
	},
})
