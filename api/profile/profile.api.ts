import { FollowingResponse } from '@/types/following/types'
import type { MyProfileResponse } from '@/types/profile/my-profile.types'
import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import { FollowersResponse, FriendsResponse } from './user.types'

export interface UpdateProfilePictureParams {
	uri: string
	name: string
	type: string
}

export const profileApi = {
	getMyProfile: async (): Promise<MyProfileResponse> => {
		const response = await apiClient.get<MyProfileResponse>(
			ENDPOINTS.PROFILE.MY_PROFILE,
		)
		return response.data
	},

	getUserProfile: async (userId: string): Promise<MyProfileResponse> => {
		const response = await apiClient.get<MyProfileResponse>(
			ENDPOINTS.PROFILE.GET_USER_PROFILE(userId),
		)
		return response.data
	},

	updateProfilePicture: async (
		image: UpdateProfilePictureParams,
	): Promise<MyProfileResponse> => {
		const formData = new FormData()
		formData.append('profile_picture', {
			uri: image.uri,
			name: image.name,
			type: image.type,
		} as unknown as Blob)

		const response = await apiClient.post<MyProfileResponse>(
			ENDPOINTS.PROFILE.UPDATE_PROFILE_PICTURE,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
		return response.data
	},
}
export const followApi = {
	follow: async (userId: string): Promise<void> => {
		await apiClient.post(ENDPOINTS.FOLLOW.FOLLOW, { user_id: userId })
	},
	unfollow: async (userId: string): Promise<void> => {
		await apiClient.delete(ENDPOINTS.FOLLOW.UNFOLLOW(userId))
	},
}

export const followingApi = {
	getFollowing: async (): Promise<FollowingResponse> => {
		const response = await apiClient.get<FollowingResponse>(
			ENDPOINTS.FOLLOWING.LIST,
		)
		return response.data
	},
}
export const followersApi = {
	getFollowers: async (): Promise<FollowersResponse> => {
		const response = await apiClient.get<FollowersResponse>(
			ENDPOINTS.FOLLOWERS.LIST,
		)
		return response.data
	},
}

export const friendsApi = {
	getFriends: async (): Promise<FriendsResponse> => {
		const response = await apiClient.get<FriendsResponse>(
			ENDPOINTS.FRIENDS.LIST,
		)
		return response.data
	},
}
export const visitorsApi = {
	getVisitors: async (): Promise<FriendsResponse> => {
		const response = await apiClient.get<FriendsResponse>(
			ENDPOINTS.VISITORS.LIST,
		)
		return response.data
	},
}
