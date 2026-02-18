import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MethodCard } from './MethodCard'
import { PAYMENT_METHODS } from './paymentMethodData'
import { PreferredPaymentLink } from './PreferredPaymentLink'

const CONTENT_BG = '#F5F4F6'

export function PaymentMethodList() {
	const insets = useSafeAreaInsets()

	const handleBind = useCallback((id: string) => {
		if (id === 'epay') {
			router.push('/withdrawal/epay-bind')
		}
		if (id === 'binance-bep20') {
			router.push('/withdrawal/binance-bind')
		}
		if (id === 'usdt-trc20') {
			router.push('/withdrawal/usdt-bind')
		}
		if (id === 'bank-transfer') {
			router.push('/withdrawal/bank-transfer-bind')
		}
	}, [])

	return (
		<ScrollView
			style={styles.scroll}
			contentContainerStyle={[
				styles.content,
				{ paddingBottom: 24 + insets.bottom },
			]}
			showsVerticalScrollIndicator={false}
			keyboardShouldPersistTaps='handled'
		>
			<View style={styles.cardList}>
				{PAYMENT_METHODS.map(item => (
					<MethodCard key={item.id} item={item} onBind={handleBind} />
				))}
			</View>
			<PreferredPaymentLink />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		backgroundColor: CONTENT_BG,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 24,
	},
	cardList: {
		marginBottom: 8,
	},
})
