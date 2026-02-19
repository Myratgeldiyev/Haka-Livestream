import type {
	SharePlatform,
	ToolOverlayType,
	ToolUser,
} from '@/types/room-tools/room-tool.types'
import React from 'react'
import {
	ApplyerOverlay,
	CallOverlay,
	CleanOverlay,
	GiftEffectsOverlay,
	MessageOverlay,
	MusicOverlay,
	PhotoOverlay,
	PublicMsgOverlay,
	ShareOverlay,
	VoiceOnOverlay,
} from './overlays'

interface ToolOverlayControllerProps {
	activeOverlay: ToolOverlayType | null
	onClose: () => void
	applyingUsers?: ToolUser[]
	shareUsers?: ToolUser[]
	onAcceptUser?: (user: ToolUser) => void
	onShareToUser?: (user: ToolUser) => void
	onShareToPlatform?: (platform: SharePlatform) => void
	onSearchUser?: (query: string) => void
	onVoiceToggle?: (enabled: boolean) => void
	onGiftEffectsToggle?: (enabled: boolean) => void
	onClean?: () => void
	onSendPublicMsg?: (message: string) => void
	onSelectMusic?: (trackId: string) => void
	onSelectPhoto?: (photoUri: string) => void
	onCall?: (userId: string) => void
	onSendMessage?: (message: string, userId: string) => void
	roomId?: string

	streamIdForMute?: string
}

export function ToolOverlayController({
	activeOverlay,
	onClose,
	applyingUsers = [],
	shareUsers = [],
	onAcceptUser,
	onShareToUser,
	onShareToPlatform,
	onSearchUser,
	onVoiceToggle,
	onGiftEffectsToggle,
	onClean,
	onSendPublicMsg,
	onSelectMusic,
	onSelectPhoto,
	onCall,
	onSendMessage,
	roomId,
	streamIdForMute,
}: ToolOverlayControllerProps) {
	return (
		<>
			<VoiceOnOverlay
				visible={activeOverlay === 'voice-on'}
				onClose={onClose}
				onToggle={onVoiceToggle}
				streamIdForMute={streamIdForMute}
			/>

			<GiftEffectsOverlay
				visible={activeOverlay === 'gift-effects'}
				onClose={onClose}
				onToggle={onGiftEffectsToggle}
			/>

			<ApplyerOverlay
				visible={activeOverlay === 'applyer'}
				onClose={onClose}
				users={applyingUsers}
				onAccept={onAcceptUser}
			/>

			<CleanOverlay
				visible={activeOverlay === 'clean'}
				onClose={onClose}
				onClean={onClean}
			/>

			<PublicMsgOverlay
				visible={activeOverlay === 'public-msg'}
				onClose={onClose}
				onSend={onSendPublicMsg}
			/>

			<MusicOverlay
				visible={activeOverlay === 'music'}
				onClose={onClose}
				onSelect={onSelectMusic}
				roomId={streamIdForMute ?? roomId}
				isStreamMode={!!streamIdForMute}
			/>

			<PhotoOverlay
				visible={activeOverlay === 'photo'}
				onClose={onClose}
				onSelect={onSelectPhoto}
			/>

			<CallOverlay
				visible={activeOverlay === 'call'}
				onClose={onClose}
				onCall={onCall}
			/>

			<MessageOverlay
				visible={activeOverlay === 'message'}
				onClose={onClose}
				onSend={onSendMessage}
			/>

			<ShareOverlay
				visible={activeOverlay === 'share'}
				onClose={onClose}
				users={applyingUsers}
				onShare={onShareToUser}
				onPlatformShare={onShareToPlatform}
				onSearch={onSearchUser}
			/>
		</>
	)
}
