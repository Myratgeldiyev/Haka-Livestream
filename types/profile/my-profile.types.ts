export interface MyProfileResponse {
	username: string | null
	user_id: number
	profile_picture: string
	is_agent: boolean
	is_host: boolean
	followers: number
	follow: number
	friends: number
	visitors: number
	level: number
	top_up: number
	withdraw: number
}
