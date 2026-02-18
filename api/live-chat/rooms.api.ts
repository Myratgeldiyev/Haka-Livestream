import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import {
	AddUserAsAdminRequest,
	AddUserAsAdminResponse,
	CreateRoomRequest,
	CreateRoomResponse,
	EnterRoomResponse,
	GetMessagesResponse,
	KickOutRequest,
	KickOutResponse,
	MuteUnmuteUserRequest,
	RemoveAdminRequest,
	RemoveUserResponse,
	RoomResponse,
	RoomUsers,
	SendMessageRequest,
	SendMessageResponse,
	StartPkPayload,
	StartPkResponse,
	UpdateRoomRequest,
	UploadRoomImagePayload,
} from './room.types'

export const roomsApi = {
	createRoom: async (
		payload: CreateRoomRequest
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
			fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					location: 'rooms.api:createRoom:success',
					message: 'createRoom API success',
					data: { status: res.status, hasData: !!res.data },
					timestamp: Date.now(),
					hypothesisId: 'H1',
				}),
			}).catch(() => {})
			// #endregion
			return res.data
		} catch (error: any) {
			// #region agent log
			fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
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
			}).catch(() => {})
			// #endregion
			throw error
		}
	},

	getRooms: async (
		limit?: number,
		offset?: number
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
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/`
		)
		return data
	},
	getAllUsersInChatRoom: async (roomId: string): Promise<RoomUsers[]> => {
		const { data } = await apiClient.get(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/room_users/`
		)
		return data
	},
	enterRoom: async (roomId: string): Promise<EnterRoomResponse> => {
		const res = await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/enter_room/`
		)
		return res.data
	},
	updateRoom: async (
		roomId: string,
		payload: UpdateRoomRequest
	): Promise<RoomResponse> => {
		const { data } = await apiClient.put(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/`,
			payload
		)
		return data
	},

	uploadRoomImage: async (
		roomId: string,
		payload: UploadRoomImagePayload
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
			}
		)

		return data
	},

	requestSpeakerRole: async (roomId: string): Promise<RoomResponse> => {
		const res = await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/request_speaker_role/`
		)
		return res.data
	},
	unmuteMyself: async (roomId: string): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/unmute_myself/`
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
		payload: AddUserAsAdminRequest
	): Promise<AddUserAsAdminResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.ADD_USER_AS_ADMIN(roomId),
			payload
		)
		return res.data
	},
	sendMessage: async (
		roomId: string,
		payload: SendMessageRequest
	): Promise<SendMessageResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.SEND_MESSAGE(roomId),
			payload
		)
		return res.data
	},

	getMessages: async (roomId: string): Promise<GetMessagesResponse[]> => {
		const res = await apiClient.get(ENDPOINTS.ROOMS.GET_MESSAGES(roomId))
		return res.data
	},
	removeUser: async (
		roomId: string,
		payload: RemoveAdminRequest
	): Promise<RemoveUserResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.REMOVE_ADMIN(roomId),
			payload
		)
		return res.data
	},
	kickOutUser: async (
		roomId: string,
		payload: KickOutRequest
	): Promise<KickOutResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.ROOMS.KICK_OUT_USER(roomId),
			payload
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
		payload: MuteUnmuteUserRequest
	): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/mute_user/`,
			payload
		)
	},

	unmuteUser: async (
		roomId: string,
		payload: MuteUnmuteUserRequest
	): Promise<void> => {
		await apiClient.post(
			`${ENDPOINTS.ROOMS.CREATE_ROOM}${roomId}/unmute_user/`,
			payload
		)
	},
}
