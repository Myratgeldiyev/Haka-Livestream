import DateIcon from '@/components/ui/icons/withdrawal/DateIcon'
import React, { useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { AnchorLayout } from './DateRangeOverlay'
import { ExchangeOptionCard } from './ExchangeOptionCard'

const TITLE_COLOR = '#7C4DFF'

export type ExchangeOption = {
	id: string
	coinAmount: string
	pointsAmount: string
}

const DEFAULT_OPTIONS: ExchangeOption[] = [
	{ id: '1', coinAmount: '90,000', pointsAmount: '100,000' },
	{ id: '2', coinAmount: '450,000', pointsAmount: '500,000' },
]

interface ExchangeQuantitySectionProps {
	selectedId: string | null
	onSelect: (id: string) => void
	options?: ExchangeOption[]
	dateLabel?: string
	onDatePress?: (layout: AnchorLayout) => void
}

export function ExchangeQuantitySection({
	selectedId,
	onSelect,
	options = DEFAULT_OPTIONS,
	dateLabel = 'Last 30 days',
	onDatePress,
}: ExchangeQuantitySectionProps) {
	const dateButtonRef = useRef<View>(null)

	const handleDatePress = () => {
		dateButtonRef.current?.measureInWindow((x, y, width, height) => {
			onDatePress?.({ x, y, width, height })
		})
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Exchange quantity</Text>
				<View ref={dateButtonRef} collapsable={false}>
					<Pressable
						style={styles.dateRow}
						onPress={handleDatePress}
						hitSlop={8}
					>
						<DateIcon />
						<Text style={styles.dateText}>{dateLabel}</Text>
						<Text style={styles.chevron}>▼</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.cardsRow}>
				{options.map(opt => (
					<ExchangeOptionCard
						key={opt.id}
						coinAmount={opt.coinAmount}
						pointsAmount={opt.pointsAmount}
						selected={selectedId === opt.id}
						onPress={() => onSelect(opt.id)}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginBottom: 20,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: '600',
		color: TITLE_COLOR,
	},
	dateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	calendarIcon: {
		fontSize: 14,
	},
	dateText: {
		fontSize: 13,
		color: '#374151',
	},
	chevron: {
		fontSize: 10,
		color: '#374151',
	},
	cardsRow: {
		flexDirection: 'row',
		gap: 12,
	},
})
