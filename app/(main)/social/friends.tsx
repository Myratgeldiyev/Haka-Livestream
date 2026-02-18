import { SocialHeader, SocialTabBar, UserList } from '@/components/social'
import { sharedSocialStyles } from '@/components/social/styles'
import { usePaginatedList } from '@/hooks/social/usePaginatedList'
import type { SocialTabType } from '@/types/social/social.types'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function FriendsScreen() {
	const { displayedUsers, isLoading, hasMore, loadMore } =
		usePaginatedList('friends')

	const handleBack = () => {
		router.back()
	}

	const handleSearch = () => {}

	const handleTabChange = (tab: SocialTabType) => {
		if (tab === 'friends') return
		router.replace(`/(main)/social/${tab}`)
	}

	return (
		<View style={sharedSocialStyles.screenContainer}>
			<SocialHeader
				title='Friends'
				onBack={handleBack}
				onSearch={handleSearch}
			/>
			<SocialTabBar activeTab='friends' onTabChange={handleTabChange} />
			<UserList
				users={displayedUsers}
				variant='friends'
				isLoading={isLoading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				emptyMessage="You haven't followed yet."
				emptySubMessage='Come to follow'
			/>
		</View>
	)
}
