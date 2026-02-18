import {
	SegmentedButtonGroup,
	SocialHeader,
	SocialTabBar,
	UserList,
} from '@/components/social'
import { sharedSocialStyles } from '@/components/social/styles'
import { usePaginatedList } from '@/hooks/social/usePaginatedList'
import type {
	FollowingSegment,
	SocialTabType,
} from '@/types/social/social.types'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'

const FOLLOWING_SEGMENTS: { key: FollowingSegment; label: string }[] = [
	{ key: 'following', label: 'Following' },
	{ key: 'special-attention', label: 'Special Attention' },
]

export default function FollowingScreen() {
	const [activeSegment, setActiveSegment] =
		useState<FollowingSegment>('following')

	const followingList = usePaginatedList('following')
	const specialAttentionList = usePaginatedList('followers')

	const currentList =
		activeSegment === 'following' ? followingList : specialAttentionList

	const handleBack = () => {
		router.back()
	}

	const handleSearch = () => {}

	const handleTabChange = (tab: SocialTabType) => {
		if (tab === 'following') return
		router.replace(`/(main)/social/${tab}`)
	}

	return (
		<View style={sharedSocialStyles.screenContainer}>
			<SocialHeader
				title='Following'
				onBack={handleBack}
				onSearch={handleSearch}
			/>

			<SocialTabBar activeTab='following' onTabChange={handleTabChange} />

			<SegmentedButtonGroup
				segments={FOLLOWING_SEGMENTS}
				activeSegment={activeSegment}
				onSegmentChange={setActiveSegment}
			/>

			<UserList
				users={currentList.displayedUsers}
				variant='following'
				isLoading={currentList.isLoading}
				hasMore={currentList.hasMore}
				onLoadMore={currentList.loadMore}
				emptyMessage="You haven't followed yet."
				emptySubMessage='Come to follow'
			/>
		</View>
	)
}
