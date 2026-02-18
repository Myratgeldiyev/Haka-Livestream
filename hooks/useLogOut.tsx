import { authApi } from '@/api/auth/auth.api'
import { setAuthToken } from '@/api/axios'
import { tokenService } from '@/services/token.service'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export function useLogout() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const logout = async () => {
		if (loading) return

		try {
			setLoading(true)
			setError(null)

			await authApi.logout()

			await tokenService.clearAuth()
			setAuthToken(null)

			router.replace('/login')
		} catch (err: any) {
			setError(err?.message ?? 'Logout failed')
		} finally {
			setLoading(false)
		}
	}

	return {
		logout,
		loading,
		error,
	}
}
