import React, { useMemo, useState } from 'react'
import {
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const COLORS = {
	primary: '#3B82F6',
	weekend: '#17A1FA',
	text: '#111',
	muted: '#999',
}

type DateValue = {
	day: number
	month: number
	year: number
}

type Props = {
	value: DateValue | null
	onChange: (v: DateValue) => void
	isOpen: boolean
	onClose: () => void
}

export default function DatePicker({
	value,
	onChange,
	isOpen,
	onClose,
}: Props) {
	const today = new Date()

	const [mode, setMode] = useState<'day' | 'month' | 'year'>('day')
	const [selectedYear, setSelectedYear] = useState(
		value?.year ?? today.getFullYear(),
	)
	const [selectedMonth, setSelectedMonth] = useState(
		value?.month ?? today.getMonth(),
	)
	const [selectedDay, setSelectedDay] = useState<number | null>(
		value?.day ?? null,
	)

	/* YEARS */
	const years = useMemo(() => {
		const arr: number[] = []
		for (let y = today.getFullYear(); y >= 1900; y--) {
			arr.push(y)
		}
		return arr
	}, [])

	/* DAYS GRID */
	const days = useMemo(() => {
		const firstDay = new Date(selectedYear, selectedMonth, 1)
		const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
		const prevMonthLastDay = new Date(selectedYear, selectedMonth, 0).getDate()
		const startOffset = firstDay.getDay()

		const totalCells = 6 * 7
		return Array.from({ length: totalCells }, (_, i) => {
			let day: number
			let isCurrentMonth = true

			if (i < startOffset) {
				day = prevMonthLastDay - startOffset + i + 1
				isCurrentMonth = false
			} else if (i >= startOffset + lastDay.getDate()) {
				day = i - (startOffset + lastDay.getDate()) + 1
				isCurrentMonth = false
			} else {
				day = i - startOffset + 1
			}

			return { day, isCurrentMonth }
		})
	}, [selectedYear, selectedMonth])

	if (!isOpen) return null

	return (
		<Modal transparent animationType='fade'>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.overlay}>
					<TouchableWithoutFeedback>
						<View style={styles.container}>
							{/* HEADER */}
							<View style={styles.header}>
								<Pressable onPress={() => setMode('month')}>
									<Text style={styles.monthText}>{MONTHS[selectedMonth]}</Text>
								</Pressable>

								<Pressable onPress={() => setMode('year')}>
									<Text style={styles.yearText}>{selectedYear}</Text>
								</Pressable>
							</View>

							{/* YEAR MODE */}
							{mode === 'year' && (
								<FlatList
									data={years}
									numColumns={3}
									keyExtractor={y => y.toString()}
									contentContainerStyle={{ marginTop: 12 }}
									renderItem={({ item }) => (
										<Pressable
											style={styles.monthCell}
											onPress={() => {
												setSelectedYear(item)
												setSelectedDay(null)
												setMode('day')
											}}
										>
											<Text
												style={{
													color:
														item === selectedYear
															? COLORS.primary
															: COLORS.text,
													fontWeight: item === selectedYear ? '600' : '400',
												}}
											>
												{item}
											</Text>
										</Pressable>
									)}
								/>
							)}

							{/* MONTH MODE */}
							{mode === 'month' && (
								<View style={styles.monthGrid}>
									{MONTHS.map((m, index) => (
										<Pressable
											key={m}
											style={styles.monthCell}
											onPress={() => {
												setSelectedMonth(index)
												setSelectedDay(null)
												setMode('day')
											}}
										>
											<Text
												style={{
													color:
														index === selectedMonth
															? COLORS.primary
															: COLORS.text,
													fontWeight: index === selectedMonth ? '600' : '400',
												}}
											>
												{m}
											</Text>
										</Pressable>
									))}
								</View>
							)}

							{/* DAY MODE */}
							{mode === 'day' && (
								<>
									<View style={styles.weekRow}>
										{WEEK_DAYS.map((d, index) => (
											<Text
												key={d}
												style={{
													...styles.weekDay,
													color:
														index === 0 || index === 6
															? COLORS.weekend
															: COLORS.muted,
												}}
											>
												{d}
											</Text>
										))}
									</View>

									<FlatList
										data={days}
										numColumns={7}
										keyExtractor={(_, i) => i.toString()}
										renderItem={({ item, index }) => {
											const isSelected =
												item.isCurrentMonth && item.day === selectedDay
											const isWeekend = index % 7 === 0 || index % 7 === 6

											return (
												<Pressable
													style={[
														styles.dayCell,
														isSelected && styles.selectedDay,
													]}
													onPress={() => {
														if (!item.isCurrentMonth) return

														setSelectedDay(item.day)
														onChange({
															day: item.day,
															month: selectedMonth,
															year: selectedYear,
														})
														onClose()
													}}
												>
													<Text
														style={{
															color: isSelected
																? '#fff'
																: isWeekend && item.isCurrentMonth
																	? '#17A1FA'
																	: isWeekend && !item.isCurrentMonth
																		? '#1270B0'
																		: !item.isCurrentMonth
																			? COLORS.muted
																			: COLORS.text,
															fontWeight: isSelected ? '600' : '400',
														}}
													>
														{item.day}
													</Text>
												</Pressable>
											)
										}}
									/>
								</>
							)}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		position: 'absolute',
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 12,
		minWidth: 300,
		maxHeight: '45%',
		bottom: 0,
	},

	header: {
		alignItems: 'center',
		marginBottom: 8,
	},

	monthText: {
		fontSize: 18,
		fontWeight: '600',
	},

	yearText: {
		fontSize: 12,
		opacity: 0.7,
		marginTop: 2,
	},

	weekRow: {
		flexDirection: 'row',
		marginBottom: 6,
	},

	weekDay: {
		flex: 1,
		textAlign: 'center',
		fontSize: 12,
		color: COLORS.muted,
	},

	dayCell: {
		flexBasis: `${100 / 7}%`,
		height: 48,
		alignItems: 'center',
		justifyContent: 'center',
	},

	selectedDay: {
		backgroundColor: COLORS.primary,
		borderRadius: 6,
	},

	monthGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 12,
	},

	monthCell: {
		width: '33.33%',
		paddingVertical: 12,
		alignItems: 'center',
	},
})
