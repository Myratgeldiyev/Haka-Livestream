import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useWindowDimensions } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'
import { HostAnalysisContent } from './host-analysis'
import { IncomeAnalysisContent } from './income-analysis'
import { DataSubNav, DataSubTabId } from './DataSubNav'
import { DataLineChart } from './DataLineChart'
import { EarningCommissionSection } from './EarningCommissionSection'

export function DataContent() {
	const [activeSubTab, setActiveSubTab] = useState<DataSubTabId>('overview')
	const { width } = useWindowDimensions()
	const chartWidth = width - AGENT_DASHBOARD.screenPadding * 2 - 52

	const handleSubTabChange = useCallback((id: DataSubTabId) => {
		setActiveSubTab(id)
	}, [])

	return (
		<View style={styles.container}>
			<DataSubNav
				activeSubTab={activeSubTab}
				onSubTabChange={handleSubTabChange}
			/>
			{activeSubTab === 'overview' && (
				<View style={styles.sections}>
					<EarningCommissionSection />
					<View style={styles.chartCard}>
						<DataLineChart width={chartWidth} height={220} />
					</View>
				</View>
			)}
			{activeSubTab === 'host_analysis' && <HostAnalysisContent />}
			{activeSubTab === 'income_analysis' && <IncomeAnalysisContent />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingBottom: 24,
		gap: AGENT_DASHBOARD.sectionGap,
	},
	sections: {
		gap: AGENT_DASHBOARD.sectionGap,
	},
	chartCard: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		padding: AGENT_DASHBOARD.cardPadding,
		alignItems: 'center',
	},
})
