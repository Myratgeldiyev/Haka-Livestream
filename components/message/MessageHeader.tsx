import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AnimatedTabMessage } from '../ui/AnimatedTabMessage'
import NotificationIcon from '../ui/icons/message/notificationIcon'

export type MessageTabType = 'inbox' | 'friends'

interface Props {
	activeTab: MessageTabType
	onTabChange: (tab: MessageTabType) => void
}

export function MessageHeader({ activeTab, onTabChange }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<AnimatedTabMessage
					label='Inbox'
					active={activeTab === 'inbox'}
					onPress={() => onTabChange('inbox')}
				/>

				<AnimatedTabMessage
					label='Friends'
					active={activeTab === 'friends'}
					onPress={() => onTabChange('friends')}
				/>
			</View>

			<View style={styles.right}>
				<NotificationIcon />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		marginTop: spacing.md,
	},
	left: {
		flexDirection: 'row',
		gap: spacing.lg,
	},
	right: {},
})
