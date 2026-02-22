import Constants from 'expo-constants'
import {
	AudioProfileType,
	AudioScenarioType,
	ChannelProfileType,
	ClientRoleType,
	createAgoraRtcEngine,
	IRtcEngine,
} from 'react-native-agora'

let engine: IRtcEngine | null = null
let handlerRegistered = false
let remoteVideoStateCallback:
	| ((uid: number, state: number, reason: number) => void)
	| null = null
let localVideoStateCallback:
	| ((state: number, errorCode: number) => void)
	| null = null
export type AudioVolumeInfo = { uid: number; volume: number }
let volumeIndicationCallback: ((speakers: AudioVolumeInfo[]) => void) | null =
	null

export const getAgoraEngine = async (appId: string): Promise<IRtcEngine> => {
	// Agora native SDK does not work in Expo Go; require a dev build
	if (Constants.appOwnership === 'expo') {
		throw new Error(
			'Agora does not work in Expo Go. Use a development build: npx expo run:ios or npx expo run:android',
		)
	}
	if (engine) return engine

	engine = createAgoraRtcEngine()
	engine.initialize({ appId })

	engine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting)

	engine.setAudioProfile(
		AudioProfileType.AudioProfileMusicHighQuality,
		AudioScenarioType.AudioScenarioGameStreaming,
	)

	engine.enableAudio()

	return engine
}

function ensureHandlerRegistered(
	eng: IRtcEngine,
	onJoined: () => void,
	onError: (err: unknown) => void,
) {
	if (handlerRegistered) return

	eng.registerEventHandler({
		onJoinChannelSuccess: (_connection, _elapsed) => {
			console.log('[Agora] onJoinChannelSuccess')
			onJoined()
		},
		onError: (err, msg) => {
			console.warn('[Agora] onError', err, msg)
			onError(err)
		},
		onRemoteVideoStateChanged: (connection, uid, state, reason, elapsed) => {
			console.log('[Agora] onRemoteVideoStateChanged', { uid, state, reason })
			remoteVideoStateCallback?.(uid, state, reason)
		},
		onLocalVideoStateChanged: (source, state, errorCode) => {
			console.log('[Agora] onLocalVideoStateChanged', { state, errorCode })
			localVideoStateCallback?.(state, errorCode)
		},
		onUserOffline: (connection, uid, reason) => {
			console.log('[Agora] onUserOffline', { uid, reason })
			remoteVideoStateCallback?.(uid, 0, reason)
		},
		onAudioVolumeIndication: (
			_connection: unknown,
			speakers: AudioVolumeInfo[],
			_speakerNumber: number,
			_totalVolume: number,
		) => {
			volumeIndicationCallback?.(speakers)
		},
	})

	handlerRegistered = true
}

export const joinChannelWithVideo = async (
	appId: string,
	rtcToken: string,
	channelName: string,
	uid: number,
	onJoined: () => void,
	onError: (err: unknown) => void,
): Promise<void> => {
	const eng = await getAgoraEngine(appId)

	eng.enableVideo()
	eng.enableAudio()

	// Broadcaster rolü
	eng.setClientRole(ClientRoleType.ClientRoleBroadcaster)

	ensureHandlerRegistered(eng, onJoined, onError)

	eng.joinChannel(rtcToken, channelName, uid, {
		clientRoleType: ClientRoleType.ClientRoleBroadcaster,
		autoSubscribeAudio: true,
		autoSubscribeVideo: true,
		publishMicrophoneTrack: true,
		publishCameraTrack: true,
	})

	// Yerel video capture başlat (kamera preview için)
	try {
		eng.enableLocalVideo(true)
		eng.enableLocalAudio(true)
	} catch (e) {
		console.warn('[Agora] enableLocalVideo/Audio failed:', e)
	}
}

export const joinChannel = joinChannelWithVideo

// ─── Voice-only: join for voice chat (no video) ───────────────────────────────

