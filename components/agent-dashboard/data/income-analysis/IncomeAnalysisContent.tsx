import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'
import { DataLineChart } from '../DataLineChart'
import { IncomeCompositionSection } from './IncomeCompositionSection'
import { IncomeOverviewSection } from './IncomeOverviewSection'

export function IncomeAnalysisContent() {
	const { width } = useWindowDimensions()
	const chartWidth = width - AGENT_DASHBOARD.screenPadding * 2 - 52

	return (
		<View style={styles.container}>
			<IncomeOverviewSection />
			<View style={styles.chartCard}>
				<DataLineChart width={chartWidth} height={220} />
			</View>
			<IncomeCompositionSection />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
	},
	chartCard: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		padding: AGENT_DASHBOARD.cardPadding,
		alignItems: 'center',
	},
})
