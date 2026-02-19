import { pickImageFromGallery } from '@/hooks/image-picker-from-gallery'
import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import LuckyBagIcon from '../ui/icons/live-stream/LuckyBagIcon'
import BattleRoomPlay from '../ui/icons/room-play/battleRoomPlay'
import ConsoleRoomPlay from '../ui/icons/room-play/consoleRoomPlay'
import FireRoomPlay from '../ui/icons/room-play/FireRoomPlay'
import PkRoomPlay from '../ui/icons/room-play/pkRoomPlay'
import { COLORS, getGridSizes } from './room-play-styles'
import type {
	RoomPlayContentProps,
	RoomPlayItemData,
	RoomPlaySection,
	RoomPlayUserRole,
} from './room-play.types'
import { RoomPlayItem } from './RoomPlayItem'

const MOCK_SECTIONS: RoomPlaySection[] = [
	{
		id: 'room-play',
		items: [
			{ id: '1', name: 'Room PK', icon: <PkRoomPlay /> },
			{ id: '2', name: 'Battle', icon: <BattleRoomPlay /> },
			{ id: '3', name: 'Calculator', icon: <FireRoomPlay /> },
			{
				id: '4',
				name: 'Game PK',
				icon: <ConsoleRoomPlay />,
			},
			{
				id: '5',
				name: 'Lucky Bag',
				icon: <LuckyBagIcon />,
			},
		],
	},
	{
		id: 'tools',
		title: 'Tools',
		items: [
			{
				id: '6',
				name: 'Voice On',
				imageSource: require('@/assets/room-play/1.png'),
			},
			{
				id: '7',
				name: 'Gift Effects',
				imageSource: require('@/assets/room-play/2.png'),
			},
			{
				id: '8',
				name: 'Applyer',
				imageSource: require('@/assets/room-play/3.png'),
			},
			{
				id: '9',
				name: 'Clean',
				imageSource: require('@/assets/room-play/4.png'),
			},
			{
				id: '10',
				name: 'Public Msg',
				imageSource: require('@/assets/room-play/5.png'),
			},
			{
				id: '11',
				name: 'Music',
				imageSource: require('@/assets/room-play/6.png'),
			},
			{
				id: '12',
				name: 'Photo',
				imageSource: require('@/assets/room-play/7.png'),
			},
			{
				id: '13',
				name: 'call',
				imageSource: require('@/assets/room-play/8.png'),
			},
			{
				id: '14',
				name: 'Message',
				imageSource: require('@/assets/room-play/9.png'),
			},
			{
				id: '15',
				name: 'Share',
				imageSource: require('@/assets/room-play/10.png'),
			},
		],
	},
]

const ALLOWED_ITEMS_FOR_REGULAR_USERS = {
	'room-play': ['Lucky Bag'],
	tools: ['Voice On', 'Voice Off', 'Gift Effects', 'Photo', 'call', 'Share'],
}

function GridRow({
	items,
	onItemSelect,
	showBackground,
	gridRowStyle,
}: {
	items: RoomPlayItemData[]
	onItemSelect?: (item: RoomPlayItemData) => void
	showBackground?: boolean
	gridRowStyle?: { gap: number; width: number }
}) {
	return (
		<View style={[styles.gridRow, gridRowStyle]}>
			{items.map(item => (
				<RoomPlayItem
					key={item.id}
					item={item}
					onPress={() => onItemSelect?.(item)}
					showBackground={showBackground}
				/>
			))}
		</View>
	)
}

function Section({
	section,
	onItemSelect,
	gridRowStyle,
	gridStyle,
	sectionMargin,
	sectionTitleStyle,
}: {
	section: RoomPlaySection
	onItemSelect?: (item: RoomPlayItemData) => void
	gridRowStyle?: { gap: number; width: number }
	gridStyle?: { gap: number }
	sectionMargin?: number
	sectionTitleStyle?: { fontSize: number; marginBottom: number }
}) {
	const rows: RoomPlayItemData[][] = []
	for (let i = 0; i < section.items.length; i += 4) {
		rows.push(section.items.slice(i, i + 4))
	}

	return (
		<View style={[styles.section, sectionMargin != null && { marginBottom: sectionMargin }]}>
			{section.title && (
				<Text style={[styles.sectionTitle, sectionTitleStyle]}>{section.title}</Text>
			)}
			<View style={[styles.grid, gridStyle]}>
				{rows.map((rowItems, index) => (
					<GridRow
						key={`${section.id}-row-${index}`}
						items={rowItems}
						onItemSelect={onItemSelect}
						showBackground={section.id !== 'room-play'}
						gridRowStyle={gridRowStyle}
					/>
				))}
			</View>
		</View>
	)
}