/**
 * Join channel for voice chat only. Use this for voice rooms so the microphone
 * works without enabling video or camera. Ensures local audio is enabled in onJoinChannelSuccess.
 */
export const joinChannelForVoice = async (
	appId: string,
	rtcToken: string,
	channelName: string,
	uid: number,
	onJoined: () => void,
	onError: (err: unknown) => void,
): Promise<void> => {
	const eng = await getAgoraEngine(appId)

	console.log('[Agora] joinChannelForVoice called', {
		channelName,
		uid,
		hasToken: !!rtcToken,
	})

	// 1. Enable audio
	eng.enableAudio()
	// 2. Fully disable video for voice-only
	try {
		eng.enableLocalVideo(false)
	} catch (e) {
		console.warn('[Agora] enableLocalVideo(false) failed:', e)
	}
	// 3. Broadcaster so we can publish mic
	eng.setClientRole(ClientRoleType.ClientRoleBroadcaster)

	const wrappedOnJoined = () => {
		try {
			eng.enableLocalAudio(true)
			console.log('[Agora] enableLocalAudio(true) called after join')
		} catch (e) {
			console.warn('[Agora] enableLocalAudio failed in onJoinChannelSuccess:', e)
		}
		onJoined()
	}
	ensureHandlerRegistered(eng, wrappedOnJoined, onError)

	// 4. Join with voice-only options
	eng.joinChannel(rtcToken, channelName, uid, {
		clientRoleType: ClientRoleType.ClientRoleBroadcaster,
		autoSubscribeAudio: true,
		autoSubscribeVideo: true,
		publishMicrophoneTrack: true,
		publishCameraTrack: false,
	})
}

/**
 * Join channel for voice as listener only (no microphone publish).
 * Use for enter_room; call enableVoicePublishInChannel() after requestSpeakerRole.
 */
export const joinChannelForVoiceAsListener = async (
	appId: string,
	rtcToken: string,
	channelName: string,
	uid: number,
	onJoined: () => void,
	onError: (err: unknown) => void,
): Promise<void> => {
	const eng = await getAgoraEngine(appId)

	console.log('[Agora] joinChannelForVoiceAsListener called', {
		channelName,
		uid,
		hasToken: !!rtcToken,
	})

	eng.enableAudio()
	try {
		eng.enableLocalVideo(false)
	} catch (e) {
		console.warn('[Agora] enableLocalVideo(false) failed:', e)
	}
	eng.setClientRole(ClientRoleType.ClientRoleAudience)

	const wrappedOnJoined = () => {
		try {
			eng.enableLocalAudio(false)
			console.log('[Agora] joinChannelForVoiceAsListener: enableLocalAudio(false)')
		} catch (e) {
			console.warn('[Agora] enableLocalAudio(false) failed in listener join:', e)
		}
		onJoined()
	}
	ensureHandlerRegistered(eng, wrappedOnJoined, onError)

	eng.joinChannel(rtcToken, channelName, uid, {
		clientRoleType: ClientRoleType.ClientRoleAudience,
		autoSubscribeAudio: true,
		autoSubscribeVideo: true,
		publishMicrophoneTrack: false,
		publishCameraTrack: false,
	})
}

/**
 * Enable local microphone and switch to broadcaster. Call after requestSpeakerRole succeeds.
 */
export const enableVoicePublishInChannel = async (appId: string): Promise<void> => {
	const eng = await getAgoraEngine(appId)
	eng.setClientRole(ClientRoleType.ClientRoleBroadcaster)
	eng.enableLocalAudio(true)
	console.log('[Agora] enableVoicePublishInChannel: broadcaster + local audio on')
}

// ─── Viewer: join as audience ─────────────────────────────────────────────────

/**
 * Viewer (audience) olarak kanala katıl.
 * Sadece subscribe eder, hiçbir şey yayınlamaz.
 */
