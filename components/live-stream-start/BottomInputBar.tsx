import { EmojiPickerOverlay, EmojiSvgaOverlay } from '@/components/emoji'
import { isAnimatedEmoji } from '@/constants/emoji'
import { getEmojiIdsFromText } from '@/utils/parseMessage'
import React, { useCallback, useState } from 'react'
import {
	Dimensions,
	Keyboard,
	Pressable,
	StyleSheet,
	TextInput,
	View,
} from 'react-native'
import AppIcon from '../ui/icons/live-stream-view/appIcon'
import GameStreamIcon from '../ui/icons/live-stream-view/gameStreamIcon'
import MicSpeakIcon from '../ui/icons/live-stream-view/micSpeakIcon'
import PkIcon from '../ui/icons/live-stream-view/pkIcon'
import PrizeIcon from '../ui/icons/live-stream-view/prizeIcon'
import RateFireIcon from '../ui/icons/live-stream-view/rateFireIcon'
import EmojiIcon from '../ui/icons/emojiIcon'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface BottomInputBarProps {
	onSend?: (text: string) => void
	onGamePress?: () => void
	onInvitePress?: () => void
	onPkPress?: () => void
	onPrizePress?: () => void
	onMicPress?: () => void
}

export function BottomInputBar({
	onSend,
	onGamePress,
	onInvitePress,
	onPkPress,
	onPrizePress,
	onMicPress,
}: BottomInputBarProps) {
	const [text, setText] = useState('')
	const [emojiVisible, setEmojiVisible] = useState(false)
	const [svgaQueue, setSvgaQueue] = useState<string[]>([])

	const handleSend = useCallback(() => {
		const trimmed = text.trim()
		if (!trimmed || !onSend) return
		const ids = getEmojiIdsFromText(trimmed)
		const svgaIds = ids.filter(isAnimatedEmoji)
		if (svgaIds.length > 0) setSvgaQueue(svgaIds)
		onSend(trimmed)
		setText('')
		setEmojiVisible(false)
	}, [text, onSend])

	const handleEmojiSelect = useCallback((placeholder: string) => {
		setText(prev => prev + placeholder)
	}, [])

	const handleSvgaComplete = useCallback(() => {
		setSvgaQueue([])
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.inputRow}>
				<Pressable onPress={onMicPress} style={styles.iconButton}>
					<MicSpeakIcon />
				</Pressable>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder='Say something...'
						placeholderTextColor='rgba(255, 255, 255, 0.6)'
						value={text}
						onChangeText={setText}
						onSubmitEditing={handleSend}
						returnKeyType='send'
					/>
					<Pressable
						onPress={() => {
							Keyboard.dismiss()
							setEmojiVisible(prev => !prev)
						}}
						style={styles.emojiIconWrap}
						hitSlop={8}
					>
						<EmojiIcon />
					</Pressable>
				</View>
			</View>

			<View style={styles.actionsRow}>
				<Pressable onPress={onGamePress} style={styles.iconButton}>
					<AppIcon />
				</Pressable>
				<Pressable onPress={onGamePress} style={styles.iconButton}>
					<RateFireIcon />
				</Pressable>
				<Pressable onPress={onGamePress} style={styles.iconButton}>
					<GameStreamIcon />
				</Pressable>
				<Pressable onPress={onPkPress} style={styles.iconButton}>
					<PkIcon />
				</Pressable>
				<Pressable onPress={onPrizePress} style={styles.iconButton}>
					<PrizeIcon />
				</Pressable>
			</View>

			<EmojiPickerOverlay
				visible={emojiVisible}
				onEmojiSelect={handleEmojiSelect}
				onClose={() => setEmojiVisible(false)}
			/>
			<EmojiSvgaOverlay queue={svgaQueue} onComplete={handleSvgaComplete} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: Math.max(8, SCREEN_WIDTH * 0.02),
		paddingVertical: Math.max(8, SCREEN_WIDTH * 0.02),
		gap: Math.max(6, SCREEN_WIDTH * 0.015),
		alignItems: 'center',
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Math.max(6, SCREEN_WIDTH * 0.015),
		flex: 1,
		minWidth: 0,
	},
	iconButton: {
		padding: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		flex: 1,
		height: Math.max(34, SCREEN_WIDTH * 0.09),
		minHeight: 34,
		maxHeight: 40,
		backgroundColor: 'rgba(59, 54, 54, 0.15)',
		borderRadius: 18,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: Math.max(10, SCREEN_WIDTH * 0.03),
		minWidth: 0,
	},
	emojiIconWrap: {
		padding: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		fontSize: Math.max(11, SCREEN_WIDTH * 0.03),
		color: '#FFFFFF',
		padding: 0,
		minWidth: 0,
	},
	actionsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: Math.max(1, SCREEN_WIDTH * 0.005),
		flexShrink: 0,
		flexWrap: 'nowrap',
	},
})
