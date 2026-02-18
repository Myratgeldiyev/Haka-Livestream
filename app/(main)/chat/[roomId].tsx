import { ChatActionOverlay } from '@/components/chat-actions'
import {
	AnnouncementBox,
	ChatList,
	DraggableCalculatorCountdown,
	DraggableKeepExitOverlay,
	RoomBottomBar,
	SeatGrid,
} from '@/components/live-room'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import {
	InviteMicSheet,
	InviteMicUser,
} from '@/components/live-room/invite-mic'
import { PKStartOverlay } from '@/components/pk-start-overlay'
import { DraggableMusicPlayer } from '@/components/room-tools/overlays/DraggableMusicPlayer'
import { MusicOverlay } from '@/components/room-tools/overlays/MusicOverlay'
import { fontSizes, fontWeights } from '@/constants/typography'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { useAuthStore } from '@/store/auth.store'
import { useLiveChatStore } from '@/store/liveChat.store'
import type { ChatUser } from '@/types/chat-actions/chat-action.types'
import { TopRightControls, TopUserInfo } from '@/types/game-ranking-types'
import { useFocusEffect } from '@react-navigation/native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Alert,
	BackHandler,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SeatStatus = 'locked' | 'unlocked'

type SeatUser = {
	id: string
	username: string
	avatar: string
	isMuted?: boolean
}

type Seat = {
	status: SeatStatus
	user: SeatUser | null
	isTurnedOff?: boolean
}

type SeatsState = Record<number, Seat>

function buildEmptySeats(count: number): SeatsState {
	return Object.fromEntries(
		Array.from({ length: count }, (_, i) => [
			i + 1,
			{ status: 'unlocked' as const, user: null },
		]),
	)
}

