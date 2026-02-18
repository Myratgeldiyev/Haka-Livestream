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

export const getAgoraEngine = async (appId: string): Promise<IRtcEngine> => {
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
