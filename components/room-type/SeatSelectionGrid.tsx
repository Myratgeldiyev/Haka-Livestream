import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SeatItem } from './SeatItem'

const SEATS_ROW_1 = ['No. 1', 'No. 2']
const SEATS_ROW_2 = ['No. 3', 'No. 4', 'No. 5', 'No. 6']

interface SeatSelectionGridProps {
	selectedSeat?: string
	onSeatSelect?: (seat: string) => void
}

export function SeatSelectionGrid({
	selectedSeat,
	onSeatSelect,
}: SeatSelectionGridProps) {
	return (
		<View style={styles.container}>
			<View style={styles.row1}>
				{SEATS_ROW_1.map(seat => (
					<SeatItem
						key={seat}
						label={seat}
						isSelected={selectedSeat === seat}
						onPress={() => onSeatSelect?.(seat)}
					/>
				))}
			</View>
			<View style={styles.row2}>
				{SEATS_ROW_2.map(seat => (
					<SeatItem
						key={seat}
						label={seat}
						isSelected={selectedSeat === seat}
						onPress={() => onSeatSelect?.(seat)}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: '#707070ff',
		borderRadius: 16,
		paddingVertical: 20,
		paddingHorizontal: 16,
		backgroundColor: '#242036ff',
		gap: 20,
	},
	row1: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 40,
	},
	row2: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
