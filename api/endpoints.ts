export const API_CONFIG = {
	BASE_URL: process.env.EXPO_PUBLIC_API_URL as string,
	TIMEOUT: 30000,
} as const

export const ENDPOINTS = {
	AUTH: {
		REQUEST_OTP: 'auth/phone/request-otp/',
		VERIFY_OTP: 'auth/phone/verify-otp/',
		COMPLETE_SIGNUP: 'auth/complete-signup/',
		LOGOUT: 'auth/logout/',
		USER_ID_LOGIN: 'auth/login/',
	},
	PROFILE: {
		MY_PROFILE: 'users/myprofile/',
		UPDATE_PROFILE_PICTURE: 'users/update/profile-picture/',
		GET_USER_PROFILE: (userId: string) => `users/get-user/${userId}/`,
	},
	FOLLOW: {
		FOLLOW: 'follow/',
		UNFOLLOW: (userId: string) => `unfollow/${userId}/`,
	},
	FOLLOWING: {
		LIST: 'users/following/',
	},
	FOLLOWERS: {
		LIST: 'users/followers/',
	},
	FRIENDS: {
		LIST: 'users/friends/',
	},
	VISITORS: {
		LIST: 'users/visitors/',
	},
	PAYMENTS: {
		TOP_UP: 'payments/top-up/',
		WITHDRAWAL_BANK: 'payments/withdrawal/bank/',
		WITHDRAWAL_CRYPTO: 'payments/withdrawal/crypto/',
		WITHDRAWAL_EPAY: 'payments/withdrawal/epay/',
	},
	ROOMS: {
		CREATE_ROOM: 'voice/rooms/',
		REMOVE_ADMIN: (id: string) => `voice/rooms/${id}/remove_user/`,
		ADD_USER_AS_ADMIN: (id: string) => `voice/rooms/${id}/add_user_as_admin/`,
		SEND_MESSAGE: (roomId: string) => `voice/rooms/${roomId}/messages/`,
		GET_MESSAGES: (roomId: string) => `voice/rooms/${roomId}/messages/`,
		KICK_OUT_USER: (roomId: string) => `voice/rooms/${roomId}/remove_user/`,
		FOLLOW_ROOM: 'voice/follow-room/',
		UNFOLLOW_ROOM: (roomId: string) => `voice/unfollow-room/${roomId}/`,
		GET_MY_CHATROOM: 'voice/get-my-chatroom/',
		FOLLOWING_ROOMS: 'voice/following-rooms/',
		ROOM_FOLLOWERS: (roomId: string) => `voice/rooms/${roomId}/room_followers/`,
		CHANGE_SEAT: (id: string) => `voice/rooms/${id}/change_seat/`,
		LEAVE_SEAT: (id: string) => `voice/rooms/${id}/leave_seat/`,
		SET_ROOM_PASSWORD: (id: string) => `voice/rooms/${id}/set_room_password/`,
		REMOVE_ROOM_PASSWORD: (id: string) => `voice/rooms/${id}/remove_room_password/`,
	},
	LIVE_STREAM: {
		STREAMS: 'video/streams/',
		NEARBY: 'video/nearby/',
		/** streamId = stream UUID (same role as roomId in ROOMS) */
		GET_STREAM: (streamId: string) => `video/streams/${streamId}/`,
		LEAVE_ROOM: (id: string) => `video/streams/${id}/leave_room/`,
		ENTER_STREAM: (id: string) => `video/streams/${id}/enter_stream/`,
		ADD_USER_AS_ADMIN: (id: string) => `video/streams/${id}/add_user_as_admin/`,
		CHECK_IF_MUSIC_IS_PLAYING: (id: string) =>
			`video/streams/${id}/check_if_music_is_playing/`,
		CHECK_IF_MUTED: (id: string) => `video/streams/${id}/check_if_muted/`,
		MUTE_MYSELF: (id: string) => `video/streams/${id}/mute_myself/`,
		MUTE_USER: (id: string) => `video/streams/${id}/mute_user/`,
		PLAY_MUSIC: (id: string) => `video/streams/${id}/play_music/`,
		REMOVE_USER: (id: string) => `video/streams/${id}/remove_user/`,
		REMOVE_USER_FROM_ADMIN: (id: string) =>
			`video/streams/${id}/remove_user_from_admin/`,
		REQUEST_SPEAKER_ROLE: (id: string) =>
			`video/streams/${id}/request_speaker_role/`,
		STOP_MUSIC: (id: string) => `video/streams/${id}/stop_music/`,
		STREAM_USERS: (id: string) => `video/streams/${id}/stream_users/`,
		TOGGLE_VIDEO: (id: string) => `video/streams/${id}/toggle_video/`,
		UNMUTE_MYSELF: (id: string) => `video/streams/${id}/unmute_myself/`,
		UNMUTE_USER: (id: string) => `video/streams/${id}/unmute_user/`,
		UPLOAD_ROOM_IMAGE: (id: string) => `video/streams/${id}/upload_room_image/`,
		GET_MESSAGES: (streamId: string) => `video/streams/${streamId}/messages/`,
		SEND_MESSAGE: (streamId: string) => `video/streams/${streamId}/messages/`,
		FOLLOW_STREAM: 'video/follow-stream/',
		UNFOLLOW_STREAM: (streamId: string) => `video/unfollow-stream/${streamId}/`,
		GET_MY_LIVESTREAM: 'video/get-my-livestream/',
		FOLLOWING_STREAMS: 'video/following-streams/',
		SET_STREAM_PASSWORD: (id: string) =>
			`video/streams/${id}/set_stream_password/`,
		REMOVE_STREAM_PASSWORD: (id: string) =>
			`video/streams/${id}/remove_stream_password/`,
	},
	AGENCY_HOST: {
		GET_ADMINS: 'agency/admins/',
		CREATE_AGENCY: 'agency/create/agency/',
		REQUEST_OTP: 'agency/request/otp/',
		APPLY_HOST: 'agency/host/apply/',
	},
	STREAM_BATTLES: {
		BASE: 'video/stream-battles/',
		GET_ONE: (id: string) => `video/stream-battles/${id}/`,
	},
} as const
