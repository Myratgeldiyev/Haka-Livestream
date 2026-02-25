import { QuickActionItem } from '@/components/profile/QuickActionItem'
import { router } from 'expo-router'
import React from 'react'
import { DimensionValue, Image, StyleSheet, View } from 'react-native'

import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'

export function QuickActions() {
	const actions = [
		{
			id: 'reward',
			label: 'Reward',
			icon: <Image source={require('../../assets/images/reward.png')} />,
			gradient: profileColors.gradient.reward,
			bgColor: '#dac0eaff',
			left: '100%',
		},
		{
			id: 'game',
			label: 'Game',
			icon: <Image source={require('../../assets/images/Game.png')} />,
			gradient: profileColors.gradient.game,
			bgColor: '#ffdfebff',
		},
		{
			id: 'rank',
			label: 'Rank',
			icon: <Image source={require('../../assets/images/Rank.png')} />,
			gradient: profileColors.gradient.rank,
			bgColor: '#ffb46dff',
		},
		{
			id: 'store',
			label: 'Store',
			icon: <Image source={require('../../assets/images/Store.png')} />,
			gradient: profileColors.gradient.store,
			bgColor: '#0F93F5',
			onPress: () => router.push('/(main)/store'),
		},
	]

	return (
		<View style={styles.container}>
			{actions.map((action) => (
				<View key={action.id} style={styles.itemWrapper}>
					<QuickActionItem
						bgColor={action.bgColor}
						label={action.label}
						icon={action.icon}
						left={action.left as DimensionValue}
						onPress={action.onPress}
					/>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.section.horizontal,
		paddingVertical: spacing.lg,
		backgroundColor: profileColors.background.secondary,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.sm,
		marginTop: spacing.xxxl,
		justifyContent: 'space-between',
	},
	itemWrapper: {
		width: '23%',
		minWidth: 70,
	},
})
