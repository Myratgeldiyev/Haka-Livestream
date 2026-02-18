import { DetailsHeader } from '@/components/coin-seller/DetailsHeader'
import { SearchInput } from '@/components/coin-seller/SearchInput'
import { TransactionCard } from '@/components/coin-seller/TransactionCard'
import { TypeFilter } from '@/components/coin-seller/TypeFilter'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

type FilterType = 'all' | 'transfer' | 'recharge' | 'withdraw'

interface Transaction {
	id: string
	type: string
	userName: string
	userId: string
	userAvatar?: string
	date: string
	amount: number
	operator?: {
		name: string
		avatar?: string
	}
}

const MOCK_TRANSACTIONS: Transaction[] = [
	{
		id: '1',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
	{
		id: '2',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
	{
		id: '3',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
	{
		id: '4',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
	},
	{
		id: '5',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
	},
	{
		id: '6',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
	{
		id: '7',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
	{
		id: '8',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
	},
	{
		id: '9',
		type: 'Transfer To Coinseller',
		userName: 'PUJJAD',
		userId: '5778980',
		date: '2025-08-23 19:00:59',
		amount: -50000,
		operator: { name: 'MD Samir' },
	},
]

export default function CoinSellerDetailsScreen() {
	const [searchQuery, setSearchQuery] = useState('')
	const [filterType, setFilterType] = useState<FilterType>('all')

	const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
		if (searchQuery) {
			return (
				transaction.userId.includes(searchQuery) ||
				transaction.userName.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}
		return true
	})

	const renderTransaction = ({ item }: { item: Transaction }) => (
		<TransactionCard
			type={item.type}
			userName={item.userName}
			userId={item.userId}
			userAvatar={item.userAvatar}
			date={item.date}
			amount={item.amount}
			operator={item.operator}
		/>
	)

	return (
		<View style={styles.container}>
			<DetailsHeader />
			<SearchInput value={searchQuery} onChangeText={setSearchQuery} />
			<TypeFilter value={filterType} onChange={setFilterType} />
			<FlatList
				data={filteredTransactions}
				keyExtractor={item => item.id}
				renderItem={renderTransaction}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E4F7F4',
	},
	listContent: {
		paddingBottom: 40,
	},
})
