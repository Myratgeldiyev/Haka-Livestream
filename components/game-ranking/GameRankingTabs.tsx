import React from 'react'
import { StyleSheet, View } from 'react-native'
import type {
	GameRankingTabsProps,
	MainTabType,
} from '../../types/game-ranking'
import { GameRankingTabItem } from './GameRankingTabItem'
import { SPACING } from './styles'

const TABS: { key: MainTabType; label: string }[] = [
	{ key: 'onlineUsers', label: 'Online Users' },
	{ key: 'contribution', label: 'Contribution' },
	{ key: 'gameRanking', label: 'Game Ranking' },
]

export function GameRankingTabs({
	activeTab,
	onTabChange,
}: GameRankingTabsProps) {
	return (
		<View style={styles.container}>
			{TABS.map(tab => (
				<GameRankingTabItem
					key={tab.key}
					label={tab.label}
					isActive={activeTab === tab.key}
					onPress={() => onTabChange(tab.key)}
				/>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: SPACING.lg,
		paddingTop: SPACING.md,
	},
})
