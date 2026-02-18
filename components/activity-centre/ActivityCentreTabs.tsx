import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ACTIVITY_CENTRE_TABS } from './constants'
import type { ActivityCentreTabId } from './types'

interface ActivityCentreTabsProps {
	activeTab: ActivityCentreTabId
	onTabChange: (tab: ActivityCentreTabId) => void
}

export function ActivityCentreTabs({
	activeTab,
	onTabChange,
}: ActivityCentreTabsProps) {
	return (
		<View style={styles.container}>
			{ACTIVITY_CENTRE_TABS.map(tab => {
				const isActive = activeTab === tab.id
				return (
					<Pressable
						key={tab.id}
						style={styles.tab}
						onPress={() => onTabChange(tab.id)}
					>
						<Text
							style={[
								styles.tabText,
								isActive ? styles.tabTextActive : styles.tabTextInactive,
							]}
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
	container: {
		flexDirection: 'row',
		paddingHorizontal: spacing.screen.horizontal,
		marginBottom: spacing.sm,
		justifyContent: 'center',
		gap: spacing.xl,
	},
	tab: {
		position: 'relative',
		paddingBottom: spacing.sm,
	},
	tabText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
	},
	tabTextActive: {
		color: '#000',
		fontWeight: fontWeights.bold,
	},
	tabTextInactive: {
		color: '#9E9E9E',
	},
	underline: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 2,
		backgroundColor: '#000',
		borderRadius: 1,
	},
})
