import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CoinIcon } from '../ui/icons'
import EyeIcon from '../ui/icons/withdrawal/EyeIcon'
import RightArrowWithIcon from '../ui/icons/withdrawal/RightArrowWithIcon'

export function BalanceCard() {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<View>
					<Text style={styles.title}>Withdrawal Amount</Text>
					<Text style={styles.amount}>$0.00</Text>
				</View>
				<EyeIcon />
			</View>

			<View style={styles.row}>
				<View>
					<Text style={styles.label}>Total Amount</Text>
					<Text style={styles.value}>$0.00</Text>
				</View>

				<View style={{ marginLeft: 30 }}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 5,
						}}
					>
						<Text style={styles.label}>Unconfirmed</Text>
						<RightArrowWithIcon />
					</View>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 5,
						}}
					>
						<CoinIcon />
						<Text style={styles.value}>0</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#3E1B8C',
		borderRadius: 14,
		paddingHorizontal: 20,
		paddingVertical: 30,
		marginVertical: 16,
	},
	title: { color: '#FFF', fontWeight: 700, fontSize: 20 },
	amount: {
		color: '#FFF',
		fontSize: 32,
		fontWeight: '700',
		marginVertical: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	row: {
		width: '70%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	label: { color: '#fff', fontSize: 18, marginBottom: 10 },
	value: { color: '#FFF', fontWeight: '600', fontSize: 20 },
})
