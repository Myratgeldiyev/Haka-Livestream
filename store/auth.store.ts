import { create } from 'zustand'
import { authApi } from '../api/auth/auth.api'
import { ApiError, Gender, VerifyOtpUser } from '../api/auth/auth.types'
import { setAuthToken } from '../api/axios'
import { navigationService } from '../services/navigation.service'
import { tokenService } from '../services/token.service'

interface AuthState {
	phoneNumber: string | null
	otpCode: string | null
	accessToken: string | null
	user: VerifyOtpUser | null
	isNewUser: boolean | undefined
	isAuthenticated: boolean

	isRequestingOtp: boolean
	otpRequestError: string | null
	otpRequestSuccess: boolean

	isVerifyingOtp: boolean
	verifyOtpError: string | null
	verifyOtpSuccess: boolean

	isCompletingSignup: boolean
	completeSignupError: string | null
	completeSignupSuccess: boolean

	requestOtp: (phoneNumber: string) => Promise<void>
	verifyOtp: (phoneNumber: string, otpCode: string) => Promise<void>
	completeSignup: (
		username: string,
		age: string,
		gender: Gender,
		country: string
	) => Promise<void>
	logout: () => Promise<void>
	initializeAuth: () => Promise<void>
	resetOtpState: () => void
	resetVerifyState: () => void
	resetSignupState: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
	phoneNumber: null,
	otpCode: null,
	accessToken: null,
	user: null,
	isNewUser: undefined,
	isAuthenticated: false,

	isRequestingOtp: false,
	otpRequestError: null,
	otpRequestSuccess: false,

	isVerifyingOtp: false,
	verifyOtpError: null,
	verifyOtpSuccess: false,

	isCompletingSignup: false,
	completeSignupError: null,
	completeSignupSuccess: false,

	initializeAuth: async () => {
		const token = await tokenService.getToken()
		const user = await tokenService.getUser()
		if (token && user) {
			setAuthToken(token)
			set({
				accessToken: token,
				user,
				isAuthenticated: true,
			})
		}
	},

	requestOtp: async (phoneNumber: string) => {
		set({
			isRequestingOtp: true,
			otpRequestError: null,
			otpRequestSuccess: false,
		})

		try {
			const response = await authApi.requestOtp({ phone_number: phoneNumber })
			const isNewUser = response.new_user

			set({
				isRequestingOtp: false,
				otpRequestSuccess: true,
				phoneNumber,
				otpCode: response.otp_code || null,
				isNewUser,
			})
		} catch (error) {
			const apiError = error as ApiError
			set({
				isRequestingOtp: false,
				otpRequestError: apiError.message,
				otpRequestSuccess: false,
			})
		}
	},

	verifyOtp: async (phoneNumber: string, otpCode: string) => {
		set({
			isVerifyingOtp: true,
			verifyOtpError: null,
			verifyOtpSuccess: false,
		})

		try {
			const response = await authApi.verifyOtp({
				phone_number: phoneNumber,
				otp_code: otpCode,
			})
			const token = response.token.access
			const user = response.user

			await tokenService.setToken(token)
			await tokenService.setUser(user)
			setAuthToken(token)

			const isNewUser = get().isNewUser ?? true

			set({
				isVerifyingOtp: false,
				verifyOtpSuccess: true,
				accessToken: token,
				user,
				isAuthenticated: true,
			})

			navigationService.handlePostOtpVerify(isNewUser)
		} catch (error) {
			const apiError = error as ApiError
			set({
				isVerifyingOtp: false,
				verifyOtpError: apiError.message,
				verifyOtpSuccess: false,
			})
		}
	},

	completeSignup: async (
		username: string,
		age: string,
		gender: Gender,
		country: string
	) => {
		set({
			isCompletingSignup: true,
			completeSignupError: null,
			completeSignupSuccess: false,
		})

		try {
			await authApi.completeSignup({ username, age, gender, country })

			const currentUser = get().user
			if (currentUser) {
				const updatedUser = { ...currentUser, username }
				await tokenService.setUser(updatedUser)
				set({
					isCompletingSignup: false,
					completeSignupSuccess: true,
					user: updatedUser,
					isNewUser: false,
				})
			} else {
				set({
					isCompletingSignup: false,
					completeSignupSuccess: true,
					isNewUser: false,
				})
			}

			navigationService.handlePostSignup()
		} catch (error) {
			const apiError = error as ApiError
			set({
				isCompletingSignup: false,
				completeSignupError: apiError.message,
				completeSignupSuccess: false,
			})
		}
	},

	logout: async () => {
		await tokenService.clearAuth()
		setAuthToken(null)
		set({
			phoneNumber: null,
			otpCode: null,
			accessToken: null,
			user: null,
			isNewUser: undefined,
			isAuthenticated: false,
		})
	},

	resetOtpState: () => {
		set({
			isRequestingOtp: false,
			otpRequestError: null,
			otpRequestSuccess: false,
		})
	},

	resetVerifyState: () => {
		set({
			isVerifyingOtp: false,
			verifyOtpError: null,
			verifyOtpSuccess: false,
		})
	},

	resetSignupState: () => {
		set({
			isCompletingSignup: false,
			completeSignupError: null,
			completeSignupSuccess: false,
		})
	},
}))
