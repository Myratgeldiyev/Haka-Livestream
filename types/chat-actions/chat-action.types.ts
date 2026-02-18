import type { ImageSourcePropType } from 'react-native'

export type ChatActionViewType = 'main' | 'kick-out'

export type KickOutReason =
	| 'abusing'
	| 'nude-picture'
	| 'political'
	| 'promote-app'
	| 'illegal-profile'
	| 'argument'

export interface KickOutReasonOption {
	id: KickOutReason
	label: string
}

export interface ChatUser {
	id: string
	name: string
	avatarUri?: string
	avatarSource?: ImageSourcePropType
	isVerified?: boolean
	level?: number
	country?: string
	countryFlag?: string
	diamondCount?: number
	svipLevel?: number
	isMember?: boolean
	friendsCount?: number
	followingCount?: number
	followersCount?: number
	visitorsCount?: number
}

export interface ChatActionOverlayProps {
	visible: boolean
	onClose: () => void
	user: ChatUser | null
	onFollow?: (user: ChatUser) => void
	onUnfollow?: (user: ChatUser) => void
	onChat?: (user: ChatUser) => void
	onSendGift?: (user: ChatUser) => void
	onCall?: (user: ChatUser) => void
	onKickOut?: (user: ChatUser, reason: KickOutReason) => void
	onViewProfile?: (user: ChatUser) => void
	onMention?: (user: ChatUser) => void
}

export interface ChatActionContentProps {
	user: ChatUser
	onKickOutPress: () => void
	onFollow?: () => void
	onUnfollow?: () => void
	isFollowed?: boolean
	onChat?: () => void
	onSendGift?: () => void
	onCall?: () => void
	onViewProfile?: () => void
	onMention?: () => void
}

export interface UseChatActionAnimationConfig {
	overlayHeight: number
	animationDuration?: number
}

export interface UseChatActionAnimationReturn {
	translateY: import('react-native-reanimated').SharedValue<number>
	overlayOpacity: import('react-native-reanimated').SharedValue<number>
	animatedSheetStyle: object
	animatedOverlayStyle: object
	animateOpen: () => void
	animateClose: (onComplete: () => void) => void
}
