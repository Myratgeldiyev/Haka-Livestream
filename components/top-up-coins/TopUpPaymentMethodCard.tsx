import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TOP_UP_COINS } from './constants'

interface TopUpPaymentMethodCardProps {
	label: string
	subLabel?: string
	icon: React.ReactNode
	selected?: boolean
	onPress?: () => void
}

export function TopUpPaymentMethodCard({
	label,
	subLabel,
	icon,
	selected = false,
	onPress,
}: TopUpPaymentMethodCardProps) {
	return (
		<Pressable
			style={[styles.card, selected && styles.cardSelected]}
			onPress={onPress}
		>
			<View style={styles.iconWrap}>{icon}</View>
			<Text style={styles.label}>{label}</Text>
			{subLabel != null && <Text style={styles.subLabel}>{subLabel}</Text>}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#E8E8E8',
		borderRadius: TOP_UP_COINS.cardBorderRadius,
		paddingHorizontal: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		borderWidth: 1,
		gap: 10,
		borderColor: 'transparent',
		paddingVertical: 4,
	},
	cardSelected: {
		backgroundColor: '#fff',
		borderWidth: TOP_UP_COINS.paymentCardBorderWidth,
		borderColor: TOP_UP_COINS.paymentCardBorder,
	},
	iconWrap: {},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
		textAlign: 'center',
	},
	subLabel: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#666',
		textAlign: 'center',
		marginTop: 2,
	},
})
