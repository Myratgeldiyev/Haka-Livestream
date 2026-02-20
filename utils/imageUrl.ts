import { API_CONFIG } from '@/api/endpoints'

/** Resolve profile_picture or any image path to absolute URL for Image source. */
export function resolveImageUrl(url: string | undefined | null): string {
	if (!url || typeof url !== 'string') return ''
	if (url.startsWith('http://') || url.startsWith('https://')) return url
	const base = API_CONFIG.BASE_URL ?? ''
	const origin = base.replace(/\/api\/?$/, '')
	return origin + (url.startsWith('/') ? url : `/${url}`)
}
