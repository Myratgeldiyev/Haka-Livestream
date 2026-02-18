import { getLevelBadgeSource } from '@/constants/levelBadges'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface LevelBadgeProps {
	level?: number
}

export function LevelBadge({ level }: LevelBadgeProps) {
	if (level == null || !getLevelBadgeSource(level)) return null

	return (
		<View style={styles.infoContainer}>
			<Image
				source={getLevelBadgeSource(level)!}
				style={styles.levelBadge}
				resizeMode='contain'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	infoContainer: {
		flexDirection: 'row',
		gap: spacing.xs,
	},
	levelBadge: {
		width: 32,
		height: 32,
	},
})
