export interface RequestOtpPayload {
	phone_number: string
}

export interface RequestOtpResponse {
	message: string
	phone_number?: string
	otp_code?: string
	new_user?: boolean
}
export type LogoutResponse = {
	detail: string
}
export type AuthUser = {
	id: number
	username?: string
	phone?: string
}

export type UserIdLoginPayload = {
	user_id: number
	password: string
}

export type UserIdLoginResponse = {
	access: string
	isNewUser: boolean
	user: {
		id: number
		username?: string
	}
}

export interface VerifyOtpPayload {
	phone_number: string
	otp_code: string
}

export interface VerifyOtpUser {
	user_id: number
	username: string | null
	phone_number: string
}

export interface VerifyOtpToken {
	access: string
}

export interface VerifyOtpResponse {
	message: string
	user: VerifyOtpUser
	token: VerifyOtpToken
}

export type Gender = 'male' | 'female' | 'not to prefer'

export interface CompleteSignupPayload {
	username: string
	age: string
	gender: Gender
	country: string
}

export interface CompleteSignupResponse {
	message: string
}

export interface ApiError {
	message: string
	code?: string
	status?: number
}
