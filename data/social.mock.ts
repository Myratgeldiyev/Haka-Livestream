import type { SocialUser } from '@/types/social/social.types'

const generateUsers = (count: number, prefix: string): SocialUser[] => {
	return Array.from({ length: count }, (_, index) => ({
		id: `${prefix}-${index + 1}`,
		username: `User${prefix}${index + 1}`,
		userId: `${100000 + index}`,
		visitTime: index % 3 === 0 ? '2 hours ago' : index % 3 === 1 ? 'Yesterday' : '3 days ago',
	}))
}

export const MOCK_FRIENDS: SocialUser[] = generateUsers(35, 'friend')

export const MOCK_FOLLOWING: SocialUser[] = generateUsers(28, 'following')

export const MOCK_SPECIAL_ATTENTION: SocialUser[] = generateUsers(12, 'special')

export const MOCK_FOLLOWERS: SocialUser[] = generateUsers(45, 'follower')

export const MOCK_VISITORS: SocialUser[] = generateUsers(22, 'visitor')

export const MOCK_VIEW_HISTORY: SocialUser[] = generateUsers(18, 'history')

export const PAGE_SIZE = 10
