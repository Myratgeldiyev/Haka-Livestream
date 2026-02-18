import { useAuthStore } from '@/store/auth.store'
import { useCallback } from 'react'
import { Gender } from '../api/auth/auth.types'

interface UseCompleteSignupReturn {
	completeSignup: (
		username: string,
		age: string,
		gender: Gender,
		country: string,
	) => Promise<void>
	loading: boolean
	error: string | null
	success: boolean
	reset: () => void
}

export const useCompleteSignup = (): UseCompleteSignupReturn => {
	const {
		isCompletingSignup,
		completeSignupError,
		completeSignupSuccess,
		completeSignup,
		resetSignupState,
	} = useAuthStore()

	const handleCompleteSignup = useCallback(
		async (username: string, age: string, gender: Gender, country: string) => {
			await completeSignup(username, age, gender, country)
		},
		[completeSignup],
	)

	return {
		completeSignup: handleCompleteSignup,
		loading: isCompletingSignup,
		error: completeSignupError,
		success: completeSignupSuccess,
		reset: resetSignupState,
	}
}
