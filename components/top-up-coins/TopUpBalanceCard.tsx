import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import { TOP_UP_COINS } from './constants'

interface TopUpBalanceCardProps {
	balance: string | number
	recentTransaction?: string
	transactionId?: string
	onCoinsDetailsPress?: () => void
}

function TopLeftSheenOverlay() {
	return (
		<LinearGradient
			colors={[TOP_UP_COINS.balanceCardSheenColor, 'transparent']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.sheen}
			pointerEvents='none'
		/>
	)
}

function BalanceText({ value }: { value: string }) {
	return <Text style={styles.balance}>{value}</Text>
}

export function TopUpBalanceCard({
	balance,
	recentTransaction,
	transactionId,
	onCoinsDetailsPress,
}: TopUpBalanceCardProps) {
	const transactionLine =
		recentTransaction != null && transactionId != null
			? `${recentTransaction} ${transactionId}`
			: (recentTransaction ?? '')
	const balanceStr = Number(balance).toLocaleString('en-US')

	return (
		<ImageBackground
			source={require('@/assets/images/top-bcg.png')}
			style={styles.cardWrap}
			resizeMode='cover'
			imageStyle={styles.cardWrapImage}
		>
			<TopLeftSheenOverlay />
			<View style={styles.topRow}>
				<View style={styles.left}>
					<View style={styles.balanceRow}>
						<GoldIcon size={48} />
						<View style={styles.balanceContainer}>
							<BalanceText value={balanceStr} />
							<Text style={styles.label}>Remaining coins</Text>
						</View>
					</View>
				</View>
				<Pressable style={styles.detailsButton} onPress={onCoinsDetailsPress}>
					<Text style={styles.detailsButtonText}>Coins details</Text>
				</Pressable>
			</View>
			{transactionLine.length > 0 && (
				<View style={styles.transactionLineBg}>
					<Text style={styles.transactionLine} numberOfLines={1}>
						{transactionLine}
					</Text>
				</View>
			)}
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	cardWrap: {
		width: '100%',
		marginBottom: 20,
		overflow: 'hidden',
		height: 157,
		borderRadius: 26,
		borderWidth: 1,
		borderColor: TOP_UP_COINS.balanceCardCardBorder,
		backgroundColor: 'transparent',
		paddingTop: TOP_UP_COINS.balanceCardPadding,
		paddingBottom: 0,
		justifyContent: 'space-between',
	},
	cardWrapImage: {
		width: '100%',
		height: '100%',
		borderRadius: 26,
	},
	sheen: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: '50%',
		height: '50%',
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	left: {
		flex: 1,
	},
	balanceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	balanceContainer: {
		position: 'relative',
		alignSelf: 'center',
		marginBottom: 2,
	},
	balance: {
		fontSize: 32,
		lineHeight: 38,
		fontWeight: fontWeights.bold,
		color: TOP_UP_COINS.balanceCardTextColor,
	},
	coinIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: TOP_UP_COINS.balanceCardCoinIconBg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	coinIconText: {
		fontSize: 24,
		fontWeight: fontWeights.bold,
		color: TOP_UP_COINS.balanceCardCoinIconText,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: TOP_UP_COINS.balanceCardTextColor,
	},
	detailsButton: {
		backgroundColor: TOP_UP_COINS.coinsDetailsButtonBg,
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 999,
		marginRight: 15,
	},
	detailsButtonText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: TOP_UP_COINS.coinsDetailsButtonText,
	},
	transactionLineBg: {
		paddingBottom: 33,
		paddingHorizontal: TOP_UP_COINS.balanceCardPadding,
		alignItems: 'center',
	},
	transactionLine: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.xs,
		color: TOP_UP_COINS.balanceCardTextColor,
		opacity: 0.9,
	},
})
