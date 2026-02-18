import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WithdrawableAmountRow } from './WithdrawableAmountRow'
import { WithdrawAmountInput } from './WithdrawAmountInput'
import { WithdrawNowButton } from './WithdrawNowButton'

interface WithdrawFormViewProps {
	withdrawableAmount: string
	amount: string
	onAmountChange: (text: string) => void
	onWithdrawPress: () => void
	errorMessage?: string | null
}

export function WithdrawFormView({
	withdrawableAmount,
	amount,
	onAmountChange,
	onWithdrawPress,
	errorMessage,
}: WithdrawFormViewProps) {
	return (
		<View style={styles.container}>
			<WithdrawableAmountRow amount={withdrawableAmount} />
			<WithdrawAmountInput value={amount} onChangeText={onAmountChange} />
			{errorMessage ? (
				<Text style={styles.errorText}>{errorMessage}</Text>
			) : null}
			<View style={styles.buttonCenter} pointerEvents='box-none'>
				<WithdrawNowButton onPress={onWithdrawPress} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 8,
	},
	errorText: {
		color: '#DC2626',
		fontSize: 14,
		marginTop: 6,
		marginHorizontal: 4,
	},
	buttonCenter: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
