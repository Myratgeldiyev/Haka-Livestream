export type RoomRole = 'owner' | 'admin' | 'host' | 'listener'

export interface CreateRoomRequest {
	title: string
	description: string
}

export interface CreateRoomResponse {
	id: string
	title: string
	display_id: number
	description: string
	room_image: string
	role: RoomRole
	rtc_token: string
	channel_name: string
	uid: string
}

export interface RoomOwner {
	username: string
	user_id: number
	profile_picture: string
	is_online: boolean
	online_status: string
}
export interface UpdateRoomRequest {
	title?: string
	description?: string
	max_speakers?: number
}
export interface Room {
	id: string
	title: string
	display_id: number
	description: string
	room_image: string
	owner: RoomOwner
	agora_channel_name: string
	created_at: string
}
export interface RoomUsers {
	user: {
		username: string
		user_id: string
		profile_picture: string
		is_online: boolean
		online_status: string
		/** User level from API; used for level badge when present */
		level?: number
	}
	role: 'speaker' | 'listener' | 'owner' | 'admin'
	joined_at: string
	is_muted: boolean
}

export interface RoomResponse extends Room {}

export interface EnterRoomResponse {
	message: string
	rtc_token: string
	channel_name: string
	uid: string
	role: RoomRole
	room: Room
}
export interface OnlineUserUI {
	id: string
	name: string
	avatar?: string | null
	role: 'owner' | 'speaker' | 'listener'
	isMuted: boolean
	isOnline: boolean
}

export interface UploadRoomImagePayload {
	uri: string
	name: string
	type: string
}

export interface AddUserAsAdminRequest {
	user_id: string
}

export interface AddUserAsAdminResponse {
	success: boolean
	message?: string
}

export interface RemoveAdminRequest {
	user_id: string
}

export interface RemoveUserResponse {
	success: boolean
	message?: string
}

/** Request body for POST /voice/rooms/:id/set_room_password/ (room owners only) */
export interface SetRoomPasswordRequest {
	room_password: string
}

export interface ChatMessageUser {
	username: string | null
	user_id: number
	profile_picture: string
	is_online: boolean
	online_status: string
}

export interface ChatMessage {
	id: string
	text: string
	time: string
	isMe: boolean
	imageUri?: string
	/** User info - may be undefined if not loaded or unavailable */
	user?: ChatMessageUser
}

export interface SendMessageRequest {
	content: string
}

export interface SendMessageResponse {
	user: {
		username: string | null
		user_id: number
		profile_picture: string
		is_online: boolean
		online_status: string
	}
	content: string
	created_at: string
}

export interface GetMessagesResponse {
	user: {
		username: string | null
		user_id: number
		profile_picture: string
		is_online: boolean
		online_status: string
	}
	content: string
	created_at: string
}

/** Request body for POST /voice/rooms/:id/request_speaker_role/ */
export interface RequestSpeakerRoleRequest {
	seat_number: number
}

/** Request body for POST /voice/rooms/:id/change_seat/ */
export interface ChangeSeatRequest {
	seat_number: string
}

/** Response from POST /voice/rooms/:id/change_seat/ */
export interface ChangeSeatChatRoomResponse {
	agora_channel_name: string
	title: string
	display_id: number
	description: string
	owner: {
		level: number
	}
}

/** Request body for POST /voice/rooms/:id/leave_seat/ */
export interface LeaveSeatRequest {
	seat_number: string
}

export interface KickOutRequest {
	user_id: string
}

export interface KickOutResponse {
	success: boolean
	message?: string
}

export type KickOutReason =
	| 'abusing'
	| 'nude-picture'
	| 'political'
	| 'promote-app'
	| 'illegal-profile'
	| 'argument'

export interface StartPkPayload {
	room1_id: string
	room2_id: string
	duration: string
}

export interface StartPkResponse {
	id: string
	status: string
}

export interface RandomPkRequest {
	room_id: string
}

export interface RandomPkResponse {
	room1_id: string
	room2_id: string
	start_time: string
	end_time: string
	room1: string
	room2: string
	id: number
	room1_score: number
	room2_score: number
	is_active: boolean
	created_at: string
}

export interface MuteUnmuteUserRequest {
	user_id: string
}

export interface MuteUnmuteUserResponse {
	success: boolean
	message?: string
}

/** User object in GET /voice/rooms/:id/room_followers/ response */
export interface RoomFollowerUser {
	username: string
	user_id: number
	profile_picture: string
	is_online: boolean
	online_status: string
	level?: number
}

/** Single item from GET /voice/rooms/:id/room_followers/ */
export interface RoomFollowerItem {
	user: RoomFollowerUser
	role: string
	joined_at: string
	seat_number: number | null
	is_muted: boolean
}

/** User object in GET /voice/rooms/:id/room_speakers/ response */
export interface RoomSpeakerUser {
	username: string
	user_id: number
	profile_picture: string
	is_online: boolean
	online_status: string
	level?: number
}

/** Single item from GET /voice/rooms/:id/room_speakers/ - who is on which seat (for other users to see) */
export interface RoomSpeakerItem {
	user: RoomSpeakerUser
	role: string
	joined_at: string
	seat_number: number | null
	is_muted: boolean
}
