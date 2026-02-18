import {
	enableLocalVideo as agoraEnableLocalVideo,
	leaveChannel,
	resetAgoraEngine,
} from '@/services/agora/agora.service'
import {
	LOCAL_VIDEO_STATE,
	REMOTE_VIDEO_STATE,
	type LivestreamConnectionSchema,
} from '@/types/livestream.types'

export async function toggleOwnerCamera(enabled: boolean): Promise<void> {
	await agoraEnableLocalVideo(enabled)
}

export async function leaveStream(): Promise<void> {
	await leaveChannel()
}

export async function resetForReconnect(): Promise<void> {
	await resetAgoraEngine()
}

export type SetLivestreamState = (
	update: Partial<LivestreamConnectionSchema>,
) => void
export type GetOwnerAgoraUid = () => number | null

export function createOnRemoteVideoStateChanged(
	set: SetLivestreamState,
	getOwnerAgoraUid: GetOwnerAgoraUid,
) {
	return (uid: number, state: number, _reason: number) => {
		if (state === REMOTE_VIDEO_STATE.DECODING) {
			set({
				ownerAgoraUid: uid,
				ownerVideoAvailable: true,
			})
		} else if (
			state === REMOTE_VIDEO_STATE.STOPPED ||
			state === REMOTE_VIDEO_STATE.FAILED
		) {
			const current = getOwnerAgoraUid()
			if (current !== null && uid === current) {
				set({ ownerVideoAvailable: false })
			}
		}
	}
}

export function createOnLocalVideoStateChanged(set: SetLivestreamState) {
	return (state: number, _errorCode: number) => {
		const enabled =
			state === LOCAL_VIDEO_STATE.CAPTURING ||
			state === LOCAL_VIDEO_STATE.ENCODING
		set({ localVideoEnabled: enabled })
	}
}
