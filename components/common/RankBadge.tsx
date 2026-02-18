import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { typography } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface RankBadgeProps {
	rank: number
	location?: string
}

export const RankBadge: React.FC<RankBadgeProps> = ({
	rank,
	location = 'Delhi',
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.icon}>👑</Text>
			<Text style={styles.text}>
				{location} No. {rank}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.primary,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: 16,
	},
	icon: {
		fontSize: typography.sizes.sm,
		marginRight: spacing.xs,
	},
	text: {
		fontSize: typography.sizes.xs,
		fontWeight: typography.weights.semibold,
		color: colors.white,
	},
})
