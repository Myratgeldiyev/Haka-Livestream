import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = 'auth_access_token'
const USER_KEY = 'auth_user'

export interface StoredUser {
	user_id: number
	username: string | null
	phone_number: string
}

export const tokenService = {
	async setToken(token: string): Promise<void> {
		await AsyncStorage.setItem(TOKEN_KEY, token)
	},

	async getToken(): Promise<string | null> {
		return AsyncStorage.getItem(TOKEN_KEY)
	},

	async removeToken(): Promise<void> {
		await AsyncStorage.removeItem(TOKEN_KEY)
	},

	async setUser(user: StoredUser): Promise<void> {
		await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
	},

	async getUser(): Promise<StoredUser | null> {
		const data = await AsyncStorage.getItem(USER_KEY)
		return data ? JSON.parse(data) : null
	},

	async removeUser(): Promise<void> {
		await AsyncStorage.removeItem(USER_KEY)
	},

	async clearAuth(): Promise<void> {
		await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY])
	},
}
