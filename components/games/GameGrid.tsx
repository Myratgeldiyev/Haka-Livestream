import { spacing } from '@/constants/spacing'
import { GameCardProps } from '@/types/games'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { GameCard } from './GameCard'

interface Props {
	data: GameCardProps[]
}

export function GameGrid({ data }: Props) {
	return (
		<FlatList
			data={data}
			keyExtractor={item => item.id}
			numColumns={2}
			columnWrapperStyle={styles.row}
			contentContainerStyle={styles.container}
			renderItem={({ item }) => <GameCard {...item} />}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.xl,
	},
	row: {
		gap: spacing.md,
		marginBottom: spacing.md,
	},
})
