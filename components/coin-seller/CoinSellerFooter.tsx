import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface CoinSellerFooterProps {
	onQuitPress?: () => void
}

export function CoinSellerFooter({ onQuitPress }: CoinSellerFooterProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.infoText}>
				Recharge on behalf of customers, earn commission on each order
			</Text>
			<Pressable style={styles.quitButton} onPress={onQuitPress}>
				<Text style={styles.quitText}>Quit Coin Seller</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: spacing.lg,
		marginTop: spacing.xl,
		marginBottom: spacing.xxl,
		alignItems: 'center',
	},
	infoText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#9CA3AF',
		textAlign: 'center',
		marginBottom: spacing.lg,
	},
	quitButton: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.xl,
	},
	quitText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#EF4444',
		fontWeight: fontWeights.medium,
	},
})
