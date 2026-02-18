import { initializeAuth } from '@/api/axios'
import { ChatMessage, type RoomUsers } from '@/api/live-chat/room.types'
import { livesApi } from '@/api/live-stream/lives.api'
import {
	CreateStreamBattleRequest,
	EnterStreamResponse,
	LiveStreamDetailsResponse,
	LiveStreamResponse,
	UpdateStreamRequest,
	UploadStreamRoomImagePayload,
} from '@/api/live-stream/lives.types'
import {
	joinChannelAsViewer,
	joinChannelWithVideo,
	muteLocalAudio,
	resetAgoraEngine,
	unmuteLocalAudio,
} from '@/services/agora/agora.service'
import { API_CONFIG } from '@/api/endpoints'
import { Camera } from 'expo-camera'
import { create } from 'zustand'

/** Resolve profile_picture to absolute URL for Image source. */
function resolveProfilePicture(pic: string | undefined | null): string {
	if (!pic || typeof pic !== 'string') return ''
	if (pic.startsWith('http://') || pic.startsWith('https://')) return pic
	const base = API_CONFIG.BASE_URL ?? ''
	const origin = base.replace(/\/api\/?$/, '')
	return origin + (pic.startsWith('/') ? pic : `/${pic}`)
}

/** Normalize getStreamUsers API response to RoomUsers[] (handles array or { results } and coerces user_id). */
function normalizeToRoomUsers(raw: unknown): RoomUsers[] {
	if (Array.isArray(raw)) {
		return raw.map((item: any) => ({
			user: {
				username: item?.user?.username ?? '',
				user_id: String(item?.user?.user_id ?? item?.user_id ?? ''),
				profile_picture: item?.user?.profile_picture ?? '',
				is_online: item?.user?.is_online ?? false,
				online_status: item?.user?.online_status ?? '',
			},
			role: item?.role ?? 'listener',
			joined_at: item?.joined_at ?? '',
			is_muted: item?.is_muted ?? false,
		}))
	}
	if (raw && typeof raw === 'object' && 'results' in raw && Array.isArray((raw as any).results)) {
		return normalizeToRoomUsers((raw as any).results)
	}
	return []
}

/** Current user's role in the stream (owner / admin / listener). */
export type LiveStreamUserRole = 'owner' | 'admin' | 'listener'

/** User shown in a stream speaker slot (right panel). */
export type StreamSlotUser = {
	id: string
	username: string
	avatar: string
	isMuted: boolean
}

/** Single speaker slot state for RightControlPanel. */
export type StreamSlot = {
	status: 'locked' | 'unlocked'
	user: StreamSlotUser | null
	isTurnedOff?: boolean
}

function joinChannelWithVideoPromise(
	appId: string,
	token: string,
	channel: string,
	uid: number,
): Promise<void> {
	return new Promise((resolve, reject) => {
		joinChannelWithVideo(appId, token, channel, uid, resolve, reject)
	})
}

function joinChannelAsViewerPromise(
	appId: string,
	token: string,
	channel: string,
	uid: number,
): Promise<void> {
	return new Promise((resolve, reject) => {
		joinChannelAsViewer(appId, token, channel, uid, resolve, reject)
	})
}

