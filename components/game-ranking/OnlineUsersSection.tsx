import { RoomUsers } from '@/api/live-chat/room.types'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLORS, FONT_SIZES, SPACING } from './styles'
import { UserListItem } from './UserListItem'

interface P {
	data?: RoomUsers[]
}

export function OnlineUsersSection({ data }: P) {
	return (
		<View style={styles.container}>
			<Text style={styles.onlineCountText}>
				Online User: {data?.length ?? 0}
			</Text>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{data?.map((user, index) => (
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
