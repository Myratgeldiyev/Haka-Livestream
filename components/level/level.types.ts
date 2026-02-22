import type React from 'react'

export type LevelTabId = 'rich' | 'charm'

export type LevelBadgeVariant = 'default' | 'level0' | 'orange'

export interface LevelListItemData {
	levelLabel: string
	coinRange: string
	badgeNumber: string
	badgeVariant: LevelBadgeVariant
	/** Optional: icon component, image source, or ReactNode for the badge */
	badgeIcon?: LevelListItemBadgeIcon
}

export interface LevelHeaderProps {
	activeTab: LevelTabId
	onTabChange: (tab: LevelTabId) => void
	onBackPress: () => void
}

export interface UserProfileCardProps {
	userName?: string
	currentLevel?: string
	upgradeText?: string
	/** When set, used as the gem/diamond image (e.g. charm-levels/pink-diamond.png) instead of level-diamond. */
	gemImageSource?: number
}

export interface LevelExplanationProps {
	title: string
	description: string
}

/** Badge icon: React component (receives width/height), image source, or ready ReactNode */
export type LevelListItemBadgeIcon =
	| React.ComponentType<{ width?: number; height?: number }>
	| React.ReactNode
	| number
	| { uri: string }

export interface LevelListItemProps {
	levelLabel: string
	coinRange: string
	badgeNumber: string
	badgeVariant: LevelBadgeVariant
	/** Optional: icon component, image source (require() or { uri }), or ReactNode. Omit for placeholder "icon" text. */
	badgeIcon?: LevelListItemBadgeIcon
	/** When true, render full charm-level SVG (assets/charm-levels) instead of badge; diamonds not clipped. */
	useCharmSvg?: boolean
}

export interface LevelListProps {
	items: LevelListItemData[]
	/** When true, each item uses full charm-level SVG instead of badge. */
	useCharmSvg?: boolean
}
