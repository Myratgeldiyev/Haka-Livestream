import { CoinSellerFooter } from '@/components/coin-seller/CoinSellerFooter'
import { CoinSellerHeader } from '@/components/coin-seller/CoinSellerHeader'
import { CoinSellerMenuList } from '@/components/coin-seller/CoinSellerMenuList'
import { CommissionRateSection } from '@/components/coin-seller/CommissionRateSection'
import { CustomerContent } from '@/components/coin-seller/CustomerContent'
import { LevelRulesTable } from '@/components/coin-seller/LevelRulesTable'
import { OverviewSection } from '@/components/coin-seller/OverviewSection'
import { PaymentMethodSheet } from '@/components/coin-seller/PaymentMethodSheet'
import { ProfileCard } from '@/components/coin-seller/ProfileCard'
import { RecommendContent } from '@/components/coin-seller/RecommendContent'
import { TradingContent } from '@/components/coin-seller/TradingContent'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

type TopTab = 'seller' | 'customer'
type SellerSubTab = 'myself' | 'trading'
type CustomerSubTab = 'recommend' | 'old_customer'

const MOCK_USER = {
	username: 'Rider',
	userId: '000000',
	avatarUri: undefined,
}

const MOCK_COMMISSION_RATES = [
	{ label: 'Recharge Commission', rate: '5%', showLevelUp: true },
	{ label: 'VIP Commission', rate: '3%', showLevelUp: true },
	{ label: 'Gift Commission', rate: '2%', showLevelUp: false },
]

type PaymentMethod = 'epay' | 'binance' | 'usdt' | 'bank'

export default function CoinSellerScreen() {
	const [topTab, setTopTab] = useState<TopTab>('seller')
	const [sellerSubTab, setSellerSubTab] = useState<SellerSubTab>('myself')
	const [customerSubTab, setCustomerSubTab] = useState<CustomerSubTab>('recommend')
	const [isPaymentSheetVisible, setIsPaymentSheetVisible] = useState(false)
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('epay')

	const handleTopTabChange = (tab: TopTab) => {
		setTopTab(tab)
	}

	const handleSellerSubTabChange = (tab: SellerSubTab) => {
		setSellerSubTab(tab)
	}

	const handleCustomerSubTabChange = (tab: CustomerSubTab) => {
		setCustomerSubTab(tab)
	}

	const handlePaymentMethodPress = () => {
		setIsPaymentSheetVisible(true)
	}

	const handlePaymentMethodConfirm = (method: PaymentMethod) => {
		setSelectedPaymentMethod(method)
	}

	const renderSellerMyselfContent = () => (
		<>
			<ProfileCard
				username={MOCK_USER.username}
				userId={MOCK_USER.userId}
				avatarUri={MOCK_USER.avatarUri}
			/>
			<CoinSellerMenuList onPaymentMethodPress={handlePaymentMethodPress} />
			<OverviewSection coinsSold={0} numberOfCustomers={0} />
			<CommissionRateSection items={MOCK_COMMISSION_RATES} />
			<LevelRulesTable />
			<CoinSellerFooter />
		</>
	)

	const renderSellerTradingContent = () => <TradingContent />

	const renderCustomerContent = () => {
		if (customerSubTab === 'recommend') {
			return <RecommendContent />
		}
		return <CustomerContent />
	}

	const renderContent = () => {
		if (topTab === 'customer') {
			return renderCustomerContent()
		}

		if (sellerSubTab === 'trading') {
			return renderSellerTradingContent()
		}

		return renderSellerMyselfContent()
	}

	return (
		<View style={styles.container}>
			<CoinSellerHeader
				topTab={topTab}
				sellerSubTab={sellerSubTab}
				customerSubTab={customerSubTab}
				onTopTabChange={handleTopTabChange}
				onSellerSubTabChange={handleSellerSubTabChange}
				onCustomerSubTabChange={handleCustomerSubTabChange}
			/>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{renderContent()}
			</ScrollView>

			<PaymentMethodSheet
				visible={isPaymentSheetVisible}
				onClose={() => setIsPaymentSheetVisible(false)}
				onConfirm={handlePaymentMethodConfirm}
				selectedMethod={selectedPaymentMethod}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E4F7F4',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
})
