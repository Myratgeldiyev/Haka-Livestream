import type { LiveStreamDetailsResponse } from '@/api/live-stream/lives.types'
import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import {
	AddUserAsAdminRequest,
	AddUserAsAdminResponse,
	ChangeSeatChatRoomResponse,
	ChangeSeatRequest,
	CreateRoomRequest,
	CreateRoomResponse,
	EnterRoomResponse,
	GetMessagesResponse,
	KickOutRequest,
	KickOutResponse,
	LeaveSeatRequest,
	MuteUnmuteUserRequest,
	RemoveAdminRequest,
	RemoveUserResponse,
	RoomFollowerItem,
	RoomSpeakerItem,
	SetRoomPasswordRequest,
	RoomResponse,
	RoomUsers,
	SendMessageRequest,
	SendMessageResponse,
	StartPkPayload,
	StartPkResponse,
	UpdateRoomRequest,
	UploadRoomImagePayload,
} from './room.types'


export interface FollowRoomResponse {
	message: string
	room_id: string
}

export const roomsApi = {
	createRoom: async (
		payload: CreateRoomRequest,
	): Promise<CreateRoomResponse> => {
		// #region agent log
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'rooms.api:createRoom:request',
				message: 'createRoom API call',
				data: {
					endpoint: ENDPOINTS.ROOMS.CREATE_ROOM,
					payload,
				},
				timestamp: Date.now(),
				hypothesisId: 'H1',
			}),
		}).catch(() => {})
		// #endregion
		try {
			const res = await apiClient.post(ENDPOINTS.ROOMS.CREATE_ROOM, payload)
			// #region agent log
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'rooms.api:createRoom:success',
						message: 'createRoom API success',
						data: { status: res.status, hasData: !!res.data },
						timestamp: Date.now(),
						hypothesisId: 'H1',
					}),
				},
			).catch(() => {})
			// #endregion
			return res.data
		} catch (error: any) {
			// #region agent log
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'rooms.api:createRoom:error',
						message: 'createRoom API error',
						data: {
							status: error?.response?.status,
							statusText: error?.response?.statusText,
							errorData: error?.response?.data,
							errorMessage: error?.message,
							requestUrl: error?.config?.url,
							requestMethod: error?.config?.method,
						},
						timestamp: Date.now(),
						hypothesisId: 'H1',
					}),
				},
			).catch(() => {})
			// #endregion
			throw error
		}
	},

	getRooms: async (
		limit?: number,
		offset?: number,
	): Promise<RoomResponse[]> => {
		const params =
			limit != null && offset != null ? { limit, offset } : undefined
		const res = await apiClient.get(ENDPOINTS.ROOMS.CREATE_ROOM, {
			params,
		})
		return res.data
	},
	getRoomDetail: async (roomId: string): Promise<RoomResponse> => {
		const { data } = await apiClient.get(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/`,
		)
		return data
	},
	getAllUsersInChatRoom: async (roomId: string): Promise<RoomUsers[]> => {
		const { data } = await apiClient.get(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/room_users/`,
		)
		return data
	},
	enterRoom: async (roomId: string): Promise<EnterRoomResponse> => {
		const res = await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/enter_room/`,
		)
		return res.data
	},
	updateRoom: async (
		roomId: string,
		payload: UpdateRoomRequest,
	): Promise<RoomResponse> => {
		const { data } = await apiClient.put(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/`,
			payload,
		)
		return data
	},

	uploadRoomImage: async (
		roomId: string,
		payload: UploadRoomImagePayload,
	): Promise<RoomResponse> => {
		const formData = new FormData()

		formData.append('room_image', {
			uri: payload.uri,
			name: payload.name,
			type: payload.type,
		} as any)

		const { data } = await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}upload_room_image/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)

		return data
	},

	requestSpeakerRole: async (
		roomId: string,
		body?: { seat_number: number },
	): Promise<RoomResponse> => {
		const res = await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/request_speaker_role/`,
			body ?? {},
		)
		return res.data
	},
	unmuteMyself: async (roomId: string): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/unmute_myself/`,
		)
	},
	muteMyself: async (roomId: string): Promise<void> => {
		await apiClient.post(`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/mute_myself/`)
	},
	leaveRoom: async (roomId: string): Promise<void> => {
		await apiClient.post(`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/leave_room/`)
	},
	addUserAsAdmin: async (
		roomId: string,
		payload: AddUserAsAdminRequest,
	): Promise<AddUserAsAdminResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.ADD_USER_AS_ADMIN(roomId),
			payload,
		)
		return res.data
	},
	sendMessage: async (
		roomId: string,
		payload: SendMessageRequest,
	): Promise<SendMessageResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.SEND_MESSAGE(roomId),
			payload,
		)
		return res.data
	},

	getMessages: async (roomId: string): Promise<GetMessagesResponse[]> => {
		const res = await apiClient.get(ENDPOINTS.ROOMS.GET_MESSAGES(roomId))
		return res.data
	},
	removeUser: async (
		roomId: string,
		payload: RemoveAdminRequest,
	): Promise<RemoveUserResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.REMOVE_ADMIN(roomId),
			payload,
		)
		return res.data
	},
	kickOutUser: async (
		roomId: string,
		payload: KickOutRequest,
	): Promise<KickOutResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.KICK_OUT_USER(roomId),
			payload,
		)
		return res.data
	},
	playRoomMusic: async (roomId: string | number): Promise<void> => {
		await apiClient.post(`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/play_music/`)
	},
	stopRoomMusic: async (roomId: string | number): Promise<void> => {
		await apiClient.post(`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/stop_music/`)
	},

	startPk: async (payload: StartPkPayload): Promise<StartPkResponse> => {
		const res = await apiClient.post('voice/battles/', payload)
		return res.data
	},

	muteUser: async (
		roomId: string,
		payload: MuteUnmuteUserRequest,
	): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/mute_user/`,
			payload,
		)
	},

	unmuteUser: async (
		roomId: string,
		payload: MuteUnmuteUserRequest,
	): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/unmute_user/`,
			payload,
		)
	},

	followRoom: async (roomId: string): Promise<FollowRoomResponse> => {
		const res = await apiClient.post(ENDPOINTS.ROOMS.FOLLOW_ROOM, {
			room_id: roomId,
		})
		return res.data
	},

	unfollowRoom: async (roomId: string): Promise<void> => {
		const res = await apiClient.delete(ENDPOINTS.ROOMS.UNFOLLOW_ROOM(roomId))
		return res.data
	},

	getMyChatRoom: async (): Promise<LiveStreamDetailsResponse> => {
		const { data } = await apiClient.get(ENDPOINTS.ROOMS.GET_MY_CHATROOM)
		return data
	},

	getFollowingRooms: async (): Promise<LiveStreamDetailsResponse[]> => {
		const { data } = await apiClient.get(ENDPOINTS.ROOMS.FOLLOWING_ROOMS)
		return data
	},

	getRoomFollowers: async (
		roomId: string,
	): Promise<RoomFollowerItem[]> => {
		const { data } = await apiClient.get<RoomFollowerItem[]>(
			ENDPOINTS.ROOMS.ROOM_FOLLOWERS(roomId),
		)
		return data
	},

	/** GET /voice/rooms/:id/room_speakers/ - who is on which seat (for other users to see seat occupancy) */
	getChatRoomSpeakers: async (
		roomId: string,
	): Promise<RoomSpeakerItem[]> => {
		const { data } = await apiClient.get<RoomSpeakerItem[]>(
			ENDPOINTS.ROOMS.ROOM_SPEAKERS(roomId),
		)
		return data
	},

	changeSeatChatRoom: async (
		roomId: string,
		payload: ChangeSeatRequest,
	): Promise<ChangeSeatChatRoomResponse> => {
		const { data } = await apiClient.post(
			ENDPOINTS.ROOMS.CHANGE_SEAT(roomId),
			payload,
		)
		return data
	},

	leaveSeatChatRoom: async (
		roomId: string,
		payload: LeaveSeatRequest,
	): Promise<void> => {
		await apiClient.post(ENDPOINTS.ROOMS.LEAVE_SEAT(roomId), payload)
	},

	setPasswordChatRoom: async (
		roomId: string,
		payload: SetRoomPasswordRequest,
	): Promise<void> => {
		const path = ENDPOINTS.ROOMS.SET_ROOM_PASSWORD(roomId)
		const baseURL = (apiClient.defaults.baseURL ?? '').replace(/\/+$/, '')
		const fullUrl = `${baseURL}/${path}`
		console.log('[rooms.api] setPasswordChatRoom', {
			roomId,
			roomIdType: typeof roomId,
			path,
			fullUrl,
			payloadKeys: Object.keys(payload),
		})
		try {
			await apiClient.post(path, payload)
			console.log('[rooms.api] setPasswordChatRoom success')
		} catch (error: any) {
			console.log('[rooms.api] setPasswordChatRoom error', {
				status: error?.response?.status,
				statusText: error?.response?.statusText,
				data: error?.response?.data,
				requestUrl: error?.config?.url,
				requestBaseURL: error?.config?.baseURL,
				requestMethod: error?.config?.method,
				message: error?.message,
			})
			throw error
		}
	},

	removePasswordChatRoom: async (roomId: string): Promise<void> => {
		const path = ENDPOINTS.ROOMS.REMOVE_ROOM_PASSWORD(roomId)
		console.log('[rooms.api] removePasswordChatRoom', {
			roomId,
			path,
		})
		try {
			await apiClient.post(path)
			console.log('[rooms.api] removePasswordChatRoom success')
		} catch (error: any) {
			console.log('[rooms.api] removePasswordChatRoom error', {
				status: error?.response?.status,
				requestUrl: error?.config?.url,
				data: error?.response?.data,
			})
			throw error
		}
	},
}
