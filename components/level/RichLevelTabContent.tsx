import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LEVEL_LAYOUT, RICH_LEVEL_LIST_DATA } from './level.constants'
import { LevelExplanation } from './LevelExplanation'
import { LevelList } from './LevelList'
import { UserProfileCard } from './UserProfileCard'

export function RichLevelTabContent() {
	return (
		<View style={styles.container}>
			<UserProfileCard
				userName="MD Samir"
				currentLevel="Level 35"
				upgradeText="Level 1 upgrade requires xxx coins"
			/>
			<LevelExplanation
				title="Level Label"
				description="The rich level is counted by the coins you had recharged"
			/>
			<LevelList items={RICH_LEVEL_LIST_DATA} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: LEVEL_LAYOUT.horizontalPadding,
	},
})
