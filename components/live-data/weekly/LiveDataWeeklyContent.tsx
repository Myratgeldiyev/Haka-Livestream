import React from 'react'
import { View } from 'react-native'
import { LiveDataWeeklyGraphCard } from './LiveDataWeeklyGraphCard'
import { LiveDataWeeklyStatsCard } from './LiveDataWeeklyStatsCard'
import { LiveDataWeeklySummaryCard } from './LiveDataWeeklySummaryCard'

interface LiveDataWeeklyContentProps {
	onWeekPress?: () => void
}

export function LiveDataWeeklyContent({ onWeekPress }: LiveDataWeeklyContentProps) {
	return (
		<View>
			<LiveDataWeeklyGraphCard onWeekPress={onWeekPress} />
			<LiveDataWeeklySummaryCard />
			<LiveDataWeeklyStatsCard />
		</View>
	)
}
