import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'
import { DailySummaryCards } from './DailySummaryCards'
import { GradeButtonRow, GradeId } from './GradeButtonRow'
import { HostDonutChart } from './HostDonutChart'

const DESCRIPTION =
	'Refresh data every 30 minutes, minutes, with statistics based on number of people receiving hourly tasks.'

export function HourlyGradeDistributionCard() {
	const [selectedGrade, setSelectedGrade] = useState<GradeId>('B')
	const [selectedDailyId, setSelectedDailyId] = useState('today')

	const handleSelectGrade = useCallback((grade: GradeId) => {
		setSelectedGrade(grade)
	}, [])

	const handleSelectDaily = useCallback((id: string) => {
		setSelectedDailyId(id)
	}, [])

	return (
		<View style={styles.card}>
			<Text style={styles.title}>Hourly grade distribution</Text>
			<Text style={styles.description}>{DESCRIPTION}</Text>
			<Text style={styles.subtitle}>Hourly grade</Text>
			<GradeButtonRow
				selectedGrade={selectedGrade}
				onSelectGrade={handleSelectGrade}
			/>
			<View style={styles.chartWrap}>
				<HostDonutChart centerValue={4} centerLabel='Number' />
			</View>
			<DailySummaryCards
				selectedId={selectedDailyId}
				onSelect={handleSelectDaily}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		padding: AGENT_DASHBOARD.cardPadding,
		gap: 16,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.sectionTitleColor,
	},
	description: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.dataRefreshText,
	},
	subtitle: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.sectionTitleColor,
	},
	chartWrap: {
		alignItems: 'center',
		paddingVertical: 8,
	},
})
