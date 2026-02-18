import {
	followApi,
	followersApi,
	followingApi,
	friendsApi,
	visitorsApi,
} from '@/api/profile/profile.api'
import { create } from 'zustand'

export interface UserRelation {
	user_id: number
	username: string
	age: number
	profile_picture: string
}

interface UserRelationsState {
	friendsAll: UserRelation[]
	followingAll: UserRelation[]
	followersAll: UserRelation[]

	visitorsAll: UserRelation[]
	isLoading: boolean
	error: string | null

	fetchFriends: () => Promise<void>
	fetchFollowing: () => Promise<void>
	fetchFollowers: () => Promise<void>
	fetchVisitors: () => Promise<void>
	followUser: (userId: string) => Promise<void>
	unfollowUser: (userId: string) => Promise<void>
}

export const useUserRelationsStore = create<UserRelationsState>((set, get) => ({
	friendsAll: [],
	followingAll: [],
	followersAll: [],
	visitorsAll: [],
	isLoading: false,
	error: null,

	fetchFriends: async () => {
		try {
			set({ isLoading: true })
			const data = await friendsApi.getFriends()
			set({ friendsAll: data, isLoading: false })
		} catch (e: any) {
			set({ error: e.message, isLoading: false })
		}
	},

	fetchFollowing: async () => {
		try {
			set({ isLoading: true })
			const data = await followingApi.getFollowing()
			set({ followingAll: data, isLoading: false })
		} catch (e: any) {
			set({ error: e.message, isLoading: false })
		}
	},

	fetchFollowers: async () => {
		try {
			set({ isLoading: true })
			const data = await followersApi.getFollowers()
			set({ followersAll: data, isLoading: false })
		} catch (e: any) {
			set({ error: e.message, isLoading: false })
		}
	},
	fetchVisitors: async () => {
		try {
			set({ isLoading: true })
			const data = await visitorsApi.getVisitors()
			set({ visitorsAll: data, isLoading: false })
		} catch (e: any) {
			set({ error: e.message, isLoading: false })
		}
	},

	followUser: async (userId: string) => {
		try {
			await followApi.follow(userId)
			await get().fetchFollowing()
		} catch (e: any) {
			set({ error: e.message })
		}
	},

	unfollowUser: async (userId: string) => {
		try {
			await followApi.unfollow(userId)
			await get().fetchFollowing()
		} catch (e: any) {
			set({ error: e.message })
		}
	},
}))
