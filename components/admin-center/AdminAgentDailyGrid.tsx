import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AdminMicIcon from '../ui/icons/admin-centre/AdminMicIcon'
import { ADMIN_CENTER } from './constants'

const DAYS = [1, 2, 3, 4, 5, 6, 7]

interface AdminAgentDailyGridProps {
	values?: (number | string)[]
}

export function AdminAgentDailyGrid({
	values = [0, 0, 0, 0, 0, 0, 0],
}: AdminAgentDailyGridProps) {
	const items = DAYS.map((day, i) => ({
		day,
		value: values[i] ?? 0,
	}))

	return (
		<View style={styles.section}>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Host valid days data</Text>
				<View style={styles.questionIcon}>
					<Text style={styles.questionText}>?</Text>
				</View>
			</View>
			<View style={styles.grid}>
				{items.map(({ day, value }) => (
					<View key={day} style={styles.cell}>
						<Text style={styles.dayLabel}>{day} Day</Text>
						<View style={styles.valueRow}>
							<AdminMicIcon />
							<Text style={styles.cellValue}>{value}</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginTop: 12,
		gap: 8,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.valueColor,
	},
	questionIcon: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: ADMIN_CENTER.questionIconBg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	questionText: {
		fontSize: 10,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	cell: {
		flex: 1,
		minWidth: '12%',
		gap: 4,
	},
	dayLabel: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.medium,
		color: ADMIN_CENTER.valueColor,
	},
	valueRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	cellValue: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.valueColor,
	},
})
