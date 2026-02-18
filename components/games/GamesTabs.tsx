import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { GameTabType } from '@/types/games'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
	activeTab: GameTabType
	onChange: (tab: GameTabType) => void
}

const TABS: GameTabType[] = ['game', 'moment', 'video']

export function GameTabs({ activeTab, onChange }: Props) {
	return (
		<View style={styles.container}>
			{TABS.map(tab => (
				<Pressable key={tab} onPress={() => onChange(tab)}>
					<Text style={[styles.tabText, activeTab === tab && styles.active]}>
						{tab.charAt(0).toUpperCase() + tab.slice(1)}
					</Text>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: spacing.xl,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},
	tabText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		color: '#999',
		fontWeight: fontWeights.medium,
	},
	active: {
		color: '#000',
		fontWeight: fontWeights.bold,
	},
})
