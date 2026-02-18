import { TopicEventBanner } from '@/components/home/TopicEventBanner'
import {
	FilterChips,
	FloatingPartyButton,
	PartyHeader,
	RoomCard,
	RoomCardSkeleton,
	RoomData,
} from '@/components/party'
import { spacing } from '@/constants/spacing'
import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	Modal,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


const AVATAR_FALLBACK = require('@/assets/images/games/room-avatar.png')

const FILTER_ITEMS = [
	{ id: 'dubai', label: 'Dubai' },
	{ id: 'india', label: 'India', hasFlag: true },
	{ id: 'global', label: '', hasFlag: true },
	{ id: 'multi', label: '', hasFlag: true },
]

type ListItem =
	| { type: 'room'; data: RoomData }
	| { type: 'banner' }
	| { type: 'skeleton' }

const INITIAL_SKELETON_LIST: ListItem[] = [
	{ type: 'skeleton' },
	{ type: 'skeleton' },
	{ type: 'skeleton' },
	{ type: 'banner' },
	{ type: 'skeleton' },
	{ type: 'skeleton' },
]

export default function PartyScreen() {
	const [activeTab, setActiveTab] = useState<'party' | 'following'>('party')
	const [activeFilter, setActiveFilter] = useState('india')
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null)
	const insets = useSafeAreaInsets()

	const {
		rooms,
		fetchRooms,
		fetchNextRooms,
		roomsLoading,
		roomsLoadingMore,
		hasMoreRooms,
		enterRoom,
		fetchRoomDetail,
		clearMinimized,
		setMinimized,
		setPendingMinimized,
		pendingMinimized,
	} = useLiveChatStore()

	// Apply pending minimize when party screen is focused (after Keep from voice room)
	useFocusEffect(
		useCallback(() => {
			if (pendingMinimized) {
				setMinimized(
					pendingMinimized.roomId,
					pendingMinimized.imageUrl,
					pendingMinimized.title,
				)
				setPendingMinimized(null)
			}
		}, [pendingMinimized, setMinimized, setPendingMinimized]),
	)

	useEffect(() => {
		if (rooms.length === 0) {
			fetchRooms()
		}
	}, [rooms.length, fetchRooms])

	const mappedRooms: RoomData[] = useMemo(() => {
		return rooms.map(room => ({
			id: room.id,
			hostName: room.owner.username,
			hostAvatar: room.owner.profile_picture
				? { uri: room.owner.profile_picture }
				: AVATAR_FALLBACK,
			category: room.title || 'Chatting',
			viewerCount: room.display_id ?? 0,
			viewers: [],
		}))
	}, [rooms])

	const listData: ListItem[] = useMemo(() => {
		const isInitialLoad = roomsLoading && rooms.length === 0 && !isRefreshing
		if (isInitialLoad) {
			return INITIAL_SKELETON_LIST
		}
		const items: ListItem[] = []
		mappedRooms.forEach((room, index) => {
			if (index === 3) {
				items.push({ type: 'banner' })
			}
			items.push({ type: 'room', data: room })
		})
		return items
	}, [mappedRooms, roomsLoading, rooms.length, isRefreshing])

	const renderItem: ListRenderItem<ListItem> = ({ item }) => {
		if (item.type === 'banner') {
			return (
				<View style={styles.bannerWrapper}>
					<TopicEventBanner />
				</View>
			)
		}
		if (item.type === 'skeleton') {
			return <RoomCardSkeleton />
		}
		return (
			<RoomCard data={item.data} onPress={handleRoomPress} />
		)
	}

	const handleEndReached = useCallback(() => {
		if (!roomsLoadingMore && hasMoreRooms) {
			fetchNextRooms()
		}
	}, [roomsLoadingMore, hasMoreRooms, fetchNextRooms])

	const handleRefresh = useCallback(async () => {
		setIsRefreshing(true)
		try {
			await fetchRooms()
		} finally {
			setIsRefreshing(false)
		}
	}, [fetchRooms])

	const handleRoomPress = useCallback(
		async (data: RoomData) => {
			if (joiningRoomId) return
			clearMinimized()
			setJoiningRoomId(data.id)
			try {
				await enterRoom(data.id)
				await fetchRoomDetail(data.id)
				router.push({
					pathname: '/chat/[roomId]',
					params: { roomId: data.id },
				})
			} catch (e) {
				console.log('Failed to enter room', e)
			} finally {
				setJoiningRoomId(null)
			}
		},
		[joiningRoomId, enterRoom, fetchRoomDetail, clearMinimized]
	)

	const listFooterComponent = useMemo(() => {
		if (roomsLoadingMore) {
			return (
				<View style={styles.footer}>
					<ActivityIndicator size="small" color="#9C27B0" />
					<Text style={styles.footerText}>Loading room</Text>
				</View>
			)
		}
		if (!hasMoreRooms && rooms.length > 0) {
			return (
				<View style={styles.footer}>
					<Text style={styles.footerTextMuted}>No more rooms</Text>
				</View>
			)
		}
		return null
	}, [roomsLoadingMore, hasMoreRooms, rooms.length])

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<Modal
				visible={joiningRoomId !== null}
				transparent
				statusBarTranslucent
				animationType="fade"
			>
				<View style={styles.joinOverlay}>
					<View style={styles.joinOverlayContent}>
						<ActivityIndicator size="large" color="#9C27B0" />
						<Text style={styles.joinOverlayText}>Joining room...</Text>
					</View>
				</View>
			</Modal>

			<PartyHeader activeTab={activeTab} onTabChange={setActiveTab} />

			<FilterChips
				items={FILTER_ITEMS}
				activeId={activeFilter}
				onSelect={setActiveFilter}
			/>

			<FlatList
				data={listData}
				renderItem={renderItem}
				keyExtractor={(item, index) =>
					item.type === 'banner'
						? `banner-${index}`
						: item.type === 'skeleton'
							? `skeleton-${index}`
							: item.data.id
				}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				ListFooterComponent={listFooterComponent}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						colors={['#9C27B0']}
					/>
				}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={[
					styles.listContent,
					{ paddingBottom: spacing.xxxl * 4 + insets.bottom },
				]}
			/>

			<FloatingPartyButton />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF0F5',
	},
	listContent: {
		flexGrow: 1,
	},
	bannerWrapper: {
		marginHorizontal: spacing.lg,
	},
	footer: {
		paddingVertical: spacing.lg,
		alignItems: 'center',
		gap: spacing.sm,
	},
	footerText: {
		fontSize: 12,
		color: '#9C27B0',
	},
	footerTextMuted: {
		fontSize: 12,
		color: '#999',
	},
	joinOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	joinOverlayContent: {
		alignItems: 'center',
		gap: spacing.md,
	},
	joinOverlayText: {
		fontSize: 16,
		color: '#FFF',
		fontWeight: '500',
	},
})
