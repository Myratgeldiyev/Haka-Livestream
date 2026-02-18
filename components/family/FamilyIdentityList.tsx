import { spacing } from '@/constants/spacing'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import type { FamilyMember } from './types'
import { FamilyIdentityRow } from './FamilyIdentityRow'

const MOCK_MEMBERS_IDENTITY: FamilyMember[] = [
	{ id: '1', rank: 1, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true, xxWithDiamond: true }, exp: 0 },
	{ id: '2', rank: 2, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
	{ id: '3', rank: 3, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true, xxWithDiamond: true }, exp: 0 },
	{ id: '4', rank: 4, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
	{ id: '5', rank: 5, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true, xxWithDiamond: true }, exp: 0 },
	{ id: '6', rank: 6, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
	{ id: '7', rank: 7, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
	{ id: '8', rank: 8, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
	{ id: '9', rank: 9, name: 'MD SAMIR RIDER', tags: { level: 'Junior', xx: true }, exp: 0 },
]

interface FamilyIdentityListProps {
	members?: FamilyMember[]
}

export function FamilyIdentityList({ members = MOCK_MEMBERS_IDENTITY }: FamilyIdentityListProps) {
	return (
		<FlatList
			data={members}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <FamilyIdentityRow member={item} />}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
		/>
	)
}

const styles = StyleSheet.create({
	content: {
		paddingBottom: spacing.xxl,
	},
})
