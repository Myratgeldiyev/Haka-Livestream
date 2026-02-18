import { spacing } from '@/constants/spacing'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RoundedFlag from '../ui/flags/RoundedFlag'
import AsistantCoin from '../ui/icons/coin-seller/AsistantCoin'
import CoinRankIcon from '../ui/icons/coin-seller/CoinRankIcon'
import PaymentCoinIcon from '../ui/icons/coin-seller/PaymentCoinIcon'
import TBankIcon from '../ui/icons/coin-seller/TBankIcon'
import WhatsappCoinIcon from '../ui/icons/coin-seller/WhatsappCoinIcon'
import { CoinSellerMenuItem } from './CoinSellerMenuItem'

interface CoinSellerMenuListProps {
	onPaymentMethodPress?: () => void
	onWhatsAppPress?: () => void
	onAssistantPress?: () => void
	onRankPress?: () => void
}

export function CoinSellerMenuList({
	onPaymentMethodPress,
	onWhatsAppPress,
	onAssistantPress,
	onRankPress,
}: CoinSellerMenuListProps) {
	return (
		<View style={styles.container}>
			<CoinSellerMenuItem
				icon={<PaymentCoinIcon />}
				label='Payment Method'
				onPress={onPaymentMethodPress}
				rightSlot={
					<>
						<RoundedFlag />
						<TBankIcon />
					</>
				}
			/>
			<View style={styles.divider} />
			<CoinSellerMenuItem
				icon={<WhatsappCoinIcon />}
				label='WhatsApp'
				onPress={onWhatsAppPress}
				rightSlot={
					<>
						<Text>+911234567890</Text>
					</>
				}
			/>
			<View style={styles.divider} />
			<CoinSellerMenuItem
				icon={<AsistantCoin />}
				label='Assistant'
				onPress={onAssistantPress}
				rightSlot={
					<Image
						style={{ borderRadius: 16, width: 20, height: 20 }}
						source={require('@/assets/images/user.png')}
					/>
				}
			/>
			<View style={styles.divider} />
			<CoinSellerMenuItem
				icon={<CoinRankIcon />}
				label='Coinseller Rank'
				onPress={onRankPress}
				rightSlot={
					<>
						<Image
							style={{ borderRadius: 16, width: 20, height: 20 }}
							source={require('@/assets/images/user.png')}
						/>
						<Image
							style={{ borderRadius: 16, width: 20, height: 20 }}
							source={require('@/assets/images/user.png')}
						/>
					</>
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		overflow: 'hidden',
	},
	divider: {
		height: 1,
		backgroundColor: '#F3F4F6',
		marginLeft: 56,
	},
})
