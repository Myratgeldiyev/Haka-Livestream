import type { RoomResponse } from '@/api/live-chat/room.types'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { PK_INVITE_COLORS, pkInviteStyles } from './pk-invite.styles'
import { PkInviteRoomRow } from './PkInviteRoomRow'

interface PkInviteRoomListProps {
	rooms: RoomResponse[]
	isLoading: boolean
	onInvite: (roomId: string) => void
	invitedRoomId: string | null
	bottomInset?: number
}

export function PkInviteRoomList({
	rooms,
	isLoading,
	onInvite,
	invitedRoomId,
	bottomInset = 0,
}: PkInviteRoomListProps) {
	if (isLoading) {
		return (
			<View style={pkInviteStyles.listContainer}>
				<ActivityIndicator
					color={PK_INVITE_COLORS.textPrimary}
					style={{ marginTop: 40 }}
				/>
			</View>
		)
	}

	if (rooms.length === 0) {
		return (
			<View style={pkInviteStyles.listContainer}>
				<Text style={pkInviteStyles.emptyText}>No rooms available</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={rooms}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<PkInviteRoomRow
					room={item}
					onInvite={onInvite}
					isInvited={invitedRoomId === item.id}
				/>
			)}
			contentContainerStyle={[
				pkInviteStyles.listContent,
				{ paddingBottom: bottomInset + 20 },
			]}
			style={pkInviteStyles.listContainer}
			showsVerticalScrollIndicator={false}
		/>
	)
}
