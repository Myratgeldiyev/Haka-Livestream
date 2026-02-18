import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { TOP_UP_COINS } from './constants'

interface TopUpPackageCardProps {
	coins: string | number
	price: string
	selected?: boolean
	onPress?: () => void
}

export function TopUpPackageCard({
	coins,
	price,
	selected = false,
	onPress,
}: TopUpPackageCardProps) {
	return (
		<Pressable
			style={[styles.card, selected && styles.cardSelected]}
			onPress={onPress}
		>
			<Text style={styles.coins}>
				{typeof coins === 'number' ? coins.toLocaleString('en-US') : coins}
			</Text>
			<Text style={styles.price}>{price}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: '#F8F8F8',
		borderRadius: TOP_UP_COINS.cardBorderRadius,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#E0E0E0',
		minHeight: 80,
	},
	cardSelected: {
		borderWidth: TOP_UP_COINS.packageCardBorderWidth,
		borderColor: TOP_UP_COINS.packageCardBorder,
	},
	coins: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
		marginBottom: 4,
	},
	price: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
})
