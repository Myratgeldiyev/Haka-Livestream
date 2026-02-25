import { AxiosError } from 'axios'
import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import {
	ApiError,
	CompleteSignupPayload,
	CompleteSignupResponse,
	GoogleLoginPayload,
	GoogleLoginResponse,
	LogoutResponse,
	RequestOtpPayload,
	RequestOtpResponse,
	UserIdLoginPayload,
	UserIdLoginResponse,
	VerifyOtpPayload,
	VerifyOtpResponse,
} from './auth.types'

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.'

const parseApiError = (error: unknown): ApiError => {
	if (error instanceof AxiosError) {
		const status = error.response?.status
		const responseData = error.response?.data
		const url = error.config?.url

		if (typeof responseData?.message === 'string') {
			return {
				message: responseData.message,
				code: responseData.code,
				status,
			}
		}

		if (typeof responseData?.error === 'string') {
			return {
				message: responseData.error,
				status,
			}
		}

		if (error.code === 'ECONNABORTED') {
			return {
				message: `Request timeout. URL: ${url}`,
				status,
			}
		}

		if (!error.response) {
			return {
				message: `Network error. URL: ${url}. Check your connection.`,
			}
		}

		return {
			message: `HTTP ${status}: ${error.message}. URL: ${url}`,
			status,
		}
	}

	return { message: DEFAULT_ERROR_MESSAGE }
}

export const authApi = {
	requestOtp: async (
		payload: RequestOtpPayload
	): Promise<RequestOtpResponse> => {
		try {
			const response = await apiClient.post<RequestOtpResponse>(
				ENDPOINTS.AUTH.REQUEST_OTP,
				payload
			)
			return response.data
		} catch (error) {
			throw parseApiError(error)
		}
	},

	verifyOtp: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
		try {
			const response = await apiClient.post<VerifyOtpResponse>(
				ENDPOINTS.AUTH.VERIFY_OTP,
				payload
			)
			return response.data
		} catch (error) {
			throw parseApiError(error)
		}
	},

	completeSignup: async (
		payload: CompleteSignupPayload
	): Promise<CompleteSignupResponse> => {
		try {
			const response = await apiClient.post<CompleteSignupResponse>(
				ENDPOINTS.AUTH.COMPLETE_SIGNUP,
				payload
			)
			return response.data
		} catch (error) {
			throw parseApiError(error)
		}
	},
	userIdLogin: async (
		payload: UserIdLoginPayload
	): Promise<UserIdLoginResponse> => {
		try {
			const res = await apiClient.post<UserIdLoginResponse>(
				ENDPOINTS.AUTH.USER_ID_LOGIN,
				payload
			)
			return res.data
		} catch (e) {
			throw parseApiError(e)
		}
	},
	googleLogin: async (
		payload: GoogleLoginPayload
	): Promise<GoogleLoginResponse> => {
		try {
			const res = await apiClient.post<GoogleLoginResponse>(
				ENDPOINTS.AUTH.GOOGLE_LOGIN,
				payload
			)
			return res.data
		} catch (e) {
			throw parseApiError(e)
		}
	},
	logout: async (): Promise<LogoutResponse> => {
		try {
			const response = await apiClient.post<LogoutResponse>(
				ENDPOINTS.AUTH.LOGOUT
			)
			return response.data
		} catch (error) {
			throw parseApiError(error)
		}
	},
}
