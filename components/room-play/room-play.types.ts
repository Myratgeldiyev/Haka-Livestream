export interface RoomPlayItemData {
	id: string
	name: string
	icon?: React.ReactNode
	imageSource?: import('react-native').ImageSourcePropType
	/** When set, shows a small on/off dot on the image (true = on, false = off). No icon. */
	toggleActive?: boolean
}

export interface RoomPlaySection {
	id: string
	title?: string
	items: RoomPlayItemData[]
}

/** Role for room tools (owner / admin see all; listener/user sees limited). */
export type RoomPlayUserRole = 'owner' | 'admin' | 'listener'

export interface RoomPlayOverlayProps {
	visible: boolean
	onClose: () => void
	onItemSelect?: (item: RoomPlayItemData) => void
	roomId?: string
	/** When provided (e.g. live stream screen), overrides role for tool visibility. */
	userRole?: RoomPlayUserRole
	/** When set (live stream), use stream API for mute/unmute. */
	streamIdForMute?: string
	publicMsgEnabled?: boolean
	onTogglePublicMsg?: () => void
	onOpenMessageInbox?: () => void
	onOpenMusicPlayer?: () => void
	onRoomPKRandomMatch?: (timeMinutes: number) => void
	onCalculatorStart?: (timeMinutes: number | null) => void
}

export interface RoomPlayContentProps {
	sections: RoomPlaySection[]
	onItemSelect?: (item: RoomPlayItemData) => void
	publicMsgEnabled?: boolean
	onRequestClose?: () => void
	/** Override role when not using live chat store (e.g. live stream). */
	userRoleOverride?: RoomPlayUserRole
	/** When set (live stream), use stream API for mute/unmute instead of voice room. */
	streamIdForMute?: string
}

export interface RoomPlayHeaderProps {
	title: string
}

export interface RoomPlayItemProps {
	item: RoomPlayItemData
	onPress?: () => void
	showBackground?: boolean
}

export interface UseRoomPlayAnimationReturn {
	translateY: import('react-native').Animated.Value
	overlayOpacity: import('react-native').Animated.Value
	animateOpen: () => void
	animateClose: (onComplete: () => void) => void
	resetAnimation: () => void
}
