import BankIcon from '@/components/ui/icons/coin-seller/BankIcon'
import BinanceIcon from '@/components/ui/icons/coin-seller/binanceIcon'
import EpayIcon from '@/components/ui/icons/coin-seller/epayIcon'
import UsdtIcon from '@/components/ui/icons/coin-seller/usdtIcon'
import { usePaymentsStore } from '@/store/payments.store'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export function MethodSelector() {
	const boundEpayId = usePaymentsStore(s => s.boundEpayId)
	const boundBinance = usePaymentsStore(s => s.boundBinance)
	const boundUsdt = usePaymentsStore(s => s.boundUsdt)
	const boundBank = usePaymentsStore(s => s.boundBank)
	const selectedWithdrawalMethod = usePaymentsStore(s => s.selectedWithdrawalMethod)

	const showBinance = boundBinance && selectedWithdrawalMethod === 'binance'
	const showUsdt = boundUsdt && selectedWithdrawalMethod === 'usdt'
	const showEpay = boundEpayId && selectedWithdrawalMethod === 'epay'
	const showBank = boundBank && selectedWithdrawalMethod === 'bank'
	const showAddMethod =
		!boundEpayId && !boundBinance && !boundUsdt && !boundBank

	return (
		<>
			<Text style={styles.title}>Method</Text>
			<Pressable
				style={styles.box}
				onPress={() => router.push('/(main)/withdrawal/method')}
			>
				{showAddMethod ? (
					<>
						<Text style={styles.addMethodText}>Add a payment method</Text>
						<Text style={styles.arrow}>›</Text>
					</>
				) : showBinance ? (
					<>
						<View style={styles.iconAndTitle}>
							<View style={styles.iconWrap}>
								<BinanceIcon size="24" props={{}} />
							</View>
							<Text style={styles.methodTitle}>Binance</Text>
						</View>
						<Text style={styles.arrow}>›</Text>
					</>
				) : showUsdt ? (
					<>
						<View style={styles.iconAndTitle}>
							<View style={styles.iconWrap}>
								<UsdtIcon size="24" props={{}} />
							</View>
							<Text style={styles.methodTitle}>USDT</Text>
						</View>
						<Text style={styles.arrow}>›</Text>
					</>
				) : showEpay ? (
					<>
						<View style={styles.iconAndTitle}>
							<View style={styles.iconWrap}>
								<EpayIcon size="24" props={{}} />
							</View>
							<Text style={styles.methodTitle}>Epay</Text>
						</View>
						<Text style={styles.arrow}>›</Text>
					</>
				) : showBank ? (
					<>
						<View style={styles.iconAndTitle}>
							<View style={styles.iconWrap}>
								<BankIcon width={24} height={24} />
							</View>
							<Text style={styles.methodTitle}>Bank Transfer</Text>
						</View>
						<Text style={styles.arrow}>›</Text>
					</>
				) : (
					<>
						<Text style={styles.addMethodText}>Add a payment method</Text>
						<Text style={styles.arrow}>›</Text>
					</>
				)}
			</Pressable>
		</>
	)
}

const styles = StyleSheet.create({
	title: { marginTop: 16, marginBottom: 8, fontWeight: '600' },
	box: {
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 12,
		padding: 14,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	iconAndTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	iconWrap: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	methodTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000000',
	},
	addMethodText: { fontSize: 16 },
	arrow: { fontSize: 22 },
})
