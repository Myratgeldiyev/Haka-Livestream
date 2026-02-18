export type FollowingSegment = 'following' | 'special-attention'

export type VisitorSegment = 'my-visitor' | 'view-history'

export interface SocialUser {
	id: string
	username: string
	age: number
	profilePicture: string
}

export type SocialTabType = 'friends' | 'following' | 'followers' | 'visitors'

export interface UserListProps {
	users: SocialUser[]
	variant: SocialTabType
	isLoading: boolean
	hasMore: boolean
	onLoadMore: () => void
	emptyMessage: string
	emptySubMessage?: string
}

export interface UserListItemProps {
	user: SocialUser
	variant: SocialTabType
	onPrimaryAction?: () => void
	onSecondaryAction?: () => void
}

export interface SocialHeaderProps {
	title: string
	onBack: () => void
	onSearch: () => void
}

export interface SocialTabBarProps {
	activeTab: SocialTabType
	onTabChange: (tab: SocialTabType) => void
}

export interface SegmentedButtonGroupProps<T extends string> {
	segments: { key: T; label: string }[]
	activeSegment: T
	onSegmentChange: (segment: T) => void
}
