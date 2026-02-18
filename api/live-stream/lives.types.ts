export interface StartStreamRequest {
	title?: string
	description?: string
}

export interface LiveStreamResponse {
	id: string
	title: string
	description: string
	display_id: number
	room_image: string
	rtc_token: string
	uid: string
	channel_name: string
}

export interface LiveStreamOwner {
	username: string
	user_id: number
	profile_picture: string
	is_online: string
	online_status: string
}

export interface LiveStreamDetailsResponse {
	title: string
	agora_channel_name: string
	id: string
	description: string
	room_image: string
	owner: LiveStreamOwner
	created_at: string
	display_id?: number
}

export type FollowingStreamsResponse = LiveStreamDetailsResponse[]

export interface UserIdBody {
	user_id: string
}

export interface ToggleVideoBody {
	enable_video: 'true' | 'false'
}

export interface UpdateStreamRequest {
	title: string
	description: string
}

export interface SendStreamMessageRequest {
	content: string
}

export interface CreateStreamBattleRequest {
	stream1_id: string
	stream2_id: string
	duration: number
}

export interface UploadStreamRoomImagePayload {
	uri: string
	name?: string
	type?: string
}

// Response / list item (GET video/streams/)
export type LiveStreamListItem = LiveStreamDetailsResponse

// Response GET video/nearby/ (same shape as list item; owner.username may be null)
export type NearbLiveStreamsResponse = LiveStreamListItem[]

// Check endpoints
export interface CheckMusicPlayingResponse {
	is_playing?: boolean
}

export interface CheckMutedResponse {
	is_muted?: boolean
}

// Stream battle details (GET stream-battles/:id/)
export interface StreamBattleDetailsResponse {
	room1_id: string
	room2_id: string
	start_time: string
	end_time: string
	stream1: string
	stream2: string
	id: number
	stream1_score: number
	stream2_score: number
	is_active: boolean
	created_at: string
}

// Messages (GET/POST video/streams/:stream_id/messages/)
export interface StreamMessage {
	[id: string]: unknown
}

export type GetStreamMessagesResponse = StreamMessage[]

// Enter stream response (POST video/streams/:id/enter_stream/)
export interface EnterStreamResponse {
	role: 'owner' | 'admin' | 'listener'
	rtc_token: string
	channel_name: string
	uid: string
}
