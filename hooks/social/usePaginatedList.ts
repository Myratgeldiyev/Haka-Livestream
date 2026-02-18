import { useUserRelationsStore } from '@/store/user.store'
import type { SocialTabType } from '@/types/social/social.types'
import { mapUserRelationToSocialUser } from '@/utils/social.mapper'
import { useEffect, useMemo, useState } from 'react'

const PAGE_SIZE = 10

export function usePaginatedList(type: SocialTabType) {
	const {
		friendsAll,
		followingAll,
		followersAll,
		visitorsAll,
		isLoading,
		fetchFriends,
		fetchFollowing,
		fetchFollowers,
		fetchVisitors,
	} = useUserRelationsStore()

	const [page, setPage] = useState(1)

	const allUsers =
		type === 'friends'
			? friendsAll
			: type === 'following'
			? followingAll
			: type === 'followers'
			? followersAll
			: type === 'visitors'
			? visitorsAll
			: []

	const fetchMap: Record<SocialTabType, () => Promise<void>> = {
		friends: fetchFriends,
		following: fetchFollowing,
		followers: fetchFollowers,
		visitors: fetchVisitors,
	}

	useEffect(() => {
		if (allUsers.length === 0) {
			fetchMap[type]()
		}
	}, [type])

	const displayedUsers = useMemo(() => {
		return allUsers.slice(0, page * PAGE_SIZE).map(mapUserRelationToSocialUser)
	}, [allUsers, page])

	const hasMore = displayedUsers.length < allUsers.length

	const loadMore = () => {
		if (!isLoading && hasMore) {
			setPage(prev => prev + 1)
		}
	}

	return {
		displayedUsers,
		isLoading,
		hasMore,
		loadMore,
	}
}
