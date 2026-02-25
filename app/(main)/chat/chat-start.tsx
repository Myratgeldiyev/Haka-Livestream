import { BottomControlsChat } from '@/components/live-chat/BottomControlsChat'
import { SeatGrid } from '@/components/live-room'
import {
	EditInfoBottomSheet,
	LiveChatTabs,
	TopInfoOverlay,
} from '@/components/live-stream'
import { LIVE_STREAM } from '@/constants/liveStream'
import { spacing } from '@/constants/spacing'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { leaveChannel } from '@/services/agora/agora.service'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

export default function LiveChatScreen() {
	const insets = useSafeAreaInsets()
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

				<View
					style={[
						styles.bottomContainer,
						{
							bottom: insets.bottom + LIVE_STREAM.spacing.bottomTabsOffset,
							paddingHorizontal: spacing.screen.horizontal,
						},
					]}
				>
					<BottomControlsChat />
					<LiveChatTabs
						activeTab="Chat"
						onTabChange={tab => {
							if (tab === 'Live') router.back()
						}}
					/>
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
		justifyContent: 'center',
		paddingHorizontal: 16,
	},

	bottomContainer: {
		position: 'absolute',
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
})
