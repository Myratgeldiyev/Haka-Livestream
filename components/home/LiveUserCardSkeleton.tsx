import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

const GRID_GAP = spacing.md
const SKELETON_BG = '#2a2a2a'
const SKELETON_LINE = '#353535'

export function LiveUserCardSkeleton() {
	const { width: screenWidth } = useWindowDimensions()
	const horizontalPadding = spacing.lg * 2
	const cardWidth = (screenWidth - horizontalPadding - GRID_GAP) / 2
	const cardHeight = cardWidth * 0.95

	return (
		<View
			style={[
				styles.container,
				{
					width: cardWidth,
					height: cardHeight,
					marginBottom: GRID_GAP,
				},
			]}
		>
			<View style={styles.contentPlaceholder}>
				<View style={styles.lineRow}>
					<View style={[styles.line, styles.lineShort]} />
					<View style={[styles.line, styles.lineTiny]} />
				</View>
				<View style={[styles.line, styles.lineMedium]} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: spacing.lg,
		overflow: 'hidden',
		backgroundColor: SKELETON_BG,
	},
	contentPlaceholder: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.md,
	},
	lineRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	line: {
		height: 10,
		borderRadius: 4,
		backgroundColor: SKELETON_LINE,
	},
	lineShort: {
		width: '50%',
	},
	lineTiny: {
		width: '25%',
	},
	lineMedium: {
		width: '60%',
	},
})
