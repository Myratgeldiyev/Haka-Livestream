import { VideoItemType } from '@/types/video'
import React, { useCallback, useRef, useState } from 'react'
import {
	FlatList,
	ViewToken,
	ViewabilityConfig,
	useWindowDimensions,
} from 'react-native'
import { VideoItem } from './VideoItem'

const DATA: VideoItemType[] = [
	{
		id: '1',
		video: require('../../assets/videos/video.mp4'),
		username: 'username',
		tag: '#gameplay',
	},
	{
		id: '2',
		video: require('../../assets/videos/video.mp4'),
		username: 'username',
		tag: '#gameplay',
	},
]

const viewabilityConfig: ViewabilityConfig = {
	itemVisiblePercentThreshold: 50,
}

export function VideoFeed() {
	const [activeIndex, setActiveIndex] = useState(0)
	const { height: screenHeight } = useWindowDimensions()

	const onViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length > 0 && viewableItems[0].index !== null) {
				setActiveIndex(viewableItems[0].index)
			}
		},
	).current

	const renderItem = useCallback(
		({ item, index }: { item: VideoItemType; index: number }) => (
			<VideoItem item={item} isActive={index === activeIndex} />
		),
		[activeIndex],
	)

	const keyExtractor = useCallback((item: VideoItemType) => item.id, [])

	return (
		<FlatList
			data={DATA}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
			pagingEnabled
			showsVerticalScrollIndicator={false}
			snapToInterval={screenHeight}
			snapToAlignment='start'
			decelerationRate='fast'
			onViewableItemsChanged={onViewableItemsChanged}
			viewabilityConfig={viewabilityConfig}
			getItemLayout={(_, index) => ({
				length: screenHeight,
				offset: screenHeight * index,
				index,
			})}
			removeClippedSubviews
			initialNumToRender={1}
			maxToRenderPerBatch={2}
			windowSize={3}
		/>
	)
}
