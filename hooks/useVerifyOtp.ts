import { useAuthStore } from '@/store/auth.store'
import { useCallback } from 'react'

interface UseVerifyOtpReturn {
	verifyOtp: (phoneNumber: string, otpCode: string) => Promise<void>
	loading: boolean
	error: string | null
	phoneNumber: string | null
	otpCode: string | null
}

export const useVerifyOtp = (): UseVerifyOtpReturn => {
	const { isVerifyingOtp, verifyOtpError, verifyOtp, phoneNumber, otpCode } =
		useAuthStore()

	const handleVerifyOtp = useCallback(
		async (phone: string, otp: string) => {
			await verifyOtp(phone, otp)
		},
		[verifyOtp],
	)

	return {
		verifyOtp: handleVerifyOtp,
		loading: isVerifyingOtp,
		error: verifyOtpError,
		phoneNumber,
		otpCode,
	}
}
