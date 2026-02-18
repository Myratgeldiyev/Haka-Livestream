import type { ImageSourcePropType } from 'react-native'

/**
 * Single source of truth for live-stream emoji system.
 * Static = .webp/.png (picker + inline chat, rendered via expo-image).
 * Animated emojis are now animated WebP files handled directly by expo-image.
 */

export type EmojiType = 'static'
export type EmojiCategory = 'NORMAL' | 'vip'

export interface EmojiConfig {
	id: string
	type: EmojiType
	source: ImageSourcePropType | number
	category?: EmojiCategory
	sourcePng?: ImageSourcePropType | number
	posterSource?: ImageSourcePropType | number
	remoteUrl?: string
}

export const toEmojiPlaceholder = (id: string) => `[emoji:${id}]`

// Base static emojis: webp primary (non-animated).
const STATIC_EMOJIS: EmojiConfig[] = [
	{
		id: '1658907259022',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1658907259022.webp'),
	},
	{
		id: '1658907278534',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1658907278534.webp'),
	},
	{
		id: '1658907295126',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1658907295126.webp'),
	},
	{
		id: '1658907314781',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1658907314781.webp'),
	},
]

// NORMAL animated emojis: animated WebP.
const NORMAL_ANIMATED_EMOJIS: EmojiConfig[] = [
	{
		id: '140',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/(140).webp'),
	},
	{
		id: '168',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/(168).webp'),
	},
	{
		id: '1601185839692',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1601185839692.webp'),
	},
	{
		id: '1601186116079',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1601186116079.webp'),
	},
	{
		id: '1601186245299',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1601186245299.webp'),
	},
	{
		id: '1601186343678',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1601186343678.webp'),
	},
	{
		id: '1611561898139',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611561898139.webp'),
	},
	{
		id: '1611561970084',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611561970084.webp'),
	},
	{
		id: '1611577086549',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577086549.webp'),
	},
	{
		id: '1611577176442',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577176442.webp'),
	},
	{
		id: '1611577244212',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577244212.webp'),
	},
	{
		id: '1611577282961',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577282961.webp'),
	},
	{
		id: '1611577355606',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577355606.webp'),
	},
	{
		id: '1611577416731',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577416731.webp'),
	},
	{
		id: '1611577771602',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577771602.webp'),
	},
	{
		id: '1611577805375',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577805375.webp'),
	},
	{
		id: '1611577859965',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577859965.webp'),
	},
	{
		id: '1611577881374',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577881374.webp'),
	},
	{
		id: '1611577905602',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577905602.webp'),
	},
	{
		id: '1611577960187',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/1611577960187.webp'),
	},
	{
		id: 'claping',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/claping.webp'),
	},
	{
		id: 'crying',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/crying.webp'),
	},
	{
		id: 'emojikissleft',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/emojikissleft.webp'),
	},
	{
		id: 'emojikissright',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/emojikissright.webp'),
	},
	{
		id: 'emotion-4',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/emotion (4).webp'),
	},
	{
		id: 'sorry',
		type: 'static',
		category: 'NORMAL',
		source: require('@/assets/emoji/emoji/NORMAL/sorry.webp'),
	},
]

// VIP animated emojis: animated WebP.
const VIP_ANIMATED_EMOJIS: EmojiConfig[] = [
	{
		id: '1712736170074',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712736170074.webp'),
	},
	{
		id: '1712807506011',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807506011.webp'),
	},
	{
		id: '1712807547446',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807547446.webp'),
	},
	{
		id: '1712807681481',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807681481.webp'),
	},
	{
		id: '1712807706442',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807706442.webp'),
	},
	{
		id: '1712807732067',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807732067.webp'),
	},
	{
		id: '1712807760684',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807760684.webp'),
	},
	{
		id: '1712807779689',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1712807779689.webp'),
	},
	{
		id: '1735205551271',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/1735205551271.webp'),
	},
	{
		id: 'emotion-2',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/emotion (2).webp'),
	},
	{
		id: 'emotion-3',
		type: 'static',
		category: 'vip',
		source: require('@/assets/emoji/emoji/vip/emotion (3).webp'),
	},
]

export const EMOJI_CONFIG: EmojiConfig[] = [
	...STATIC_EMOJIS,
	...NORMAL_ANIMATED_EMOJIS,
	...VIP_ANIMATED_EMOJIS,
]

export const EMOJI_CONFIG_BY_ID: Record<string, EmojiConfig> =
	Object.fromEntries(EMOJI_CONFIG.map(c => [c.id, c]))

/** id -> Image source for static emojis (webp preferred). Used by EmojiPicker and ChatMessage. */
export const EMOJI_MAP: Record<string, ImageSourcePropType | number> =
	Object.fromEntries(
		EMOJI_CONFIG.map(e => [e.id, e.source as ImageSourcePropType]),
	)

export function getEmojiConfig(id: string): EmojiConfig | undefined {
	return EMOJI_CONFIG_BY_ID[id]
}

/** Static emoji source: webp/png. */
export function getStaticEmojiSource(
	id: string,
): ImageSourcePropType | number | undefined {
	const config = EMOJI_CONFIG_BY_ID[id]
	if (!config) return undefined
	return config.source as ImageSourcePropType
}

/** Source for picker/chat: static = webp/png (animated or not). */
export function getEmojiDisplaySource(
	id: string,
): ImageSourcePropType | number | undefined {
	const config = EMOJI_CONFIG_BY_ID[id]
	if (!config) return undefined
	return config.source as ImageSourcePropType
}

export function isAnimatedEmoji(id: string): boolean {
	// Animated WebP is handled natively by expo-image; no special handling needed.
	return false
}

/** Returns Lottie JSON source (require result) for lottie emojis; undefined otherwise. */
export function getLottieSource(id: string): number | undefined {
	// Lottie is no longer used; kept for backward compatibility.
	return undefined
}