export default function ChatRoomScreen() {
	const { roomId: rawRoomId } = useLocalSearchParams<{ roomId: string }>()
	const [, setEditVisible] = useState(false)
	const [inviteSheetSeatNumber, setInviteSheetSeatNumber] = useState<
		number | null
	>(null)
	const [publicMsgEnabled, setPublicMsgEnabled] = useState(true)
	const [musicPlayerVisible, setMusicPlayerVisible] = useState(false)
	const [musicOverlayFromPlayerVisible, setMusicOverlayFromPlayerVisible] =
		useState(false)
	const [pkMatchOverlayVisible, setPkMatchOverlayVisible] = useState(false)
	const [leaveConfirmVisible, setLeaveConfirmVisible] = useState(false)
	const [calculatorCountdown, setCalculatorCountdown] = useState<{
		durationMinutes: number | null
	} | null>(null)
	const isExitingRef = useRef(false)
	const [currentTrack, setCurrentTrack] = useState<{
		name: string
		uri: string
	}>({ name: 'Music', uri: '' })
	const [seats, setSeats] = useState<SeatsState>(() => buildEmptySeats(10))
	const [selectedSeatUser, setSelectedSeatUser] = useState<ChatUser | null>(
		null,
	)

	const roomId = Array.isArray(rawRoomId) ? rawRoomId[0] : rawRoomId
	const navigation = useNavigation()

	const activeRoom = useLiveChatStore(s => s.activeRoom)
	const roomSeatCount = useLiveChatStore(s => s.roomSeatCount)
	const users = useLiveChatStore(s => s.users)
	const messages = useLiveChatStore(s => s.messages)
	const chatStatusText = useLiveChatStore(s => s.chatStatusText)
	const enterRoom = useLiveChatStore(s => s.enterRoom)
	const fetchRoomDetail = useLiveChatStore(s => s.fetchRoomDetail)
	const fetchMessages = useLiveChatStore(s => s.fetchMessages)
	const fetchAllUsersInChatRoom = useLiveChatStore(
		s => s.fetchAllUsersInChatRoom,
	)
	const clearMessages = useLiveChatStore(s => s.clearMessages)
	const sendMessage = useLiveChatStore(s => s.sendMessage)
	const leaveRoom = useLiveChatStore(s => s.leaveRoom)
	const setPendingMinimized = useLiveChatStore(s => s.setPendingMinimized)
	const clearMinimized = useLiveChatStore(s => s.clearMinimized)
	const muteUser = useLiveChatStore(s => s.muteUser)
	const unmuteUser = useLiveChatStore(s => s.unmuteUser)
	const muteMyself = useLiveChatStore(s => s.muteMyself)
	const unmuteMyself = useLiveChatStore(s => s.unmuteMyself)
	const storeIsMuted = useLiveChatStore(s => s.isMuted)
	const followRoom = useLiveChatStore(s => s.followRoom)
	const unfollowRoom = useLiveChatStore(s => s.unfollowRoom)

	const authenticatedUser = useAuthStore(state => state.user)
	const myUserId = authenticatedUser?.user_id?.toString()
	const { data: myProfile } = useMyProfile()

	const currentUserRole: RoomPlayUserRole =
		authenticatedUser?.user_id?.toString() ===
		activeRoom?.owner?.user_id?.toString()
			? 'owner'
			: 'listener'

	const [isFollowing, setIsFollowing] = useState(false)

	const handleToggleFollowRoom = useCallback(async () => {
		if (!roomId) return
		console.log('[CHAT_ROOM] handleToggleFollowRoom start', {
			roomId,
			isFollowing,
		})
		try {
			if (isFollowing) {
				console.log('[CHAT_ROOM] calling unfollowRoom')
				await unfollowRoom(roomId)
				setIsFollowing(false)
			} else {
				console.log('[CHAT_ROOM] calling followRoom')
				const res = await followRoom(roomId)
				console.log('[CHAT_ROOM] followRoom success', res)
				setIsFollowing(true)
			}
		} catch (e: any) {
			console.log('[CHAT_ROOM] handleToggleFollowRoom error', {
				status: e?.response?.status,
				data: e?.response?.data,
				url: e?.config?.url,
				method: e?.config?.method,
				requestData: e?.config?.data,
				message: e?.message,
			})
			Alert.alert(
				'Follow error',
				e?.response?.data?.message ||
					e?.message ||
					'Failed to update follow state. Please try again.',
			)
		}
	}, [roomId, isFollowing, followRoom, unfollowRoom])

	useEffect(() => {
		if (!roomId) {
			console.warn('[CHAT_ROOM] No roomId provided')
			return
		}

		const loadRoomData = async () => {
			try {
				const currentRoomId = useLiveChatStore.getState().roomId
				if (currentRoomId === roomId) {
					await Promise.all([
						fetchRoomDetail(roomId),
						fetchMessages(roomId),
						fetchAllUsersInChatRoom(roomId),
					])
					return
				}
				await leaveRoom({ awaitLeave: true }).catch(() => {})
				await enterRoom(roomId)
				await Promise.all([
					fetchRoomDetail(roomId),
					fetchMessages(roomId),
					fetchAllUsersInChatRoom(roomId),
				])
			} catch (error: any) {
				console.error('[CHAT_ROOM] Failed to load room data:', error)
				Alert.alert(
					'Error',
					error?.message || 'Failed to load room data. Please try again.',
				)
			}
		}

		loadRoomData()

		return () => {
			clearMessages()
		}
	}, [
		roomId,
		enterRoom,
		fetchRoomDetail,
		fetchMessages,
		fetchAllUsersInChatRoom,
		clearMessages,
		leaveRoom,
	])

	useFocusEffect(
		useCallback(() => {
			if (roomId && useLiveChatStore.getState().minimizedRoomId === roomId) {
				clearMinimized()
			}
		}, [roomId, clearMinimized]),
	)

	useEffect(() => {
		const sub = BackHandler.addEventListener('hardwareBackPress', () => {
			setLeaveConfirmVisible(true)
			return true
		})
		return () => sub.remove()
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', e => {
			if (isExitingRef.current) return
			e.preventDefault()
			setLeaveConfirmVisible(true)
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		return () => {
			const state = useLiveChatStore.getState()
			if (state.pendingMinimized?.roomId === roomId) return
			if (state.minimizedRoomId === roomId) return
			leaveRoom().catch(() => {})
		}
	}, [leaveRoom, roomId])

	useEffect(() => {
		setSeats(prev => {
			const next: SeatsState = {}
			for (let n = 1; n <= roomSeatCount; n++) {
				next[n] = prev[n] ?? { status: 'unlocked', user: null }
			}
			return next
		})
	}, [roomSeatCount])

	useEffect(() => {
		const picture = myProfile?.profile_picture
		if (!picture || !myUserId) return
		setSeats(prev => {
			let changed = false
			const next = { ...prev }
			for (const key of Object.keys(next)) {
				const num = Number(key)
				const u = next[num].user
				if (u?.id === myUserId && !u.avatar) {
					next[num] = {
						...next[num],
						user: { ...u, avatar: picture },
					}
					changed = true
				}
			}
			return changed ? next : prev
		})
	}, [myProfile?.profile_picture, myUserId])

	const handleClose = useCallback(() => {
		isExitingRef.current = true
		setLeaveConfirmVisible(false)
		if (myUserId) {
			setSeats(prev => {
				const next = { ...prev }
				for (const key of Object.keys(next)) {
					const num = Number(key)
					if (next[num].user?.id === myUserId) {
						next[num] = { ...next[num], user: null }
					}
				}
				return next
			})
		}
		leaveRoom()
		router.back()
	}, [myUserId, leaveRoom])

	const handleLeaveConfirmKeep = useCallback(() => {
		setLeaveConfirmVisible(false)
		if (roomId) {
			const imageUrl = activeRoom?.room_image ?? ''
			const title = activeRoom?.title ?? ''
			setPendingMinimized({ roomId, imageUrl, title })
			setTimeout(() => {
				router.navigate('/(tabs)/party')
			}, 0)
		}
	}, [roomId, activeRoom?.room_image, activeRoom?.title, setPendingMinimized])

	const handleLockSeat = (seatNumber: number) => {
		setSeats(prev => ({
			...prev,
			[seatNumber]: {
				...prev[seatNumber],
				status: 'locked',
			},
		}))
	}

	const handleUnlockSeat = (seatNumber: number) => {
		setSeats(prev => ({
			...prev,
			[seatNumber]: {
				...prev[seatNumber],
				status: 'unlocked',
			},
		}))
	}

	const handleOpenInviteMic = (seatNumber: number) => {
		setInviteSheetSeatNumber(seatNumber)
	}

	const handleCloseInviteSheet = () => {
		setInviteSheetSeatNumber(null)
	}

	const handleInviteUser = (userId: string) => {
		if (inviteSheetSeatNumber === null) return
		Alert.alert(
			'Invite Sent',
			`Invited user ${userId} to seat ${inviteSheetSeatNumber}`,
		)
	}

	const handleTakeSeat = (seatNumber: number) => {
		const seat = seats[seatNumber]
		const isOwner =
			activeRoom?.owner &&
			authenticatedUser?.user_id?.toString() ===
				activeRoom.owner.user_id.toString()

		if (seat.status === 'locked' && !isOwner) {
			Alert.alert('Notice', 'This seat is locked')
			return
		}

		if (seat.user !== null && !isOwner) {
			Alert.alert('Notice', 'This seat is occupied')
			return
		}

		if (isOwner && activeRoom?.owner) {
			const ownerId = activeRoom.owner.user_id.toString()
			setSeats(prev => {
				const updated = { ...prev }
				Object.keys(updated).forEach(key => {
					const numKey = Number(key)
					if (updated[numKey].user?.id === ownerId && numKey !== seatNumber) {
						updated[numKey] = {
							...updated[numKey],
							user: null,
						}
					}
				})
				updated[seatNumber] = {
					status: 'unlocked',
					user: {
						id: ownerId,
						username: activeRoom.owner.username,
						avatar: activeRoom.owner.profile_picture || '',
					},
				}
				return updated
			})
			return
		}

		if (!authenticatedUser) {
			Alert.alert('Error', 'User information not available')
			return
		}

		const userId = authenticatedUser.user_id.toString()
		const avatar = myProfile?.profile_picture ?? ''
		setSeats(prev => {
			const updated = { ...prev }
			Object.keys(updated).forEach(key => {
				const numKey = Number(key)
				if (updated[numKey].user?.id === userId && numKey !== seatNumber) {
					updated[numKey] = {
						...updated[numKey],
						user: null,
					}
				}
			})
			updated[seatNumber] = {
				status: 'unlocked',
				user: {
					id: userId,
					username: authenticatedUser.username || '',
					avatar,
				},
			}
			return updated
		})
	}

	const handleMuteUser = async (userId: string) => {
		try {
			await muteUser(userId)
		} catch (error: any) {
			Alert.alert('Error', error.message || 'Failed to mute user')
		}
	}

	const handleUnmuteUser = async (userId: string) => {
		try {
			await unmuteUser(userId)
		} catch (error: any) {
			Alert.alert('Error', error.message || 'Failed to unmute user')
		}
	}

	const handleTurnOff = (seatNumber: number) => {
		setSeats(prev => ({
			...prev,
			[seatNumber]: {
				...prev[seatNumber],
				isTurnedOff: !prev[seatNumber].isTurnedOff,
			},
		}))
	}

	const handleOccupiedSeatPress = useCallback((seatUser: SeatUser) => {
		setSelectedSeatUser({
			id: seatUser.id,
			name: seatUser.username,
			avatarUri: seatUser.avatar || undefined,
		})
	}, [])

	const handleTakeFirstAvailableSeat = () => {
		for (let n = 1; n <= roomSeatCount; n++) {
			const seat = seats[n]
			if (seat?.user === null) {
				handleTakeSeat(n)
				return
			}
		}
		Alert.alert('No seat available')
	}

	const invitableUsers: InviteMicUser[] = useMemo(() => {
		const seatedUserIds = new Set(
			Object.values(seats)
				.filter(seat => seat.user !== null)
				.map(seat => seat.user!.id),
		)
		return users
			.filter(u => !seatedUserIds.has(u.user.user_id.toString()))
			.map(u => ({
				user_id: u.user.user_id.toString(),
				username: u.user.username,
				profile_picture: u.user.profile_picture,
			}))
	}, [users, seats])

	const seatsWithMuteStatus: SeatsState = Object.entries(seats).reduce(
		(acc, [key, seat]) => {
			const seatNumber = Number(key)
			if (seat.user) {
				const roomUser = users.find(
					u => u.user.user_id.toString() === seat.user?.id,
				)
				const fromList = roomUser?.is_muted ?? false
				const isCurrentUserSeat = seat.user.id === myUserId
				acc[seatNumber] = {
					...seat,
					user: {
						...seat.user,
						isMuted: fromList || (isCurrentUserSeat && storeIsMuted),
					},
				}
			} else {
				acc[seatNumber] = seat
			}
			return acc
		},
		{} as SeatsState,
	)

	const handleSendMessage = async (text: string) => {
		if (!roomId) return
		try {
			await sendMessage(text)
		} catch (error: any) {
			console.error('[CHAT_ROOM] Failed to send message:', error)
			Alert.alert('Error', error.message || 'Failed to send message')
		}
	}

	const handleTogglePublicMsg = () => {
		setPublicMsgEnabled(prev => !prev)
	}

	const handleOpenMusicPlayer = () => {
		setMusicPlayerVisible(true)
	}

	const isUserOnSeat = useMemo(
		() =>
			!!myUserId &&
			Object.values(seatsWithMuteStatus).some(s => s.user?.id === myUserId),
		[myUserId, seatsWithMuteStatus],
	)

	const mySeatMuted = useMemo(() => {
		if (!myUserId) return false
		const seat = Object.values(seatsWithMuteStatus).find(
			s => s.user?.id === myUserId,
		)
		return seat?.user?.isMuted ?? false
	}, [myUserId, seatsWithMuteStatus])

	const isMuted = isUserOnSeat ? mySeatMuted || storeIsMuted : storeIsMuted

	const handleToggleMute = useCallback(() => {
		if (!roomId) return
		const promise = isMuted ? unmuteMyself(roomId) : muteMyself(roomId)
		promise.catch((e: any) => {
			console.error('[CHAT_ROOM] Toggle mute failed:', e)
			Alert.alert('Error', e?.message ?? 'Failed to toggle mute')
		})
	}, [roomId, isMuted, muteMyself, unmuteMyself])

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@/assets/images/games/chat-room-bg.png')}
				style={styles.background}
				resizeMode='cover'
			>
				<SafeAreaView style={styles.safeAreaTop} edges={['top']}>
					<View style={styles.topBar}>
						<TopUserInfo
							data={activeRoom}
							onEditPress={() => setEditVisible(true)}
							userRole={currentUserRole}
							isFollowing={isFollowing}
							onToggleFollow={handleToggleFollowRoom}
						/>
						<TopRightControls
							roomId={roomId}
							viewerCount={users.length}
							onClose={handleClose}
						/>
					</View>
				</SafeAreaView>

				<View style={styles.seatSection}>
					<SeatGrid
						_screenId='chat-roomId'
						seatCount={roomSeatCount}
						seats={seatsWithMuteStatus}
						userRole={currentUserRole}
						onLockSeat={handleLockSeat}
						onUnlockSeat={handleUnlockSeat}
						onOpenInviteMic={handleOpenInviteMic}
						onTakeSeat={handleTakeSeat}
						onTurnOff={handleTurnOff}
						onMuteUser={handleMuteUser}
						onUnmuteUser={handleUnmuteUser}
						onOccupiedSeatPress={handleOccupiedSeatPress}
					/>
				</View>

				<ChatActionOverlay
					visible={selectedSeatUser !== null}
					onClose={() => setSelectedSeatUser(null)}
					user={selectedSeatUser}
				/>

				<InviteMicSheet
					visible={inviteSheetSeatNumber !== null}
					users={invitableUsers}
					onClose={handleCloseInviteSheet}
					onInvite={handleInviteUser}
				/>

				<DraggableMusicPlayer
					visible={musicPlayerVisible}
					trackName={currentTrack.name}
					trackUri={currentTrack.uri}
					roomId={roomId}
					onClose={() => setMusicPlayerVisible(false)}
					onOpenPlaylist={() => setMusicOverlayFromPlayerVisible(true)}
				/>

				<MusicOverlay
					visible={musicOverlayFromPlayerVisible}
					onClose={() => setMusicOverlayFromPlayerVisible(false)}
					onSelectTrack={track => {
						setCurrentTrack(track)
						setMusicOverlayFromPlayerVisible(false)
					}}
					roomId={roomId}
				/>

				{pkMatchOverlayVisible && (
					<PKStartOverlay
						visible
						onClose={() => setPkMatchOverlayVisible(false)}
						initialMode='expanded'
					/>
				)}

				<DraggableKeepExitOverlay
					visible={leaveConfirmVisible}
					onKeep={handleLeaveConfirmKeep}
					onExit={() => setLeaveConfirmVisible(false)}
				/>

				<DraggableCalculatorCountdown
					visible={calculatorCountdown !== null}
					durationMinutes={calculatorCountdown?.durationMinutes ?? null}
					onClose={() => setCalculatorCountdown(null)}
				/>

				<View style={styles.bottomSection}>
					<View style={styles.announcementWrapper}>
						<AnnouncementBox
							message={
								activeRoom?.description ??
								"Welcome everyone! Let's chat and have fun together!"
							}
						/>
					</View>
					<View style={styles.chatSection}>
						<Text style={styles.publicMsgStatus}>
							{publicMsgEnabled
								? 'Public message enabled'
								: 'Public message disabled'}
						</Text>
						{publicMsgEnabled ? (
							<ChatList messages={messages} statusText={chatStatusText} />
						) : null}
					</View>
					<SafeAreaView edges={['bottom']}>
						<RoomBottomBar
							onSend={handleSendMessage}
							roomId={roomId}
							publicMsgEnabled={publicMsgEnabled}
							onTogglePublicMsg={handleTogglePublicMsg}
							onOpenMusicPlayer={handleOpenMusicPlayer}
							onRoomPKRandomMatch={() => setPkMatchOverlayVisible(true)}
							onCalculatorStart={minutes =>
								setCalculatorCountdown({ durationMinutes: minutes })
							}
							isUserOnSeat={isUserOnSeat}
							isMuted={isMuted}
							onToggleMute={handleToggleMute}
							onTakeFirstAvailableSeat={handleTakeFirstAvailableSeat}
						/>
					</SafeAreaView>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
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
		marginTop: 0,
		paddingBottom: 280,
	},
	bottomSection: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		paddingTop: 12,
	},
	announcementWrapper: {
		marginTop: 4,
		marginBottom: 6,
		paddingHorizontal: 16,
	},
	chatSection: {
		marginTop: 4,
		marginBottom: 4,
		paddingHorizontal: 16,
		maxHeight: 140,
	},
	publicMsgStatus: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.medium,
		color: 'rgba(255, 255, 255, 0.75)',
		marginBottom: 6,
	},
})
