import React, { useCallback, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { GameCard } from './GameCard'

const GAP = 10
const MIN_CARD_SIZE = 68
const MAX_COLUMNS = 4

const GAMES = [
	{ key: 'game1', id: 'none', label: 'None', isNone: true },
	{ key: 'game2', id: 'ocean-hunt', label: 'Ocean hunt' },
	{ key: 'game3', id: 'jungle-slot', label: 'Jungle Slot' },
	{ key: 'game4', id: 'win-go', label: 'Win Go' },
	{ key: 'game5', id: 'ludo', label: 'Ludo' },
	{ key: 'game6', id: 'ocean-hunt-2', label: 'Ocean hunt' },
	{ key: 'game7', id: 'jungle-slot-2', label: 'Jungle Slot' },
	{ key: 'game8', id: 'win-go-2', label: 'Win Go' },
	{ key: 'game9', id: 'royal-battle', label: 'Royal Battle' },
	{ key: 'game10', id: 'bounty-racer', label: 'Bounty Racer' },
	{ key: 'game11', id: 'lion-vs-tiger', label: 'Lion Vs Tiger' },
	{ key: 'game12', id: 'lucky-wheel', label: 'Lucky wheel' },
] as const

export type GameId = (typeof GAMES)[number]['id']

interface GameGridProps {
	selectedGame: GameId
	onGameSelect?: (gameId: GameId) => void
}

export function GameGrid({ selectedGame, onGameSelect }: GameGridProps) {
	const [layoutWidth, setLayoutWidth] = useState(0)
	const onLayout = useCallback((e: LayoutChangeEvent) => {
		const w = e.nativeEvent.layout.width
		if (w > 0) setLayoutWidth(w)
	}, [])
	const cardSize =
		layoutWidth > 0
			? Math.max(
					MIN_CARD_SIZE,
					Math.floor((layoutWidth - (MAX_COLUMNS - 1) * GAP) / MAX_COLUMNS)
			  )
			: MIN_CARD_SIZE
	return (
		<View style={styles.container} onLayout={onLayout}>
			<View style={[styles.grid, { gap: GAP }]}>
				{GAMES.map(game => (
					<GameCard
						key={game.id}
						image={game.key}
						label={game.label}
						isNone={'isNone' in game && game.isNone}
						isSelected={selectedGame === game.id}
						onPress={() => onGameSelect?.(game.id)}
						size={cardSize}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 4,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
	},
})
