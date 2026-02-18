/**
 * Parses message text containing [emoji:id] placeholders.
 * Pure TypeScript, no JSX. Used by ChatMessage for rendering.
 * Placeholder format: [emoji:id] where id is any non-empty string without ].
 */

const EMOJI_REGEX = /\[emoji:([^\]]+)\]/g

export type MessageSegment =
	| { type: 'text'; value: string }
	| { type: 'emoji'; id: string }

/**
 * Splits message by [emoji:id] tokens. Returns segments for Text, Image, or overlay.
 * Deterministic; no rendering logic.
 */
export function parseMessageWithEmoji(text: string): MessageSegment[] {
	if (!text) return [{ type: 'text', value: ' ' }]
	const segments: MessageSegment[] = []
	let lastIndex = 0
	let match: RegExpExecArray | null
	const re = new RegExp(EMOJI_REGEX.source, 'g')
	while ((match = re.exec(text)) !== null) {
		if (match.index > lastIndex) {
			segments.push({
				type: 'text',
				value: text.slice(lastIndex, match.index),
			})
		}
		segments.push({ type: 'emoji', id: match[1] })
		lastIndex = re.lastIndex
	}
	if (lastIndex < text.length) {
		segments.push({ type: 'text', value: text.slice(lastIndex) })
	}
	return segments.length > 0 ? segments : [{ type: 'text', value: text }]
}

/** Returns all emoji ids found in text (order preserved). */
export function getEmojiIdsFromText(text: string): string[] {
	const ids: string[] = []
	const re = new RegExp(EMOJI_REGEX.source, 'g')
	let match: RegExpExecArray | null
	while ((match = re.exec(text)) !== null) {
		ids.push(match[1])
	}
	return ids
}
