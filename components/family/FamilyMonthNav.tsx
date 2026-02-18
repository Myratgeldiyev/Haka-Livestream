import { fontSizes, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

function ChevronLeft({ size = 20 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M15 18l-6-6 6-6"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

function ChevronRight({ size = 20 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M9 18l6-6-6-6"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

interface FamilyMonthNavProps {
	monthLabel: string
	onPrev: () => void
	onNext: () => void
}

export function FamilyMonthNav({
	monthLabel,
	onPrev,
	onNext,
}: FamilyMonthNavProps) {
	return (
		<View style={styles.container}>
			<Pressable onPress={onPrev} style={styles.chevron} hitSlop={12}>
				<ChevronLeft />
			</Pressable>
			<Text style={styles.label}>{monthLabel}</Text>
			<Pressable onPress={onNext} style={styles.chevron} hitSlop={12}>
				<ChevronRight />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.lg,
		marginBottom: spacing.lg,
	},
	chevron: {
		padding: spacing.xs,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		minWidth: 72,
		textAlign: 'center',
	},
})
