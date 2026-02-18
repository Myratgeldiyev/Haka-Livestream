export type FollowerUser = {
	user_id: number
	username: string
	age: number
	profile_picture: string
}

export type FollowersResponse = FollowerUser[]

export type FriendUser = {
	user_id: number
	username: string
	age: number
	profile_picture: string
}

export type FriendsResponse = FriendUser[]
