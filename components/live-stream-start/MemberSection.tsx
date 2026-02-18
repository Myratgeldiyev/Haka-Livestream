import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { MemberItem, MemberItemProps } from './MemberItem'

type MemberData = Omit<MemberItemProps, 'onPress' | 'isHighlighted'> & {
	id: string
}

interface MemberSectionProps {
	members?: MemberData[]
	onMemberPress?: (memberId: string) => void
}

const DEFAULT_MEMBERS: MemberData[] = [
	{ id: '2', username: 'Mariam', level: 35, isAdmin: true },
	{ id: '3', username: 'Mariam', level: 35, isAdmin: true },
	{ id: '4', username: 'Mariam', level: 35, isAdmin: true },
	{ id: '5', username: 'Mariam', level: 35, isAdmin: false },
	{ id: '6', username: 'Mariam', level: 35, isAdmin: false },
]

export function MemberSection({
	members = DEFAULT_MEMBERS,
	onMemberPress,
}: MemberSectionProps) {
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
		>
			{members.map((member, index) => (
				<MemberItem
					key={member.id}
					username={member.username}
					level={member.level}
					avatar={member.avatar}
					isAdmin={member.isAdmin}
					isHighlighted={index % 2 === 1}
					onPress={() => onMemberPress?.(member.id)}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingBottom: 20,
	},
})
