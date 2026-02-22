export interface AgencyHostAdmin {
	username: string
	user_id: number
	profile_picture: string
}

export type AgencyHostAdminsResponse = AgencyHostAdmin[]

export interface CreateAgencyRequest {
	name: string
	admin_id: string
	email: string
	country: string
	otp_code: string
}

export interface RequestOtpAgencyRequest {
	email: string
}

export interface ApplyForHostRequest {
	agent_id: string
}
