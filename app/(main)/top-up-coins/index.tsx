import type {
	CoinPackage,
	PaymentMethodId,
	TopUpTabId,
} from '@/components/top-up-coins'
import {
	TopUpAgentSellerList,
	TopUpBalanceCard,
	TopUpCustomerServiceLink,
	TopUpHeader,
	TopUpPackageGrid,
	TopUpPaymentMethodGrid,
	TopUpPaymentTabs,
	TopUpRechargeRewardBanner,
} from '@/components/top-up-coins'
import { TOP_UP_COINS } from '@/components/top-up-coins/constants'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { usePaymentsStore } from '@/store/payments.store'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	ActivityIndicator,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'

const PACKAGES_12: CoinPackage[] = [
	{ id: '1', coins: 24000, price: '$3' },
	{ id: '2', coins: 48000, price: '$6' },
	{ id: '3', coins: 96000, price: '$12' },
	{ id: '4', coins: 144000, price: '$18' },
	{ id: '5', coins: 240000, price: '$30' },
	{ id: '6', coins: 480000, price: '$60' },
	{ id: '7', coins: 720000, price: '$90' },
	{ id: '8', coins: 960000, price: '$120' },
	{ id: '9', coins: 1200000, price: '$150' },
	{ id: '10', coins: 1440000, price: '$180' },
	{ id: '11', coins: 1680000, price: '$210' },
	{ id: '12', coins: 1920000, price: '$240' },
]

export default function TopUpCoinsScreen() {
	const { data, refetch } = useMyProfile()
	const {
		isLoading: isTopUpLoading,
		error: topUpError,
		topUp,
	} = usePaymentsStore()
	const [activeTab, setActiveTab] = useState<TopUpTabId>('recharge')
	const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>('upi')
	const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>({
		id: '1',
		coins: 24000,
		price: '$3',
	})

	const balance = data?.top_up ?? 70000
	const recentTransaction = '[93****30] 08-25 14:45 $1.00 recharged'
	const transactionId = '678899909'

	const handleBack = useCallback(() => router.back(), [])
	const handleRegionPress = useCallback(() => {}, [])
	const handleCoinsDetailsPress = useCallback(() => {}, [])
	const handleCustomerServicePress = useCallback(() => {}, [])

	const handleTopUp = useCallback(async () => {
		if (!selectedPackage) return
		const success = await topUp(String(selectedPackage.coins))
		if (success) refetch()
	}, [selectedPackage, topUp, refetch])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle='dark-content' />
				<TopUpHeader
					region='India'
					onBack={handleBack}
					onRegionPress={handleRegionPress}
				/>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='handled'
				>
					<TopUpBalanceCard
						balance={balance}
						recentTransaction={recentTransaction}
						transactionId={transactionId}
						onCoinsDetailsPress={handleCoinsDetailsPress}
					/>
					<TopUpRechargeRewardBanner />
					<TopUpPaymentTabs activeTab={activeTab} onTabChange={setActiveTab} />
					{activeTab === 'recharge' && (
						<TopUpPaymentMethodGrid
							selectedId={selectedPayment}
							onSelect={setSelectedPayment}
						/>
					)}
					{(activeTab === 'recharge' || activeTab === 'google_pay') && (
						<TopUpPackageGrid
							packages={activeTab === 'google_pay' ? PACKAGES_12 : undefined}
							selectedId={selectedPackage?.id}
							onSelect={setSelectedPackage}
						/>
					)}
					{(activeTab === 'recharge' || activeTab === 'google_pay') &&
						selectedPackage != null && (
							<View style={styles.topUpSection}>
								<Pressable
									style={[
										styles.topUpButton,
										isTopUpLoading && styles.topUpButtonDisabled,
									]}
									onPress={handleTopUp}
									disabled={isTopUpLoading}
								>
									{isTopUpLoading ? (
										<ActivityIndicator color='#fff' size='small' />
									) : (
										<Text style={styles.topUpButtonText}>Top up</Text>
									)}
								</Pressable>
								{topUpError != null && (
									<Text style={styles.topUpError}>{topUpError}</Text>
								)}
							</View>
						)}
					{activeTab === 'agent' && <TopUpAgentSellerList />}
					<TopUpCustomerServiceLink onPress={handleCustomerServicePress} />
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	safe: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	topUpSection: {
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: 24,
	},
	topUpButton: {
		backgroundColor: TOP_UP_COINS.paymentCardBorder,
		paddingVertical: 12,
		borderRadius: TOP_UP_COINS.cardBorderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 44,
	},
	topUpButtonDisabled: {
		opacity: 0.7,
	},
	topUpButtonText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
	topUpError: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#DC2626',
		marginTop: 8,
		textAlign: 'center',
	},
})
