import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AdminAgentCardHeader } from './AdminAgentCardHeader'
import { AdminAgentDailyGrid } from './AdminAgentDailyGrid'
import { AdminAgentMetrics } from './AdminAgentMetrics'
import { ADMIN_CENTER } from './constants'

export interface AdminAgentCardData {
	id: string
	name: string
	date: string
	time: string
	userId: string
	avatarUri?: string | null
	avatarSource?: import('react-native').ImageSourcePropType
	totalBasicIncome?: string
	totalValidHost?: number
	dailyValues?: (number | string)[]
}

interface AdminAgentCardProps {
	data: AdminAgentCardData
	onCopyId?: (userId: string) => void
	onChat?: (id: string) => void
	onDetails?: (id: string) => void
}

export function AdminAgentCard({
	data,
	onCopyId,
	onChat,
	onDetails,
}: AdminAgentCardProps) {
	return (
		<View style={styles.card}>
			<AdminAgentCardHeader
				name={data.name}
				date={data.date}
				time={data.time}
				userId={data.userId}
				avatarUri={data.avatarUri}
				avatarSource={data.avatarSource}
				onCopyId={() => onCopyId?.(data.userId)}
				onChat={() => onChat?.(data.id)}
				onDetails={() => onDetails?.(data.id)}
			/>
			<AdminAgentMetrics
				totalBasicIncome={data.totalBasicIncome}
				totalValidHost={data.totalValidHost ?? 0}
			/>
			<AdminAgentDailyGrid values={data.dailyValues} />
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: ADMIN_CENTER.cardBg,
		borderRadius: ADMIN_CENTER.cardBorderRadius,
		padding: ADMIN_CENTER.screenPadding,
		marginHorizontal: ADMIN_CENTER.screenPadding,
		marginBottom: 12,
	},
})
