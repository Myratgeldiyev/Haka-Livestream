import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import RightArrowIcon from '../ui/icons/profile-header/right-arrow'

interface CoinSellerMenuItemProps {
	icon: React.ReactNode
	label: string
	onPress?: () => void

	rightSlot?: React.ReactNode
}

export function CoinSellerMenuItem({
	icon,
	label,
	onPress,
	rightSlot,
}: CoinSellerMenuItemProps) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.left}>
				<View style={styles.iconContainer}>{icon}</View>
				<Text style={styles.label}>{label}</Text>
			</View>

			<View style={styles.right}>
				{rightSlot}
				<RightArrowIcon color='#9CA3AF' />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		backgroundColor: '#FFF',
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconContainer: {
		width: 24,
		height: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#374151',
		marginLeft: spacing.md,
	},
	right: {
		gap: 8,
		flexDirection: 'row',
		alignItems: 'center',
	},
})
