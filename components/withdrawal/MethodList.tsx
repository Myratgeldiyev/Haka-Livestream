import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { MethodItem } from './MethodItem'

const METHODS = [
	{
		id: 'epay',
		title: 'Epay',
		fee: 'Fee: 10,000 points',
		time: 'Arrival time',
	},
	{
		id: 'binance',
		title: 'BINANCE (BEP20)',
		fee: 'Fee: 1.5%',
		time: 'Arrival time: 1 hour',
	},
	{
		id: 'usdt',
		title: 'USDT-TRC20',
		fee: 'Fee: 1.5%',
		time: 'Arrival time: 1 hour',
	},
	{
		id: 'bank',
		title: 'BANK TRANSFER',
		fee: 'Fee: 3%',
		time: 'Arrival 24 hours',
	},
]

export function MethodList() {
	return (
		<>
			<FlatList
				data={METHODS}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<MethodItem title={item.title} fee={item.fee} time={item.time} />
				)}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
			/>

			<Text style={styles.footer}>
				My most preferred way to receive payment ›
			</Text>
		</>
	)
}

const styles = StyleSheet.create({
	list: {
		padding: 16,
		gap: 12,
	},
	footer: {
		textAlign: 'center',
		color: '#8B5CF6',
		fontSize: 14,
		paddingVertical: 24,
	},
})
