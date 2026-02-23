import { ChatActionOverlay } from '@/components/chat-actions'
import {
	AnnouncementBox,
	ChatList,
	DraggableCalculatorCountdown,
	DraggableKeepExitOverlay,
	RoomBottomBar,
	SeatGrid,
} from '@/components/live-room'
import {
	InviteMicSheet,
	InviteMicUser,
} from '@/components/live-room/invite-mic'
import { PKStartOverlay } from '@/components/pk-start-overlay'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import { DraggableMusicPlayer } from '@/components/room-tools/overlays/DraggableMusicPlayer'
import { MusicOverlay } from '@/components/room-tools/overlays/MusicOverlay'
import { fontSizes, fontWeights } from '@/constants/typography'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import {
	enableAudioVolumeIndication,
	setVolumeIndicationCallback,
} from '@/services/agora/agora.service'
import { useAuthStore } from '@/store/auth.store'
import { useLiveChatStore } from '@/store/liveChat.store'
import { resolveImageUrl } from '@/utils/imageUrl'
import type { ChatUser } from '@/types/chat-actions/chat-action.types'
import { TopRightControls, TopUserInfo } from '@/types/game-ranking-types'
import { useFocusEffect } from '@react-navigation/native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Alert,
	BackHandler,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
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

/** Format: [seat_emoji:seatNumber:emojiId] - sent so other users show this emoji on that seat */
const SEAT_EMOJI_MSG_REGEX = /^\[seat_emoji:(\d+):([^\]]+)\]$/
function parseSeatEmojiMessage(text: string): { seatNumber: number; emojiId: string } | null {
	const m = text.trim().match(SEAT_EMOJI_MSG_REGEX)
	if (!m) return null
	return { seatNumber: Number(m[1]), emojiId: m[2] }
}
function toSeatEmojiMessage(seatNumber: number, emojiId: string) {
	return `[seat_emoji:${seatNumber}:${emojiId}]`
}

