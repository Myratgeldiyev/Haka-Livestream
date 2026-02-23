import { initializeAuth } from '@/api/axios'
import {
	AddUserAsAdminRequest,
	ChangeSeatChatRoomResponse,
	ChatMessage,
	EnterRoomResponse,
	KickOutRequest,
	RemoveAdminRequest,
	RoomFollowerItem,
	RoomResponse,
	RoomSpeakerItem,
	RoomRole,
	RoomUsers,
	StartPkPayload,
	UpdateRoomRequest,
	UploadRoomImagePayload,
} from '@/api/live-chat/room.types'
import { roomsApi } from '@/api/live-chat/rooms.api'
import type { LiveStreamDetailsResponse } from '@/api/live-stream/lives.types'
import {
	enableVoicePublishInChannel,
	joinChannelForVoiceAsListener,
	leaveChannel,
	muteLocalAudio,
	resetAgoraEngine,
	unmuteLocalAudio,
} from '@/services/agora/agora.service'
import { tokenService } from '@/services/token.service'
import { KickOutReason } from '@/types/chat-actions'
import { Audio } from 'expo-av'
import { create } from 'zustand'

	interface LiveChatState {
	rtcToken: string | null
	channelName: string | null
	uid: number | null
	roomId: string | null
	role: RoomRole | null
	rooms: RoomResponse[]
	roomsLoading: boolean
	roomsLoadingMore: boolean
	hasMoreRooms: boolean
	roomsOffset: number
	users: RoomUsers[]
	isConnecting: boolean
	isJoined: boolean
	messages: ChatMessage[]
	chatStatusText: string | null
	error: string | null
	activeRoom: RoomResponse | null
	isMuted: boolean
	giftEffectsEnabled: boolean
	callEnabled: boolean
	muteMyself: (roomId: string) => Promise<void>
	unmuteMyself: (roomId: string) => Promise<void>
	toggleGiftEffects: () => void
	toggleCall: () => void
	updateRoom: (
		roomId: string,
		payload: UpdateRoomRequest,
	) => Promise<RoomResponse>
	uploadRoomImage: (
		roomId: string,
		payload: UploadRoomImagePayload,
	) => Promise<RoomResponse>
	createAndJoinRoom: () => Promise<string>
	enterRoom: (roomId: string) => Promise<void>
	requestSpeakerRole: (seatNumber?: number) => Promise<void>
	fetchRooms: () => Promise<void>
	fetchNextRooms: () => Promise<void>
	fetchRoomDetail: (roomId: string) => Promise<void>
	fetchAllUsersInChatRoom: (roomId: string) => Promise<void>
	removeAdmin: (userId: string) => Promise<void>
	addUserAsAdmin: (userId: string) => Promise<void>
	leaveRoom: (options?: { awaitLeave?: boolean }) => Promise<void>
	sendMessage: (content: string) => Promise<void>
	sendImageMessage: (imageUri: string) => void
	fetchMessages: (roomId: string) => Promise<void>
	clearMessages: () => void
	cleanChatMessages: () => void
	kickOutUser: (userId: string, reason: KickOutReason) => Promise<void>
	playRoomMusic: (roomId: string) => Promise<void>
	stopRoomMusic: (roomId: string) => Promise<void>
	pkInvitedRoomId: string | null
	setPkInvitedRoomId: (roomId: string | null) => void
	roomSeatCount: number
	setRoomSeatCount: (count: number) => void
	startPkBattle: (payload: StartPkPayload) => Promise<void>
	muteUser: (userId: string) => Promise<void>
	unmuteUser: (userId: string) => Promise<void>
	minimizedRoomId: string | null
	minimizedRoomImage: string | null
	minimizedRoomTitle: string | null
	setMinimized: (roomId: string, imageUrl: string, title?: string) => void
	clearMinimized: () => void

	pendingMinimized: { roomId: string; imageUrl: string; title: string } | null
	setPendingMinimized: (
		data: { roomId: string; imageUrl: string; title: string } | null,
	) => void
	/** Current user's own chat room (if any). */
	myChatRoom: LiveStreamDetailsResponse | null
	/** Chat rooms the current user is following. */
	followingRooms: LiveStreamDetailsResponse[]
	/** Followers of a chat room (by roomId). */
	roomFollowers: RoomFollowerItem[]
	roomFollowersLoading: boolean
	fetchRoomFollowers: (roomId: string) => Promise<void>
	/** Speakers in room with seat_number - who is on which seat (for other users to see). */
	roomSpeakers: RoomSpeakerItem[]
	roomSpeakersLoading: boolean
	fetchRoomSpeakers: (roomId: string) => Promise<void>
	followRoom: (roomId: string) => Promise<import('@/api/live-chat/rooms.api').FollowRoomResponse>
	unfollowRoom: (roomId: string) => Promise<unknown>
	getMyChatRoom: () => Promise<LiveStreamDetailsResponse>
	getFollowingRooms: () => Promise<LiveStreamDetailsResponse[]>
	changeSeatChatRoom: (seatNumber: string) => Promise<ChangeSeatChatRoomResponse>
	leaveSeatChatRoom: (seatNumber: string) => Promise<void>
	setPasswordChatRoom: (roomPassword: string) => Promise<void>
	removePasswordChatRoom: () => Promise<void>
}

