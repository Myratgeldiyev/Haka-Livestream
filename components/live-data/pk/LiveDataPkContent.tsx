import React from 'react'
import { View } from 'react-native'
import { LiveDataPkHistoricalSection } from './LiveDataPkHistoricalSection'
import { LiveDataPkMetricsRow } from './LiveDataPkMetricsRow'

export function LiveDataPkContent() {
	return (
		<View>
			<LiveDataPkMetricsRow />
			<LiveDataPkHistoricalSection />
		</View>
	)
}
