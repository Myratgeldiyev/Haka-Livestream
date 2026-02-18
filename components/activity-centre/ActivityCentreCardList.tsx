import { spacing } from '@/constants/spacing'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { ActivityCentreCard } from './ActivityCentreCard'
import type { ActivityCentreItem, ActivityCentreTabId } from './types'

const MOCK_ONGOING: ActivityCentreItem[] = [
	{
		id: '1',
		imageSource: require('@/assets/images/svip-act.png'),
		overlayText: 'SVIP Rank',
		title: 'SVIP RANK',
		statusLabel: 'Ongoing',
	},
	{
		id: '2',
		imageSource: require('@/assets/images/topic-event.png'),
		overlayText: 'Humane Vishesh Rocket Host banne ke liye apply karein',
		title: 'Rocket Host Video Collection',
		statusLabel: 'Ongoing',
	},
]

interface ActivityCentreCardListProps {
	activeTab: ActivityCentreTabId
	onCardPress?: (item: ActivityCentreItem) => void
}

function getDataForTab(tab: ActivityCentreTabId): ActivityCentreItem[] {
	switch (tab) {
		case 'ongoing':
			return MOCK_ONGOING
		case 'closed':
		case 'activity_rewards':
			return []
		default:
			return []
	}
}

export function ActivityCentreCardList({
	activeTab,
	onCardPress,
}: ActivityCentreCardListProps) {
	const data = getDataForTab(activeTab)

	return (
		<FlatList
			data={data}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<ActivityCentreCard
					{...item}
					onPress={onCardPress ? () => onCardPress(item) : undefined}
				/>
			)}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
			ListEmptyComponent={null}
		/>
	)
}

const styles = StyleSheet.create({
	content: {
		paddingBottom: spacing.xxl,
	},
})
