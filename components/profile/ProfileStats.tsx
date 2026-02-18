import { StatItem } from '@/components/ui/StatItem'
import { spacing } from '@/constants/spacing'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface ProfileStatsProps {
	friends: number
	follow: number
	followers: number
	visitors: number
}

export function ProfileStats({
	friends,
	follow,
	followers,
	visitors,
}: ProfileStatsProps) {
	const handleFriendsPress = () => {
		router.push('/(main)/social/friends')
	}

	const handleFollowPress = () => {
		router.push('/(main)/social/following')
	}

	const handleFollowersPress = () => {
		router.push('/(main)/social/followers')
	}

	const handleVisitorsPress = () => {
		router.push('/(main)/social/visitors')
	}

	return (
		<View style={styles.container}>
			<StatItem label='Friends' value={friends} onPress={handleFriendsPress} />

			<StatItem label='Follow' value={follow} onPress={handleFollowPress} />

			<StatItem
				label='Followers'
				value={followers}
				onPress={handleFollowersPress}
			/>

			<StatItem
				label='Visitors'
				value={visitors}
				onPress={handleVisitorsPress}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.section.horizontal,

		flexDirection: 'row',
		marginLeft: '15%',
	},
})
