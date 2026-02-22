import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LEVEL_COLORS, LEVEL_LAYOUT } from './level.constants'
import type { LevelExplanationProps } from './level.types'

export function LevelExplanation({
	title,
	description,
}: LevelExplanationProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: LEVEL_LAYOUT.horizontalPadding,
		marginTop: 8,
		marginBottom: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: LEVEL_COLORS.text.primary,
		marginBottom: 6,
	},
	description: {
		fontSize: 14,
		color: LEVEL_COLORS.text.primary,
		lineHeight: 20,
	},
})
