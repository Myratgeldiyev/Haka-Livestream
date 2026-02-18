import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export type RankTabKey = 'State' | 'Agent' | 'Game' | 'Activity'

const TABS = [
	{ key: 'State', route: '/rank/state' },
	{ key: 'Agent', route: '/rank/agent' },
	{ key: 'Game', route: '/rank/game' },
	{ key: 'Activity', route: '/rank/activity' },
] as const

export const RankTabs: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	return (
		<View style={styles.container}>
			{TABS.map(tab => {
				const isActive = pathname.startsWith(tab.route)

				return (
					<Pressable
						key={tab.key}
						onPress={() => router.replace(tab.route)}
						style={[styles.tab, isActive && styles.activeTab]}
					>
						<Text style={[styles.tabText, isActive && styles.activeTabText]}>
							{tab.key}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'rgba(0,0,0,0.45)',
		borderRadius: 999,
		padding: spacing.xs,
	},

	tab: {
		paddingHorizontal: spacing.md,
		height: spacing.icon.large,
		borderRadius: 999,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabText: {
		color: '#FFF',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
	},

	activeTab: {
		backgroundColor: '#FFF',
	},

	activeTabText: {
		color: '#D1723A',
	},
})