export function RoomPlayContent({
	sections,
	onItemSelect,
	publicMsgEnabled = true,
	onRequestClose,
	userRoleOverride,
	streamIdForMute,
}: RoomPlayContentProps) {
	const { width: screenWidth } = useWindowDimensions()
	const { cellSize, horizontalPadding, itemGap } = getGridSizes(screenWidth)
	const gridRowStyle = {
		gap: itemGap,
		width: cellSize * 4 + itemGap * 3,
	}
	const scrollContentStyle = {
		paddingHorizontal: horizontalPadding,
		paddingTop: screenWidth * 0.04,
		paddingBottom: screenWidth * 0.08,
	}
	const sectionMargin = screenWidth * 0.05
	const sectionTitleStyle = {
		fontSize: Math.max(16, screenWidth * 0.045),
		marginBottom: screenWidth * 0.035,
	}
	const gridGapStyle = { gap: screenWidth * 0.04 }

	const chatIsMuted = useLiveChatStore(s => s.isMuted)
	const streamMuted = useLiveStreamStore(s => s.streamMuted)
	const isMuted = streamIdForMute ? streamMuted : chatIsMuted
	const giftEffectsEnabled = useLiveChatStore(s => s.giftEffectsEnabled)
	const callEnabled = useLiveChatStore(s => s.callEnabled)
	const roomId = useLiveChatStore(s => s.roomId)
	const chatMuteMyself = useLiveChatStore(s => s.muteMyself)
	const chatUnmuteMyself = useLiveChatStore(s => s.unmuteMyself)
	const streamMuteMyself = useLiveStreamStore(s => s.muteMyself)
	const streamUnmuteMyself = useLiveStreamStore(s => s.unmuteMyself)
	const toggleGiftEffects = useLiveChatStore(s => s.toggleGiftEffects)
	const toggleCall = useLiveChatStore(s => s.toggleCall)
	const sendImageMessage = useLiveChatStore(s => s.sendImageMessage)
	const cleanChatMessages = useLiveChatStore(s => s.cleanChatMessages)

	const chatRole = useLiveChatStore(s => s.role)
	const userRole: RoomPlayUserRole | null =
		userRoleOverride ??
		(chatRole === 'host' ? 'admin' : (chatRole as RoomPlayUserRole | null))

	const handleItemSelect = async (item: RoomPlayItemData) => {
		if (item.name === 'Voice On' || item.name === 'Voice Off') {
			if (streamIdForMute) {
				if (isMuted) {
					await streamUnmuteMyself(streamIdForMute)
				} else {
					await streamMuteMyself(streamIdForMute)
				}
			} else if (roomId) {
				if (isMuted) {
					await chatUnmuteMyself(roomId)
				} else {
					await chatMuteMyself(roomId)
				}
			}
			return
		}

		if (item.name === 'Gift Effects') {
			toggleGiftEffects()
			return
		}

		if (item.name === 'Photo') {
			try {
				const asset = await pickImageFromGallery()
				if (!asset) return
				sendImageMessage(asset.uri)
				onRequestClose?.()
			} catch {
				return
			}
			return
		}

		if (item.name === 'Clean') {
			cleanChatMessages()
			onRequestClose?.()
			return
		}

		if (item.name === 'call') {
			toggleCall()
			return
		}

		onItemSelect?.(item)
	}

	const filterItemsByRole = (section: RoomPlaySection): RoomPlaySection => {
		if (userRole === 'admin' || userRole === 'owner') {
			return section
		}

		const allowedItems =
			ALLOWED_ITEMS_FOR_REGULAR_USERS[
				section.id as keyof typeof ALLOWED_ITEMS_FOR_REGULAR_USERS
			]

		if (!allowedItems) {
			return { ...section, items: [] }
		}

		const filteredItems = section.items.filter(item =>
			allowedItems.includes(item.name),
		)

		return {
			...section,
			items: filteredItems,
		}
	}

	const displaySections = (sections.length ? sections : MOCK_SECTIONS)
		.map(filterItemsByRole)
		.filter(section => section.items.length > 0)
		.map(section => {
			if (section.id !== 'tools') return section

			return {
				...section,
				items: section.items.map(item => {
					if (item.name !== 'Voice On') return item
					return {
						...item,
						name: isMuted ? 'Voice Off' : 'Voice On',
						toggleActive: !isMuted,
					}
				}),
			}
		})
		.map(section => {
			if (section.id !== 'tools') return section

			return {
				...section,
				items: section.items.map(item => {
					if (item.name !== 'Gift Effects') return item
					return {
						...item,
						toggleActive: giftEffectsEnabled,
					}
				}),
			}
		})
		.map(section => {
			if (section.id !== 'tools') return section

			return {
				...section,
				items: section.items.map(item => {
					if (item.name !== 'Public Msg') return item
					return {
						...item,
						toggleActive: publicMsgEnabled,
					}
				}),
			}
		})
		.map(section => {
			if (section.id !== 'tools') return section

			return {
				...section,
				items: section.items.map(item => {
					if (item.name !== 'call') return item
					return {
						...item,
						toggleActive: callEnabled,
					}
				}),
			}
		})

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
			showsVerticalScrollIndicator={false}
		>
			{displaySections.map(section => (
				<Section
					key={section.id}
					section={section}
					onItemSelect={handleItemSelect}
					gridRowStyle={gridRowStyle}
					gridStyle={gridGapStyle}
					sectionMargin={sectionMargin}
					sectionTitleStyle={sectionTitleStyle}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {},
	section: {},
	sectionTitle: {
		fontWeight: '700',
		color: COLORS.sectionTitle,
	},
	grid: {},
	gridRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'nowrap',
	},
})