export default function ChatRoomScreen() {
	const { height: screenHeight } = useWindowDimensions()
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
	const [seatEmojiBurst, setSeatEmojiBurst] = useState<{
		seatNumber: number
		emojiId: string
	} | null>(null)

	const roomId = Array.isArray(rawRoomId) ? rawRoomId[0] : rawRoomId
	const navigation = useNavigation()

	const activeRoom = useLiveChatStore(s => s.activeRoom)
	const roomSeatCount = useLiveChatStore(s => s.roomSeatCount)
	const users = useLiveChatStore(s => s.users)
	const storeUid = useLiveChatStore(s => s.uid)
	const isJoined = useLiveChatStore(s => s.isJoined)
	const [speakingUids, setSpeakingUids] = useState<number[]>([])
	const messages = useLiveChatStore(s => s.messages)
	const chatStatusText = useLiveChatStore(s => s.chatStatusText)
	const enterRoom = useLiveChatStore(s => s.enterRoom)
	const fetchRoomDetail = useLiveChatStore(s => s.fetchRoomDetail)
	const fetchMessages = useLiveChatStore(s => s.fetchMessages)
	const fetchAllUsersInChatRoom = useLiveChatStore(
		s => s.fetchAllUsersInChatRoom,
	)
	const roomFollowers = useLiveChatStore(s => s.roomFollowers)
	const fetchRoomFollowers = useLiveChatStore(s => s.fetchRoomFollowers)
	const roomSpeakers = useLiveChatStore(s => s.roomSpeakers)
	const fetchRoomSpeakers = useLiveChatStore(s => s.fetchRoomSpeakers)
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
	const requestSpeakerRole = useLiveChatStore(s => s.requestSpeakerRole)
	const changeSeatChatRoom = useLiveChatStore(s => s.changeSeatChatRoom)
	const leaveSeatChatRoom = useLiveChatStore(s => s.leaveSeatChatRoom)

	const myCurrentSeatNumberRef = useRef<number | null>(null)
	const processedSeatEmojiMessageIdsRef = useRef<Set<string>>(new Set())
	/** After we change seat, ignore server roomSpeakers for our seat briefly so stale poll doesn't revert us. */
	const lastSeatChangeAtRef = useRef<number>(0)

	const authenticatedUser = useAuthStore(state => state.user)
	const { data: myProfile } = useMyProfile()
	// Use auth user or fallback to profile so "Take a seat" works when auth store hasn't hydrated yet
	const currentUserForSeat = useMemo(() => {
		if (authenticatedUser) {
			return {
				id: authenticatedUser.user_id.toString(),
				username: authenticatedUser.username ?? '',
				avatar: myProfile?.profile_picture ?? '',
			}
		}
		if (myProfile) {
			return {
				id: myProfile.user_id.toString(),
				username: myProfile.username ?? '',
				avatar: myProfile.profile_picture ?? '',
			}
		}
		return null
	}, [authenticatedUser, myProfile])
	const myUserId =
		currentUserForSeat?.id ?? authenticatedUser?.user_id?.toString()

	const currentUserRole: RoomPlayUserRole =
		myUserId != null &&
		activeRoom?.owner?.user_id != null &&
		String(activeRoom.owner.user_id) === myUserId
			? 'owner'
			: 'listener'

	const isFollowing = useMemo(
		() =>
			myUserId != null &&
			roomFollowers.some(f => String(f.user.user_id) === myUserId),
		[roomFollowers, myUserId],
	)

	const onlineUsersCount = useMemo(
		() => users.filter(u => u.user.is_online === true).length,
		[users],
	)

	const handleToggleFollowRoom = useCallback(async () => {
		if (!roomId) return
		try {
			if (isFollowing) {
				await unfollowRoom(roomId)
				await fetchRoomFollowers(roomId)
			} else {
				await followRoom(roomId)
				await fetchRoomFollowers(roomId)
			}
		} catch (e: any) {
			Alert.alert(
				'Follow error',
				e?.response?.data?.message ||
					e?.message ||
					'Failed to update follow state. Please try again.',
			)
		}
	}, [roomId, isFollowing, followRoom, unfollowRoom, fetchRoomFollowers])

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
						fetchRoomFollowers(roomId),
						fetchRoomSpeakers(roomId),
					])
					return
				}
				await leaveRoom({ awaitLeave: true }).catch(() => {})
				await enterRoom(roomId)
				await Promise.all([
					fetchRoomDetail(roomId),
					fetchMessages(roomId),
					fetchAllUsersInChatRoom(roomId),
					fetchRoomFollowers(roomId),
					fetchRoomSpeakers(roomId),
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
		fetchRoomFollowers,
		fetchRoomSpeakers,
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

	// Poll all room data every 4s (no websocket): seats/online users, messages, room detail, users (mute state)
	useEffect(() => {
		if (!roomId || !isJoined) return
		const poll = () => {
			fetchRoomFollowers(roomId).catch(() => {})
			fetchRoomSpeakers(roomId).catch(() => {})
			fetchMessages(roomId).catch(() => {})
			fetchRoomDetail(roomId).catch(() => {})
			fetchAllUsersInChatRoom(roomId).catch(() => {})
		}
		poll()
		const interval = setInterval(poll, 4000)
		return () => clearInterval(interval)
	}, [
		roomId,
		isJoined,
		fetchRoomFollowers,
		fetchRoomSpeakers,
		fetchMessages,
		fetchRoomDetail,
		fetchAllUsersInChatRoom,
	])

	// Agora volume indication: speakingUids = uids with volume > 50; map uid 0 to local user's store uid
	useEffect(() => {
		const VOLUME_THRESHOLD = 50
		const cb = (speakers: { uid: number; volume: number }[]) => {
			const storeUid = useLiveChatStore.getState().uid
			// Agora reports local user as uid 0 or actual uid; map 0 -> storeUid so getIsSpeakingForSeat sees us
			const uids = speakers
				.filter(s => s.volume > VOLUME_THRESHOLD)
				.map(s => (s.uid === 0 && storeUid != null ? storeUid : s.uid))
			if (__DEV__ && speakers.length > 0) {
				console.log('[CHAT_ROOM] onAudioVolumeIndication', {
					speakers: speakers.map(s => ({ uid: s.uid, volume: s.volume })),
					storeUid,
					speakingUids: Array.from(new Set(uids)),
				})
			}
			setSpeakingUids(prev => {
				const next = new Set(uids)
				if (prev.length === next.size && prev.every(u => next.has(u)))
					return prev
				return Array.from(next)
			})
		}
		setVolumeIndicationCallback(cb)
		return () => setVolumeIndicationCallback(null)
	}, [])

	useEffect(() => {
		if (!isJoined || !roomId) return
		const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID
		if (!appId) return
		// 200ms interval, smooth 3, reportVad true; call after join
		enableAudioVolumeIndication(appId, 200, 3, true).catch(() => {})
	}, [isJoined, roomId])

	// Re-enable volume indication when user takes a seat (broadcaster) so local speaking is reported
	useEffect(() => {
		if (!isUserOnSeat || !isJoined || !roomId) return
		const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID
		if (!appId) return
		enableAudioVolumeIndication(appId, 200, 3, true).catch(() => {})
	}, [isUserOnSeat, isJoined, roomId])

	const getIsSpeakingForSeat = useCallback(
		(seatNumber: number, seat: Seat | undefined): boolean => {
			if (!seat?.user) return false
			// Current user: we know our Agora uid from store
			if (seat.user.id === myUserId && storeUid != null) {
				return speakingUids.includes(storeUid)
			}
			// Remote users: would need seat -> Agora uid map (e.g. from backend room_users with uid)
			return false
		},
		[myUserId, storeUid, speakingUids],
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
			const seatNo = myCurrentSeatNumberRef.current
			if (seatNo != null) {
				myCurrentSeatNumberRef.current = null
				state.leaveSeatChatRoom(String(seatNo)).catch(() => {})
			}
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

	// Sync seat occupancy from server (room_speakers) so all users see who is on which seat.
	// Preserve current user's seat if server hasn't returned it yet (avoid flicker + 400 on retry).
	useEffect(() => {
		if (roomSeatCount <= 0) return
		const mySeat = myCurrentSeatNumberRef.current
		// Keep ref in sync when server says we're on a seat; don't clear ref when server is stale (we may have just taken seat)
		const mySpeaker = roomSpeakers.find(
			f => myUserId != null && String(f.user.user_id) === myUserId,
		)
		if (mySpeaker?.seat_number != null) {
			myCurrentSeatNumberRef.current = mySpeaker.seat_number
		} else if (mySpeaker && mySpeaker.seat_number === null) {
			// Server explicitly says we're in room but not on a seat (we left or never took one)
			myCurrentSeatNumberRef.current = null
		}
		setSeats(prev => {
			const next: SeatsState = { ...prev }
			for (let n = 1; n <= roomSeatCount; n++) {
				const existing = next[n]
				const speaker = roomSpeakers.find(
					s => s.seat_number != null && s.seat_number === n,
				)
				if (speaker) {
					// Resolve profile_picture to full URL so avatar image loads (API often returns path like /media/...)
					const avatarUrl = resolveImageUrl(speaker.user.profile_picture) || ''
					next[n] = {
						status: existing?.status ?? 'unlocked',
						user: {
							id: String(speaker.user.user_id),
							username: speaker.user.username,
							avatar: avatarUrl,
						},
						isTurnedOff: existing?.isTurnedOff,
					}
				} else {
					// Don't clear my own seat if server hasn't caught up yet (stale room_speakers) or we just changed seat.
					// Window 6s so it outlasts the 4s poll; also preserve when we're not in server list yet (mySpeaker == null).
					const isMySeat =
						myUserId != null && (existing?.user?.id === myUserId || mySeat === n)
					const justChangedSeat = Date.now() - lastSeatChangeAtRef.current < 6000
					const serverSaysWeOnThisSeat = mySpeaker?.seat_number === n
					const serverSaysWeLeft = mySpeaker != null && mySpeaker.seat_number === null
					// When justChangedSeat, always preserve (server often still has us as seat_number null). Otherwise preserve only if server agrees or we're not in list.
					const preserve =
						isMySeat &&
						(justChangedSeat ||
							((serverSaysWeOnThisSeat || mySpeaker == null) && !serverSaysWeLeft))
					if (preserve) {
						next[n] = existing ?? { status: 'unlocked', user: null }
					} else {
						next[n] = {
							status: existing?.status ?? 'unlocked',
							user: null,
							isTurnedOff: existing?.isTurnedOff,
						}
					}
				}
			}
			return next
		})
	}, [roomSpeakers, roomSeatCount, myUserId])

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

	const handleClose = useCallback(async () => {
		isExitingRef.current = true
		setLeaveConfirmVisible(false)
		const seatNo = myCurrentSeatNumberRef.current
		if (seatNo != null) {
			try {
				await leaveSeatChatRoom(String(seatNo))
			} catch (_) {
				// continue to leave room even if leave seat fails
			}
			myCurrentSeatNumberRef.current = null
		}
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
	}, [myUserId, leaveRoom, leaveSeatChatRoom])

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

	const handleTakeSeat = async (seatNumber: number) => {
		const seat = seats[seatNumber]
		const isOwner =
			activeRoom?.owner &&
			myUserId != null &&
			String(activeRoom.owner.user_id) === myUserId

		if (seat.status === 'locked' && !isOwner) {
			Alert.alert('Notice', 'This seat is locked')
			return
		}

		if (seat.user !== null && !isOwner) {
			Alert.alert('Notice', 'This seat is occupied')
			return
		}

		const revertSeat = () => {
			setSeats(prev => ({
				...prev,
				[seatNumber]: { ...prev[seatNumber], user: null },
			}))
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
			lastSeatChangeAtRef.current = Date.now()
			try {
				if (myCurrentSeatNumberRef.current === null) {
					await requestSpeakerRole(seatNumber)
				} else {
					await changeSeatChatRoom(String(seatNumber))
				}
				myCurrentSeatNumberRef.current = seatNumber
				lastSeatChangeAtRef.current = Date.now()
				setTimeout(() => fetchRoomSpeakers(roomId).catch(() => {}), 800)
			} catch (e: any) {
				Alert.alert(
					'Error',
					e?.message ?? 'Failed to change seat. Please try again.',
				)
				revertSeat()
			}
			return
		}

		if (!currentUserForSeat) {
			Alert.alert('Error', 'User information not available')
			return
		}

		const { id: userId, username, avatar } = currentUserForSeat
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
					username,
					avatar,
				},
			}
			return updated
		})
		lastSeatChangeAtRef.current = Date.now()
		try {
			if (myCurrentSeatNumberRef.current === null) {
				await requestSpeakerRole(seatNumber)
			} else {
				await changeSeatChatRoom(String(seatNumber))
			}
			myCurrentSeatNumberRef.current = seatNumber
			lastSeatChangeAtRef.current = Date.now()
			setTimeout(() => fetchRoomSpeakers(roomId).catch(() => {}), 800)
		} catch (e: any) {
			Alert.alert(
				'Error',
				e?.message ?? 'Failed to change seat. Please try again.',
			)
			revertSeat()
		}
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

	// Koltukta değilken mikrofonu kapat: sadece koltuk alan kullanıcı konuşabilsin
	useEffect(() => {
		if (!isJoined || !roomId || isUserOnSeat) return
		if (!storeIsMuted) {
			muteMyself(roomId).catch(() => {})
		}
	}, [isJoined, roomId, isUserOnSeat, storeIsMuted, muteMyself])

	// Re-enable volume indication when screen gains focus while on seat (e.g. after background / other app audio)
	useFocusEffect(
		useCallback(() => {
			if (!isUserOnSeat || !isJoined || !roomId) return
			const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID
			if (!appId) return
			enableAudioVolumeIndication(appId, 200, 3, true).catch(() => {})
		}, [isUserOnSeat, isJoined, roomId]),
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
		if (!isUserOnSeat) {
			Alert.alert('Notice', 'Take a seat to speak')
			return
		}
		const promise = isMuted ? unmuteMyself(roomId) : muteMyself(roomId)
		promise.catch((e: any) => {
			console.error('[CHAT_ROOM] Toggle mute failed:', e)
			Alert.alert('Error', e?.message ?? 'Failed to toggle mute')
		})
	}, [roomId, isUserOnSeat, isMuted, muteMyself, unmuteMyself])

	// When we receive a seat_emoji message (from another user), show that emoji on their seat
	useEffect(() => {
		const processed = processedSeatEmojiMessageIdsRef.current
		for (const msg of messages) {
			if (processed.has(msg.id) || msg.isMe) continue
			const parsed = parseSeatEmojiMessage(msg.text)
			if (!parsed) continue
			processed.add(msg.id)
			setSeatEmojiBurst({ seatNumber: parsed.seatNumber, emojiId: parsed.emojiId })
			setTimeout(() => setSeatEmojiBurst(null), 2500)
		}
	}, [messages])

	const handleEmojiPicked = useCallback(
		(emojiId: string) => {
			if (!myUserId || !roomId) return
			const entry = Object.entries(seatsWithMuteStatus).find(([_, seat]) => {
				const seatUserId = seat.user?.id?.toString()
				return seatUserId != null && seatUserId === myUserId
			})
			if (!entry) return
			const seatNumber = Number(entry[0])
			setSeatEmojiBurst({ seatNumber, emojiId })
			setTimeout(() => setSeatEmojiBurst(null), 2500)
			// Send so other users see this emoji on our seat (they get it via message poll)
			sendMessage(toSeatEmojiMessage(seatNumber, emojiId)).catch(() => {})
		},
		[myUserId, roomId, seatsWithMuteStatus, sendMessage],
	)

	// Chat list: hide seat_emoji system messages
	const displayMessages = useMemo(
		() => messages.filter(m => !parseSeatEmojiMessage(m.text)),
		[messages],
	)

	const seatSectionPaddingBottom = Math.min(
		320,
		Math.max(200, screenHeight * 0.36),
	)
	const chatSectionMaxHeight = Math.min(180, Math.max(90, screenHeight * 0.2))

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@/assets/images/games/chat-room-bg.png')}
				style={styles.background}
				resizeMode='cover'
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					style={styles.keyboardAvoid}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
				>
					<SafeAreaView style={styles.safeAreaTop} edges={['top']}>
						<View style={styles.topBar}>
							<TopUserInfo
								data={activeRoom}
								onEditPress={() => setEditVisible(true)}
								userRole={currentUserRole}
								isFollowing={isFollowing}
								onToggleFollow={handleToggleFollowRoom}
								passwordContextMode='chat'
							/>
							<TopRightControls
								roomId={roomId}
								viewerCount={onlineUsersCount}
								onClose={handleClose}
							/>
						</View>
					</SafeAreaView>

					<View
						style={[
							styles.seatSection,
							{ paddingBottom: seatSectionPaddingBottom },
						]}
					>
						<SeatGrid
							_screenId='chat-roomId'
							seatCount={roomSeatCount}
							seats={seatsWithMuteStatus}
							seatEmojiBurst={seatEmojiBurst}
							userRole={currentUserRole}
							onLockSeat={handleLockSeat}
							onUnlockSeat={handleUnlockSeat}
							onOpenInviteMic={handleOpenInviteMic}
							onTakeSeat={handleTakeSeat}
							onTurnOff={handleTurnOff}
							onMuteUser={handleMuteUser}
							onUnmuteUser={handleUnmuteUser}
							onOccupiedSeatPress={handleOccupiedSeatPress}
							getIsSpeakingForSeat={getIsSpeakingForSeat}
						/>
					</View>

					<View style={styles.bottomSection}>
						<View style={styles.announcementWrapper}>
							<AnnouncementBox
								message={
									activeRoom?.description ??
									"Welcome everyone! Let's chat and have fun together!"
								}
							/>
						</View>

						<View
							style={[styles.chatSection, { maxHeight: chatSectionMaxHeight }]}
						>
							<Text style={styles.publicMsgStatus}>
								{publicMsgEnabled
									? 'Public message enabled'
									: 'Public message disabled'}
							</Text>
							{publicMsgEnabled ? (
								<ChatList messages={displayMessages} statusText={chatStatusText} />
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
								onEmojiPicked={handleEmojiPicked}
							/>
						</SafeAreaView>
					</View>
				</KeyboardAvoidingView>

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
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',

		overflow: 'hidden',
	},
	background: {
		flex: 1,
	},
	// Responsiveness: KeyboardAvoidingView takes full space so keyboard pushes content up
	keyboardAvoid: {
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
		minHeight: 0,
		width: '100%',
		paddingHorizontal: 0,
		marginTop: 0,
		// paddingBottom set inline from screen height so layout is responsive
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
		// maxHeight set inline from screen height for responsiveness
		flexGrow: 0,
		flexShrink: 1,
		minHeight: 0,
	},
	publicMsgStatus: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.medium,
		color: 'rgba(255, 255, 255, 0.75)',
		marginBottom: 6,
	},
})
