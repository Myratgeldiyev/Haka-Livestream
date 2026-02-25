import { CategoryChip } from '@/components/common/CategoryChip'
import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GameCard } from '../common/GameCard'
import { JoinCallCard } from '../common/JoinCallCard'
import { RewardCard } from '../common/RewardCard'

const categories = [
	{ id: '1', label: 'All', icon: '🎵', color: colors.categoryOrange },
	{ id: '2', label: 'WeChat', icon: '💬', color: colors.categoryPink },
	{ id: '3', label: 'Game', icon: '🎮', color: colors.categoryBlue },
	{ id: '4', label: 'Music', icon: '🎵', color: colors.categoryPurple },
]

export const CategoryFilters: React.FC = () => {
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.chipsRow}
			>
				{categories.map(category => (
					<CategoryChip
						key={category.id}
						label={category.label}
						icon={category.icon}
						backgroundColor={category.color}
					/>
				))}
			</ScrollView>

			<View style={styles.cardsRow}>
				<JoinCallCard />
				<RewardCard />
				<GameCard />
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		paddingVertical: spacing.sm,
	},

	chipsRow: {
		paddingHorizontal: spacing.md,
		gap: spacing.sm,
	},

	cardsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: spacing.lg,
		marginTop: spacing.sm,
		gap: spacing.sm,
	},
})
