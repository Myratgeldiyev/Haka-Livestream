import { profileApi } from '@/api/profile/profile.api'
import type { MyProfileResponse } from '@/types/profile/my-profile.types'
import { AxiosError } from 'axios'
import { router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'

interface UseMyProfileReturn {
	data: MyProfileResponse | null
	isLoading: boolean
	error: string | null
	refetch: () => Promise<void>
}

export function useMyProfile(): UseMyProfileReturn {
	const [data, setData] = useState<MyProfileResponse | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchProfile = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await profileApi.getMyProfile()
			console.log('getMyProfile response', response)
			setData(response)
		} catch (err) {
			if (err instanceof AxiosError && err.response?.status === 401) {
				router.replace('/(auth)/sign-up')
				return
			}

			const errorMessage =
				err instanceof AxiosError
					? err.response?.data?.message || err.message
					: 'Failed to load profile'

			setError(errorMessage)
		} finally {
			setIsLoading(false)
		}
	}, [])

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
