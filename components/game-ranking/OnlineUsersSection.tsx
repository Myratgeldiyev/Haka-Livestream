import { RoomUsers } from '@/api/live-chat/room.types'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONT_SIZES, SPACING } from './styles'
import { UserListItem } from './UserListItem'

interface P {
	data?: RoomUsers[]
}

export function OnlineUsersSection({ data }: P) {
	const onlineOnly = useMemo(
		() => data?.filter(u => u.user.is_online === true) ?? [],
		[data],
	)
	return (
		<View style={styles.container}>
			<Text style={styles.onlineCountText}>
				Online User: {onlineOnly.length}
			</Text>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{onlineOnly.map((user, index) => (
					<UserListItem
						key={user.user.user_id}
						user={user}
						showSpecialBadges={index === 0}
					/>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	onlineCountText: {
		fontSize: FONT_SIZES.sm,
		fontWeight: '500',
		color: COLORS.textSecondary,
		paddingHorizontal: SPACING.xl,
		paddingVertical: SPACING.md,
	},
	scrollView: {
		flex: 1,
	},
})
