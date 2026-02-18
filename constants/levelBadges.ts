import type { ImageSourcePropType } from 'react-native'

export const LEVEL_BADGE_IMAGES: Record<number, ImageSourcePropType> = {
	1: require('@/assets/1 to 30 level/level_badge_1.webp'),
	2: require('@/assets/1 to 30 level/level_badge_2.webp'),
	3: require('@/assets/1 to 30 level/level_badge_3.webp'),
	4: require('@/assets/1 to 30 level/level_badge_4.webp'),
	5: require('@/assets/1 to 30 level/level_badge_5.webp'),
	6: require('@/assets/1 to 30 level/level_badge_6.webp'),
	7: require('@/assets/1 to 30 level/level_badge_7.webp'),
	8: require('@/assets/1 to 30 level/level_badge_8.webp'),
	9: require('@/assets/1 to 30 level/level_badge_9.webp'),
	10: require('@/assets/1 to 30 level/level_badge_10.webp'),
	11: require('@/assets/1 to 30 level/level_badge_11.webp'),
	12: require('@/assets/1 to 30 level/level_badge_12.webp'),
	13: require('@/assets/1 to 30 level/level_badge_13.webp'),
	14: require('@/assets/1 to 30 level/level_badge_14.webp'),
	15: require('@/assets/1 to 30 level/level_badge_15.webp'),
	16: require('@/assets/1 to 30 level/level_badge_16.webp'),
	17: require('@/assets/1 to 30 level/level_badge_17.webp'),
	18: require('@/assets/1 to 30 level/level_badge_18.webp'),
	19: require('@/assets/1 to 30 level/level_badge_19.webp'),
	20: require('@/assets/1 to 30 level/level_badge_20.webp'),
	21: require('@/assets/1 to 30 level/level_badge_21.webp'),
	22: require('@/assets/1 to 30 level/level_badge_22.webp'),
	23: require('@/assets/1 to 30 level/level_badge_23.webp'),
	24: require('@/assets/1 to 30 level/level_badge_24.webp'),
	25: require('@/assets/1 to 30 level/level_badge_25.webp'),
	26: require('@/assets/1 to 30 level/level_badge_26.webp'),
	27: require('@/assets/1 to 30 level/level_badge_27.webp'),
	28: require('@/assets/1 to 30 level/level_badge_28.webp'),
	29: require('@/assets/1 to 30 level/level_badge_29.webp'),
	30: require('@/assets/1 to 30 level/level_badge_30.webp'),
}

export function getLevelBadgeSource(level: number): ImageSourcePropType | null {
	const clamped = Math.max(1, Math.min(30, Math.floor(level)))
	return LEVEL_BADGE_IMAGES[clamped] ?? null
}
