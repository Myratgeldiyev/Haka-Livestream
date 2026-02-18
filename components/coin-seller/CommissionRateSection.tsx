import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface CommissionRateItem {
	label: string
	rate: string
	showLevelUp?: boolean
}

interface CommissionRateSectionProps {
	items: CommissionRateItem[]
	onLevelUpPress?: () => void
}

export function CommissionRateSection({
	items,
	onLevelUpPress,
}: CommissionRateSectionProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Commission Rate</Text>
			{items.map((item, index) => (
				<View key={index} style={styles.row}>
					<View key={index} style={styles.column}>
						<Text style={styles.label}>{item.label}</Text>
						{item.showLevelUp && (
							<Pressable onPress={onLevelUpPress}>
								<Text style={styles.levelUp}>Level Up Ratio{'>'}</Text>
							</Pressable>
						)}
					</View>
					<View style={styles.rightContent}>
						<Text style={styles.rate}>{item.rate}</Text>
					</View>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.lg,
	},
	column: {
		flexDirection: 'column',
	},
	title: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#000',
		marginBottom: spacing.md,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: spacing.sm,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
	},
	rightContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	rate: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
	levelUp: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#5F22D9',
		fontWeight: fontWeights.medium,
	},
})
