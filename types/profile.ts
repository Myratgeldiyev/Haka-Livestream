export interface ProfileUser {
	id: string
	name: string
	avatar: string
	isNew?: boolean
}

export interface StatItemType {
	label: string
	value: string | number
	badge?: string
}

export interface QuickAction {
	id: string
	label: string
	gradient: {
		from: string
		to: string
	}
	onPress?: () => void
}

export interface WalletCardType {
	id: string
	label: string
	action?: string
}

export interface MenuItemType {
	id: string
	label: string
}
