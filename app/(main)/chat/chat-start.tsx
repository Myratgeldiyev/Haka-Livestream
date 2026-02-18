import { BottomControlsChat } from '@/components/live-chat/BottomControlsChat'
import { SeatGrid } from '@/components/live-room'
import { EditInfoBottomSheet, TopInfoOverlay } from '@/components/live-stream'
import { LIVE_STREAM, LiveStreamTab } from '@/constants/liveStream'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { leaveChannel } from '@/services/agora/agora.service'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	ImageBackground,
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

type SeatStatus = 'locked' | 'unlocked'
type Seat = { status: SeatStatus; user: null }
type SeatsState = Record<number, Seat>

function buildEmptySeats(count: number): SeatsState {
	return Object.fromEntries(
		Array.from({ length: count }, (_, i) => [
			i + 1,
			{ status: 'unlocked' as const, user: null },
		]),
	)
}

interface TabMeasurement {
	x: number
	width: number
}

function LiveChatTabsWithNavigation() {
	const [activeTab] = useState<LiveStreamTab>('Chat')
	const [isReady, setIsReady] = useState(false)
	const measurements = useRef<Record<LiveStreamTab, TabMeasurement>>(
		{} as Record<LiveStreamTab, TabMeasurement>,
	).current

	const scaleX = useRef(new Animated.Value(0)).current

	const onTabLayout = (tab: LiveStreamTab) => (e: LayoutChangeEvent) => {
		const { x, width } = e.nativeEvent.layout
		measurements[tab] = { x, width }

		if (tab === activeTab && !isReady) {
			setIsReady(true)
			Animated.spring(scaleX, {
				toValue: 1,
				useNativeDriver: true,
				tension: 100,
				friction: 10,
			}).start()
		}
	}

	const handleTabPress = (tab: LiveStreamTab) => {
		if (tab === 'Live') {
			router.back()
		}
	}

	const activeMeasurement = measurements[activeTab]

	return (
		<View style={styles.tabsContainer}>
			<View style={styles.tabsRow}>
				{LIVE_STREAM.tabs.map(tab => (
					<Pressable
						key={tab}
						onPress={() => handleTabPress(tab)}
						onLayout={onTabLayout(tab)}
						style={styles.tabButton}
					>
						<Text
							style={[
								styles.tabText,
								activeTab === tab && styles.activeTabText,
							]}
						>
							{tab}
						</Text>
					</Pressable>
				))}
			</View>

			{isReady && activeMeasurement && (
				<Animated.View
					style={[
						styles.indicator,
						{
							width: activeMeasurement.width,
							left: activeMeasurement.x,
							transform: [{ scaleX }],
						},
					]}
				/>
			)}
		</View>
	)
}

export default function LiveChatScreen() {
	const { data: profile } = useMyProfile()
	const [editSheetVisible, setEditSheetVisible] = useState(false)
	const [seats] = useState<SeatsState>(() => buildEmptySeats(10))

	const handleEditPress = () => {
		setEditSheetVisible(true)
	}

	const handleEditClose = () => {
		setEditSheetVisible(false)
	}

	const handleEditSave = (data: { roomName: string; announcement: string }) => {
		console.log('Saved:', data)
	}

	const handleClose = () => {
		router.back()
	}

	useEffect(() => {
		return () => {
			leaveChannel()
		}
	}, [])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@/assets/images/games/chat-room-bg.png')}
				style={styles.background}
				resizeMode='cover'
			>
				<TopInfoOverlay
					username={profile?.username ?? 'Wateen'}
					image={profile?.profile_picture}
					onEditPress={handleEditPress}
				/>

				<View style={styles.seatSection}>
					<SeatGrid
						_screenId='chat-start'
						seatCount={10}
						seats={seats}
						userRole='owner'
						onUnlockSeat={() => {}}
						iconsOnly
					/>
				</View>

				<View style={styles.bottomContainer}>
					<BottomControlsChat />
					<LiveChatTabsWithNavigation />
				</View>
			</ImageBackground>
			<EditInfoBottomSheet
				visible={editSheetVisible}
				onClose={handleEditClose}
				onSave={handleEditSave}
				initialRoomName={profile?.username ?? 'Wateen'}
				profileImage={
					profile?.profile_picture
						? { uri: profile.profile_picture }
						: undefined
				}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flex: 1,
	},
	safeAreaTop: {
		flex: 0,
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingHorizontal: 12,
		paddingTop: 8,
	},
	seatSection: {
		flex: 1,
		paddingHorizontal: 16,
	},

	bottomContainer: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		gap: 12,
	},
	input: {
		flex: 1,
		height: 44,
		backgroundColor: 'rgba(255,255,255,0.15)',
		borderRadius: 22,
		paddingHorizontal: 16,
		color: '#FFFFFF',
		fontSize: 14,
	},
	sendButton: {
		height: 44,
		paddingHorizontal: 20,
		backgroundColor: LIVE_STREAM.colors.primary,
		borderRadius: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sendText: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '600',
	},
	tabsContainer: {
		alignItems: 'center',
		position: 'relative',
		marginTop: 30,
	},
	tabsRow: {
		flexDirection: 'row',
		gap: 32,
		paddingBottom: 8,
	},
	tabButton: {
		paddingVertical: 5,
		paddingHorizontal: 4,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'rgba(255, 255, 255, 0.6)',
	},
	activeTabText: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	indicator: {
		position: 'absolute',
		bottom: 0,
		height: 3,
		backgroundColor: '#FFFFFF',
		borderRadius: 1.5,
	},
})
