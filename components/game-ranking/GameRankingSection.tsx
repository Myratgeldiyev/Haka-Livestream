import { RoomUsers } from '@/api/live-chat/room.types'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import type { SubTabType } from '../../types/game-ranking'
import MiniGameIcon from '../ui/icons/MiniGameIcon'
import { COLORS, FONT_SIZES, SPACING } from './styles'
import { SubTabs } from './SubTabs'
import { UserListItem } from './UserListItem'

interface P {
	data?: RoomUsers[]
}

export function GameRankingSection({ data }: P) {
	const [activeSubTab, setActiveSubTab] = useState<SubTabType>('daily')

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<SubTabs activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
				<View style={styles.headerRight}>
					<MiniGameIcon />
					<Text style={styles.headerValue}>0</Text>
				</View>
			</View>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
				{data?.map(user => (
					<UserListItem key={user.user.user_id} user={user} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: SPACING.xl,
		paddingVertical: SPACING.md,
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.xs,
	},
	gamepadIcon: {
		width: 24,
		height: 24,
		borderRadius: 4,
		backgroundColor: COLORS.gamepadPurple,
	},
	headerValue: {
		fontSize: FONT_SIZES.md,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	scrollView: {
		flex: 1,
	},
})