export const useLiveChatStore = create<LiveChatState>((set, get) => ({
	rtcToken: null,
	channelName: null,
	uid: null,
	roomId: null,
	role: null,
	rooms: [],
	roomsLoading: false,
	roomsLoadingMore: false,
	hasMoreRooms: true,
	roomsOffset: 0,
	users: [],
	messages: [],
	chatStatusText: null,
	activeRoom: null,
	isConnecting: false,
	isMuted: false,
	giftEffectsEnabled: true,
	callEnabled: true,
	isJoined: false,
	error: null,
	pkInvitedRoomId: null,
	roomSeatCount: 10,
	minimizedRoomId: null,
	minimizedRoomImage: null,
	minimizedRoomTitle: null,
	myChatRoom: null,
	followingRooms: [],
	roomFollowers: [],
	roomFollowersLoading: false,
	roomSpeakers: [],
	roomSpeakersLoading: false,

	fetchRoomFollowers: async (roomId: string) => {
		try {
			set({ roomFollowersLoading: true, error: null })
			await initializeAuth()
			const list = await roomsApi.getRoomFollowers(roomId)
			set({ roomFollowers: list })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		} finally {
			set({ roomFollowersLoading: false })
		}
	},

	fetchRoomSpeakers: async (roomId: string) => {
		try {
			set({ roomSpeakersLoading: true, error: null })
			await initializeAuth()
			const list = await roomsApi.getChatRoomSpeakers(roomId)
			set({ roomSpeakers: list })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		} finally {
			set({ roomSpeakersLoading: false })
		}
	},

	setRoomSeatCount: (count: number) => set({ roomSeatCount: count }),
	setMinimized: (roomId: string, imageUrl: string, title?: string) =>
		set({
			minimizedRoomId: roomId,
			minimizedRoomImage: imageUrl,
			minimizedRoomTitle: title ?? null,
		}),
	clearMinimized: () =>
		set({
			minimizedRoomId: null,
			minimizedRoomImage: null,
			minimizedRoomTitle: null,
		}),
	pendingMinimized: null,
	setPendingMinimized: (
		data: { roomId: string; imageUrl: string; title: string } | null,
	) => set({ pendingMinimized: data }),

	toggleGiftEffects: () => {
		set(state => ({ giftEffectsEnabled: !state.giftEffectsEnabled }))
	},
	toggleCall: () => {
		set(state => ({ callEnabled: !state.callEnabled }))
	},

	fetchRooms: async () => {
		const PAGE_SIZE = 5
		try {
			set({ roomsLoading: true, roomsOffset: 0 })
			await initializeAuth()
			const rooms = await roomsApi.getRooms(PAGE_SIZE, 0)
			set({
				rooms,
				roomsLoading: false,
				hasMoreRooms: rooms.length >= PAGE_SIZE,
				roomsOffset: rooms.length,
			})
		} catch (e: any) {
			set({ error: e.message, roomsLoading: false })
			throw e
		}
	},

	fetchNextRooms: async () => {
		const PAGE_SIZE = 5
		const { roomsLoadingMore, hasMoreRooms, roomsOffset } = get()
		if (roomsLoadingMore || !hasMoreRooms) return
		try {
			set({ roomsLoadingMore: true })
			await initializeAuth()
			const nextRooms = await roomsApi.getRooms(PAGE_SIZE, roomsOffset)
			set(state => ({
				rooms: [...state.rooms, ...nextRooms],
				roomsLoadingMore: false,
				hasMoreRooms: nextRooms.length >= PAGE_SIZE,
				roomsOffset: state.roomsOffset + nextRooms.length,
			}))
		} catch (e: any) {
			set({ roomsLoadingMore: false })
			throw e
		}
	},

	fetchAllUsersInChatRoom: async (roomId: string) => {
		try {
			set({ isConnecting: true })
			await initializeAuth()
			const users = await roomsApi.getAllUsersInChatRoom(roomId)
			set({ users })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

	fetchRoomDetail: async (roomId: string) => {
		try {
			await initializeAuth()
			const room = await roomsApi.getRoomDetail(roomId)
			set({ activeRoom: room })
		} catch (e: any) {
			console.error('[STORE] fetchRoomDetail failed:', e.message)
			set({ error: e.message })
			throw e
		}
	},

	updateRoom: async (roomId: string, payload: UpdateRoomRequest) => {
		try {
			await initializeAuth()

			const updatedRoom = await roomsApi.updateRoom(roomId, payload)

			set(state => ({
				activeRoom: state.activeRoom
					? { ...state.activeRoom, ...updatedRoom }
					: updatedRoom,
			}))

			return updatedRoom
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	uploadRoomImage: async (roomId, payload) => {
		try {
			set({ isConnecting: true })
			await initializeAuth()

			const updatedRoom = await roomsApi.uploadRoomImage(roomId, payload)

			set(state => ({
				activeRoom: state.activeRoom
					? { ...state.activeRoom, ...updatedRoom }
					: updatedRoom,
			}))

			return updatedRoom
		} catch (e: any) {
			set({ error: e.message })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

	createAndJoinRoom: async () => {
		try {
			set({ isConnecting: true, error: null })

			const permission = await Audio.requestPermissionsAsync()
			if (permission.granted) {
				console.log('[liveChat.store] Microphone permission granted (createAndJoinRoom)')
			} else {
				console.log('[liveChat.store] Microphone permission denied (createAndJoinRoom)')
				throw new Error('Microphone permission denied')
			}

			await initializeAuth()
			await resetAgoraEngine()

			// #region agent log
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'liveChat.store:createAndJoinRoom:beforeCreateRoom',
						message: 'About to call createRoom API',
						data: {
							hasToken: !!(await tokenService.getToken()),
							payload: { title: 'Live Chat', description: 'Live chat room' },
						},
						timestamp: Date.now(),
						hypothesisId: 'H1',
					}),
				},
			).catch(() => {})

			let room
			try {
				room = await roomsApi.createRoom({
					title: 'Live Chat',
					description: 'Live chat room',
				})
				// #region agent log
				fetch(
					'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							location: 'liveChat.store:createAndJoinRoom:createRoomSuccess',
							message: 'createRoom API succeeded',
							data: { roomId: room?.id, hasRoom: !!room },
							timestamp: Date.now(),
							hypothesisId: 'H1',
						}),
					},
				).catch(() => {})
				// #endregion
			} catch (createRoomError: any) {
				// #region agent log
				fetch(
					'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							location: 'liveChat.store:createAndJoinRoom:createRoomError',
							message: 'createRoom API failed',
							data: {
								errorMessage: createRoomError?.message,
								errorStatus: createRoomError?.response?.status,
								errorData: createRoomError?.response?.data,
								errorConfig: {
									url: createRoomError?.config?.url,
									method: createRoomError?.config?.method,
									headers: createRoomError?.config?.headers,
								},
							},
							timestamp: Date.now(),
							hypothesisId: 'H1',
						}),
					},
				).catch(() => {})
				// #endregion
				throw createRoomError
			}
			// #endregion

			console.log('[createAndJoinRoom] Room created with id:', room.id)

			const uid = Number(room.uid)
			if (Number.isNaN(uid)) throw new Error('Invalid UID')

			set({
				rtcToken: room.rtc_token,
				channelName: room.channel_name,
				uid,
				roomId: room.id,
				role: 'owner',
			})

			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
			console.log('[liveChat.store] createAndJoinRoom: calling joinChannelForVoiceAsListener', {
				channelName: room.channel_name,
				uid,
				roomId: room.id,
			})
			await joinChannelForVoiceAsListenerPromise(
				appId,
				room.rtc_token,
				room.channel_name,
				uid,
			)

			set({ isJoined: true })

			return room.id
		} catch (e: unknown) {
			set({ error: e instanceof Error ? e.message : String(e) })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

		enterRoom: async (roomId: string) => {
		try {
			set({ isConnecting: true, error: null })

			await initializeAuth()

			const currentRoomId = get().roomId
			if (currentRoomId) {
				try {
					await roomsApi.leaveRoom(currentRoomId)
				} catch {}
				await leaveChannel()
				set({
					rtcToken: null,
					channelName: null,
					uid: null,
					roomId: null,
					role: null,
					isJoined: false,
					activeRoom: null,
					messages: [],
					users: [],
					roomSeatCount: 10,
				})
			}

			await resetAgoraEngine()

			const res: EnterRoomResponse = await roomsApi.enterRoom(roomId)

			const uid = Number(res.uid)
			if (Number.isNaN(uid)) throw new Error('Invalid UID')

			set({
				roomId: res.room.id,
				channelName: res.channel_name,
				rtcToken: res.rtc_token,
				uid,
				role: res.role,
				activeRoom: res.room,
			})

			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
			console.log('[liveChat.store] enterRoom: calling joinChannelForVoiceAsListener', {
				channelName: res.channel_name,
				uid,
				roomId: res.room.id,
			})
			joinChannelForVoiceAsListenerPromise(
				appId,
				res.rtc_token,
				res.channel_name,
				uid,
			)
				.then(() => set({ isJoined: true }))
				.catch((e: unknown) =>
					set({ error: e instanceof Error ? e.message : String(e) }),
				)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : String(e)
			set({ error: message })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

	sendMessage: async (content: string) => {
		const { roomId, uid } = get()
		if (!roomId) {
			throw new Error('No active room')
		}

		try {
			await initializeAuth()
			const response = await roomsApi.sendMessage(roomId, { content })

			const newMessage: ChatMessage = {
				id: `${response.user.user_id}-${Date.now()}`,
				text: response.content,
				time: response.created_at,
				isMe: response.user.user_id === uid,
				user: response.user,
			}

			set(state => ({
				messages: [...state.messages, newMessage],
				chatStatusText: null,
			}))
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	sendImageMessage: (imageUri: string) => {
		const { users, uid } = get()
		const now = new Date().toISOString()
		const currentUser = users.find(
			u => u.user.user_id.toString() === String(uid),
		)

		set(state => ({
			messages: [
				...state.messages,
				{
					id: `img-${uid ?? 'unknown'}-${Date.now()}`,
					text: '',
					time: now,
					isMe: true,
					imageUri,
					user: currentUser
						? {
								username: currentUser.user.username,
								user_id: Number(currentUser.user.user_id),
								profile_picture: currentUser.user.profile_picture,
								is_online: currentUser.user.is_online,
								online_status: currentUser.user.online_status,
							}
						: undefined,
				},
			],
			chatStatusText: null,
		}))
	},

	fetchMessages: async (roomId: string) => {
		try {
			console.log(
				'[STORE] fetchMessages called with roomId:',
				roomId,
				typeof roomId,
			)
			set({ isConnecting: true })
			await initializeAuth()
			const messagesResponse = await roomsApi.getMessages(roomId)

			const { uid } = get()

			const messages: ChatMessage[] = messagesResponse.map((msg, index) => ({
				id: `${msg.user.user_id}-${msg.created_at}-${index}`,
				text: msg.content,
				time: msg.created_at,
				isMe: msg.user.user_id === uid,
				user: msg.user,
			}))

			set({ messages, chatStatusText: null })
		} catch (e: any) {
			console.error('[STORE] fetchMessages failed:', e.message)
			set({ error: e.message })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

	clearMessages: () => {
		set({ messages: [] })
	},

	cleanChatMessages: () => {
		set({ messages: [], chatStatusText: 'Messages cleaned' })
	},

	requestSpeakerRole: async (seatNumber?: number) => {
		try {
			set({ isConnecting: true })

			const permission = await Audio.requestPermissionsAsync()
			if (!permission.granted) {
				throw new Error('Microphone permission denied')
			}

			const { roomId } = get()
			if (!roomId) throw new Error('Room not entered')

			await roomsApi.requestSpeakerRole(
				roomId,
				seatNumber != null ? { seat_number: seatNumber } : undefined,
			)

			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID
			if (appId) {
				await enableVoicePublishInChannel(appId)
			}
			set({ role: 'listener' })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		} finally {
			set({ isConnecting: false })
		}
	},

	muteMyself: async (roomId: string) => {
		const { uid, users } = get()
		const prevUsers = users

		set({
			isMuted: true,
			users:
				uid != null
					? users.map(u =>
							String(u.user.user_id) === String(uid)
								? { ...u, is_muted: true }
								: u,
						)
					: users,
		})
		try {
			await muteLocalAudio()
			await roomsApi.muteMyself(roomId)
		} catch (e: any) {
			console.error('Mute failed', e)
			set({ isMuted: false, users: prevUsers })
			await unmuteLocalAudio().catch(() => {})
			throw e
		}
	},

	unmuteMyself: async (roomId: string) => {
		const { uid, users } = get()
		const prevUsers = users
		set({
			isMuted: false,
			users:
				uid != null
					? users.map(u =>
							String(u.user.user_id) === String(uid)
								? { ...u, is_muted: false }
								: u,
						)
					: users,
		})
		try {
			await unmuteLocalAudio()
			await roomsApi.unmuteMyself(roomId)
		} catch (e: any) {
			console.error('Unmute failed', e)
			set({ isMuted: true, users: prevUsers })
			await muteLocalAudio().catch(() => {})
			throw e
		}
	},

	addUserAsAdmin: async (userId: string): Promise<void> => {
		const { roomId } = get()

		if (!roomId) {
			throw new Error('No active room')
		}

		try {
			console.log('Adding user as admin:', userId)

			const payload: AddUserAsAdminRequest = {
				user_id: userId,
			}

			await roomsApi.addUserAsAdmin(roomId, payload)

			console.log('User added as admin successfully')
		} catch (error: any) {
			console.error('Failed to add user as admin:', error)
			set({ error: error.message })
			throw error
		}
	},

	removeAdmin: async (userId: string): Promise<void> => {
		const { roomId } = get()

		if (!roomId) {
			throw new Error('No active room')
		}

		try {
			console.log('Removing user from room:', userId)

			const payload: RemoveAdminRequest = {
				user_id: userId,
			}

			await roomsApi.removeUser(roomId, payload)

			console.log('User removed successfully')
		} catch (error: any) {
			console.error('Failed to remove user:', error)
			set({ error: error.message })
			throw error
		}
	},
	kickOutUser: async (userId: string): Promise<void> => {
		const { roomId } = get()

		if (!roomId) {
			throw new Error('No active room')
		}

		try {
			console.log('Kicking out user:', userId, 'Reason:')

			const payload: KickOutRequest = {
				user_id: userId,
			}

			await roomsApi.kickOutUser(roomId, payload)

			console.log('User kicked out successfully')
		} catch (error: any) {
			console.error('Failed to kick out user:', error)
			set({ error: error.message })
			throw error
		}
	},

	leaveRoom: async (options?: { awaitLeave?: boolean }) => {
		const { roomId } = get()

		const clearRoomState = () =>
			set({
				rtcToken: null,
				channelName: null,
				uid: null,
				roomId: null,
				role: null,
				isJoined: false,
				activeRoom: null,
				messages: [],
				users: [],
				roomSeatCount: 10,
				minimizedRoomId: null,
				minimizedRoomImage: null,
				minimizedRoomTitle: null,
			})

		const doLeave = async () => {
			try {
				if (roomId) {
					await roomsApi.leaveRoom(roomId)
				}
				await leaveChannel()
			} catch (e: any) {
				console.warn('Leave room failed:', e?.message ?? e)
			}
		}

		if (options?.awaitLeave) {
			await doLeave()
			clearRoomState()
			return
		}

		clearRoomState()
		doLeave()
	},
	playRoomMusic: async (roomId: string) => {
		if (!roomId) return
		try {
			await initializeAuth()
			await roomsApi.playRoomMusic(roomId)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},
	stopRoomMusic: async (roomId: string) => {
		if (!roomId) return
		try {
			await initializeAuth()
			await roomsApi.stopRoomMusic(roomId)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},
	setPkInvitedRoomId: (roomId: string | null) => {
		set({ pkInvitedRoomId: roomId })
	},
	startPkBattle: async (payload: StartPkPayload) => {
		if (!payload.room1_id || !payload.room2_id || !payload.duration) {
			throw new Error('Missing required fields for PK battle')
		}
		try {
			await initializeAuth()
			await roomsApi.startPk(payload)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	followRoom: async (roomId: string) => {
		try {
			set({ error: null })
			await initializeAuth()
			return await roomsApi.followRoom(roomId)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	unfollowRoom: async (roomId: string) => {
		try {
			set({ error: null })
			await initializeAuth()
			return await roomsApi.unfollowRoom(roomId)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	getMyChatRoom: async () => {
		try {
			set({ error: null })
			await initializeAuth()
			const room = await roomsApi.getMyChatRoom()
			set({ myChatRoom: room })
			return room
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	getFollowingRooms: async () => {
		try {
			set({ error: null })
			await initializeAuth()
			const rooms = await roomsApi.getFollowingRooms()
			set({ followingRooms: rooms })
			return rooms
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	changeSeatChatRoom: async (seatNumber: string) => {
		const { roomId } = get()
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			const room = await roomsApi.changeSeatChatRoom(roomId, {
				seat_number: seatNumber,
			})
			set(state => ({
				activeRoom: state.activeRoom
					? {
							...state.activeRoom,
							...room,
							owner: {
								...state.activeRoom.owner,
								...room.owner,
							},
						}
					: state.activeRoom,
			}))
			return room
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	leaveSeatChatRoom: async (seatNumber: string) => {
		const { roomId } = get()
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			await roomsApi.leaveSeatChatRoom(roomId, { seat_number: seatNumber })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	setPasswordChatRoom: async (roomPassword: string) => {
		const { roomId } = get()
		console.log('[liveChat.store] setPasswordChatRoom called', {
			roomId,
			roomIdType: typeof roomId,
			hasRoomId: !!roomId,
		})
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			await roomsApi.setPasswordChatRoom(roomId, { room_password: roomPassword })
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	removePasswordChatRoom: async () => {
		const { roomId } = get()
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			await roomsApi.removePasswordChatRoom(roomId)
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	muteUser: async (userId: string) => {
		const { roomId, users } = get()
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			await roomsApi.muteUser(roomId, { user_id: userId })
			set({
				users: users.map(u =>
					u.user.user_id === userId ? { ...u, is_muted: true } : u,
				),
			})
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},

	unmuteUser: async (userId: string) => {
		const { roomId, users } = get()
		if (!roomId) throw new Error('No active room')
		try {
			await initializeAuth()
			await roomsApi.unmuteUser(roomId, { user_id: userId })
			set({
				users: users.map(u =>
					u.user.user_id === userId ? { ...u, is_muted: false } : u,
				),
			})
		} catch (e: any) {
			set({ error: e.message })
			throw e
		}
	},
}))

function joinChannelForVoiceAsListenerPromise(
	appId: string,
	token: string,
	channel: string,
	uid: number,
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		joinChannelForVoiceAsListener(appId, token, channel, uid, resolve, reject)
	})
}
