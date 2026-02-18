import DateIcon from '@/components/ui/icons/withdrawal/DateIcon'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface IncomeSectionHeaderProps {
	dateLabel?: string
	onDatePress?: () => void
}

export function IncomeSectionHeader({
	dateLabel = 'Last 30 days',
	onDatePress,
}: IncomeSectionHeaderProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Income</Text>
			<Pressable style={styles.dateRow} onPress={onDatePress} hitSlop={8}>
				<DateIcon />
				<Text style={styles.dateText}>{dateLabel}</Text>
				<Text style={styles.chevron}>▼</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	title: {
		fontSize: 14,
		color: '#A689E1',
		fontWeight: '500',
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
})
