import { useLiveChatStore } from '@/store/liveChat.store'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { pkInviteStyles } from './pk-invite.styles'
import { PkInviteHeader } from './PkInviteHeader'
import { PkInviteRoomList } from './PkInviteRoomList'

interface PkInviteRoomScreenProps {
	onBack: () => void
}

export function PkInviteRoomScreen({ onBack }: PkInviteRoomScreenProps) {
	const insets = useSafeAreaInsets()
	const rooms = useLiveChatStore(s => s.rooms)
	const isConnecting = useLiveChatStore(s => s.isConnecting)
	const fetchRooms = useLiveChatStore(s => s.fetchRooms)
	const pkInvitedRoomId = useLiveChatStore(s => s.pkInvitedRoomId)
	const setPkInvitedRoomId = useLiveChatStore(s => s.setPkInvitedRoomId)

	useEffect(() => {
		fetchRooms()
	}, [fetchRooms])

	const handleInvite = (roomId: string) => {
		setPkInvitedRoomId(roomId)
	}

	return (
		<View style={pkInviteStyles.screen}>
			<PkInviteHeader onBack={onBack} topInset={insets.top} />
			<PkInviteRoomList
				rooms={rooms}
				isLoading={isConnecting}
				onInvite={handleInvite}
				invitedRoomId={pkInvitedRoomId}
				bottomInset={insets.bottom}
			/>
		</View>
	)
}
