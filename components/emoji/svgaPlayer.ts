// DEPRECATED: Replaced by Lottie (EmojiLottieOverlay + getLottieSource). Do not use for new code.
import { Image } from 'react-native'
import type { ImageSourcePropType } from 'react-native'
import { getEmojiConfig } from '@/constants/emoji'

/**
 * Native SVGA dependency REMOVED. All playback uses WebView (SvgaWebView) for Expo Go and builds.
 * This file only provides URI resolution for the WebView player.
 */

/** Resolve require() asset or { uri } to a string URI for WebView SVGA player. */
export function resolveAssetUri(
	source: ImageSourcePropType | number
): string | null {
	if (source == null) return null
	try {
		if (typeof source === 'number') {
			const resolved = Image.resolveAssetSource(source as number)
			return resolved?.uri ?? null
		}
		if (
			typeof source === 'object' &&
			'uri' in source &&
			typeof (source as { uri: string }).uri === 'string'
		) {
			return (source as { uri: string }).uri
		}
		return null
	} catch {
		return null
	}
}

/**
 * Returns the URI to use for playing SVGA in WebView.
 * 1. If config has remoteUrl (optional), use it (remote URL).
 * 2. Else resolve local asset via Metro (works in dev; in production bundle asset may have a different origin).
 * 3. If EXPO_PUBLIC_SVGA_BASE_URL is set, use base + encodeURIComponent(id) + '.svga' as fallback when local resolve is null.
 */
export function getSvgaUri(emojiId: string): string | null {
	const config = getEmojiConfig(emojiId)
	if (!config || config.type !== 'svga') return null

	if (config.remoteUrl) return config.remoteUrl

	const localUri = resolveAssetUri(config.source)
	if (localUri) return localUri

	const base = process.env.EXPO_PUBLIC_SVGA_BASE_URL
	if (base) {
		const baseTrimmed = base.replace(/\/$/, '')
		return `${baseTrimmed}/${encodeURIComponent(emojiId)}.svga`
	}
	return null
}
