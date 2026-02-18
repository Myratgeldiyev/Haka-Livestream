import { getEmojiDisplaySource } from '@/constants/emoji'
import type { MessageSegment } from '@/utils/parseMessage'
import { Image } from 'expo-image'
import React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'

export const DEFAULT_EMOJI_SIZE = 18

export interface EmojiRendererProps {
	segment: MessageSegment
	index: number
	textStyle?: StyleProp<TextStyle>
	emojiSize?: number
	containerStyle?: StyleProp<ViewStyle>
}

/**
 * Renders one message segment: text → Text, emoji → Image (webp/png/animated webp).
 * expo-image handles animated WebP automatically; no special handling here.
 */
export function EmojiRenderer({
	segment,
	index,
	textStyle,
	emojiSize = DEFAULT_EMOJI_SIZE,
	containerStyle,
}: EmojiRendererProps) {
	if (segment.type === 'text') {
		return (
			<Text key={index} style={textStyle}>
				{segment.value}
			</Text>
		)
	}

	const id = segment.id
	const source = getEmojiDisplaySource(id)

	if (source != null) {
		return (
			<Image
				key={index}
				source={source as never}
				style={{ width: emojiSize, height: emojiSize }}
				contentFit='contain'
			/>
		)
	}

	return (
		<Text key={index} style={textStyle}>
			{`[emoji:${id}]`}
		</Text>
	)
}
