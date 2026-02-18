import {
	BottomControls,
	CameraView,
	EditInfoBottomSheet,
	LiveChatTabs,
	RightControlPanel,
	TopInfoOverlay,
} from '@/components/live-stream'
import type { RoomImagePayload } from '@/components/live-stream/EditInfoBottomSheet'
import { LiveStreamTab } from '@/constants/liveStream'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'

const DEFAULT_ROOM_NAME = 'Room Name'
const DEFAULT_ANNOUNCEMENT = 'announcement'

export default function LiveStreamScreen() {
	const [, setActiveTab] = useState<LiveStreamTab>('Live')
	const [editSheetVisible, setEditSheetVisible] = useState(false)
	const [roomName, setRoomName] = useState(DEFAULT_ROOM_NAME)
	const [announcement, setAnnouncement] = useState(DEFAULT_ANNOUNCEMENT)
	const [roomImagePayload, setRoomImagePayload] =
		useState<RoomImagePayload | null>(null)
	const [isGoingLive, setIsGoingLive] = useState(false)

	const liveStream = useLiveStreamStore(s => s.liveStream)
	const { startStream, uploadRoomImage, updateStream, leaveRoom, clearStream } =
		useLiveStreamStore()

	const handleTabChange = (tab: LiveStreamTab) => {
		if (tab === 'Chat') {
			router.push('/chat/chat-start')
			return
		}
		setActiveTab(tab)
	}

	const handleEditPress = () => {
		setEditSheetVisible(true)
	}

	const handleEditClose = () => {
		setEditSheetVisible(false)
	}

	const handleEditSave = useCallback(
		(data: { roomName: string; announcement: string }) => {
			setRoomName(data.roomName)
			setAnnouncement(data.announcement)
			setEditSheetVisible(false)
		},
		[],
	)

	const handleImageSelect = useCallback((payload: RoomImagePayload) => {
		setRoomImagePayload(payload)
	}, [])

	const handleGoToLive = useCallback(async () => {
		setIsGoingLive(true)
		try {
			if (liveStream?.id) {
				try {
					await leaveRoom(liveStream.id)
				} catch {}
				clearStream()
			}

			const stream = await startStream()
			const id = stream.id

			if (roomImagePayload !== null) {
				await uploadRoomImage(id, roomImagePayload)
			}

			const nameOrAnnouncementChanged =
				roomName !== DEFAULT_ROOM_NAME || announcement !== DEFAULT_ANNOUNCEMENT
			if (nameOrAnnouncementChanged) {
				await updateStream(id, { title: roomName, description: announcement })
			}

			router.replace(`/live/${id}`)
		} catch (e) {
			const message =
				e instanceof Error
					? e.message
					: 'Failed to start stream. Please try again.'
			Alert.alert('Error', message)
		} finally {
			setIsGoingLive(false)
		}
	}, [
		liveStream?.id,
		leaveRoom,
		clearStream,
		startStream,
		uploadRoomImage,
		updateStream,
		roomName,
		announcement,
		roomImagePayload,
	])

	const handleCenterPress = () => {
		router.push('/live/live-room-type')
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@/assets/images/stream-bg.png')}
				style={styles.background}
				resizeMode='cover'
			>
				<CameraView>
					<TopInfoOverlay
						roomName={roomName}
						roomImageUri={roomImagePayload?.uri ?? null}
						onEditPress={handleEditPress}
					/>
					<RightControlPanel />
					<View style={styles.bottomWrapper}>
						<BottomControls
							onCenterPress={handleCenterPress}
							onGoToLive={handleGoToLive}
							isGoingLive={isGoingLive}
						/>
					</View>
					<View style={styles.tabsWrapper}>
						<LiveChatTabs onTabChange={handleTabChange} />
					</View>
				</CameraView>
			</ImageBackground>

			<EditInfoBottomSheet
				visible={editSheetVisible}
				onClose={handleEditClose}
				onSave={handleEditSave}
				onImageSelect={handleImageSelect}
				initialRoomName={roomName}
				initialAnnouncement={announcement}
				roomImageUri={roomImagePayload?.uri ?? null}
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
	bottomWrapper: {
		position: 'absolute',
		bottom: 100,
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	tabsWrapper: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		alignItems: 'center',
	},
})
