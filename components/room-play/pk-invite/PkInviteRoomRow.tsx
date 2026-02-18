import type { RoomResponse } from '@/api/live-chat/room.types'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { pkInviteStyles } from './pk-invite.styles'
import { PkInviteButton } from './PkInviteButton'

interface PkInviteRoomRowProps {
	room: RoomResponse
	onInvite: (roomId: string) => void
	isInvited: boolean
}

export function PkInviteRoomRow({
	room,
	onInvite,
	isInvited,
}: PkInviteRoomRowProps) {
	const handleInvite = () => {
		onInvite(room.id)
	}

	return (
		<View style={pkInviteStyles.row}>
			{room.room_image ? (
				<Image
					source={{ uri: room.room_image }}
					style={pkInviteStyles.roomImage}
				/>
			) : (
				<View style={pkInviteStyles.imagePlaceholder} />
			)}
			<View style={pkInviteStyles.roomInfo}>
				<Text style={pkInviteStyles.roomTitle} numberOfLines={1}>
					{room.title || 'Untitled Room'}
				</Text>
				<Text style={pkInviteStyles.roomId}>ID: {room.display_id}</Text>
			</View>
			<PkInviteButton onPress={handleInvite} isInvited={isInvited} />
		</View>
	)
}
