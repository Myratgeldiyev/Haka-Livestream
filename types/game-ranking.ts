import { RoomUsers } from '@/api/live-chat/room.types'

export type MainTabType = 'onlineUsers' | 'contribution' | 'gameRanking'

export type SubTabType = 'daily' | 'weekly'

export interface UserBadge {
	type: 'level' | 'cs' | 'special'
	value?: string | number
	color?: string
}

export interface UserData {
	id: string
	name: string
	avatarUri?: string
	level: number
	badges?: UserBadge[]
	coinAmount: number
	hasSpecialIcon?: boolean
}

export interface GameRankingOverlayProps {
	visible: boolean
	onClose: () => void
	roomId: string
}

export interface GameRankingTabsProps {
	activeTab: MainTabType
	onTabChange: (tab: MainTabType) => void
}

export interface GameRankingTabItemProps {
	label: string
	isActive: boolean
	onPress: () => void
}

export interface SubTabsProps {
	activeSubTab: SubTabType
	onSubTabChange: (tab: SubTabType) => void
}

export interface UserListItemProps {
	user: RoomUsers
	showSpecialBadges?: boolean
}

export interface SectionHeaderProps {
	icon: React.ReactNode
	value: number
}
