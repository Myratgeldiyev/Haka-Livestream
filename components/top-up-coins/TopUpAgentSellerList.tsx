import React from 'react'
import { StyleSheet, View } from 'react-native'
import type { AgentSellerPaymentId } from './TopUpAgentSellerCard'
import { TopUpAgentSellerCard } from './TopUpAgentSellerCard'
import { TOP_UP_COINS } from './constants'

export interface AgentSellerItem {
	id: string
	name: string
	userId: string
	avatarUri?: string
	paymentMethods: AgentSellerPaymentId[]
}

const MOCK_SELLERS: AgentSellerItem[] = [
	{
		id: '1',
		name: 'Raj',
		userId: '123455',
		paymentMethods: ['upi', 'epay', 'binance', 'usdt'],
	},
	{
		id: '2',
		name: 'Raj',
		userId: '123456',
		paymentMethods: ['upi', 'epay', 'binance'],
	},
	{
		id: '3',
		name: 'Raj',
		userId: '123457',
		paymentMethods: ['upi', 'epay', 'usdt'],
	},
	{
		id: '4',
		name: 'Raj',
		userId: '123458',
		paymentMethods: ['upi', 'binance', 'usdt'],
	},
	{
		id: '5',
		name: 'Raj',
		userId: '123459',
		paymentMethods: ['epay', 'binance', 'usdt'],
	},
	{
		id: '6',
		name: 'Raj',
		userId: '123460',
		paymentMethods: ['upi', 'epay', 'binance', 'usdt'],
	},
	{
		id: '7',
		name: 'Raj',
		userId: '123461',
		paymentMethods: ['upi', 'epay'],
	},
]

interface TopUpAgentSellerListProps {
	sellers?: AgentSellerItem[]
	onPricePress?: (seller: AgentSellerItem) => void
	onChatPress?: (seller: AgentSellerItem) => void
	onWhatsAppPress?: (seller: AgentSellerItem) => void
}

export function TopUpAgentSellerList({
	sellers = MOCK_SELLERS,
	onPricePress,
	onChatPress,
	onWhatsAppPress,
}: TopUpAgentSellerListProps) {
	return (
		<View style={styles.container}>
			{sellers.map(seller => (
				<TopUpAgentSellerCard
					key={seller.id}
					avatarUri={seller.avatarUri}
					name={seller.name}
					userId={seller.userId}
					paymentMethods={seller.paymentMethods}
					onPricePress={onPricePress ? () => onPricePress(seller) : undefined}
					onChatPress={onChatPress ? () => onChatPress(seller) : undefined}
					onWhatsAppPress={
						onWhatsAppPress ? () => onWhatsAppPress(seller) : undefined
					}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: 24,
	},
})