function mapStreamMessagesRaw(raw: unknown): ChatMessage[] {
	const list = Array.isArray(raw) ? raw : []
	return list.map((msg: any, i: number) => ({
		id: msg.id ?? String(i),
		text: msg.content ?? msg.text ?? '',
		time: msg.time ?? msg.created_at ?? '',
		isMe: false,
		user: msg.user
			? {
					username: msg.user.username ?? null,
					user_id: msg.user.user_id ?? 0,
					profile_picture: msg.user.profile_picture ?? '',
					is_online: !!msg.user.is_online,
					online_status: msg.user.online_status ?? '',
				}
			: undefined,
	}))
}

	interface LiveStreamState {
	liveStream: LiveStreamResponse | null
	streamDetails: LiveStreamDetailsResponse | null
	/** Role from enterStream API (when joining as viewer). Owner is set in startStream. */
	currentStreamRole: LiveStreamUserRole | null
	/** Current user mute state in stream (for Voice On/Off UI). */
	streamMuted: boolean
	setStreamMuted: (value: boolean) => void
	minimizedStreamId: string | null
	minimizedStreamImage: string | null
	minimizedStreamTitle: string | null
	setMinimizedStream: (streamId: string, imageUrl: string, title?: string) => void
	clearMinimizedStream: () => void
	pendingMinimizedStream: {
		streamId: string
		imageUrl: string
		title: string
	} | null
	setPendingMinimizedStream: (data: {
		streamId: string
		imageUrl: string
		title: string
	} | null) => void
	streamMessages: ChatMessage[]
	/** Speaker slots 1–3 for RightControlPanel. Client-only lock; users from getStreamUsers. */
	streamSlots: Record<number, StreamSlot>
	setStreamSlotsFromUsers: (users: RoomUsers[]) => void
	/** Normalize raw getStreamUsers response and update streamSlots. */
	setStreamSlotsFromResponse: (raw: unknown) => void
	/** Move current user to another slot without API (already speaker). */
	moveCurrentUserToSlot: (currentUserId: string, targetSlotNumber: number) => void
	setStreamSlotLock: (slotNumber: number, locked: boolean) => void
	isLoading: boolean
	isJoined: boolean
	error: string | null
	/** Viewer's Agora connection info (when joining as viewer, not owner) */
	viewerRtcToken: string | null
	viewerChannelName: string | null
	viewerUid: number | null
	/** Agora UID of the stream owner (for remote video rendering in viewers) */
	ownerAgoraUid: number | null
	setOwnerAgoraUid: (uid: number | null) => void
	/** Owner's video availability (from Agora events) - true when owner's video is ON and available */
	ownerVideoAvailable: boolean
	setOwnerVideoAvailable: (available: boolean) => void
	/** Owner's local video availability (for owner's own state) */
	localOwnerVideoAvailable: boolean
	setLocalOwnerVideoAvailable: (available: boolean) => void
	startStream: () => Promise<LiveStreamResponse>
	fetchStreamDetails: (streamId: string) => Promise<LiveStreamDetailsResponse>
	clearStream: () => void
	leaveRoom: (streamId: string) => Promise<unknown>
	enterStream: (streamId: string) => Promise<unknown>
	addUserAsAdmin: (streamId: string, userId: string) => Promise<unknown>
	checkIfMusicIsPlaying: (streamId: string) => Promise<unknown>
	checkIfMuted: (streamId: string) => Promise<unknown>
	muteMyself: (streamId: string) => Promise<unknown>
	muteUser: (streamId: string, userId: string) => Promise<unknown>
	playMusic: (streamId: string) => Promise<unknown>
	removeUser: (streamId: string, userId: string) => Promise<unknown>
	removeUserFromAdmin: (streamId: string, userId: string) => Promise<unknown>
	requestSpeakerRole: (streamId: string) => Promise<unknown>
	stopMusic: (streamId: string) => Promise<unknown>
	getStreamUsers: (streamId: string) => Promise<unknown>
	toggleVideo: (streamId: string, enableVideo: boolean) => Promise<unknown>
	unmuteMyself: (streamId: string) => Promise<unknown>
	unmuteUser: (streamId: string, userId: string) => Promise<unknown>
	uploadRoomImage: (
		streamId: string,
		payload: UploadStreamRoomImagePayload,
	) => Promise<unknown>
	updateStream: (
		streamId: string,
		body: UpdateStreamRequest,
	) => Promise<LiveStreamDetailsResponse>
	getStreamsList: () => Promise<unknown>
	getNearbyLiveStreams: () => Promise<unknown>
	getStreamMessages: (streamId: string) => Promise<unknown>
	sendStreamMessage: (streamId: string, content: string) => Promise<unknown>
	createStreamBattle: (body: CreateStreamBattleRequest) => Promise<unknown>
	getStreamBattle: (id: string) => Promise<unknown>
	/** Synced from server (polling). When true, all clients see music as playing. */
	streamMusicPlaying: boolean
	setStreamMusicPlaying: (value: boolean) => void
	/** PK overlay open – owner sets; when backend supports, viewers get via polling. */
	streamPkOverlayOpen: boolean
	setStreamPkOverlayOpen: (value: boolean) => void
	/** PK battle active – owner sets; when backend supports, viewers get via polling. */
	streamPkBattleActive: boolean
	setStreamPkBattleActive: (value: boolean) => void
	/** Poll stream state (music, and when backend adds: PK). Updates store. */
	fetchStreamState: (streamId: string) => Promise<void>
}

