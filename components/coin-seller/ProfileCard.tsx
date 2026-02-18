import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface ProfileCardProps {
	avatarUri?: string
	username: string
	userId: string
}

export function ProfileCard({ avatarUri, username, userId }: ProfileCardProps) {
	const handleCopyId = async () => {
		await Clipboard.setStringAsync(userId)
	}

	const getInitials = (name: string) => {
		return name.charAt(0).toUpperCase()
	}

	return (
		<View style={styles.container}>
			{avatarUri ? (
				<Image source={{ uri: avatarUri }} style={styles.avatar} />
			) : (
				<View style={[styles.avatar, styles.avatarPlaceholder]}>
					<Text style={styles.avatarInitial}>{getInitials(username)}</Text>
				</View>
			)}
			<View style={styles.info}>
				<Text style={styles.username}>{username}</Text>
				<View style={styles.idRow}>
					<Text style={styles.idLabel}>ID: </Text>
					<Text style={styles.idValue}>{userId}</Text>
					<Pressable onPress={handleCopyId} style={styles.copyButton}>
						<CopyIcon />
					</Pressable>
				</View>
			</View>
		</View>
	)
}

function CopyIcon() {
	return (
		<View style={styles.copyIcon}>
			<View style={styles.copyIconInner} />
			<View style={styles.copyIconOuter} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.xl,
		borderRadius: spacing.md,
		padding: spacing.md,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	avatar: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#E5E7EB',
	},
	avatarPlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#10B981',
	},
	avatarInitial: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		color: '#FFF',
	},
	info: {
		marginLeft: spacing.md,
		flex: 1,
	},
	username: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	idRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: spacing.xs,
	},
	idLabel: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
	},
	idValue: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
	},
	copyButton: {
		marginLeft: spacing.sm,
		padding: spacing.xs,
	},
	copyIcon: {
		width: 14,
		height: 14,
		position: 'relative',
	},
	copyIconInner: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 10,
		height: 10,
		borderWidth: 1.5,
		borderColor: '#9CA3AF',
		borderRadius: 2,
		backgroundColor: '#FFF',
	},
	copyIconOuter: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 10,
		height: 10,
		borderWidth: 1.5,
		borderColor: '#9CA3AF',
		borderRadius: 2,
		backgroundColor: '#FFF',
	},
})
