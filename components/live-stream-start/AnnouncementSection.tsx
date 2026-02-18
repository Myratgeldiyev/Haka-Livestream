import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import InviteIcon from '../ui/icons/live-stream-view/inviteIcon'

interface AnnouncementSectionProps {
	title?: string
	message?: string
	onInvitePress?: () => void
}

export function AnnouncementSection({
	title = 'Announcement',
	message = "Welcome everyone! Let's chat and have fun together!",
	onInvitePress,
}: AnnouncementSectionProps) {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.message}>{message}</Text>
			</View>
			<Pressable style={styles.inviteButton} onPress={onInvitePress}>
				<InviteIcon />
				<Text style={styles.inviteText}>Invite</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	textContainer: {
		flex: 1,
		marginRight: 12,
	},
	title: {
		fontSize: 13,
		fontWeight: '600',
		color: '#000',
		marginBottom: 4,
	},
	message: {
		fontSize: 12,
		color: '#000',
		lineHeight: 16,
	},
	inviteButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(71, 67, 67, 0.2)',
		borderRadius: 16,
		paddingHorizontal: 8,
		paddingVertical: 2,
		gap: 4,
	},
	inviteIconPlaceholder: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	inviteText: {
		fontSize: 12,
		fontWeight: '500',
		color: '#FFFFFF',
	},
})
