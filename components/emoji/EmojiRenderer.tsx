import {
	getEmojiDisplaySource,
	getEmojiConfig,
	isAnimatedEmoji,
} from '@/constants/emoji'
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
 * Renders one message segment: text → Text, static emoji → Image (webp/png),
 * SVGA emoji → poster Image when posterSource set, else minimal id fallback (no placeholder).
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

	if (isAnimatedEmoji(id)) {
		const config = getEmojiConfig(id)
		return (
			<View
				key={index}
				style={[
					{
						width: emojiSize,
						height: emojiSize,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(255,255,255,0.08)',
						borderRadius: 4,
					},
					containerStyle,
				]}
			>
				<Text
					style={[textStyle, { fontSize: emojiSize * 0.45 }]}
					numberOfLines={1}
				>
					{config?.id ?? id}
				</Text>
			</View>
		)
	}

	return (
		<Text key={index} style={textStyle}>
			{`[emoji:${id}]`}
		</Text>
	)
}
