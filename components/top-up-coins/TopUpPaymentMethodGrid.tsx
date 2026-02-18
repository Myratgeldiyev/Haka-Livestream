import EpayIcon from '@/components/ui/icons/coin-seller/epayIcon'
import UsdtIcon from '@/components/ui/icons/coin-seller/usdtIcon'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import UpiIcon from '../ui/icons/top-up/UpiIcon'
import UsdcIcon from '../ui/icons/top-up/UsdcIcon'
import { getPaymentCardWidth, TOP_UP_COINS } from './constants'
import { TopUpPaymentMethodCard } from './TopUpPaymentMethodCard'

export type PaymentMethodId = 'upi' | 'epay' | 'usdt' | 'usdc'

interface TopUpPaymentMethodGridProps {
	selectedId: PaymentMethodId
	onSelect: (id: PaymentMethodId) => void
}

const PAYMENT_OPTIONS: {
	id: PaymentMethodId
	label: string
	subLabel?: string
	icon: React.ReactNode
}[] = [
	{ id: 'upi', label: 'UPI', icon: <UpiIcon /> },
	{ id: 'epay', label: 'Epay', icon: <EpayIcon size='40' props={{}} /> },
	{
		id: 'usdt',
		label: 'USDT',
		subLabel: '(Cryto coin)',
		icon: <UsdtIcon size='40' props={{}} />,
	},
	{
		id: 'usdc',
		label: 'USDC',
		subLabel: '(Cryto coin)',
		icon: <UsdcIcon />,
	},
]

export function TopUpPaymentMethodGrid({
	selectedId,
	onSelect,
}: TopUpPaymentMethodGridProps) {
	const cardWidth = getPaymentCardWidth()

	return (
		<View style={styles.container}>
			<View style={[styles.grid, { gap: TOP_UP_COINS.gridGap }]}>
				{PAYMENT_OPTIONS.map(opt => (
					<View key={opt.id} style={[styles.cell, { width: cardWidth }]}>
						<TopUpPaymentMethodCard
							label={opt.label}
							subLabel={opt.subLabel}
							icon={opt.icon}
							selected={selectedId === opt.id}
							onPress={() => onSelect(opt.id)}
						/>
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: 24,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	cell: {
		marginBottom: TOP_UP_COINS.gridGap,
	},
})
