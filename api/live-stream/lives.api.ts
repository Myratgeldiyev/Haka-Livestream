import { RoomUsers } from '@/api/live-chat/room.types'
import {
	CheckMutedResponse,
	CheckMusicPlayingResponse,
	CreateStreamBattleRequest,
	EnterStreamResponse,
	GetStreamMessagesResponse,
	LiveStreamDetailsResponse,
	LiveStreamListItem,
	LiveStreamResponse,
	NearbLiveStreamsResponse,
	SendStreamMessageRequest,
	StartStreamRequest,
	StreamBattleDetailsResponse,
	ToggleVideoBody,
	UpdateStreamRequest,
	UploadStreamRoomImagePayload,
	UserIdBody,
} from '@/api/live-stream/lives.types'
import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'

export const livesApi = {
	startStream: async (
		payload?: StartStreamRequest,
	): Promise<LiveStreamResponse> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.STREAMS,
			payload ?? {},
		)
		return res.data
	},

	getStreamDetails: async (
		streamId: string,
	): Promise<LiveStreamDetailsResponse> => {
		const { data } = await apiClient.get(
			ENDPOINTS.LIVE_STREAM.GET_STREAM(streamId),
		)
		return data
	},

	leaveRoom: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(ENDPOINTS.LIVE_STREAM.LEAVE_ROOM(id))
		return res.data
	},

	enterStream: async (id: string): Promise<EnterStreamResponse> => {
		const res = await apiClient.post(ENDPOINTS.LIVE_STREAM.ENTER_STREAM(id))
		return res.data
	},

	addUserAsAdmin: async (
		id: string,
		body: UserIdBody,
	): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.ADD_USER_AS_ADMIN(id),
			body,
		)
		return res.data
	},

	checkIfMusicIsPlaying: async (
		id: string,
	): Promise<CheckMusicPlayingResponse> => {
		const { data } = await apiClient.get(
			ENDPOINTS.LIVE_STREAM.CHECK_IF_MUSIC_IS_PLAYING(id),
		)
		return data
	},

	checkIfMuted: async (id: string): Promise<CheckMutedResponse> => {
		const { data } = await apiClient.get(
			ENDPOINTS.LIVE_STREAM.CHECK_IF_MUTED(id),
		)
		return data
	},

	muteMyself: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(ENDPOINTS.LIVE_STREAM.MUTE_MYSELF(id))
		return res.data
	},

	muteUser: async (id: string, body: UserIdBody): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.MUTE_USER(id),
			body,
		)
		return res.data
	},

	playMusic: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(ENDPOINTS.LIVE_STREAM.PLAY_MUSIC(id))
		return res.data
	},

	removeUser: async (id: string, body: UserIdBody): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.REMOVE_USER(id),
			body,
		)
		return res.data
	},

	removeUserFromAdmin: async (
		id: string,
		body: UserIdBody,
	): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.REMOVE_USER_FROM_ADMIN(id),
			body,
		)
		return res.data
	},

	requestSpeakerRole: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.REQUEST_SPEAKER_ROLE(id),
		)
		return res.data
	},

	stopMusic: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(ENDPOINTS.LIVE_STREAM.STOP_MUSIC(id))
		return res.data
	},

	getStreamUsers: async (id: string): Promise<RoomUsers[]> => {
		const { data } = await apiClient.get(
			ENDPOINTS.LIVE_STREAM.STREAM_USERS(id),
		)
		return data
	},

	toggleVideo: async (
		id: string,
		body: ToggleVideoBody,
	): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.TOGGLE_VIDEO(id),
			body,
		)
		return res.data
	},

	unmuteMyself: async (id: string): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.UNMUTE_MYSELF(id),
		)
		return res.data
	},

	unmuteUser: async (id: string, body: UserIdBody): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.UNMUTE_USER(id),
			body,
		)
		return res.data
	},

	uploadRoomImage: async (
		id: string,
		payload: UploadStreamRoomImagePayload,
	): Promise<unknown> => {
		const formData = new FormData()
		formData.append('room_image', {
			uri: payload.uri,
			name: payload.name ?? 'image',
			type: payload.type ?? 'image/jpeg',
		} as unknown as Blob)
		const { data } = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.UPLOAD_ROOM_IMAGE(id),
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		return data
	},

	updateStream: async (
		id: string,
		body: UpdateStreamRequest,
	): Promise<LiveStreamDetailsResponse> => {
		const { data } = await apiClient.put(
			ENDPOINTS.LIVE_STREAM.GET_STREAM(id),
			body,
		)
		return data
	},

	getStreamsList: async (): Promise<LiveStreamListItem[]> => {
		const { data } = await apiClient.get(ENDPOINTS.LIVE_STREAM.STREAMS)
		return data
	},

	getNearbyLiveStreams: async (): Promise<NearbLiveStreamsResponse> => {
		const { data } = await apiClient.get(ENDPOINTS.LIVE_STREAM.NEARBY)
		return data
	},

	getStreamMessages: async (
		streamId: string,
	): Promise<GetStreamMessagesResponse> => {
		const { data } = await apiClient.get(
			ENDPOINTS.LIVE_STREAM.GET_MESSAGES(streamId),
		)
		return data
	},

	sendStreamMessage: async (
		streamId: string,
		body: SendStreamMessageRequest,
	): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.LIVE_STREAM.SEND_MESSAGE(streamId),
			body,
		)
		return res.data
	},

	createStreamBattle: async (
		body: CreateStreamBattleRequest,
	): Promise<unknown> => {
		const res = await apiClient.post(
			ENDPOINTS.STREAM_BATTLES.BASE,
			body,
		)
		return res.data
	},

	getStreamBattle: async (
		id: string,
	): Promise<StreamBattleDetailsResponse> => {
		const { data } = await apiClient.get(
			ENDPOINTS.STREAM_BATTLES.GET_ONE(id),
		)
		return data
	},
}
