/**
 * Production livestream connection state.
 * Single source of truth for Agora + stream lifecycle.
 */

export type LivestreamRole = 'owner' | 'admin' | 'listener'

export type ConnectionState =
	| 'idle'
	| 'creating'
	| 'joining'
	| 'connected'
	| 'reconnecting'
	| 'disconnecting'
	| 'failed'

export type StreamState = 'idle' | 'live' | 'ended'

export interface LivestreamErrorState {
	code: string
	message: string
}

export interface LivestreamConnectionSchema {
	role: LivestreamRole | null
	streamId: string | null
	channelName: string | null
	localUid: number | null
	ownerAgoraUid: number | null
	localVideoEnabled: boolean
	ownerVideoAvailable: boolean
	connectionState: ConnectionState
	streamState: StreamState
	errorState: LivestreamErrorState | null
}

export const DEFAULT_LIVESTREAM_CONNECTION: LivestreamConnectionSchema = {
	role: null,
	streamId: null,
	channelName: null,
	localUid: null,
	ownerAgoraUid: null,
	localVideoEnabled: false,
	ownerVideoAvailable: false,
	connectionState: 'idle',
	streamState: 'idle',
	errorState: null,
}

/** Agora remote video state (onRemoteVideoStateChanged) */
export const REMOTE_VIDEO_STATE = {
	STOPPED: 0,
	STARTING: 1,
	DECODING: 2,
	FAILED: 3,
	FROZEN: 4,
} as const

/** Agora local video state (onLocalVideoStateChanged) */
export const LOCAL_VIDEO_STATE = {
	STOPPED: 0,
	CAPTURING: 1,
	ENCODING: 2,
	FAILED: 3,
} as const
