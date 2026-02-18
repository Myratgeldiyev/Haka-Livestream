import { API_CONFIG } from '@/api/endpoints'
import type { LiveStreamListItem } from '@/api/live-stream/lives.types'
import { CategoryFilters } from '@/components/home/CategoryFilters'
import { FloatingLiveButton } from '@/components/home/FloatingLiveButton'
import { FollowTab } from '@/components/home/FollowTabContent'
import { Header } from '@/components/home/Header'
import { LiveTab } from '@/components/home/LiveTabContent'
import { NearbyTab } from '@/components/home/NearbyTabContent'
import { NewTab } from '@/components/home/NewTabContent'
import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { LiveUser } from '@/types'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function resolveImageUrl(url: string | undefined | null): string {
	if (!url || typeof url !== 'string') return ''
	if (url.startsWith('http://') || url.startsWith('https://')) return url
	const base = API_CONFIG.BASE_URL ?? ''
	const origin = base.replace(/\/api\/?$/, '')
	return origin + (url.startsWith('/') ? url : `/${url}`)
}

function mapStreamToListUser(item: LiveStreamListItem): LiveUser {
	if (!item || !item.id) {
		console.warn('[LiveTab] Invalid stream item:', item)
		return {
			id: 'invalid',
			name: 'Invalid Stream',
			age: 0,
			location: '',
			country: '',
			imageUrl: '',
			status: 'Live',
			popularity: 0,
			isLive: true,
		}
	}
	
	const imageUrl =
		resolveImageUrl(item.room_image) ||
		resolveImageUrl(item.owner?.profile_picture) ||
		''
	return {
		id: item.id,
		name: item.owner?.username ?? item.title ?? 'Stream',
		age: 0,
		location: item.description ?? item.title ?? '',
		country: '',
		imageUrl,
		status: 'Live',
		popularity: typeof item.display_id === 'number' ? item.display_id : 0,
		isLive: true,
	}
}

type TabKey = 'nearby' | 'follow' | 'live' | 'new'

const mockUsers: LiveUser[] = [
	{
		id: '1',
		name: 'Wateen',
		age: 23,
		location: 'Delhi',
		country: '🇮🇳',
		imageUrl:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
		status: 'Chatting',
		popularity: 1000,
		rank: 10,
	},
	{
		id: '2',
		name: 'Priya',
		age: 21,
		location: 'Mumbai',
		country: '🇮🇳',
		imageUrl:
			'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
		status: 'Live',
		popularity: 2500,
		rank: 5,
	},
]

export default function LiveScreen() {
	const [activeTab, setActiveTab] = useState<TabKey>('live')
	const [liveStreamUsers, setLiveStreamUsers] = useState<LiveUser[]>([])
	const [nearbyStreamUsers, setNearbyStreamUsers] = useState<LiveUser[]>([])
	const [isLiveTabLoading, setIsLiveTabLoading] = useState(true)
	const insets = useSafeAreaInsets()
	const {
		getStreamsList,
		getNearbyLiveStreams,
		pendingMinimizedStream,
		setMinimizedStream,
		setPendingMinimizedStream,
	} = useLiveStreamStore()

	useFocusEffect(
		useCallback(() => {
			if (pendingMinimizedStream) {
				setMinimizedStream(
					pendingMinimizedStream.streamId,
					pendingMinimizedStream.imageUrl,
					pendingMinimizedStream.title,
				)
				setPendingMinimizedStream(null)
			}
		}, [pendingMinimizedStream, setMinimizedStream, setPendingMinimizedStream]),
	)

	useFocusEffect(
		useCallback(() => {
			setIsLiveTabLoading(true)
			getStreamsList()
				.then((raw: unknown) => {
					console.log('[LiveTab] getStreamsList response:', raw)
					// Handle different response formats
					let list: LiveStreamListItem[] = []
					if (Array.isArray(raw)) {
						list = raw as LiveStreamListItem[]
					} else if (raw && typeof raw === 'object' && 'results' in raw && Array.isArray((raw as any).results)) {
						list = (raw as any).results as LiveStreamListItem[]
					} else if (raw && typeof raw === 'object' && 'data' in raw && Array.isArray((raw as any).data)) {
						list = (raw as any).data as LiveStreamListItem[]
					}
					console.log('[LiveTab] Mapped list length:', list.length)
					setLiveStreamUsers(list.map(mapStreamToListUser))
				})
				.catch((error) => {
					console.error('[LiveTab] getStreamsList error:', error)
					setLiveStreamUsers([])
				})
				.finally(() => setIsLiveTabLoading(false))
			getNearbyLiveStreams()
				.then((raw: unknown) => {
					console.log('[LiveTab] getNearbyLiveStreams response:', raw)
					// Handle different response formats
					let list: LiveStreamListItem[] = []
					if (Array.isArray(raw)) {
						list = raw as LiveStreamListItem[]
					} else if (raw && typeof raw === 'object' && 'results' in raw && Array.isArray((raw as any).results)) {
						list = (raw as any).results as LiveStreamListItem[]
					} else if (raw && typeof raw === 'object' && 'data' in raw && Array.isArray((raw as any).data)) {
						list = (raw as any).data as LiveStreamListItem[]
					}
					setNearbyStreamUsers(list.map(mapStreamToListUser))
				})
				.catch((error) => {
					console.error('[LiveTab] getNearbyLiveStreams error:', error)
					setNearbyStreamUsers([])
				})
		}, [getStreamsList, getNearbyLiveStreams]),
	)

	const content = useMemo(() => {
		switch (activeTab) {
			case 'live':
				return (
					<LiveTab users={liveStreamUsers} isLoading={isLiveTabLoading} />
				)
			case 'new':
				return <NewTab users={mockUsers} />
			case 'follow':
				return <FollowTab users={mockUsers} />
			case 'nearby':
				return <NearbyTab users={nearbyStreamUsers} />
			default:
				return null
		}
	}, [activeTab, liveStreamUsers, nearbyStreamUsers, isLiveTabLoading])

	return (
		<View style={styles.container}>
			<Header activeTab={activeTab} onTabChange={setActiveTab} />
			<CategoryFilters />

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[
					styles.scrollContent,
					{
						paddingBottom: spacing.lg + insets.bottom,
					},
				]}
				showsVerticalScrollIndicator={false}
			>
				{content}
			</ScrollView>

			<View style={styles.floatingButtonWrapper} pointerEvents='box-none'>
				<FloatingLiveButton position='bottom-right' />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},

	scrollView: {
		flex: 1,
	},

	scrollContent: {
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
	},

	floatingButtonWrapper: {
		...StyleSheet.absoluteFillObject,
		zIndex: 10,
	},
})
