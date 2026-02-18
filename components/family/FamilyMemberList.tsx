import { spacing } from '@/constants/spacing'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import type { FamilyMember } from './types'
import { FamilyMemberRow } from './FamilyMemberRow'

const MOCK_MEMBERS: FamilyMember[] = [
	{
		id: '1',
		rank: 1,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true, xxWithDiamond: true },
		exp: 12345,
	},
	{
		id: '2',
		rank: 2,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 11200,
	},
	{
		id: '3',
		rank: 3,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true, xxWithDiamond: true },
		exp: 10800,
	},
	{
		id: '4',
		rank: 4,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 9500,
	},
	{
		id: '5',
		rank: 5,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true, xxWithDiamond: true },
		exp: 8900,
	},
	{
		id: '6',
		rank: 6,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 7600,
	},
	{
		id: '7',
		rank: 7,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 6200,
	},
	{
		id: '8',
		rank: 8,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 5100,
	},
	{
		id: '9',
		rank: 9,
		name: 'MD SAMIR RIDER',
		tags: { level: 'Junior', xx: true },
		exp: 4200,
	},
]

interface FamilyMemberListProps {
	members?: FamilyMember[]
}

export function FamilyMemberList({ members = MOCK_MEMBERS }: FamilyMemberListProps) {
	return (
		<FlatList
			data={members}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <FamilyMemberRow member={item} />}
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
