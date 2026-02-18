import { UserRelation } from '@/store/user.store'
import { SocialUser } from '@/types/social/social.types'

export const mapUserRelationToSocialUser = (
	user: UserRelation,
): SocialUser => ({
	id: String(user.user_id),
	username: user.username,
	age: user.age,
	profilePicture: user.profile_picture,
})
