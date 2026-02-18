import { DEFAULT_EMOJI_SIZE, EmojiRenderer } from '@/components/emoji'
import {
	parseMessageWithEmoji,
	type MessageSegment,
} from '@/utils/parseMessage'
import React, { useMemo } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

interface ChatMessageProps {
	text: string
	style?: StyleProp<TextStyle>
	containerStyle?: StyleProp<ViewStyle>
	numberOfLines?: number
}

function MessageSegmentRow({
	segment,
	index,
	textStyle,
}: {
	segment: MessageSegment
	index: number
	textStyle: StyleProp<TextStyle>
}) {
	return (
		<EmojiRenderer
			segment={segment}
			index={index}
			textStyle={textStyle}
			emojiSize={DEFAULT_EMOJI_SIZE}
		/>
	)
}

export function ChatMessage({
	text,
	style,
	containerStyle,
	numberOfLines,
}: ChatMessageProps) {
	const segments = useMemo(() => parseMessageWithEmoji(text), [text])

	return (
		<View
			style={[
				styles.root,
				numberOfLines != null && numberOfLines > 0
					? { maxHeight: numberOfLines * DEFAULT_EMOJI_SIZE }
					: undefined,
				containerStyle,
			]}
		>
			{segments.map((seg, i) => (
				<MessageSegmentRow key={i} segment={seg} index={i} textStyle={style} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		overflow: 'hidden',
	},
})
