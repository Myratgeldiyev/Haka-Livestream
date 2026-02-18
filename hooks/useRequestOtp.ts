import { useAuthStore } from '@/store/auth.store'
import { useCallback } from 'react'

interface UseRequestOtpReturn {
	requestOtp: (phoneNumber: string) => Promise<void>
	loading: boolean
	error: string | null
	success: boolean
	reset: () => void
}

export const useRequestOtp = (): UseRequestOtpReturn => {
	const {
		isRequestingOtp,
		otpRequestError,
		otpRequestSuccess,
		requestOtp,
		resetOtpState,
	} = useAuthStore()

	const handleRequestOtp = useCallback(
		async (phoneNumber: string) => {
			await requestOtp(phoneNumber)
		},
		[requestOtp],
	)

	return {
		requestOtp: handleRequestOtp,
		loading: isRequestingOtp,
		error: otpRequestError,
		success: otpRequestSuccess,
		reset: resetOtpState,
	}
}
