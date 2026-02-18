import React from 'react'
import { View } from 'react-native'
import { LiveDataWeeklySummaryCard } from '../weekly/LiveDataWeeklySummaryCard'
import { LiveDataMonthlyGraphCard } from './LiveDataMonthlyGraphCard'
import { LiveDataMonthlyThreeMonthCard } from './LiveDataMonthlyThreeMonthCard'

interface LiveDataMonthlyContentProps {
	onMonthPress?: () => void
}

export function LiveDataMonthlyContent({
	onMonthPress,
}: LiveDataMonthlyContentProps) {
	return (
		<View>
			<LiveDataMonthlyGraphCard onMonthPress={onMonthPress} />
			<LiveDataWeeklySummaryCard />
			<LiveDataMonthlyThreeMonthCard />
		</View>
	)
}
