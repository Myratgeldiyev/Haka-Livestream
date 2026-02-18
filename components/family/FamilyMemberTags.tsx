import { fontSizes, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { FamilyMemberTags as FamilyMemberTagsType } from './types'

function DiamondIcon({ size = 10, color = '#6B7280' }: { size?: number; color?: string }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
			<Path
				d="M6 1l5 5-5 5L1 6l5-5z"
				fill={color}
			/>
		</Svg>
	)
}

interface FamilyMemberTagsProps {
	tags: FamilyMemberTagsType
}

export function FamilyMemberTags({ tags }: FamilyMemberTagsProps) {
	return (
		<View style={styles.container}>
			{tags.level != null && (
				<View style={styles.tagJunior}>
					<DiamondIcon color="#9CA3AF" />
					<Text style={styles.tagJuniorText}>{tags.level}</Text>
				</View>
			)}
			{tags.xx !== false && (
				<View style={[styles.tagXX, tags.xxWithDiamond && styles.tagXXWithDiamond]}>
					{tags.xxWithDiamond && <DiamondIcon size={8} color="#60A5FA" />}
					<Text style={styles.tagXXText}>XX</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.xs,
		marginTop: spacing.xs,
	},
	tagJunior: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: '#E5E7EB',
		paddingVertical: 2,
		paddingHorizontal: spacing.sm,
		borderRadius: 12,
	},
	tagJuniorText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#6B7280',
	},
	tagXX: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: '#BFDBFE',
		paddingVertical: 2,
		paddingHorizontal: spacing.sm,
		borderRadius: 12,
	},
	tagXXWithDiamond: {},
	tagXXText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#000',
	},
})
