import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FamilyMemberTags } from './FamilyMemberTags'
import type { FamilyMember } from './types'

interface FamilyIdentityRowProps {
	member: FamilyMember
}

export function FamilyIdentityRow({ member }: FamilyIdentityRowProps) {
	const getInitials = (name: string) =>
		name
			.split(' ')
			.map(s => s.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2)

	return (
		<View style={styles.row}>
			{member.avatarUri ? (
				<Image source={{ uri: member.avatarUri }} style={styles.avatar} />
			) : (
				<View style={[styles.avatar, styles.avatarPlaceholder]}>
					<Text style={styles.avatarInitial}>{getInitials(member.name)}</Text>
				</View>
			)}
			<View style={styles.nameTagsWrap}>
				<Text style={styles.name} numberOfLines={1}>
					{member.name}
				</Text>
				<FamilyMemberTags tags={member.tags} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: spacing.listItem.paddingVertical,
		paddingHorizontal: spacing.screen.horizontal,
		marginHorizontal: spacing.screen.horizontal,
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		backgroundColor: '#E5E7EB',
	},
	avatarPlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarInitial: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#6B7280',
	},
	nameTagsWrap: {
		flex: 1,
		marginLeft: spacing.md,
		minWidth: 0,
	},
	name: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
})
