import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { InviteMicEmpty } from './InviteMicEmpty'
import { InviteMicListItem } from './InviteMicListItem'
import { InviteMicUser } from './types'

interface InviteMicListProps {
	users: InviteMicUser[]
	onInvite: (userId: string) => void
}

export function InviteMicList({ users, onInvite }: InviteMicListProps) {
	if (users.length === 0) {
		return <InviteMicEmpty />
	}

	return (
		<FlatList
			data={users}
			keyExtractor={item => item.user_id}
			renderItem={({ item }) => (
				<InviteMicListItem user={item} onInvite={onInvite} />
			)}
			style={styles.list}
			showsVerticalScrollIndicator={false}
		/>
	)
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
})
