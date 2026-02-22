import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CHARM_LEVEL_LIST_DATA, LEVEL_LAYOUT } from './level.constants'
import { LevelExplanation } from './LevelExplanation'
import { LevelList } from './LevelList'
import { UserProfileCard } from './UserProfileCard'

export function CharmLevelTabContent() {
	return (
		<View style={styles.container}>
			<UserProfileCard
				userName='MD Samir'
				currentLevel='Level 5'
				upgradeText='Level 1 upgrade requires xxx coins'
				gemImageSource={require('@/assets/charm-levels/pink-diamond.png')}
			/>
			<LevelExplanation
				title='Level Label'
				description='The charm level is calculated based on the numbers of coins you received'
			/>
			<LevelList items={CHARM_LEVEL_LIST_DATA} useCharmSvg />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: LEVEL_LAYOUT.horizontalPadding,
	},
})
