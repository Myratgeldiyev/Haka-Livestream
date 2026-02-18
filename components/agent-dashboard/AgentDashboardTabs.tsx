import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from './constants'

export type AgentDashboardTabId = 'make_money' | 'manage' | 'data'

interface AgentDashboardTabsProps {
	activeTab: AgentDashboardTabId
	onTabChange: (tab: AgentDashboardTabId) => void
}

const TABS: { id: AgentDashboardTabId; label: string }[] = [
	{ id: 'make_money', label: 'Make Money' },
	{ id: 'manage', label: 'Manage' },
	{ id: 'data', label: 'Data' },
]

export function AgentDashboardTabs({
	activeTab,
	onTabChange,
}: AgentDashboardTabsProps) {
	return (
		<View style={styles.container}>
			{TABS.map(tab => (
				<Pressable
					key={tab.id}
					style={[styles.tab, activeTab === tab.id && styles.tabSelected]}
					onPress={() => onTabChange(tab.id)}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === tab.id && styles.tabTextSelected,
						]}
					>
						{tab.label}
					</Text>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: '#E9E9E9',
		borderRadius: 999,
		paddingHorizontal: 3,
		paddingVertical: 3,
	},
	tab: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 999,
	},
	tabSelected: {
		backgroundColor: AGENT_DASHBOARD.tabSelectedBg,
	},
	tabText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.tabUnselectedText,
	},
	tabTextSelected: {
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.tabSelectedText,
	},
})
