import React, { useCallback, useState } from 'react'
import {
	Image,
	LayoutChangeEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ShareMoment from '../ui/icons/moments/ShareMoment'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZES,
	GAME_CARD,
	OVERLAY_HEIGHTS,
	SPACING,
	sharedOverlayStyles,
} from './item-overlay.styles'
import type { GameItem, GamesOverlayProps } from './item-overlay.types'
import { ItemOverlayWrapper } from './ItemOverlayWrapper'

const MOCK_GAMES: GameItem[] = [
	{
		id: 'game-1',
		name: 'Lucky wheel',
		imageSource: require('@/assets/images/games/lucky-wheel.png'),
	},
	{
		id: 'game-2',
		name: 'Ocean hunt',
		imageSource: require('@/assets/images/games/ocean-hunt.png'),
	},
	{
		id: 'game-3',
		name: 'Jungle Slot',
		imageSource: require('@/assets/images/games/jungle-slot.png'),
	},
	{
		id: 'game-4',
		name: 'Queens ...',
		imageSource: require('@/assets/images/games/win-go.png'),
	},
	{
		id: 'game-5',
		name: 'Ludo',
		imageSource: require('@/assets/images/games/ludo-king.png'),
	},
	{
		id: 'game-6',
		name: 'Forest Party',
		imageSource: require('@/assets/images/games/shark.png'),
	},
	{
		id: 'game-7',
		name: 'Jungle Slot',
		imageSource: require('@/assets/images/games/mushroom.png'),
	},
	{
		id: 'game-8',
		name: 'Win Go',
		imageSource: require('@/assets/images/games/win-go.png'),
	},
	{
		id: 'game-9',
		name: 'Royal Battle',
		imageSource: require('@/assets/images/games/cards.png'),
	},
	{
		id: 'game-10',
		name: 'Bounty Racer',
		imageSource: require('@/assets/images/games/bountry-racers.png'),
	},
	{
		id: 'game-11',
		name: 'Lion Vs Tiger',
		imageSource: require('@/assets/images/games/lion-tiger.png'),
	},
]

const GRID_COLUMNS = 4
const GAP = 12
const MIN_CARD_SIZE = 64

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				sharedOverlayStyles.iconPlaceholder,
				{ width: size, height: size },
			]}
		/>
	)
}

function GameCard({
	game,
	isSelected,
	onSelect,
	size,
	iconSize,
}: {
	game: GameItem
	isSelected: boolean
	onSelect: () => void
	size: number
	iconSize: number
}) {
	return (
		<Pressable style={[styles.gameCard, { width: size }]} onPress={onSelect}>
			<View
				style={[
					styles.gameCardInner,
					{
						width: size,
						height: size,
						borderRadius: Math.max(12, size * 0.22),
						marginBottom: SPACING.xs,
					},
					isSelected && styles.gameCardInnerSelected,
				]}
			>
				{game.imageSource ? (
					<Image
						source={game.imageSource}
						style={[styles.gameImage, { width: iconSize, height: iconSize }]}
					/>
				) : (
					<IconPlaceholder size={iconSize} />
				)}
			</View>
			<Text style={styles.gameName} numberOfLines={1}>
				{game.name}
			</Text>
		</Pressable>
	)
}

export function GamesOverlay({
	visible,
	onClose,
	onStart,
	onShare,
}: GamesOverlayProps) {
	const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
	const [layoutWidth, setLayoutWidth] = useState(0)
	const insets = useSafeAreaInsets()

	const onLayout = useCallback((e: LayoutChangeEvent) => {
		const w = e.nativeEvent.layout.width
		if (w > 0) setLayoutWidth(w)
	}, [])

	const cardSize =
		layoutWidth > 0
			? Math.max(
					MIN_CARD_SIZE,
					Math.floor((layoutWidth - (GRID_COLUMNS - 1) * GAP) / GRID_COLUMNS)
			  )
			: MIN_CARD_SIZE
	const iconSize = Math.round((cardSize / GAME_CARD.size) * GAME_CARD.iconSize)

	const handleStart = () => {
		const selectedGame = MOCK_GAMES.find(g => g.id === selectedGameId)
		if (selectedGame) onStart?.(selectedGame)
	}

	return (
		<ItemOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.games}
		>
			<View style={styles.content}>
				<View style={sharedOverlayStyles.header}>
					<Text style={sharedOverlayStyles.headerTitle}>Games</Text>
					<Pressable style={styles.shareButton} onPress={onShare}>
						<ShareMoment color={'#fff'} />
						<Text style={sharedOverlayStyles.headerRightText}>Share</Text>
					</Pressable>
				</View>

				<ScrollView
					style={styles.gamesScrollView}
					contentContainerStyle={styles.gamesContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={[styles.gamesGrid, { gap: GAP }]} onLayout={onLayout}>
						{MOCK_GAMES.map(game => (
							<GameCard
								key={game.id}
								game={game}
								isSelected={selectedGameId === game.id}
								onSelect={() => setSelectedGameId(game.id)}
								size={cardSize}
								iconSize={iconSize}
							/>
						))}
					</View>
				</ScrollView>

				<View
					style={[
						styles.startButtonContainer,
						{ paddingBottom: insets.bottom + SPACING.md },
					]}
				>
					<Pressable
						style={[
							styles.startButton,
							!selectedGameId && styles.startButtonDisabled,
						]}
						onPress={handleStart}
						disabled={!selectedGameId}
					>
						<Text style={styles.startButtonText}>Start</Text>
					</Pressable>
				</View>
			</View>
		</ItemOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	shareButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	gamesScrollView: {
		flex: 1,
	},
	gamesContent: {
		width: '100%',
		paddingBottom: SPACING.lg,
	},
	gamesGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
	},
	gameCard: {
		alignItems: 'center',
	},
	gameCardInner: {
		backgroundColor: COLORS.gameCardBackground,
		justifyContent: 'center',
		alignItems: 'center',
	},
	gameCardInnerSelected: {
		borderWidth: 2,
		borderColor: COLORS.buttonPrimary,
	},
	gameImage: {
		borderRadius: BORDER_RADIUS.sm,
	},
	gameName: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textPrimary,
		textAlign: 'center',
		paddingHorizontal: 2,
	},
	startButtonContainer: {
		paddingTop: SPACING.lg,
	},
	startButton: {
		height: 56,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonDisabled: {
		opacity: 0.6,
	},
	startButtonText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
})
