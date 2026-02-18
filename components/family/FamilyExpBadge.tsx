import { fontSizes, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

function ExpStarIcon({ size = 28 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
			<Path
				d="M14 2l3 8 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1 3-8z"
				stroke="#EAB308"
				strokeWidth={1.5}
				fill="#FEF08A"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

interface FamilyExpBadgeProps {
	exp: number
}

export function FamilyExpBadge({ exp }: FamilyExpBadgeProps) {
	return (
		<View style={styles.container}>
			<View style={styles.badgeWrap}>
				<ExpStarIcon />
				<Text style={styles.expLabel}>exp</Text>
			</View>
			<Text style={styles.expValue}>{exp.toLocaleString('en-US')}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	badgeWrap: {
		position: 'relative',
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	expLabel: {
		position: 'absolute',
		fontSize: 8,
		fontWeight: '600',
		color: '#000',
	},
	expValue: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
	},
})
