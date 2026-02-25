import { spacing } from '@/constants/spacing'
import React, { useEffect, useMemo, useState } from 'react'
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SeatItem } from './SeatItem'

const SEAT_ITEM_SIZE_MIN = 44
const SEAT_ITEM_SIZE_MAX = 62
const SEAT_SECTION_H_PADDING = 0

const TARGET_ROW_ITEM_GAP = 35
const ROW_GAP = 20

function getGaps(windowWidth: number, maxCols: number) {
	const availableWidth = windowWidth - SEAT_SECTION_H_PADDING
	const minGap = spacing.xs
	const maxGap = maxCols >= 5 ? 18 : TARGET_ROW_ITEM_GAP

	if (maxCols <= 1 || availableWidth <= 0) {
		return { colGap: minGap, rowGap: ROW_GAP }
	}

	let colGap = maxGap
	let seatSize = (availableWidth - (maxCols - 1) * colGap) / maxCols

	if (seatSize < SEAT_ITEM_SIZE_MIN) {
		const totalGap = availableWidth - SEAT_ITEM_SIZE_MIN * maxCols
		const possibleGap =
			maxCols > 1 ? Math.max(minGap, totalGap / (maxCols - 1)) : minGap
		colGap = Math.max(minGap, Math.min(maxGap, possibleGap))
		seatSize = (availableWidth - (maxCols - 1) * colGap) / maxCols
	} else if (seatSize > SEAT_ITEM_SIZE_MAX) {
		const totalGap = availableWidth - SEAT_ITEM_SIZE_MAX * maxCols
		const possibleGap = maxCols > 1 ? totalGap / (maxCols - 1) : maxGap
		colGap = Math.max(minGap, Math.min(maxGap, possibleGap))
		seatSize = (availableWidth - (maxCols - 1) * colGap) / maxCols
	}

	const rowGapBase = Math.min(ROW_GAP, colGap * 0.7)
	const rowGap = Math.max(spacing.sm, rowGapBase)

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
	/** Returns whether the given seat is currently speaking (e.g. from Agora volume indication). */
	getIsSpeakingForSeat?: (seatNumber: number, seat: Seat | undefined) => boolean
}

function getRowsForSeatCount(seatCount: number): number[] | null {
	if (seatCount === 10) return [2, 4, 4]
	if (seatCount === 15) return [5, 5, 5]
	if (seatCount === 20) return [5, 5, 5, 5]
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
	getIsSpeakingForSeat,
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
	}, [
		seatCount,
		_screenId,
		seatItemSize,
		windowWidth,
		rowGap,
		colGap,
		rowsConfig,
	])
	// #endregion

	const seatItemProps = (
		n: number,
		seat: Seat | undefined,
		isOpen: boolean,
	) => ({
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
		isOpen,
		onOpenChange: setOpenSeatNumber,
		itemSize: seatItemSize,
		isSpeaking: getIsSpeakingForSeat?.(n, seat) ?? false,
	})

	if (rowsConfig) {
		return (
			<View
				style={[
					styles.container,
					{
						gap: rowGap,

						marginTop: seatCount === 20 ? -24 : 0,
					},
				]}
			>
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
									{...seatItemProps(n, seats?.[n], openSeatNumber === n)}
								/>
							))}
						</View>
					)
				})}
			</View>
		)
	}

	return (
		<View
			style={[
				styles.container,
				{
					gap: rowGap,
					marginTop: seatCount === 20 ? -24 : 0,
				},
			]}
		>
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
						{...seatItemProps(n, seats?.[n], openSeatNumber === n)}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
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
