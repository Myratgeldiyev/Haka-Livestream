import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
	COLORS,
	FONT_SIZES,
	SPACING,
} from './room-play-styles'
import type { RoomPlayHeaderProps } from './room-play.types'

export function RoomPlayHeader({ title }: RoomPlayHeaderProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: SPACING.xl,
		paddingTop: SPACING.md,
		paddingBottom: SPACING.lg,
	},
	title: {
		fontSize: FONT_SIZES.title,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
})
