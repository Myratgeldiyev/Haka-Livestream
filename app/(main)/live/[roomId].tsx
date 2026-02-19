import { RoomResponse } from '@/api/live-chat/room.types'
import {
	LiveStreamDetailsResponse,
	LiveStreamResponse,
} from '@/api/live-stream/lives.types'
import {
	AnnouncementBox,
	ChatList,
	DraggableCalculatorCountdown,
	DraggableKeepExitOverlay,
	RoomBottomBar,
} from '@/components/live-room'
import {
	CameraView,
	LivePKOverlay,
	PKBattleLayout,
	RightControlPanel,
} from '@/components/live-stream'
import { RemoteVideoView } from '@/components/live-stream/RemoteVideoView'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import { DraggableMusicPlayer } from '@/components/room-tools/overlays/DraggableMusicPlayer'
import { MusicOverlay } from '@/components/room-tools/overlays/MusicOverlay'
import { fontSizes, fontWeights } from '@/constants/typography'
import {
	leaveChannel,
	setLocalVideoStateCallback,
	setRemoteVideoStateCallback,
} from '@/services/agora/agora.service'
import { useAuthStore } from '@/store/auth.store'
import {
	type LiveStreamUserRole,
	useLiveStreamStore,
} from '@/store/liveStream.store'
import { TopRightControls, TopUserInfo } from '@/types/game-ranking-types'
import { useFocusEffect } from '@react-navigation/native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	BackHandler,
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

function mapStreamDetailsToRoomResponse(
	d: LiveStreamDetailsResponse | null,
): RoomResponse | null {
	if (!d) return null
	const owner = d.owner
	return {
		...d,
		display_id: d.display_id ?? 0,
		owner: {
			username: owner?.username ?? '',
			user_id: owner?.user_id ?? 0,
			profile_picture: owner?.profile_picture ?? '',
			is_online:
				typeof owner?.is_online === 'boolean'
					? owner.is_online
					: owner?.is_online === 'true',
			online_status: owner?.online_status ?? '',
		},
	}
}

function mapLiveStreamToRoomResponse(
	liveStream: LiveStreamResponse,
): RoomResponse {
	return {
		id: liveStream.id,
		title: liveStream.title,
		display_id: liveStream.display_id,
		description: liveStream.description,
		room_image: liveStream.room_image,
		agora_channel_name: '',
		created_at: '',
		owner: {
			username: liveStream.title,
			user_id: 0,
			profile_picture: liveStream.room_image,
			is_online: false,
			online_status: '',
		},
	}
}

