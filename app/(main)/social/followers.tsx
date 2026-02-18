import { SocialHeader, SocialTabBar, UserList } from '@/components/social'
import { sharedSocialStyles } from '@/components/social/styles'
import { usePaginatedList } from '@/hooks/social/usePaginatedList'
import type { SocialTabType } from '@/types/social/social.types'
import { router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function FollowersScreen() {
	const { displayedUsers, isLoading, hasMore, loadMore } =
		usePaginatedList('followers')

	const handleBack = () => {
		router.back()
	}

	const handleTabChange = (tab: SocialTabType) => {
		if (tab === 'followers') return
		router.replace(`/(main)/social/${tab}`)
	}

	return (
		<View style={sharedSocialStyles.screenContainer}>
			<SocialHeader title='Followers' onBack={handleBack} onSearch={() => {}} />

			<SocialTabBar activeTab='followers' onTabChange={handleTabChange} />

			<UserList
				users={displayedUsers}
				variant='followers'
				isLoading={isLoading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				emptyMessage="You don't have any followers yet."
			/>
		</View>
	)
}
