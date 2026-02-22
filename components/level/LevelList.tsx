import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { LevelListItem } from './LevelListItem'
import type { LevelListProps } from './level.types'

export function LevelList({ items, useCharmSvg }: LevelListProps) {
	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.content}
			showsVerticalScrollIndicator={false}
		>
			{items.map((item, index) => (
				<LevelListItem
					key={`${item.levelLabel}-${index}`}
					levelLabel={item.levelLabel}
					coinRange={item.coinRange}
					badgeNumber={item.badgeNumber}
					badgeVariant={item.badgeVariant}
					badgeIcon={item.badgeIcon}
					useCharmSvg={useCharmSvg}
				/>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	content: {
		paddingBottom: 40,
	},
})
