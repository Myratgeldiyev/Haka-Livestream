import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { GameRankingTabItemProps } from '../../types/game-ranking'
import { COLORS, FONT_SIZES, SPACING } from './styles'
export function GameRankingTabItem({
	label,
	isActive,
	onPress,
}: GameRankingTabItemProps) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Text style={[styles.label, isActive && styles.labelActive]}>
				{label}
			</Text>
			{isActive && <View style={styles.indicator} />}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: SPACING.sm,
	},
	label: {
		fontSize: FONT_SIZES.md,
		fontWeight: '500',
		color: COLORS.textSecondary,
	},
	labelActive: {
		color: COLORS.textPrimary,
		fontWeight: '700',
	},
	indicator: {
		width: 24,
		height: 3,
		backgroundColor: COLORS.tabIndicator,
		borderRadius: 2,
		marginTop: SPACING.xs,
	},
})
