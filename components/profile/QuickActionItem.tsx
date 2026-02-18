import { Card } from '@/components/ui/Card'
import { radius } from '@/constants/radius'
import React from 'react'
import { DimensionValue, StyleSheet, Text, View } from 'react-native'

const CARD_HEIGHT = 90
const ICON_SIZE = 56

interface QuickActionItemProps {
	label: string
	icon: React.ReactNode
	bgColor: string

	onPress?: () => void
	top?: number
	left?: DimensionValue
}

export function QuickActionItem({
	label,
	icon,
	bgColor,
	onPress,
	top = 2.5,
	left = '78%' as DimensionValue,
}: QuickActionItemProps) {
	return (
		<Card backgroundColor={bgColor} style={styles.card} onPress={onPress}>
			<View
				style={[
					styles.iconContainer,
					{
						top: -ICON_SIZE / top,
						left,
					},
				]}
			>
				{icon}
			</View>

			<Text style={styles.label}>{label}</Text>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		height: CARD_HEIGHT,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 16,
		overflow: 'visible',
		borderRadius: radius.card,
	},

	iconContainer: {
		position: 'absolute',
		transform: [{ translateX: -ICON_SIZE / 2 }],
		width: ICON_SIZE,
		height: ICON_SIZE,
		borderRadius: ICON_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255,0.25)',
	},

	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
		textAlign: 'center',
	},
})
