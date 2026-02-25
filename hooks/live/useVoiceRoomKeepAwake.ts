import { useEffect } from 'react'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'

import { useLiveChatStore } from '@/store/liveChat.store'

const KEEP_AWAKE_TAG = 'voice-room'

/**
 * Keeps the device screen awake while the user is connected to a voice chat room.
 * Screen returns to normal sleep behaviour after leaving the room.
 */
export function useVoiceRoomKeepAwake() {
	const isJoined = useLiveChatStore(s => s.isJoined)
	const roomId = useLiveChatStore(s => s.roomId)
	const minimizedRoomId = useLiveChatStore(s => s.minimizedRoomId)

	const shouldKeepAwake = isJoined && (!!roomId || !!minimizedRoomId)

	useEffect(() => {
		if (shouldKeepAwake) {
			try {
				activateKeepAwake(KEEP_AWAKE_TAG)
			} catch {
				// If native module fails (e.g. dev tools), ignore – app should continue working.
			}
		} else {
			try {
				deactivateKeepAwake(KEEP_AWAKE_TAG)
			} catch {
				// Ignore – best-effort cleanup.
			}
		}

		return () => {
			try {
				deactivateKeepAwake(KEEP_AWAKE_TAG)
			} catch {
				// Ignore – component unmount cleanup.
			}
		}
	}, [shouldKeepAwake])
}

