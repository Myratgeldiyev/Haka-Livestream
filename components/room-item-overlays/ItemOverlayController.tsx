import React from 'react'
import { CalculatorOverlay } from './CalculatorOverlay'
import { GamesOverlay } from './GamesOverlay'
import type { GameItem, ItemOverlayControllerProps } from './item-overlay.types'
import { RoomPKOverlay } from './RoomPKOverlay'

const OVERLAY_ITEM_IDS = {
	ROOM_PK: '1',
	BATTLE: '2',
	CALCULATOR: '3',
	GAME_PK: '4',
} as const

function getOverlayType(itemId: string): string | null {
	switch (itemId) {
		case OVERLAY_ITEM_IDS.ROOM_PK:
			return 'room-pk'
		case OVERLAY_ITEM_IDS.CALCULATOR:
			return 'calculator'
		case OVERLAY_ITEM_IDS.GAME_PK:
			return 'games'
		default:
			return null
	}
}

export function ItemOverlayController({
	selectedItem,
	onClose,
	onRoomPKRandomMatch,
	onCalculatorStart,
}: ItemOverlayControllerProps) {
	const overlayType = selectedItem ? getOverlayType(selectedItem.id) : null

	const handleRoomPKRandomMatch = (timeMinutes: number) => {
		onRoomPKRandomMatch?.(timeMinutes)
		onClose()
	}

	const handleRoomPKInviteRoom = (timeMinutes: number) => {
		onClose()
	}

	const handleCalculatorStart = (timeMinutes: number | null) => {
		onClose()
		onCalculatorStart?.(timeMinutes)
	}

	const handleGamesStart = (game: GameItem) => {
		onClose()
	}

	const handleGamesShare = () => {}

	return (
		<>
			<RoomPKOverlay
				visible={overlayType === 'room-pk'}
				onClose={onClose}
				onRandomMatch={handleRoomPKRandomMatch}
				// onInviteRoom={handleRoomPKInviteRoom}
			/>

			<CalculatorOverlay
				visible={overlayType === 'calculator'}
				onClose={onClose}
				onStart={handleCalculatorStart}
			/>

			<GamesOverlay
				visible={overlayType === 'games'}
				onClose={onClose}
				onStart={handleGamesStart}
				onShare={handleGamesShare}
			/>
		</>
	)
}
