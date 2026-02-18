import {
	SegmentedButtonGroup,
	SocialHeader,
	SocialTabBar,
	UserList,
} from '@/components/social'
import { sharedSocialStyles } from '@/components/social/styles'
import { usePaginatedList } from '@/hooks/social/usePaginatedList'
import type { SocialTabType, VisitorSegment } from '@/types/social/social.types'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'

const VISITOR_SEGMENTS: { key: VisitorSegment; label: string }[] = [
	{ key: 'my-visitor', label: 'My Visitor' },
	{ key: 'view-history', label: 'View History' },
]

export default function VisitorsScreen() {
	const [activeSegment, setActiveSegment] =
		useState<VisitorSegment>('my-visitor')
	const { displayedUsers, isLoading, hasMore, loadMore } =
		usePaginatedList('visitors')

	const handleBack = () => {
		router.back()
	}

	const handleSearch = () => {}

	const handleTabChange = (tab: SocialTabType) => {
		if (tab === 'visitors') return
		router.replace(`/(main)/social/${tab}`)
	}

	return (
		<View style={sharedSocialStyles.screenContainer}>
			<SocialHeader
				title='Visitors'
				onBack={handleBack}
				onSearch={handleSearch}
			/>
			<SocialTabBar activeTab='visitors' onTabChange={handleTabChange} />
			<SegmentedButtonGroup
				segments={VISITOR_SEGMENTS}
				activeSegment={activeSegment}
				onSegmentChange={setActiveSegment}
			/>
			<UserList
				users={displayedUsers}
				variant='visitors'
				isLoading={isLoading}
				hasMore={hasMore}
				onLoadMore={loadMore}
				emptyMessage="Don't have visitors yet"
			/>
		</View>
	)
}
