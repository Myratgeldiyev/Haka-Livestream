import { WalletCard } from '@/components/profile/WalletCard'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { spacing } from '@/constants/spacing'
import { CoinIcon } from '../ui/icons'
import CoinComponent from '../ui/icons/Coin2Icon'
interface P {
	top_up?: number
	withdrawal?: number
}
export function WalletSection({ top_up, withdrawal }: P) {
	return (
		<View style={styles.container}>
			<WalletCard
				bg='#ffe990ff'
				color='#D1723A'
				label={top_up}
				icon={<CoinComponent />}
				action='Top Up'
				route='/(main)/top-up-coins'
			/>
			<WalletCard
				bg='#FF2D55'
				color='#FFCC00'
				label={withdrawal}
				icon={<CoinIcon />}
				action='Withdraw'
				route={'/(main)/withdrawal'}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.section.horizontal,
		paddingVertical: spacing.lg,

		flexDirection: 'row',
		gap: spacing.md,
	},
})