export const useLiveStreamStore = create<LiveStreamState>(set => ({
	liveStream: null,
	streamDetails: null,
	currentStreamRole: null,
	streamMuted: false,
	setStreamMuted: (value: boolean) => set({ streamMuted: value }),
	minimizedStreamId: null,
	minimizedStreamImage: null,
	minimizedStreamTitle: null,
	setMinimizedStream: (streamId: string, imageUrl: string, title?: string) =>
		set({
			minimizedStreamId: streamId,
			minimizedStreamImage: imageUrl,
			minimizedStreamTitle: title ?? null,
		}),
	clearMinimizedStream: () =>
		set({
			minimizedStreamId: null,
			minimizedStreamImage: null,
			minimizedStreamTitle: null,
		}),
	pendingMinimizedStream: null,
	setPendingMinimizedStream: (data) => set({ pendingMinimizedStream: data }),
	streamMessages: [],
	streamSlots: {},
	setStreamSlotsFromUsers: (users: RoomUsers[]) => {
		set(state => {
			const slots: Record<number, StreamSlot> = {}
			const ordered = [...users].sort((a, b) => {
				const order = { owner: 0, admin: 1, speaker: 2, listener: 3 }
				return (order[a.role] ?? 3) - (order[b.role] ?? 3)
			})
			for (let i = 0; i < 3; i++) {
				const n = i + 1
				const u = ordered[i]
				const existing = state.streamSlots[n]
				slots[n] = {
					status: existing?.status ?? 'unlocked',
					user: u
						? {
								id: String(u.user.user_id),
								username: u.user.username ?? '',
								avatar: resolveProfilePicture(u.user.profile_picture),
								isMuted: u.is_muted ?? false,
							}
						: null,
				}
			}
			return { streamSlots: { ...state.streamSlots, ...slots } }
		})
	},
	setStreamSlotsFromResponse: (raw: unknown) =>
		set(state => {
			const users = normalizeToRoomUsers(raw)
			const slots: Record<number, StreamSlot> = {}
			const ordered = [...users].sort((a, b) => {
				const order = { owner: 0, admin: 1, speaker: 2, listener: 3 }
				return (order[a.role] ?? 3) - (order[b.role] ?? 3)
			})
			for (let i = 0; i < 3; i++) {
				const n = i + 1
				const u = ordered[i]
				const existing = state.streamSlots[n]
				slots[n] = {
					status: existing?.status ?? 'unlocked',
					user: u
						? {
								id: String(u.user.user_id),
								username: u.user.username ?? '',
								avatar: resolveProfilePicture(u.user.profile_picture),
								isMuted: u.is_muted ?? false,
							}
						: null,
				}
			}
			return { streamSlots: { ...state.streamSlots, ...slots } }
		}),
	setStreamSlotLock: (slotNumber: number, locked: boolean) =>
		set(state => ({
			streamSlots: {
				...state.streamSlots,
				[slotNumber]: {
					...(state.streamSlots[slotNumber] ?? { status: 'unlocked', user: null }),
					status: locked ? 'locked' : 'unlocked',
				},
			},
		})),
	moveCurrentUserToSlot: (currentUserId: string, targetSlotNumber: number) =>
		set(state => {
			const slots = { ...state.streamSlots }
			const currentId = String(currentUserId)
			let fromSlot: number | null = null
			for (const n of [1, 2, 3]) {
				if (slots[n]?.user?.id === currentId) {
					fromSlot = n
					break
				}
			}
			if (fromSlot == null || fromSlot === targetSlotNumber) return state
			const currentUser = slots[fromSlot]?.user ?? null
			if (!currentUser) return state
			const userInTarget = slots[targetSlotNumber]?.user ?? null
			const existingFrom = slots[fromSlot] ?? { status: 'unlocked' as const, user: null }
			const existingTarget = slots[targetSlotNumber] ?? { status: 'unlocked' as const, user: null }
			slots[fromSlot] = { ...existingFrom, user: userInTarget }
			slots[targetSlotNumber] = { ...existingTarget, user: currentUser }
			return { streamSlots: slots }
		}),
	isLoading: false,
	isJoined: false,
	error: null,
	viewerRtcToken: null,
	viewerChannelName: null,
	viewerUid: null,
	ownerAgoraUid: null,
	setOwnerAgoraUid: (uid: number | null) => set({ ownerAgoraUid: uid }),
	ownerVideoAvailable: false,
	setOwnerVideoAvailable: (available: boolean) => set({ ownerVideoAvailable: available }),
	localOwnerVideoAvailable: false,
	setLocalOwnerVideoAvailable: (available: boolean) => set({ localOwnerVideoAvailable: available }),

	streamMusicPlaying: false,
	setStreamMusicPlaying: (value: boolean) => set({ streamMusicPlaying: value }),
	streamPkOverlayOpen: false,
	setStreamPkOverlayOpen: (value: boolean) => set({ streamPkOverlayOpen: value }),
	streamPkBattleActive: false,
	setStreamPkBattleActive: (value: boolean) => set({ streamPkBattleActive: value }),

	fetchStreamState: async (streamId: string) => {
		try {
			const res = await livesApi.checkIfMusicIsPlaying(streamId) as { is_playing?: boolean }
			set({ streamMusicPlaying: !!res?.is_playing })
		} catch {
			// Non-fatal; keep previous state
		}
	},

	startStream: async () => {
		try {
			set({ isLoading: true, error: null })

			const permission = await Camera.requestCameraPermissionsAsync()
			if (permission.status !== 'granted') {
				throw new Error('Camera permission denied')
			}

			await initializeAuth()
			await resetAgoraEngine()

			const liveStream = await livesApi.startStream({
				title: 'Live',
				description: '',
			})
			console.log(
				'[startStream] API response:',
				JSON.stringify(liveStream, null, 2),
			)
			const uid = Number(liveStream.uid)
			if (Number.isNaN(uid)) throw new Error('Invalid UID from startStream')

			set({
				liveStream,
				currentStreamRole: 'owner',
				ownerAgoraUid: uid,
			})

			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
			await joinChannelWithVideoPromise(
				appId,
				liveStream.rtc_token,
				liveStream.channel_name,
				uid,
			)

			set({ isJoined: true, localOwnerVideoAvailable: true })
			return liveStream
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to start stream'
			set({ error: message })
			throw e
		} finally {
			set({ isLoading: false })
		}
	},

	fetchStreamDetails: async (streamId: string) => {
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'liveStream.store:fetchStreamDetails:entry',
				message: 'fetchStreamDetails called',
				data: { streamId },
				timestamp: Date.now(),
				hypothesisId: 'H1_H2',
			}),
		}).catch(() => {})
		try {
			set({ error: null })
			await initializeAuth()
			const streamDetails = await livesApi.getStreamDetails(streamId)
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'liveStream.store:fetchStreamDetails:success',
						message: 'fetchStreamDetails success',
						data: {
							owner_user_id: streamDetails?.owner?.user_id,
							hasOwner: !!streamDetails?.owner,
						},
						timestamp: Date.now(),
						hypothesisId: 'H4',
					}),
				},
			).catch(() => {})
			set({ streamDetails, error: null })
			return streamDetails
		} catch (e: unknown) {
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'liveStream.store:fetchStreamDetails:catch',
						message: 'fetchStreamDetails failed',
						data: { error: String(e) },
						timestamp: Date.now(),
						hypothesisId: 'H2',
					}),
				},
			).catch(() => {})
			const message =
				e instanceof Error ? e.message : 'Failed to fetch stream details'
			set({ error: message })
			throw e
		}
	},

	clearStream: () =>
		set({
			liveStream: null,
			streamDetails: null,
			currentStreamRole: null,
			streamMuted: false,
			streamMessages: [],
			streamSlots: {},
			streamMusicPlaying: false,
			streamPkOverlayOpen: false,
			streamPkBattleActive: false,
			error: null,
			isJoined: false,
			viewerRtcToken: null,
			viewerChannelName: null,
			viewerUid: null,
			ownerAgoraUid: null,
			ownerVideoAvailable: false,
			localOwnerVideoAvailable: false,
		}),

	leaveRoom: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.leaveRoom(streamId)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to leave room'
			set({ error: message })
			throw e
		}
	},

	enterStream: async (streamId: string) => {
		try {
			set({ error: null })
			await initializeAuth()
			await resetAgoraEngine()

			const res = await livesApi.enterStream(streamId) as EnterStreamResponse
			const role = res?.role
			if (role === 'owner' || role === 'admin' || role === 'listener') {
				set({ currentStreamRole: role })
			} else {
				set({ currentStreamRole: 'listener' })
			}

			// Join channel for viewer with Agora connection info
			const uid = Number(res.uid)
			if (Number.isNaN(uid)) {
				throw new Error('Invalid UID from enterStream')
			}

			set({
				viewerRtcToken: res.rtc_token,
				viewerChannelName: res.channel_name,
				viewerUid: uid,
			})

			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
			await joinChannelAsViewerPromise(
				appId,
				res.rtc_token,
				res.channel_name,
				uid,
			)

			set({ isJoined: true })

			return res
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to enter stream'
			set({ error: message })
			throw e
		}
	},

	addUserAsAdmin: async (streamId: string, userId: string) => {
		try {
			set({ error: null })
			return await livesApi.addUserAsAdmin(streamId, { user_id: userId })
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to add user as admin'
			set({ error: message })
			throw e
		}
	},

	checkIfMusicIsPlaying: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.checkIfMusicIsPlaying(streamId)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to check music playing'
			set({ error: message })
			throw e
		}
	},

	checkIfMuted: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.checkIfMuted(streamId)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to check muted'
			set({ error: message })
			throw e
		}
	},

	muteMyself: async (streamId: string) => {
		try {
			set({ error: null })
			await muteLocalAudio()
			await livesApi.muteMyself(streamId)
			set({ streamMuted: true })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to mute myself'
			set({ error: message })
			set({ streamMuted: false })
			await unmuteLocalAudio().catch(() => {})
			throw e
		}
	},

	muteUser: async (streamId: string, userId: string) => {
		try {
			set({ error: null })
			return await livesApi.muteUser(streamId, { user_id: userId })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to mute user'
			set({ error: message })
			throw e
		}
	},

	playMusic: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.playMusic(streamId)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to play music'
			set({ error: message })
			throw e
		}
	},

	removeUser: async (streamId: string, userId: string) => {
		try {
			set({ error: null })
			return await livesApi.removeUser(streamId, { user_id: userId })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to remove user'
			set({ error: message })
			throw e
		}
	},

	removeUserFromAdmin: async (streamId: string, userId: string) => {
		try {
			set({ error: null })
			return await livesApi.removeUserFromAdmin(streamId, {
				user_id: userId,
			})
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to remove user from admin'
			set({ error: message })
			throw e
		}
	},

	requestSpeakerRole: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.requestSpeakerRole(streamId)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to request speaker role'
			set({ error: message })
			throw e
		}
	},

	stopMusic: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.stopMusic(streamId)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to stop music'
			set({ error: message })
			throw e
		}
	},

	getStreamUsers: async (streamId: string) => {
		try {
			set({ error: null })
			return await livesApi.getStreamUsers(streamId)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to get stream users'
			set({ error: message })
			throw e
		}
	},

	toggleVideo: async (streamId: string, enableVideo: boolean) => {
		try {
			set({ error: null })
			return await livesApi.toggleVideo(streamId, {
				enable_video: enableVideo ? 'true' : 'false',
			})
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to toggle video'
			set({ error: message })
			throw e
		}
	},

	unmuteMyself: async (streamId: string) => {
		try {
			set({ error: null })
			await unmuteLocalAudio()
			await livesApi.unmuteMyself(streamId)
			set({ streamMuted: false })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to unmute myself'
			set({ error: message })
			set({ streamMuted: true })
			await muteLocalAudio().catch(() => {})
			throw e
		}
	},

	unmuteUser: async (streamId: string, userId: string) => {
		try {
			set({ error: null })
			return await livesApi.unmuteUser(streamId, { user_id: userId })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to unmute user'
			set({ error: message })
			throw e
		}
	},

	uploadRoomImage: async (
		streamId: string,
		payload: UploadStreamRoomImagePayload,
	) => {
		try {
			set({ error: null })
			return await livesApi.uploadRoomImage(streamId, payload)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to upload room image'
			set({ error: message })
			throw e
		}
	},

	updateStream: async (streamId: string, body: UpdateStreamRequest) => {
		try {
			set({ error: null })
			const streamDetails = await livesApi.updateStream(streamId, body)
			set({ streamDetails })
			return streamDetails
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to update stream'
			set({ error: message })
			throw e
		}
	},

	getStreamsList: async () => {
		try {
			set({ error: null })
			await initializeAuth()
			return await livesApi.getStreamsList()
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to get streams list'
			set({ error: message })
			throw e
		}
	},

	getNearbyLiveStreams: async () => {
		try {
			set({ error: null })
			await initializeAuth()
			return await livesApi.getNearbyLiveStreams()
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to get nearby streams'
			set({ error: message })
			throw e
		}
	},

	getStreamMessages: async (streamId: string) => {
		try {
			set({ error: null })
			const raw = await livesApi.getStreamMessages(streamId)
			const streamMessages = mapStreamMessagesRaw(raw)
			set({ streamMessages })
			return raw
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to get messages'
			set({ error: message, streamMessages: [] })
			throw e
		}
	},

	sendStreamMessage: async (streamId: string, content: string) => {
		try {
			set({ error: null })
			return await livesApi.sendStreamMessage(streamId, { content })
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : 'Failed to send message'
			set({ error: message })
			throw e
		}
	},

	createStreamBattle: async (body: CreateStreamBattleRequest) => {
		try {
			set({ error: null })
			return await livesApi.createStreamBattle(body)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to create stream battle'
			set({ error: message })
			throw e
		}
	},

	getStreamBattle: async (id: string) => {
		try {
			set({ error: null })
			return await livesApi.getStreamBattle(id)
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : 'Failed to get stream battle'
			set({ error: message })
			throw e
		}
	},
}))
