import { CoinIcon } from '@/components/ui/icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface IncomeListItemProps {
	label: string
	value: string
	onPress?: () => void
}

export function IncomeListItem({ label, value, onPress }: IncomeListItemProps) {
	return (
		<Pressable style={styles.card} onPress={onPress}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.rightRow}>
				<View style={styles.iconWrap}>
					<CoinIcon />
				</View>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.chevron}>›</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginBottom: 10,
	},
	label: {
		fontSize: 15,
		color: '#111111',
		fontWeight: '500',
	},
	rightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	iconWrap: {
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	value: {
		fontSize: 15,
		color: '#111111',
		fontWeight: '600',
	},
	chevron: {
		fontSize: 18,
		color: '#9CA3AF',
		fontWeight: '300',
	},
})
