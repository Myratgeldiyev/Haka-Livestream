import { Card } from '@/components/ui/Card'
import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AgentIcon from '../ui/icons/agencyIcon'
import CoinSellerIcon from '../ui/icons/coinSellerIcon'

export function BusinessSection() {
	const items = [
		{
			id: 'agency',
			label: 'Agency Center',
			icon: <AgentIcon />,
		},
		{
			id: 'seller',
			label: 'Coin Seller',
			icon: <CoinSellerIcon />,
		},
	]

	return (
		<View style={styles.container}>
			{items.map(item => (
				<Card key={item.id} style={styles.card} backgroundColor='transparent'>
					<View style={styles.iconContainer}>{item.icon}</View>
					<Text style={styles.label}>{item.label}</Text>
				</Card>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.md,
		alignItems: 'center',
		backgroundColor: '#DADADA',
		flexDirection: 'row',
		marginHorizontal: 18,
		gap: spacing.md,
		borderRadius: 12,
		height: 96,
	},
	card: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: spacing.md,
		minHeight: 100,
	},
	iconContainer: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		justifyContent: 'center',
		alignItems: 'center',

		borderRadius: 12,
	},
	label: {
		fontSize: 12,
		fontWeight: '400',
		color: profileColors.text.primary,
		textAlign: 'center',
	},
})
