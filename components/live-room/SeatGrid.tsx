import { spacing } from '@/constants/spacing'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { SeatItem } from './SeatItem'

const ROW_GAP = spacing.xl
const COL_GAP = spacing.xl
const SEAT_ITEM_SIZE = 70

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
	/** For debug: identifies which screen renders this grid */
	_screenId?: string
	onLockSeat?: (seatNumber: number) => void
	onUnlockSeat?: (seatNumber: number) => void
	onOpenInviteMic?: (seatNumber: number) => void
	onTakeSeat?: (seatNumber: number) => void
	onTurnOff?: (seatNumber: number) => void
	onMuteUser?: (userId: string) => void
	onUnmuteUser?: (userId: string) => void
	onOccupiedSeatPress?: (user: SeatUser) => void
}

function getRowsForSeatCount(seatCount: number): number[] | null {
	if (seatCount === 10) return [2, 4, 4]
	if (seatCount === 5) return [2, 3]
	return null
}

export function SeatGrid({
	seatCount = 10,
	seats,
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
	const [openSeatNumber, setOpenSeatNumber] = useState<number | null>(null)
	const seatNumbers = Array.from({ length: seatCount }, (_, i) => i + 1)
	const rowsConfig = getRowsForSeatCount(seatCount)

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
					ROW_GAP,
					COL_GAP,
					SEAT_ITEM_SIZE,
				},
				timestamp: Date.now(),
				hypothesisId: 'H2_H3',
			}),
		}).catch(() => {})
	}, [seatCount, _screenId])
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
		itemSize: SEAT_ITEM_SIZE,
	}

	if (rowsConfig) {
		return (
			<View style={styles.container}>
				{rowsConfig.map((rowSize, rowIndex) => {
					const start = rowsConfig
						.slice(0, rowIndex)
						.reduce((a, b) => a + b, 0)
					return (
						<View key={rowIndex} style={styles.row}>
							{seatNumbers.slice(start, start + rowSize).map(n => (
								<SeatItem
									key={n}
									seatNumber={n}
									seat={seats?.[n]}
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
		<View style={styles.container}>
			<View style={styles.row}>
				{seatNumbers.map(n => (
					<SeatItem
						key={n}
						seatNumber={n}
						seat={seats?.[n]}
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
		alignItems: 'center',
		justifyContent: 'center',
		gap: ROW_GAP,
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: COL_GAP,
	},
})
