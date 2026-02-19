import { EmojiPickerOverlay } from '@/components/emoji'
import { MessageInboxSheet } from '@/components/message/inbox-sheet/MessageInboxSheet'
import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights } from '@/constants/typography'
import React, { useCallback, useMemo, useState } from 'react'
import {
	Keyboard,
	Platform,
	Pressable,
	StyleSheet,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native'
import type { RoomPlayUserRole } from '../room-play/room-play.types'
import { RoomPlayOverlay } from '../room-play/RoomPlayOverlay'
import ChatMessageIcon from '../ui/icons/chat/ChatMessageIcon'
import ConsoleIcon from '../ui/icons/chat/ConsoleIcon'
import PkIconChat from '../ui/icons/chat/PKiconChat'
import EmojiIcon from '../ui/icons/emojiIcon'
import AppIcon from '../ui/icons/live-stream-view/appIcon'
import MicMutedIcon from '../ui/icons/live-stream-view/MicMutedIcon'
import MicSpeakIcon from '../ui/icons/live-stream-view/micSpeakIcon'
import PrizeIcon from '../ui/icons/live-stream-view/prizeIcon'
import ChairIcon from '../ui/icons/live-stream/chairIcon'
import { GiftSendOverlay } from './GiftSendOverlay'

const INPUT_HEIGHT_BASE = Platform.select({ ios: 36, android: 34 }) ?? 36
const ROW_GAP = Platform.select({ ios: spacing.xs, android: 4 }) ?? spacing.xs

interface RoomBottomBarProps {
	onSend?: (text: string) => void
	roomId?: string
	publicMsgEnabled?: boolean
	onTogglePublicMsg?: () => void
	onOpenMusicPlayer?: () => void
	onRoomPKRandomMatch?: (timeMinutes: number) => void
	onCalculatorStart?: (timeMinutes: number | null) => void
	/** When false, show mute/unmute icon; when true, show chair icon. */
	isUserOnSeat?: boolean
	/** Current mic muted state (for icon). */
	isMuted?: boolean
	onToggleMute?: () => void
	/** When not on seat, press takes first available seat (1, 2, ...). */
	onTakeFirstAvailableSeat?: () => void
	/** User role in room (owner / admin / listener) for tool visibility. */
	userRole?: RoomPlayUserRole
	/** When set (live stream), use stream API for mute/unmute. */
	streamIdForMute?: string
	/** Called when user picks an emoji in the picker (e.g. to show on seat avatar). */
	onEmojiPicked?: (emojiId: string) => void
}

export function RoomBottomBar({
	onSend,
	roomId,
	publicMsgEnabled,
	onTogglePublicMsg,
	onOpenMusicPlayer,
	onRoomPKRandomMatch,
	onCalculatorStart,
	isUserOnSeat = false,
	isMuted = false,
	onToggleMute,
	onTakeFirstAvailableSeat,
	userRole,
	streamIdForMute,
	onEmojiPicked,
}: RoomBottomBarProps) {
	const { width: screenWidth } = useWindowDimensions()
	const [text, setText] = useState('')
	const [emojiVisible, setEmojiVisible] = useState(false)
	const [roomPlayVisible, setRoomPlayVisible] = useState(false)
	const [giftOverlayVisible, setGiftOverlayVisible] = useState(false)
	const [messageInboxVisible, setMessageInboxVisible] = useState(false)

	// Responsive: smaller buttons and input on narrow screens so bar never overflows
	const inputHeight = Math.min(INPUT_HEIGHT_BASE, Math.max(30, Math.floor(screenWidth * 0.09)))
	const inputMaxWidth = Math.min(screenWidth * 0.38, 140)
	const containerPaddingH = Math.max(spacing.sm, Math.min(spacing.md, screenWidth * 0.03))
	const containerPaddingV = Platform.select({ ios: spacing.md, android: spacing.sm }) ?? spacing.md
	const actionIconSize = Math.min(24, Math.max(20, Math.floor(screenWidth * 0.055)))
	const muteIconSize = Math.min(28, Math.max(24, Math.floor(screenWidth * 0.065)))
	const iconBtnPadding = Platform.select({ ios: 2, android: 4 }) ?? 2
	const iconBtnMinWidth = actionIconSize + 6

	const handleRoomPlayOpen = () => setRoomPlayVisible(true)
	const handleRoomPlayClose = () => setRoomPlayVisible(false)
	const handleGiftOverlayOpen = () => setGiftOverlayVisible(true)
	const handleGiftOverlayClose = () => setGiftOverlayVisible(false)

	const handleSend = useCallback(() => {
		const trimmed = text.trim()
		if (!trimmed || !onSend) return
		onSend(trimmed)
		setText('')
		setEmojiVisible(false)
	}, [text, onSend])

	const handleEmojiSelect = useCallback((_placeholder: string) => {}, [])

	const dynamicStyles = useMemo(
		() => ({
			container: {
				paddingHorizontal: containerPaddingH,
				paddingVertical: containerPaddingV,
				gap: ROW_GAP,
				minHeight: inputHeight + 2 * 8,
			},
			inputContainer: {
				height: inputHeight,
				maxWidth: inputMaxWidth,
				borderRadius: inputHeight / 2,
			},
			iconBtn: {
				padding: iconBtnPadding,
				minWidth: iconBtnMinWidth,
			},
		}),
		[
			containerPaddingH,
			containerPaddingV,
			inputHeight,
			inputMaxWidth,
			iconBtnPadding,
			iconBtnMinWidth,
		],
	)

	return (
		<View style={[styles.container, dynamicStyles.container]}>
			<View style={styles.chairIconWrap}>
				{isUserOnSeat ? (
					<Pressable
						onPress={onToggleMute}
						style={styles.muteIconWrap}
						hitSlop={8}
					>
						{isMuted ? (
							<MicMutedIcon width={muteIconSize} height={muteIconSize} />
						) : (
							<MicSpeakIcon width={muteIconSize} height={muteIconSize} />
						)}
					</Pressable>
				) : onTakeFirstAvailableSeat ? (
					<Pressable
						onPress={onTakeFirstAvailableSeat}
						style={styles.muteIconWrap}
						hitSlop={8}
					>
						<ChairIcon />
					</Pressable>
				) : (
					<Pressable
						onPress={onToggleMute}
						style={styles.muteIconWrap}
						hitSlop={8}
					>
						{isMuted ? (
							<MicMutedIcon width={muteIconSize} height={muteIconSize} />
						) : (
							<MicSpeakIcon width={muteIconSize} height={muteIconSize} />
						)}
					</Pressable>
				)}
			</View>

			<View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
				<TextInput
					style={styles.input}
					placeholder='Hi...'
					placeholderTextColor='rgba(255, 255, 255, 0.5)'
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

			<View style={styles.actionsRow}>
				<Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]}>
					<AppIcon />
				</Pressable>
				<Pressable
					style={[styles.iconBtn, dynamicStyles.iconBtn]}
					onPress={() => onRoomPKRandomMatch?.(0)}
				>
					<PkIconChat />
				</Pressable>
				<Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]} onPress={handleRoomPlayOpen}>
					<ConsoleIcon />
				</Pressable>
				<Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]}>
					<ChatMessageIcon />
				</Pressable>
				<Pressable style={[styles.iconBtn, dynamicStyles.iconBtn]} onPress={handleGiftOverlayOpen}>
					<PrizeIcon />
				</Pressable>
			</View>
			<GiftSendOverlay
				visible={giftOverlayVisible}
				onClose={handleGiftOverlayClose}
			/>
			<RoomPlayOverlay
				visible={roomPlayVisible}
				onClose={handleRoomPlayClose}
				roomId={roomId}
				userRole={userRole}
				streamIdForMute={streamIdForMute}
				publicMsgEnabled={publicMsgEnabled}
				onTogglePublicMsg={onTogglePublicMsg}
				onOpenMessageInbox={() => setMessageInboxVisible(true)}
				onOpenMusicPlayer={onOpenMusicPlayer}
				onRoomPKRandomMatch={onRoomPKRandomMatch}
				onCalculatorStart={onCalculatorStart}
			/>
			<MessageInboxSheet
				visible={messageInboxVisible}
				onClose={() => setMessageInboxVisible(false)}
			/>
			<EmojiPickerOverlay
				visible={emojiVisible}
				onEmojiSelect={handleEmojiSelect}
				onEmojiPicked={onEmojiPicked}
				onClose={() => setEmojiVisible(false)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	chairIconWrap: {
		flexShrink: 0,
	},
	muteIconWrap: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	chatBubble: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		borderRadius: spacing.icon.large / 2,
		backgroundColor: 'rgba(80, 80, 80, 0.6)',
	},
	inputContainer: {
		backgroundColor: 'rgba(80, 80, 80, 0.5)',
		borderWidth: 1,
		borderColor: '#fff',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal:
			Platform.select({ ios: spacing.sm, android: 6 }) ?? spacing.sm,
		flex: 1,
		minWidth: 0,
	},
	emojiIconWrap: {
		padding: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		minWidth: 0,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#FFFFFF',
		padding: 0,
		paddingHorizontal: 4,
	},
	actionsRow: {
		flexShrink: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: ROW_GAP,
	},
	iconBtn: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	emojiPlaceholder: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		borderRadius: spacing.icon.large / 2,
		backgroundColor: '#FFD700',
	},
	gridPlaceholder: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		borderRadius: spacing.sm,
		backgroundColor: 'rgba(167, 139, 250, 0.8)',
	},
	pkPlaceholder: {
		width: spacing.icon.large,
		height: spacing.xxl,
		borderRadius: spacing.sm,
		backgroundColor: '#EF4444',
	},
	gamePlaceholder: {
		width: spacing.icon.large,
		height: spacing.xxl + spacing.xs,
		borderRadius: spacing.sm,
		backgroundColor: '#6366F1',
	},
	giftPlaceholder: {
		width: INPUT_HEIGHT_BASE,
		height: INPUT_HEIGHT_BASE,
		borderRadius: spacing.sm,
		backgroundColor: '#EC4899',
	},
})
