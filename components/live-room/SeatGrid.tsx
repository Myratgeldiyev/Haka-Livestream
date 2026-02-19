import { spacing } from '@/constants/spacing'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SeatItem } from './SeatItem'

const SEAT_ITEM_SIZE_MIN = 44
const SEAT_ITEM_SIZE_MAX = 62
const SEAT_SECTION_H_PADDING = 0

/** Prefer larger gaps on iOS; Android stays compact. If layout would hit min size, use safe gaps. */
function getGaps(windowWidth: number, maxCols: number) {
	const availableWidth = windowWidth - SEAT_SECTION_H_PADDING
	const largeColGap = Platform.OS === 'ios' ? spacing.lg : spacing.md
	const largeRowGap = Platform.OS === 'ios' ? spacing.lg : spacing.md
	const safeColGap = spacing.md
	const safeRowGap = spacing.md

	const sizeWithLargeGaps = Math.floor(
		(availableWidth - (maxCols - 1) * largeColGap) / maxCols,
	)
	const wouldHitMin = sizeWithLargeGaps < SEAT_ITEM_SIZE_MIN

	const colGap = wouldHitMin ? safeColGap : largeColGap
	const rowGap = wouldHitMin ? safeRowGap : largeRowGap
	return { colGap, rowGap }
}

type SeatStatus = 'locked' | 'unlocked'

type SeatUser = {
	id: string
	username: string
	avatar: string
	isMuted?: boolean
}

type Seat = {
	status: SeatStatus
	user: SeatUser | null
	isTurnedOff?: boolean
}

type SeatsState = Record<number, Seat>

type UserRole = 'owner' | 'admin' | 'listener'

interface SeatGridProps {
	seatCount?: number
	seats?: SeatsState
	userRole?: UserRole
	iconsOnly?: boolean

	_screenId?: string
	onLockSeat?: (seatNumber: number) => void
	onUnlockSeat?: (seatNumber: number) => void
	onOpenInviteMic?: (seatNumber: number) => void
	onTakeSeat?: (seatNumber: number) => void
	onTurnOff?: (seatNumber: number) => void
	onMuteUser?: (userId: string) => void
	onUnmuteUser?: (userId: string) => void
	onOccupiedSeatPress?: (user: SeatUser) => void
	/** When set, the seat with this seatNumber shows the emoji on its avatar for a short time. */
	seatEmojiBurst?: { seatNumber: number; emojiId: string } | null
}

function getRowsForSeatCount(seatCount: number): number[] | null {
	if (seatCount === 10) return [2, 4, 4]
	if (seatCount === 5) return [2, 3]
	return null
}

export function SeatGrid({
	seatCount = 10,
	seats,
	seatEmojiBurst,
	userRole,
	iconsOnly,
	_screenId,
	onLockSeat,
	onUnlockSeat,
	onOpenInviteMic,
	onTakeSeat,
	onTurnOff,
	onMuteUser,
	onUnmuteUser,
	onOccupiedSeatPress,
}: SeatGridProps) {
	const { width: windowWidth } = useWindowDimensions()
	const [openSeatNumber, setOpenSeatNumber] = useState<number | null>(null)
	const seatNumbers = Array.from({ length: seatCount }, (_, i) => i + 1)
	const rowsConfig = getRowsForSeatCount(seatCount)

	const { colGap, rowGap } = useMemo(() => {
		const maxCols = rowsConfig ? Math.max(...rowsConfig) : 4
		return getGaps(windowWidth, maxCols)
	}, [windowWidth, rowsConfig])

	const seatItemSize = useMemo(() => {
		const maxCols = rowsConfig ? Math.max(...rowsConfig) : 4
		const availableWidth = windowWidth - SEAT_SECTION_H_PADDING
		const fromWidth = (availableWidth - (maxCols - 1) * colGap) / maxCols
		const clamped = Math.min(
			SEAT_ITEM_SIZE_MAX,
			Math.max(SEAT_ITEM_SIZE_MIN, Math.floor(fromWidth)),
		)
		return clamped
	}, [windowWidth, rowsConfig, colGap])

	// #region agent log
	useEffect(() => {
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'SeatGrid.tsx:mount',
				message: 'SeatGrid render',
				data: {
					_screenId: _screenId ?? 'unknown',
					seatCount,
					rowsConfig: rowsConfig ?? 'fallback',
					platform: Platform.OS,
					rowGap,
					colGap,
					seatItemSize,
					windowWidth,
				},
				timestamp: Date.now(),
				hypothesisId: 'H2_H3',
			}),
		}).catch(() => {})
	}, [seatCount, _screenId, seatItemSize, windowWidth, rowGap, colGap])
	// #endregion

	const seatItemProps = {
		userRole,
		iconsOnly,
		onLock: onLockSeat,
		onUnlock: onUnlockSeat,
		onOpenInviteMic,
		onTakeSeat,
		onTurnOff,
		onMuteUser,
		onUnmuteUser,
		onOccupiedSeatPress,
		isOpen: false,
		onOpenChange: setOpenSeatNumber,
		itemSize: seatItemSize,
	}

	if (rowsConfig) {
		return (
			<View style={[styles.container, { gap: rowGap }]}>
				{rowsConfig.map((rowSize, rowIndex) => {
					const start = rowsConfig.slice(0, rowIndex).reduce((a, b) => a + b, 0)
					return (
						<View key={rowIndex} style={[styles.row, { gap: colGap }]}>
							{seatNumbers.slice(start, start + rowSize).map(n => (
								<SeatItem
									key={n}
									seatNumber={n}
									seat={seats?.[n]}
									showEmojiId={
										seatEmojiBurst?.seatNumber === n
											? seatEmojiBurst.emojiId
											: undefined
									}
									{...seatItemProps}
									isOpen={openSeatNumber === n}
								/>
							))}
						</View>
					)
				})}
			</View>
		)
	}

	return (
		<View style={[styles.container, { gap: rowGap }]}>
			<View style={[styles.row, { gap: colGap }]}>
				{seatNumbers.map(n => (
					<SeatItem
						key={n}
						seatNumber={n}
						seat={seats?.[n]}
						showEmojiId={
							seatEmojiBurst?.seatNumber === n
								? seatEmojiBurst.emojiId
								: undefined
						}
						size={n <= 2 ? 'large' : undefined}
						{...seatItemProps}
						isOpen={openSeatNumber === n}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
})
