import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { TOP_UP_COINS } from './constants'
import { TopUpPackageCard } from './TopUpPackageCard'

export interface CoinPackage {
	id: string
	coins: number
	price: string
}

const DEFAULT_PACKAGES: CoinPackage[] = [
	{ id: '1', coins: 24000, price: '$3' },
	{ id: '2', coins: 48000, price: '$6' },
	{ id: '3', coins: 96000, price: '$12' },
	{ id: '4', coins: 144000, price: '$18' },
	{ id: '5', coins: 240000, price: '$30' },
	{ id: '6', coins: 480000, price: '$60' },
]

interface TopUpPackageGridProps {
	packages?: CoinPackage[]
	selectedId?: string
	onSelect: (pkg: CoinPackage) => void
}

export function TopUpPackageGrid({
	packages = DEFAULT_PACKAGES,
	selectedId,
	onSelect,
}: TopUpPackageGridProps) {
	return (
		<FlatList
			data={packages}
			keyExtractor={pkg => pkg.id}
			numColumns={3}
			scrollEnabled={false}
			columnWrapperStyle={styles.row}
			contentContainerStyle={styles.content}
			renderItem={({ item }) => (
				<View style={styles.cell}>
					<TopUpPackageCard
						coins={item.coins}
						price={item.price}
						selected={selectedId === item.id}
						onPress={() => onSelect(item)}
					/>
				</View>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	content: {
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: 24,
	},
	row: {
		gap: TOP_UP_COINS.gridGap,
		marginBottom: TOP_UP_COINS.gridGap,
	},
	cell: {
		flex: 1,
	},
})
