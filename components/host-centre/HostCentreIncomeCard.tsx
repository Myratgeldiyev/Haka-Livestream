import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import { HOST_CENTRE } from './constants'

interface HostCentreIncomeCardProps {
	label: string
	amount: string
}

export function HostCentreIncomeCard({
	label,
	amount,
}: HostCentreIncomeCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.coinRow}>
				<CoinIcon size='12' />
				<Text style={styles.amount}>{amount}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		padding: spacing.md,
		backgroundColor: HOST_CENTRE.cardLightPurpleBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.cardRedBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: HOST_CENTRE.textDark,
		marginBottom: 4,
	},
	coinRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	coinIcon: {
		fontSize: fontSizes.sm,
		color: '#E67E22',
	},
	amount: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: HOST_CENTRE.textDark,
	},
})
