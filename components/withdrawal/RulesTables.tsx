import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'

export function RulesTable() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Withdrawal Rules</Text>

			<View style={styles.table}>
				<View style={styles.row}>
					<Text style={styles.left}>Exchange ratio</Text>
					<View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
						<CoinIcon size='16' />
						<Text style={styles.right}>10,000 = ₹5.86</Text>
					</View>
				</View>

				<View style={styles.divider} />

				<View style={styles.row}>
					<Text style={styles.left}>Minimum withdrawal amount</Text>
					<View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
						<CoinIcon size='16' />
						<Text style={styles.right}>10,000 = ₹5.86</Text>
					</View>
				</View>
			</View>

			<Text style={styles.note}>1. Coins can not be withdrawn.</Text>
			<Text style={styles.note}>
				2. The service fees for different payment methods may vary. Please
				choose a suitable payment method.
			</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		marginTop: 24,
	},
	title: {
		fontWeight: '700',
		marginBottom: 12,
		fontSize: 16,
	},

	table: {
		borderWidth: 1,
		borderColor: '#111827',
		borderRadius: 4,
		overflow: 'hidden',
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},

	left: {
		fontSize: 14,
		color: '#111827',
		flex: 1,
	},

	right: {
		fontSize: 14,
		color: '#111827',
		fontWeight: '600',
	},

	divider: {
		height: 1,
		backgroundColor: '#111827',
	},

	note: {
		fontSize: 12,
		color: '#6B7280',
		marginTop: 6,
	},
})
