export interface LiveUser {
	id: string
	name: string
	age: number
	location: string
	country: string
	imageUrl: string
	status: 'Chatting' | 'Live' | 'Gaming'
	popularity: number
	rank?: number
	isLive?: boolean
}

export interface Category {
	id: string
	label: string
	icon?: string
	color?: string
}

export interface Tab {
	id: string
	label: string
	isActive?: boolean
}
export type LiveTab = 'nearby' | 'follow' | 'live' | 'new'
