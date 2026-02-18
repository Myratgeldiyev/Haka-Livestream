import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { SubTabsProps, SubTabType } from '../../types/game-ranking'
import { COLORS, FONT_SIZES, SPACING } from './styles'

const SUB_TABS: { key: SubTabType; label: string }[] = [
	{ key: 'daily', label: 'Daily' },
	{ key: 'weekly', label: 'Weekly' },
]

export function SubTabs({ activeSubTab, onSubTabChange }: SubTabsProps) {
	return (
		<View style={styles.container}>
			{SUB_TABS.map(tab => (
				<Pressable
					key={tab.key}
					style={[styles.tab, activeSubTab === tab.key && styles.tabActive]}
					onPress={() => onSubTabChange(tab.key)}
				>
					<Text
						style={[
							styles.tabText,
							activeSubTab === tab.key && styles.tabTextActive,
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
		backgroundColor: COLORS.subTabInactive,
		borderRadius: 20,

		alignSelf: 'flex-start',
		borderWidth: 1,
		borderColor: '#7C798A',
	},
	tab: {
		paddingHorizontal: SPACING.lg,
		paddingVertical: 4,
		borderRadius: 16,
	},
	tabActive: {
		backgroundColor: COLORS.subTabActive,
	},
	tabText: {
		fontSize: FONT_SIZES.sm,
		fontWeight: '500',
		color: COLORS.textSecondary,
	},
	tabTextActive: {
		color: COLORS.textPrimary,
		fontWeight: '600',
	},
})
