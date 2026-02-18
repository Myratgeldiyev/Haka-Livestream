import { profileApi } from '@/api/profile/profile.api'
import type { MyProfileResponse } from '@/types/profile/my-profile.types'
import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface UseUserProfileReturn {
	data: MyProfileResponse | null
	isLoading: boolean
	error: string | null
	refetch: () => Promise<void>
}

export function useUserProfile(userId: string | null): UseUserProfileReturn {
	const [data, setData] = useState<MyProfileResponse | null>(null)
	const [isLoading, setIsLoading] = useState(!!userId)
	const [error, setError] = useState<string | null>(null)

	const fetchProfile = useCallback(async () => {
		if (!userId) {
			setData(null)
			setError(null)
			return
		}
		setIsLoading(true)
		setError(null)
		try {
			const response = await profileApi.getUserProfile(userId)
			setData(response)
		} catch (err) {
			const errorMessage =
				err instanceof AxiosError
					? (err.response?.data as { message?: string })?.message || err.message
					: 'Failed to load profile'
			setError(errorMessage)
			setData(null)
		} finally {
			setIsLoading(false)
		}
	}, [userId])

	useEffect(() => {
		fetchProfile()
	}, [fetchProfile])

	return {
		data,
		isLoading,
		error,
		refetch: fetchProfile,
	}
}
