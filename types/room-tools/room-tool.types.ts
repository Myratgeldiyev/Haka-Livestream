import type { ImageSourcePropType } from 'react-native'

export type ToolOverlayType =
	| 'voice-on'
	| 'voice-off'
	| 'gift-effects'
	| 'applyer'
	| 'clean'
	| 'public-msg'
	| 'music'
	| 'photo'
	| 'call'
	| 'message'
	| 'share'

export interface ToolUser {
	id: string
	name: string
	avatarUri?: string
	avatarSource?: ImageSourcePropType
	genderBadge?: 'male' | 'female'
}

export interface SharePlatform {
	id: string
	name: string
	iconColor: string
	icon?: React.ReactNode
}

export interface BaseToolOverlayProps {
	visible: boolean
	onClose: () => void
}

export interface ApplyerOverlayProps extends BaseToolOverlayProps {
	users: ToolUser[]
	onAccept?: (user: ToolUser) => void
}

export interface ShareOverlayProps extends BaseToolOverlayProps {
	users: ToolUser[]
	onShare?: (user: ToolUser) => void
	onPlatformShare?: (platform: SharePlatform) => void
	onSearch?: (query: string) => void
}

export interface VoiceOnOverlayProps extends BaseToolOverlayProps {
	onToggle?: (enabled: boolean) => void
	/** When set (live stream), use stream API for mute/unmute. */
	streamIdForMute?: string
}

export interface GiftEffectsOverlayProps extends BaseToolOverlayProps {
	onToggle?: (enabled: boolean) => void
}

export interface CleanOverlayProps extends BaseToolOverlayProps {
	onClean?: () => void
}

export interface PublicMsgOverlayProps extends BaseToolOverlayProps {
	onSend?: (message: string) => void
}

export interface MusicOverlayProps extends BaseToolOverlayProps {
	onSelect?: (trackId: string) => void
	onSelectTrack?: (track: { name: string; uri: string }) => void
	roomId?: string
	/** When true, use video stream API for play/stop music. */
	isStreamMode?: boolean
}

export interface PhotoOverlayProps extends BaseToolOverlayProps {
	onSelect?: (photoUri: string) => void
}

export interface CallOverlayProps extends BaseToolOverlayProps {
	onCall?: (userId: string) => void
}

export interface MessageOverlayProps extends BaseToolOverlayProps {
	onSend?: (message: string, userId: string) => void
}

export interface ToolOverlayWrapperProps {
	visible: boolean
	onClose: () => void
	overlayHeight?: number
	children: React.ReactNode
}

export interface UseToolOverlayAnimationConfig {
	overlayHeight: number
	animationDuration?: number
}

export interface UseToolOverlayAnimationReturn {
	translateY: import('react-native').Animated.Value
	overlayOpacity: import('react-native').Animated.Value
	animateOpen: () => void
	animateClose: (onComplete: () => void) => void
	resetAnimation: () => void
}
