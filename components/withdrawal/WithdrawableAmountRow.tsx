import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface WithdrawableAmountRowProps {
	amount: string
}

export function WithdrawableAmountRow({ amount }: WithdrawableAmountRowProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Withdrawable amount: <Text style={styles.amount}>${amount}</Text>
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	text: {
		fontSize: 16,
		color: '#111111',
	},
	amount: {
		fontWeight: '600',
		color: '#111111',
	},
})
