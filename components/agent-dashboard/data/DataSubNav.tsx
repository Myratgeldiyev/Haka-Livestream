import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

export type DataSubTabId = 'overview' | 'host_analysis' | 'income_analysis'

const SUB_TABS: { id: DataSubTabId; label: string }[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'host_analysis', label: 'Host analysis' },
	{ id: 'income_analysis', label: 'Income analysis' },
]

interface DataSubNavProps {
	activeSubTab: DataSubTabId
	onSubTabChange: (id: DataSubTabId) => void
}

export function DataSubNav({
	activeSubTab,
	onSubTabChange,
}: DataSubNavProps) {
	return (
		<View style={styles.row}>
			{SUB_TABS.map(tab => {
				const isActive = activeSubTab === tab.id
				return (
					<Pressable
						key={tab.id}
						onPress={() => onSubTabChange(tab.id)}
						style={styles.tab}
						accessibilityRole="tab"
						accessibilityState={{ selected: isActive }}
					>
						<Text
							style={[
								styles.label,
								isActive && styles.labelActive,
							]}
							numberOfLines={1}
						>
							{tab.label}
						</Text>
						{isActive && <View style={styles.underline} />}
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	tab: {
		paddingVertical: 10,
		position: 'relative',
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.labelColor,
	},
	labelActive: {
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.sectionTitleColor,
	},
	underline: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 2,
		backgroundColor: AGENT_DASHBOARD.dataSubNavUnderline,
		borderRadius: 1,
	},
})
