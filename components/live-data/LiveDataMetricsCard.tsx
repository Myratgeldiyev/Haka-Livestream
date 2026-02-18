import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LIVE_DATA } from './constants'
import { LiveDataActionButton } from './LiveDataActionButton'
import { LiveDataDatePicker } from './LiveDataDatePicker'
import { LiveDataPointsDisplay } from './LiveDataPointsDisplay'
import { MetricPair } from './MetricPair'
import { SingleMetric } from './SingleMetric'

export interface LiveDataMetrics {
	date: string
	wonPoints: string
	liveDuration: string
	liveEarnings: string
	partyDuration: string
	partyEarnings: string
	partyCrownDuration: string
	newFansCount: string
	newFansClubMembers: string
}

interface LiveDataMetricsCardProps {
	metrics?: LiveDataMetrics
	onDatePress?: () => void
	onGetMorePoints?: () => void
}

const DEFAULT_METRICS: LiveDataMetrics = {
	date: '2025-08-19',
	wonPoints: '0',
	liveDuration: '00:00:00',
	liveEarnings: '0',
	partyDuration: '00:00:00',
	partyEarnings: '0',
	partyCrownDuration: '00:00:00',
	newFansCount: '0',
	newFansClubMembers: '0',
}

export function LiveDataMetricsCard({
	metrics = DEFAULT_METRICS,
	onDatePress,
	onGetMorePoints,
}: LiveDataMetricsCardProps) {
	const m = metrics
	return (
		<View style={styles.card}>
			<LiveDataDatePicker date={m.date} onPress={onDatePress} />
			<LiveDataPointsDisplay points={m.wonPoints} />
			<MetricPair
				leftValue={m.liveDuration}
				leftLabel="Live duration"
				rightValue={m.liveEarnings}
				rightLabel="Live earnings"
			/>
			<View style={styles.gap} />
			<MetricPair
				leftValue={m.partyDuration}
				leftLabel="Party duration"
				rightValue={m.partyEarnings}
				rightLabel="Party earnings"
			/>
			<View style={styles.gap} />
			<SingleMetric value={m.partyCrownDuration} label="Party crown duration" />
			<View style={styles.gap} />
			<MetricPair
				leftValue={m.newFansCount}
				leftLabel="The number of new fans"
				rightValue={m.newFansClubMembers}
				rightLabel="New members of fans club"
			/>
			<LiveDataActionButton onPress={onGetMorePoints} />
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: LIVE_DATA.cardBg,
		borderRadius: LIVE_DATA.cardBorderRadius,
		padding: LIVE_DATA.cardPadding,
		marginHorizontal: LIVE_DATA.screenPadding,
		marginTop: 8,
		// subtle shadow
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 8,
		elevation: 3,
	},
	gap: {
		height: 20,
	},
})
