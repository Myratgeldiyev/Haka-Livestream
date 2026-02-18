import type { ImageSourcePropType } from 'react-native'

/**
 * Single source of truth for live-stream emoji system.
 * Static = .webp/.png (picker + inline chat, rendered via expo-image).
 * Animated = SVGA (overlay; optional poster for Expo Go).
 */

export type EmojiType = 'static' | 'svga'
export type EmojiCategory = 'NORMAL' | 'vip'

export interface EmojiConfig {
	id: string
	type: EmojiType
	source: ImageSourcePropType | number
	category?: EmojiCategory
	/** Optional PNG fallback for static emojis. */
	sourcePng?: ImageSourcePropType | number
	/** Optional poster/thumbnail for SVGA (Expo Go fallback). */
	posterSource?: ImageSourcePropType | number
	/** Optional remote URL for SVGA (used by WebView when set; avoids Metro/local asset issues). */
	remoteUrl?: string
}

/** Placeholder format for TextInput; must match parser regex. */
export const toEmojiPlaceholder = (id: string) => `[emoji:${id}]`

/** Static emojis: webp primary, optional png fallback. Rendered via expo-image. */
const STATIC_EMOJIS: EmojiConfig[] = [
	// Only one format per file to avoid Android "Duplicate resources" (same base name as .png and .webp).
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

/** NORMAL animated emojis: SVGA. */
const NORMAL_SVGA_EMOJIS: EmojiConfig[] = [
	{ id: '140', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/(140).svga') },
	{ id: '168', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/(168).svga') },
	{ id: '1601185839692', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1601185839692.svga') },
	{ id: '1601186116079', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1601186116079.svga') },
	{ id: '1601186245299', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1601186245299.svga') },
	{ id: '1601186343678', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1601186343678.svga') },
	{ id: '1611561898139', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611561898139.svga') },
	{ id: '1611561970084', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611561970084.svga') },
	{ id: '1611577086549', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577086549.svga') },
	{ id: '1611577176442', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577176442.svga') },
	{ id: '1611577244212', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577244212.svga') },
	{ id: '1611577282961', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577282961.svga') },
	{ id: '1611577355606', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577355606.svga') },
	{ id: '1611577416731', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577416731.svga') },
	{ id: '1611577771602', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577771602.svga') },
	{ id: '1611577805375', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577805375.svga') },
	{ id: '1611577859965', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577859965.svga') },
	{ id: '1611577881374', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577881374.svga') },
	{ id: '1611577905602', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577905602.svga') },
	{ id: '1611577960187', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/1611577960187.svga') },
	{ id: 'claping', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/claping.svga') },
	{ id: 'crying', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/crying.svga') },
	{ id: 'emojikissleft', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/emojikissleft.svga') },
	{ id: 'emojikissright', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/emojikissright.svga') },
	{ id: 'emotion-4', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/emotion (4).svga') },
	{ id: 'sorry', type: 'svga', category: 'NORMAL', source: require('@/assets/emoji/emoji/NORMAL/sorry.svga') },
]

/** VIP animated emojis: SVGA. */
const VIP_SVGA_EMOJIS: EmojiConfig[] = [
	{ id: '1712736170074', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712736170074.svga') },
	{ id: '1712807506011', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807506011.svga') },
	{ id: '1712807547446', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807547446.svga') },
	{ id: '1712807681481', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807681481.svga') },
	{ id: '1712807706442', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807706442.svga') },
	{ id: '1712807732067', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807732067.svga') },
	{ id: '1712807760684', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807760684.svga') },
	{ id: '1712807779689', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1712807779689.svga') },
	{ id: '1735205551271', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/1735205551271.svga') },
	{ id: 'emotion-2', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/emotion (2).svga') },
	{ id: 'emotion-3', type: 'svga', category: 'vip', source: require('@/assets/emoji/emoji/vip/emotion (3).svga') },
]

export const EMOJI_CONFIG: EmojiConfig[] = [
	...STATIC_EMOJIS,
	...NORMAL_SVGA_EMOJIS,
	...VIP_SVGA_EMOJIS,
]

export const EMOJI_CONFIG_BY_ID: Record<string, EmojiConfig> =
	Object.fromEntries(EMOJI_CONFIG.map(c => [c.id, c]))

/** id -> Image source for static emojis (webp preferred). Used by EmojiPicker and ChatMessage. */
export const EMOJI_MAP: Record<string, ImageSourcePropType | number> =
	Object.fromEntries(
		STATIC_EMOJIS.map(e => [e.id, e.source as ImageSourcePropType])
	)

export function getEmojiConfig(id: string): EmojiConfig | undefined {
	return EMOJI_CONFIG_BY_ID[id]
}

/** Static emoji: webp preferred. SVGA with posterSource returns poster for Expo Go fallback. */
export function getStaticEmojiSource(
	id: string
): ImageSourcePropType | number | undefined {
	const config = EMOJI_CONFIG_BY_ID[id]
	if (!config) return undefined
	if (config.type === 'static') return config.source as ImageSourcePropType
	if (config.type === 'svga' && config.posterSource)
		return config.posterSource as ImageSourcePropType
	return undefined
}

/** Source for picker/chat: static = webp/png, svga = poster if set, else undefined (caller uses SVGA player or fallback). */
export function getEmojiDisplaySource(id: string): ImageSourcePropType | number | undefined {
	const config = EMOJI_CONFIG_BY_ID[id]
	if (!config) return undefined
	if (config.type === 'static') return config.source as ImageSourcePropType
	if (config.type === 'svga' && config.posterSource)
		return config.posterSource as ImageSourcePropType
	return undefined
}

export function isAnimatedEmoji(id: string): boolean {
	return EMOJI_CONFIG_BY_ID[id]?.type === 'svga'
}
