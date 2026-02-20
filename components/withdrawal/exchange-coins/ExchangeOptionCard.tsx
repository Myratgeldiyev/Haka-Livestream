import CoinIcon from '@/components/ui/icons/withdrawal/CoinIcon'
import GoldIcon from '@/components/ui/icons/live-stream/GoldIcon'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ExchangeOptionCardProps {
	coinAmount: string
	pointsAmount: string
	selected: boolean
	onPress: () => void
}

function RedDot() {
	return <View style={styles.redDot} />
}

export function ExchangeOptionCard({
	coinAmount,
	pointsAmount,
	selected,
	onPress,
}: ExchangeOptionCardProps) {
	return (
		<Pressable
			style={[styles.card, selected && styles.cardSelected]}
			onPress={onPress}
		>
			<View style={styles.coinRow}>
				<View style={styles.iconWrap}>
					<GoldIcon />
				</View>
				<Text style={styles.coinAmount}>{coinAmount}</Text>
			</View>
			<View style={styles.pointsRow}>
				<CoinIcon size='12' />
				<Text style={styles.pointsAmount}>{pointsAmount}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		padding: 14,
		minHeight: 88,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardSelected: {
		borderWidth: 3,
		borderColor: '#7C4DFF',
	},
	coinRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginBottom: 8,
	},
	iconWrap: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	coinAmount: {
		fontSize: 22,
		fontWeight: '700',
		color: '#111111',
	},
	pointsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	redDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#E53935',
	},
	pointsAmount: {
		fontSize: 14,
		color: '#111111',
		fontWeight: '500',
	},
})
