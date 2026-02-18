export type FamilyTabId = 'monthly_exp' | 'family_identity'

export interface FamilyMemberTags {
	level?: string
	xx?: boolean
	xxWithDiamond?: boolean
}

export interface FamilyMember {
	id: string
	rank: number
	name: string
	avatarUri?: string
	tags: FamilyMemberTags
	exp: number
}
