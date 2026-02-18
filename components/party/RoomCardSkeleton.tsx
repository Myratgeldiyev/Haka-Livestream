import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const AVATAR_SIZE = 80
const SKELETON_BG = '#E0D8E0'

export function RoomCardSkeleton() {
	return (
		<View style={styles.container}>
			<View style={styles.avatarPlaceholder} />
			<View style={styles.content}>
				<View style={styles.nameLine} />
				<View style={styles.bottomRow}>
					<View style={styles.tagLine} />
					<View style={styles.countLine} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#ead9f6ff',
		borderRadius: spacing.lg,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xl,
		marginHorizontal: spacing.lg,
		marginVertical: spacing.sm,
		gap: spacing.md,
	},
	avatarPlaceholder: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: spacing.md,
		backgroundColor: SKELETON_BG,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
	},
	nameLine: {
		height: 18,
		width: '70%',
		borderRadius: 4,
		backgroundColor: SKELETON_BG,
	},
	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	tagLine: {
		height: 22,
		width: 72,
		borderRadius: spacing.md,
		backgroundColor: SKELETON_BG,
	},
	countLine: {
		height: 16,
		width: 28,
		borderRadius: 4,
		backgroundColor: SKELETON_BG,
	},
})