export const joinChannelAsViewer = async (
	appId: string,
	rtcToken: string,
	channelName: string,
	uid: number,
	onJoined: () => void,
	onError: (err: unknown) => void,
): Promise<void> => {
	const eng = await getAgoraEngine(appId)

	eng.enableVideo()
	eng.enableAudio()

	// Audience rolü — yayın yapmaz, sadece alır
	eng.setClientRole(ClientRoleType.ClientRoleAudience)

	ensureHandlerRegistered(eng, onJoined, onError)

	eng.joinChannel(rtcToken, channelName, uid, {
		clientRoleType: ClientRoleType.ClientRoleAudience,
		autoSubscribeAudio: true,
		autoSubscribeVideo: true,
		publishMicrophoneTrack: false, // Viewer mikrofon yayınlamaz
		publishCameraTrack: false, // Viewer kamera yayınlamaz
	})

	// Viewer yerel video/audio capture etmez
	try {
		eng.enableLocalVideo(false)
	} catch (e) {
		// Non-fatal
	}
}

// ─── Leave / Reset ────────────────────────────────────────────────────────────

export const leaveChannel = async (): Promise<void> => {
	if (!engine) return

	try {
		await engine.leaveChannel()
	} catch (e) {
		console.warn('[Agora] leaveChannel error:', e)
	}

	engine.release()
	engine = null
	handlerRegistered = false
	remoteVideoStateCallback = null
	localVideoStateCallback = null
	volumeIndicationCallback = null
}

export const resetAgoraEngine = async (): Promise<void> => {
	if (!engine) return

	console.log('[Agora] Resetting engine')

	try {
		await engine.leaveChannel()
	} catch {}

	engine.release()
	engine = null
	handlerRegistered = false
	remoteVideoStateCallback = null
	localVideoStateCallback = null
	volumeIndicationCallback = null
}

// ─── Local video toggle (owner only) ─────────────────────────────────────────

/**
 * Owner kamerasını aç/kapat.
 * Sadece join sonrası çağrılmalı.
 */
export const enableLocalVideo = async (enabled: boolean): Promise<void> => {
	if (!engine) return
	try {
		engine.enableLocalVideo(enabled)
	} catch (e) {
		console.warn('[Agora] enableLocalVideo failed:', e)
		throw e
	}
}

export const setupLocalVideo = async (): Promise<void> => {
	if (!engine) return
	try {
		engine.setupLocalVideo({
			uid: 0,
			renderMode: 1,
			mirrorMode: 0,
		})
	} catch (e) {
		console.warn('[Agora] setupLocalVideo failed:', e)
	}
}

export const setRemoteVideoStateCallback = (
	callback: ((uid: number, state: number, reason: number) => void) | null,
): void => {
	remoteVideoStateCallback = callback
}

export const setLocalVideoStateCallback = (
	callback: ((state: number, errorCode: number) => void) | null,
): void => {
	localVideoStateCallback = callback
}

export const setVolumeIndicationCallback = (
	callback: ((speakers: AudioVolumeInfo[]) => void) | null,
): void => {
	volumeIndicationCallback = callback
}

/**
 * Enable audio volume indication; call after joining the channel.
 * Interval in ms (e.g. 300), smooth factor (e.g. 3).
 */
export const enableAudioVolumeIndication = async (
	appId: string,
	interval: number,
	smooth: number,
	reportVad = false,
): Promise<void> => {
	const eng = await getAgoraEngine(appId)
	eng.enableAudioVolumeIndication(interval, smooth, reportVad)
}

export const muteLocalAudio = async (): Promise<void> => {
	if (!engine) return
	console.log('[Agora] Muting local audio')
	await engine.enableLocalAudio(false)
	await engine.muteLocalAudioStream(true)
}

export const unmuteLocalAudio = async (): Promise<void> => {
	if (!engine) return
	console.log('[Agora] Unmuting local audio')
	await engine.enableLocalAudio(true)
	await engine.muteLocalAudioStream(false)
}
