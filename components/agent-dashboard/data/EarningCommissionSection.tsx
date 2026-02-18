import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'
import { DataMetricGrid, DataMetricItem } from './DataMetricGrid'

const PERIOD_OPTIONS = [
	{ id: '7', label: 'Last 7 days' },
	{ id: '30', label: 'Last 30 days' },
	{ id: '90', label: 'Last 90 days' },
]

const DEFAULT_METRICS: DataMetricItem[] = [
	{ label: 'Total Earnings', value: '23,333,334' },
	{ label: 'Host Earnings', value: '23,333,334' },
	{ label: 'Invite agent earnings', value: '23,333,334' },
	{ label: 'Total commission', value: '23,333,334' },
	{ label: 'Host commission', value: '23,333,334' },
	{ label: 'Invite agent commission', value: '23,333,334' },
]

export function EarningCommissionSection() {
	const [selectedPeriodId, setSelectedPeriodId] = useState('30')
	const selectedLabel =
		PERIOD_OPTIONS.find(p => p.id === selectedPeriodId)?.label ?? 'Last 30 days'

	return (
		<View style={styles.section}>
			<View style={styles.titleRow}>
				<View style={styles.titleBlock}>
					<Text style={styles.title}>Earning & Commission</Text>
					<View style={styles.questionIcon}>
						<Text style={styles.questionText}>?</Text>
					</View>
				</View>
			</View>
			<View style={styles.metaRow}>
				<Text style={styles.refreshText}>Refresh data every 30 minutes</Text>
				<Pressable
					style={styles.periodSelector}
					onPress={() => setSelectedPeriodId(prev => (prev === '30' ? '7' : prev === '7' ? '90' : '30'))}
					accessibilityLabel={`Time period: ${selectedLabel}`}
					accessibilityRole="button"
				>
					<Text style={styles.periodText} numberOfLines={1}>
						{selectedLabel}
					</Text>
					<Ionicons name="chevron-down" size={18} color={AGENT_DASHBOARD.valueColor} />
				</Pressable>
			</View>
			<View style={styles.gridWrap}>
				<DataMetricGrid items={DEFAULT_METRICS} columns={3} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		padding: AGENT_DASHBOARD.cardPadding,
		gap: 12,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	titleBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.sectionTitleColor,
	},
	questionIcon: {
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: AGENT_DASHBOARD.dataRefreshText,
		alignItems: 'center',
		justifyContent: 'center',
	},
	questionText: {
		fontSize: 12,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	refreshText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.dataRefreshText,
		flex: 1,
	},
	periodSelector: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	periodText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.valueColor,
		maxWidth: 120,
	},
	gridWrap: {
		marginTop: 4,
	},
})
