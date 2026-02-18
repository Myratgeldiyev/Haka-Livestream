import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { InviteMicUser } from './types'

interface InviteMicListItemProps {
	user: InviteMicUser
	onInvite: (userId: string) => void
}

export function InviteMicListItem({ user, onInvite }: InviteMicListItemProps) {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: user.profile_picture || '' }}
				style={styles.avatar}
			/>
			<View style={styles.info}>
				<Text style={styles.username} numberOfLines={1}>
					{user.username}
				</Text>
				<Text style={styles.userId}>ID: {user.user_id}</Text>
			</View>
			<Pressable
				style={styles.inviteButton}
				onPress={() => onInvite(user.user_id)}
			>
				<Text style={styles.inviteText}>Invite</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		gap: spacing.md,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#333',
	},
	info: {
		flex: 1,
		gap: 2,
	},
	username: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
	userId: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.regular,
		color: 'rgba(255, 255, 255, 0.5)',
	},
	inviteButton: {
		backgroundColor: '#6C5CE7',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: 16,
	},
	inviteText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
})
