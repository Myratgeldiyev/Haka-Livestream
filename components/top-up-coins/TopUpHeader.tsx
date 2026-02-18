import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { TOP_UP_COINS } from './constants'

function ChevronDownIcon({
	size = 16,
	color = '#000',
}: {
	size?: number
	color?: string
}) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path d='M7 10l5 5 5-5H7z' fill={color} />
		</Svg>
	)
}

interface TopUpHeaderProps {
	region?: string
	onRegionPress?: () => void
	onBack?: () => void
}

export function TopUpHeader({
	region = 'India',
	onRegionPress,
	onBack,
}: TopUpHeaderProps) {
	return (
		<View style={styles.container}>
			{onBack ? (
				<Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
					<LeftArrowIcon props={{}} color='#000' />
				</Pressable>
			) : null}
			<Text style={styles.title}>Top-up coins</Text>
			<Pressable style={styles.regionButton} onPress={onRegionPress}>
				<Text style={styles.regionText}>{region}</Text>
				<ChevronDownIcon size={14} color='#000' />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		paddingVertical: 16,
		position: 'relative',
		minHeight: 52,
	},
	title: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	regionButton: {
		position: 'absolute',
		right: TOP_UP_COINS.screenPadding,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	regionText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
	},
	backButton: {
		position: 'absolute',
		left: TOP_UP_COINS.screenPadding,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
})
