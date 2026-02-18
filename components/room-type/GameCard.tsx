import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

interface PlaceholderImageProps {
	imageKey: string
}

type GameImageKey = keyof typeof IMAGE_MAP

interface GameCardProps {
	label: string
	image?: GameImageKey
	isSelected?: boolean
	isNone?: boolean
	onPress?: () => void
	size?: number
}

function NoneIcon({ size = 50 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 40 40' fill='none'>
			<Rect
				x={8}
				y={8}
				width={24}
				height={24}
				rx={4}
				stroke='#FFFFFF'
				strokeWidth={2}
				strokeDasharray='4 4'
			/>
		</Svg>
	)
}
const IMAGE_MAP: Record<string, any> = {
	game1: require('../../assets/images/games/ocean-hunt.png'),
	game2: require('../../assets/images/games/ocean-hunt.png'),
	game3: require('../../assets/images/games/jungle-slot.png'),
	game4: require('../../assets/images/games/win-go.png'),
	game5: require('../../assets/images/games/ludo-king.png'),
	game6: require('../../assets/images/games/mushroom.png'),
	game7: require('../../assets/images/games/shark.png'),
	game8: require('../../assets/images/games/biliardo.png'),
	game9: require('../../assets/images/games/cards.png'),
	game10: require('../../assets/images/games/bountry-racers.png'),
	game11: require('../../assets/images/games/lion-tiger.png'),
	game12: require('../../assets/images/games/lucky-wheel.png'),
}

const CARD_BASE = 91
const IMAGE_BASE = 56

function PlaceholderImage({
	imageKey,
	size,
}: PlaceholderImageProps & { size: number }) {
	const source = IMAGE_MAP[imageKey]
	if (!source) return null
	return (
		<Image
			source={source}
			style={{
				width: size,
				height: size,
				borderRadius: Math.max(4, size * 0.14),
			}}
		/>
	)
}

export function GameCard({
	label,
	isSelected,
	isNone,
	onPress,
	image,
	size = CARD_BASE,
}: GameCardProps) {
	const imageSize = Math.round((size / CARD_BASE) * IMAGE_BASE)
	const borderRadius = Math.max(14, size * 0.22)
	return (
		<Pressable
			style={[
				styles.container,
				{
					width: size,
					minHeight: size,
					borderRadius,
					paddingVertical: size * 0.08,
					paddingHorizontal: size * 0.06,
				},
				isSelected && styles.containerSelected,
			]}
			onPress={onPress}
		>
			<View
				style={[
					styles.imageContainer,
					{
						width: imageSize,
						height: imageSize,
						borderRadius: Math.max(6, imageSize * 0.12),
					},
				]}
			>
				{isNone ? (
					<NoneIcon size={imageSize} />
				) : (
					image && <PlaceholderImage imageKey={image} size={imageSize} />
				)}
			</View>
			<Text
				style={[styles.label, { fontSize: Math.max(11, size * 0.12) }]}
				numberOfLines={2}
			>
				{label}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#4a14b670',
		borderWidth: 2,
		borderColor: 'transparent',
	},
	containerSelected: {
		borderColor: '#46B000',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	label: {
		color: '#FFFFFF',
		textAlign: 'center',
		marginTop: 4,
		paddingHorizontal: 2,
	},
})
