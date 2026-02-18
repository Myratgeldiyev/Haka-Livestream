import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'
import { HourlyGradeDistributionCard } from './HourlyGradeDistributionCard'
import { TotalNumberOfHostCard } from './TotalNumberOfHostCard'

export function HostAnalysisContent() {
	const handleManage = useCallback(() => {}, [])

	return (
		<View style={styles.container}>
			<TotalNumberOfHostCard onManage={handleManage} />
			<HourlyGradeDistributionCard />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: AGENT_DASHBOARD.sectionGap,
	},
})
