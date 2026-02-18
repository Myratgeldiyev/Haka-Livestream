import type { ImageSourcePropType } from 'react-native'
import type { RoomPlayItemData } from '../room-play/room-play.types'

export type ItemOverlayType = 'room-pk' | 'calculator' | 'games' | 'battle'

export interface TimeOption {
	id: string
	label: string
	value: number | null
}

export interface GameItem {
	id: string
	name: string
	imageSource?: ImageSourcePropType
}

export interface BaseItemOverlayProps {
	visible: boolean
	onClose: () => void
}

export interface RoomPKOverlayProps extends BaseItemOverlayProps {
	onRandomMatch?: (timeMinutes: number) => void
}

export interface CalculatorOverlayProps extends BaseItemOverlayProps {
	onStart?: (timeMinutes: number | null) => void
}

export interface GamesOverlayProps extends BaseItemOverlayProps {
	onStart?: (game: GameItem) => void
	onShare?: () => void
}

export interface ItemOverlayControllerProps {
	selectedItem: RoomPlayItemData | null
	onClose: () => void
	onRoomPKRandomMatch?: (timeMinutes: number) => void
	onCalculatorStart?: (timeMinutes: number | null) => void
}

export interface UseItemOverlayAnimationConfig {
	overlayHeight: number
	animationDuration?: number
}

export interface UseItemOverlayAnimationReturn {
	translateY: import('react-native').Animated.Value
	overlayOpacity: import('react-native').Animated.Value
	animateOpen: () => void
	animateClose: (onComplete: () => void) => void
	resetAnimation: () => void
}

export interface ItemOverlayWrapperProps {
	visible: boolean
	onClose: () => void
	overlayHeight?: number
	children: React.ReactNode
}
