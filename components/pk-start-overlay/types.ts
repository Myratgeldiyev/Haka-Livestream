import type { ImageSourcePropType } from 'react-native'

export type PKStartOverlayMode = 'start' | 'expanded' | 'mini'

export interface PKUser {
	id: string
	name: string
	avatarUri?: string
	avatarSource?: ImageSourcePropType
	score: number
}

export interface PKStartOverlayProps {
	visible: boolean
	onClose?: () => void
	userA?: PKUser
	userB?: PKUser
	/** When 'expanded', overlay opens directly in PK Match UI (e.g. from live room after Random Match). */
	initialMode?: PKStartOverlayMode
	/** Called when user taps "Basla" to enter full-screen PK battle layout. */
	onEnterPKBattle?: () => void
}

export interface PKStartOverlayStartProps {
	onStartRandom: () => void
}

export interface PKStartOverlayExpandedProps {
	userA: PKUser
	userB: PKUser
	onCollapse: () => void
	onSendGift: () => void
	onCallEnd: () => void
	onClose?: () => void
	/** When true, panel is more transparent so the intro video behind is visible. */
	videoPlaying?: boolean
	/** Called when user taps "Basla" to enter full-screen PK battle layout. */
	onEnterPKBattle?: () => void
}

export interface PKStartOverlayMiniProps {
	userA: PKUser
	userB: PKUser
	onExpand: () => void
}
