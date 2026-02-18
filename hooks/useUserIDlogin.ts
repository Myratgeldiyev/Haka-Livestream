import { authApi } from '@/api/auth/auth.api'
import { UserIdLoginPayload } from '@/api/auth/auth.types'
import { setAuthToken } from '@/api/axios'
import { tokenService } from '@/services/token.service'
import { useCallback, useState } from 'react'

export const useUserIdLogin = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const login = useCallback(async (payload: UserIdLoginPayload) => {
		try {
			setLoading(true)
			setError(null)

			const data = await authApi.userIdLogin(payload)

			await tokenService.setToken(data.access)
			setAuthToken(data.access)

			return data
		} catch (e: any) {
			setError(e?.message ?? 'Login failed')
			throw e
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		login,
		loading,
		error,
	}
}
