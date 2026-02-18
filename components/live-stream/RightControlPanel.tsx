import type { LiveStreamUserRole } from '@/store/liveStream.store'
import { LIVE_STREAM } from '@/constants/liveStream'
import { useAuthStore } from '@/store/auth.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StreamSlotItem } from './StreamSlotItem'

interface RightControlPanelProps {
	streamId?: string
	userRole?: LiveStreamUserRole
}

export function RightControlPanel({
	streamId,
	userRole = 'listener',
}: RightControlPanelProps) {
	const [openSlotNumber, setOpenSlotNumber] = useState<number | null>(null)

	const currentUser = useAuthStore(s => s.user)
	const currentUserId = currentUser?.user_id != null ? String(currentUser.user_id) : null

	const streamSlots = useLiveStreamStore(s => s.streamSlots)
	const setStreamSlotsFromResponse = useLiveStreamStore(s => s.setStreamSlotsFromResponse)
	const moveCurrentUserToSlot = useLiveStreamStore(s => s.moveCurrentUserToSlot)
	const setStreamSlotLock = useLiveStreamStore(s => s.setStreamSlotLock)
	const getStreamUsers = useLiveStreamStore(s => s.getStreamUsers)
	const requestSpeakerRole = useLiveStreamStore(s => s.requestSpeakerRole)
	const muteUser = useLiveStreamStore(s => s.muteUser)
	const unmuteUser = useLiveStreamStore(s => s.unmuteUser)
	const removeUser = useLiveStreamStore(s => s.removeUser)

	const isCurrentUserAlreadySeated = useCallback(() => {
		if (!currentUserId) return false
		for (const n of [1, 2, 3]) {
			if (streamSlots[n]?.user?.id === currentUserId) return true
		}
		return false
	}, [currentUserId, streamSlots])

	const handleTakeSeat = useCallback(
		async (slotNumber: number) => {
			if (!streamId) return
			if (currentUserId && isCurrentUserAlreadySeated()) {
				moveCurrentUserToSlot(currentUserId, slotNumber)
				return
			}
			try {
				await requestSpeakerRole(streamId)
			} catch {
				// Backend may still have updated; we refresh slots below
			}
			try {
				const raw = await getStreamUsers(streamId)
				setStreamSlotsFromResponse(raw)
			} catch {
				// ignore refresh error
			}
		},
		[
			streamId,
			currentUserId,
			isCurrentUserAlreadySeated,
			moveCurrentUserToSlot,
			requestSpeakerRole,
			getStreamUsers,
			setStreamSlotsFromResponse,
		],
	)

	const handleLock = useCallback((slotNumber: number) => {
		setStreamSlotLock(slotNumber, true)
	}, [setStreamSlotLock])

	const handleUnlock = useCallback((slotNumber: number) => {
		setStreamSlotLock(slotNumber, false)
	}, [setStreamSlotLock])

	const handleMuteUser = useCallback(
		(userId: string) => {
			if (streamId) muteUser(streamId, userId).catch(() => {})
		},
		[streamId, muteUser],
	)

	const handleUnmuteUser = useCallback(
		(userId: string) => {
			if (streamId) unmuteUser(streamId, userId).catch(() => {})
		},
		[streamId, unmuteUser],
	)

	const handleRemoveUser = useCallback(
		(userId: string) => {
			if (streamId) removeUser(streamId, userId).catch(() => {})
		},
		[streamId, removeUser],
	)

	const roleForSlot = userRole as 'owner' | 'admin' | 'listener'

	if (!streamId) {
		return (
			<View style={styles.container}>
				{[1, 2, 3].map(n => (
					<StreamSlotItem
						key={n}
						slotNumber={n}
						seat={streamSlots[n]}
						streamId={undefined}
						userRole={roleForSlot}
						isOpen={openSlotNumber === n}
						onOpenChange={setOpenSlotNumber}
						itemSize={ICON_SIZE}
					/>
				))}
			</View>
		)
	}

	return (
		<View style={styles.container}>
			{[1, 2, 3].map(n => (
				<StreamSlotItem
					key={n}
					slotNumber={n}
					seat={streamSlots[n]}
					streamId={streamId}
					userRole={roleForSlot}
					isOpen={openSlotNumber === n}
					onOpenChange={setOpenSlotNumber}
					onLock={handleLock}
					onUnlock={handleUnlock}
					onTakeSeat={handleTakeSeat}
					onMuteUser={handleMuteUser}
					onUnmuteUser={handleUnmuteUser}
					onRemoveUser={handleRemoveUser}
					itemSize={ICON_SIZE}
				/>
			))}
		</View>
	)
}

const ICON_SIZE = 44

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: LIVE_STREAM.spacing.rightControlsTop,
		right: LIVE_STREAM.spacing.rightControlsRight,
		flexDirection: 'column',
		gap: 10,
	},
})