export default function LiveRoomScreen() {
	const { roomId: rawRoomId } = useLocalSearchParams<{ roomId: string }>()
	const [, setEditVisible] = useState(false)
	const [publicMsgEnabled, setPublicMsgEnabled] = useState(true)
	const [musicPlayerVisible, setMusicPlayerVisible] = useState(false)
	const [musicOverlayFromPlayerVisible, setMusicOverlayFromPlayerVisible] =
		useState(false)
	const [leaveConfirmVisible, setLeaveConfirmVisible] = useState(false)
	const [calculatorCountdown, setCalculatorCountdown] = useState<{
		durationMinutes: number | null
	} | null>(null)
	const isExitingRef = useRef(false)
	const ownerAgoraUidRef = useRef<number | null>(null)
	const [currentTrack, setCurrentTrack] = useState<{
		name: string
		uri: string
	}>({ name: 'Music', uri: '' })

	const roomId = Array.isArray(rawRoomId) ? rawRoomId[0] : rawRoomId
	const navigation = useNavigation()

	const user = useAuthStore(s => s.user)
	const liveStream = useLiveStreamStore(s => s.liveStream)
	const streamDetails = useLiveStreamStore(s => s.streamDetails)
	const currentStreamRole = useLiveStreamStore(s => s.currentStreamRole)
	const fetchStreamDetails = useLiveStreamStore(s => s.fetchStreamDetails)
	const clearStream = useLiveStreamStore(s => s.clearStream)
	const getStreamMessages = useLiveStreamStore(s => s.getStreamMessages)
	const sendStreamMessage = useLiveStreamStore(s => s.sendStreamMessage)
	const streamMessages = useLiveStreamStore(s => s.streamMessages)
	const checkIfMuted = useLiveStreamStore(s => s.checkIfMuted)
	const setStreamMuted = useLiveStreamStore(s => s.setStreamMuted)
	const leaveRoom = useLiveStreamStore(s => s.leaveRoom)
	const streamMuted = useLiveStreamStore(s => s.streamMuted)
	const muteMyself = useLiveStreamStore(s => s.muteMyself)
	const unmuteMyself = useLiveStreamStore(s => s.unmuteMyself)
	const getStreamUsers = useLiveStreamStore(s => s.getStreamUsers)
	const setStreamSlotsFromResponse = useLiveStreamStore(
		s => s.setStreamSlotsFromResponse,
	)
	const setPendingMinimizedStream = useLiveStreamStore(
		s => s.setPendingMinimizedStream,
	)
	const setStreamMusicPlaying = useLiveStreamStore(s => s.setStreamMusicPlaying)
	const ownerAgoraUid = useLiveStreamStore(s => s.ownerAgoraUid)
	const setOwnerAgoraUid = useLiveStreamStore(s => s.setOwnerAgoraUid)
	const ownerVideoAvailable = useLiveStreamStore(s => s.ownerVideoAvailable)
	const setOwnerVideoAvailable = useLiveStreamStore(
		s => s.setOwnerVideoAvailable,
	)
	const localOwnerVideoAvailable = useLiveStreamStore(
		s => s.localOwnerVideoAvailable,
	)
	const setLocalOwnerVideoAvailable = useLiveStreamStore(
		s => s.setLocalOwnerVideoAvailable,
	)
	const enterStream = useLiveStreamStore(s => s.enterStream)
	const fetchStreamState = useLiveStreamStore(s => s.fetchStreamState)
	const streamMusicPlaying = useLiveStreamStore(s => s.streamMusicPlaying)
	const streamUserCount = useLiveStreamStore(s => s.streamUserCount)
	const streamPkOverlayOpen = useLiveStreamStore(s => s.streamPkOverlayOpen)
	const streamPkBattleActive = useLiveStreamStore(s => s.streamPkBattleActive)
	const setStreamPkOverlayOpen = useLiveStreamStore(
		s => s.setStreamPkOverlayOpen,
	)
	const setStreamPkBattleActive = useLiveStreamStore(
		s => s.setStreamPkBattleActive,
	)

	const pkBattleActive = streamPkBattleActive
	const pkOverlayVisible = streamPkOverlayOpen
	const setPkBattleActive = setStreamPkBattleActive
	const setPkOverlayVisible = setStreamPkOverlayOpen

	const streamId = liveStream?.id ?? roomId ?? undefined

	const isStreamMode = !!liveStream

	const useStreamMusicApi = !!streamId

	const followStream = useLiveStreamStore(s => s.followStream)
	const unfollowStream = useLiveStreamStore(s => s.unfollowStream)
	const getFollowingStreams = useLiveStreamStore(s => s.getFollowingStreams)

	const [isFollowing, setIsFollowing] = useState(false)

	const userRole: RoomPlayUserRole = (() => {
		if (isStreamMode) return 'owner'
		const ownerId = streamDetails?.owner?.user_id
		if (ownerId != null && user?.user_id != null && ownerId === user.user_id)
			return 'owner'
		const role = currentStreamRole as LiveStreamUserRole | null
		return role === 'admin' ? 'admin' : 'listener'
	})()

	useEffect(() => {
		if (!streamId) return
		let cancelled = false
		const syncFollowing = async () => {
			try {
				const streams = await getFollowingStreams()
				if (cancelled) return
				setIsFollowing(streams.some(s => s.id === streamId))
			} catch {
				if (!cancelled) setIsFollowing(false)
			}
		}
		syncFollowing()
		return () => {
			cancelled = true
		}
	}, [streamId, getFollowingStreams])

	const handleToggleFollowStream = useCallback(async () => {
		if (!streamId) return
		console.log('[LIVE_ROOM] handleToggleFollowStream start', {
			streamId,
			isFollowing,
		})
		try {
			if (isFollowing) {
				console.log('[LIVE_ROOM] calling unfollowStream')
				await unfollowStream(streamId)
			} else {
				console.log('[LIVE_ROOM] calling followStream')
				await followStream(streamId)
			}
			const streams = await getFollowingStreams()
			console.log(
				'[LIVE_ROOM] getFollowingStreams result length',
				streams.length,
			)
			setIsFollowing(streams.some(s => s.id === streamId))
		} catch (e) {
			console.log('[LIVE_ROOM] handleToggleFollowStream error', e)
		}
	}, [streamId, isFollowing, followStream, unfollowStream, getFollowingStreams])

	useEffect(() => {
		const streamId = liveStream?.id
		if (!streamId) return
		fetchStreamDetails(streamId).catch(() => {})
	}, [liveStream?.id, fetchStreamDetails])

	useFocusEffect(
		useCallback(() => {
			const id = liveStream?.id ?? roomId
			if (id) {
				fetchStreamDetails(id).catch(() => {})
			}
		}, [liveStream?.id, roomId, fetchStreamDetails]),
	)

	useFocusEffect(
		useCallback(() => {
			if (!streamId) return
			getStreamMessages(streamId).catch(() => {})
		}, [streamId, getStreamMessages]),
	)

	useFocusEffect(
		useCallback(() => {
			if (!streamId) return
			getStreamUsers(streamId)
				.then(setStreamSlotsFromResponse)
				.catch(() => {})
		}, [streamId, getStreamUsers, setStreamSlotsFromResponse]),
	)

	const STREAM_USERS_POLL_INTERVAL_MS = 4000
	useFocusEffect(
		useCallback(() => {
			if (!streamId) return
			const tick = () => {
				getStreamUsers(streamId)
					.then(setStreamSlotsFromResponse)
					.catch(() => {})
			}
			const id = setInterval(tick, STREAM_USERS_POLL_INTERVAL_MS)
			return () => clearInterval(id)
		}, [streamId, getStreamUsers, setStreamSlotsFromResponse]),
	)

	const STREAM_STATE_POLL_INTERVAL_MS = 5000
	useFocusEffect(
		useCallback(() => {
			if (!streamId) return
			const tick = () => {
				fetchStreamState(streamId).catch(() => {})
			}
			tick()
			const id = setInterval(tick, STREAM_STATE_POLL_INTERVAL_MS)
			return () => clearInterval(id)
		}, [streamId, fetchStreamState]),
	)

	useFocusEffect(
		useCallback(() => {
			if (!streamId) return
			checkIfMuted(streamId)
				.then((res: unknown) =>
					setStreamMuted((res as { is_muted?: boolean })?.is_muted ?? false),
				)
				.catch(() => {})
		}, [streamId, checkIfMuted, setStreamMuted]),
	)

	useEffect(() => {
		ownerAgoraUidRef.current = ownerAgoraUid
	}, [ownerAgoraUid])

	useFocusEffect(
		useCallback(() => {
			if (!streamId || isStreamMode) return

			const callback = (uid: number, state: number) => {
				if (state === 2) {
					setOwnerAgoraUid(uid)
					setOwnerVideoAvailable(true)
				} else if (
					ownerAgoraUidRef.current != null &&
					uid === ownerAgoraUidRef.current &&
					(state === 0 || state === 3)
				) {
					setOwnerVideoAvailable(false)
				}
			}
			setRemoteVideoStateCallback(callback)
			enterStream(streamId).catch(() => {})

			return () => {
				setRemoteVideoStateCallback(null)
			}
		}, [
			streamId,
			isStreamMode,
			enterStream,
			setOwnerAgoraUid,
			setOwnerVideoAvailable,
		]),
	)

	useEffect(() => {
		if (!isStreamMode) return

		const callback = (state: number) => {
			setLocalOwnerVideoAvailable(state === 1 || state === 2)
		}
		setLocalVideoStateCallback(callback)
		return () => {
			setLocalVideoStateCallback(null)
		}
	}, [isStreamMode, setLocalOwnerVideoAvailable])

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
			setRemoteVideoStateCallback(null)
			setLocalVideoStateCallback(null)
			if (isStreamMode || (streamId && !isStreamMode)) {
				leaveChannel()
			}
			if (isStreamMode) {
				clearStream()
			} else {
				setOwnerAgoraUid(null)
				setOwnerVideoAvailable(false)
				setStreamPkOverlayOpen(false)
				setStreamPkBattleActive(false)
				setStreamMusicPlaying(false)
			}
		}
	}, [
		isStreamMode,
		streamId,
		clearStream,
		setOwnerAgoraUid,
		setOwnerVideoAvailable,
		setStreamPkOverlayOpen,
		setStreamPkBattleActive,
		setStreamMusicPlaying,
	])

	const handleClose = useCallback(async () => {
		isExitingRef.current = true
		setLeaveConfirmVisible(false)
		setRemoteVideoStateCallback(null)
		setLocalVideoStateCallback(null)
		if (isStreamMode || (streamId && !isStreamMode)) {
			await leaveChannel()
		}
		if (isStreamMode) {
			clearStream()
		} else {
			setOwnerAgoraUid(null)
			setOwnerVideoAvailable(false)
			setStreamPkOverlayOpen(false)
			setStreamPkBattleActive(false)
			setStreamMusicPlaying(false)
		}
		router.back()
	}, [
		isStreamMode,
		streamId,
		clearStream,
		setOwnerAgoraUid,
		setOwnerVideoAvailable,
		setStreamPkOverlayOpen,
		setStreamPkBattleActive,
		setStreamMusicPlaying,
	])

	const handleLeaveConfirmKeep = useCallback(() => {
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'live/[roomId].tsx:handleLeaveConfirmKeep',
				message: 'Keep pressed',
				data: { streamId: streamId ?? null, hasStreamId: !!streamId },
				timestamp: Date.now(),
				hypothesisId: 'H3',
			}),
		}).catch(() => {})
		setLeaveConfirmVisible(false)
		if (streamId) {
			const imageUrl = streamDetails?.room_image ?? liveStream?.room_image ?? ''
			const title = streamDetails?.title ?? liveStream?.title ?? 'Live'
			setPendingMinimizedStream({ streamId, imageUrl, title })
		}
		setTimeout(() => {
			router.navigate('/(tabs)/live')
		}, 0)
	}, [streamId, streamDetails, liveStream, setPendingMinimizedStream])

	const handleLeaveConfirmExit = useCallback(async () => {
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'live/[roomId].tsx:handleLeaveConfirmExit',
				message: 'Exit pressed',
				data: {
					streamId: streamId ?? null,
					isStreamMode,
					willCallLeaveRoom: !!streamId,
				},
				timestamp: Date.now(),
				hypothesisId: 'H3',
			}),
		}).catch(() => {})
		isExitingRef.current = true
		setLeaveConfirmVisible(false)
		try {
			if (streamId) await leaveRoom(streamId)
		} catch (e) {
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'live/[roomId].tsx:handleLeaveConfirmExit:leaveRoomCatch',
						message: 'leaveRoom failed',
						data: { error: String(e instanceof Error ? e.message : e) },
						timestamp: Date.now(),
						hypothesisId: 'H3',
					}),
				},
			).catch(() => {})
		}
		setRemoteVideoStateCallback(null)
		setLocalVideoStateCallback(null)
		if (isStreamMode || (streamId && !isStreamMode)) {
			leaveChannel()
		}
		if (isStreamMode) {
			clearStream()
		} else {
			setOwnerVideoAvailable(false)
		}
		router.back()
	}, [streamId, isStreamMode, leaveRoom, clearStream, setOwnerVideoAvailable])

	const handleSendMessage = async (text: string) => {
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'live/[roomId].tsx:handleSendMessage',
				message: 'Send message invoked',
				data: {
					streamId: streamId ?? null,
					textLen: (text && text.length) || 0,
				},
				timestamp: Date.now(),
				hypothesisId: 'H2',
			}),
		}).catch(() => {})
		if (!streamId) return
		try {
			await sendStreamMessage(streamId, text)
			await getStreamMessages(streamId)
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'live/[roomId].tsx:handleSendMessage:success',
						message: 'Send message success',
						data: {},
						timestamp: Date.now(),
						hypothesisId: 'H2',
					}),
				},
			).catch(() => {})
		} catch (e) {
			fetch(
				'http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						location: 'live/[roomId].tsx:handleSendMessage:catch',
						message: 'Send message failed',
						data: { err: String(e instanceof Error ? e.message : e) },
						timestamp: Date.now(),
						hypothesisId: 'H2',
					}),
				},
			).catch(() => {})
			console.error('[LIVE_ROOM] Failed to send message:', e)
		}
	}

	const handleTogglePublicMsg = () => {
		setPublicMsgEnabled(prev => !prev)
	}

	const handleOpenMusicPlayer = () => {
		setMusicPlayerVisible(true)
	}

	const handleToggleMute = useCallback(() => {
		if (!streamId) return
		const promise = streamMuted ? unmuteMyself(streamId) : muteMyself(streamId)
		promise.catch(() => {})
	}, [streamId, streamMuted, muteMyself, unmuteMyself])

	const insets = useSafeAreaInsets()

	return (
		<View
			style={[
				styles.container,
				pkOverlayVisible && !pkBattleActive && styles.containerBlack,
			]}
			collapsable={false}
		>
			<View style={styles.cameraWrapper} collapsable={false}>
				{pkBattleActive ? (
					<PKBattleLayout
						scoreA={767}
						scoreB={243}
						winCountA={0}
						winCountB={0}
						durationSeconds={60}
						onEndBattle={() => setPkBattleActive(false)}
					/>
				) : pkOverlayVisible ? (
					<ImageBackground
						source={require('@/assets/images/games/chat-room-bg.png')}
						style={styles.pkOverlayBackdrop}
						resizeMode='cover'
					>
						<View
							style={[
								styles.bottomSection,
								{ paddingBottom: Math.max(6, insets.bottom * 0.5 - 10) },
							]}
						>
							<View style={styles.announcementWrapper}>
								<AnnouncementBox
									message={
										streamDetails?.description ??
										liveStream?.description ??
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
									<ChatList messages={streamMessages} statusText={undefined} />
								) : null}
							</View>
							<View>
								<RoomBottomBar
									onSend={handleSendMessage}
									roomId={streamId}
									userRole={userRole}
									streamIdForMute={streamId}
									publicMsgEnabled={publicMsgEnabled}
									onTogglePublicMsg={handleTogglePublicMsg}
									onOpenMusicPlayer={handleOpenMusicPlayer}
									onRoomPKRandomMatch={() => setPkOverlayVisible(true)}
									onCalculatorStart={minutes =>
										setCalculatorCountdown({ durationMinutes: minutes })
									}
									isUserOnSeat={false}
									isMuted={streamId ? streamMuted : false}
									onToggleMute={handleToggleMute}
									onTakeFirstAvailableSeat={() => {}}
								/>
							</View>
						</View>
					</ImageBackground>
				) : (
					(() => {
						const ownerUid = streamDetails?.owner?.user_id
						const roomImage =
							streamDetails?.room_image ?? liveStream?.room_image

						const isOwnerVideoAvailable =
							userRole === 'owner'
								? localOwnerVideoAvailable
								: ownerVideoAvailable

						const commonContent = (
							<>
								<SafeAreaView style={styles.safeAreaTop} edges={['top']}>
									<View style={styles.topBar}>
										<TopUserInfo
											data={(() => {
												const fromDetails =
													mapStreamDetailsToRoomResponse(streamDetails)
												const fromFallback = liveStream
													? mapLiveStreamToRoomResponse(liveStream)
													: null
												return fromDetails ?? fromFallback
											})()}
											onEditPress={() => setEditVisible(true)}
											userRole={userRole}
											isFollowing={isFollowing}
											onToggleFollow={handleToggleFollowStream}
										/>
										<TopRightControls
											roomId={isStreamMode ? '' : (roomId ?? '')}
											viewerCount={streamUserCount}
											onClose={handleClose}
										/>
									</View>
								</SafeAreaView>

								<RightControlPanel
									streamId={streamId}
									userRole={userRole as LiveStreamUserRole}
								/>

								<View
									style={[
										styles.bottomSection,
										{ paddingBottom: Math.max(6, insets.bottom * 0.5 - 10) },
									]}
								>
									<View style={styles.announcementWrapper}>
										<AnnouncementBox
											message={
												streamDetails?.description ??
												liveStream?.description ??
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
											<ChatList
												messages={streamMessages}
												statusText={undefined}
											/>
										) : null}
									</View>
									<View>
										<RoomBottomBar
											onSend={handleSendMessage}
											roomId={streamId}
											userRole={userRole}
											streamIdForMute={streamId}
											publicMsgEnabled={publicMsgEnabled}
											onTogglePublicMsg={handleTogglePublicMsg}
											onOpenMusicPlayer={handleOpenMusicPlayer}
											onRoomPKRandomMatch={() => setPkOverlayVisible(true)}
											onCalculatorStart={minutes =>
												setCalculatorCountdown({ durationMinutes: minutes })
											}
											isUserOnSeat={false}
											isMuted={streamId ? streamMuted : false}
											onToggleMute={handleToggleMute}
											onTakeFirstAvailableSeat={() => {}}
										/>
									</View>
								</View>
							</>
						)

						if (userRole === 'owner') {
							return (
								<CameraView key='live-owner-camera'>{commonContent}</CameraView>
							)
						}

						// Viewer: show remote video (Agora owner UID) when available, otherwise ImageBackground
						if (ownerAgoraUid && ownerAgoraUid > 0) {
							return (
								<RemoteVideoView
									key='live-remote-video'
									ownerUid={ownerAgoraUid}
									videoAvailable={isOwnerVideoAvailable}
									roomImage={roomImage}
								>
									{commonContent}
								</RemoteVideoView>
							)
						}

						// Viewer: owner video unavailable or no owner - show ImageBackground
						return (
							<ImageBackground
								key='live-viewer-background'
								source={
									roomImage
										? { uri: roomImage }
										: require('@/assets/images/games/chat-room-bg.png')
								}
								style={styles.pkOverlayBackdrop}
								resizeMode='cover'
							>
								{commonContent}
							</ImageBackground>
						)
					})()
				)}
			</View>

			<View style={styles.overlaysLayer} pointerEvents='box-none'>
				<DraggableMusicPlayer
					visible={musicPlayerVisible}
					trackName={currentTrack.name}
					trackUri={currentTrack.uri}
					roomId={streamId}
					isStreamMode={useStreamMusicApi}
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
					roomId={streamId}
					isStreamMode={useStreamMusicApi}
				/>
				<LivePKOverlay
					visible={pkOverlayVisible && !pkBattleActive}
					scoreA={12766678}
					scoreB={12766678}
					onClose={() => setPkOverlayVisible(false)}
					onEnterPKBattle={() => {
						setPkBattleActive(true)
						setPkOverlayVisible(false)
					}}
					renderTopBar={() => (
						<SafeAreaView style={styles.safeAreaTop} edges={['top']}>
							<View style={styles.topBar}>
								<TopUserInfo
									data={(() => {
										const fromDetails =
											mapStreamDetailsToRoomResponse(streamDetails)
										const fromFallback = liveStream
											? mapLiveStreamToRoomResponse(liveStream)
											: null
										return fromDetails ?? fromFallback
									})()}
									onEditPress={() => setEditVisible(true)}
									userRole={userRole}
								/>
								<TopRightControls
									roomId={isStreamMode ? '' : (roomId ?? '')}
									viewerCount={streamUserCount}
									onClose={handleClose}
								/>
							</View>
						</SafeAreaView>
					)}
				/>
				<DraggableKeepExitOverlay
					visible={leaveConfirmVisible}
					onKeep={handleLeaveConfirmKeep}
					onExit={handleLeaveConfirmExit}
				/>
				<DraggableCalculatorCountdown
					visible={calculatorCountdown !== null}
					durationMinutes={calculatorCountdown?.durationMinutes ?? null}
					onClose={() => setCalculatorCountdown(null)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		backgroundColor: '#000',
	},
	cameraWrapper: {
		...StyleSheet.absoluteFillObject,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		overflow: 'hidden',
	},
	containerBlack: {
		backgroundColor: '#000',
	},
	pkOverlayBackdrop: {
		flex: 1,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
	},
	overlaysLayer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 9999,
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
	videoContainer: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: '#000',
	},
	video: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
})
