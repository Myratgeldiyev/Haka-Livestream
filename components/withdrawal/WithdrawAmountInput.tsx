import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface WithdrawAmountInputProps extends Omit<TextInputProps, 'style'> {
	value: string
	onChangeText: (text: string) => void
}

const PLACEHOLDER = 'Please enter'

export function WithdrawAmountInput({
	value,
	onChangeText,
	placeholder = PLACEHOLDER,
	...rest
}: WithdrawAmountInputProps) {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.prefix}>$</Text>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor='#6B7280'
				keyboardType='decimal-pad'
				{...rest}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		minHeight: 52,
		paddingHorizontal: 14,
		marginBottom: 24,
		// subtle shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.04,
		shadowRadius: 2,
		elevation: 2,
	},
	prefix: {
		fontSize: 16,
		color: '#6B7280',
		marginRight: 6,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: '#111111',
		paddingVertical: 14,
	},
})
