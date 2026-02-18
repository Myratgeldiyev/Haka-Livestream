import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export interface PKBattleRivalSlotProps {
	/** Points/gifts count shown in the orange badge (e.g. 160). */
	pointsCount?: number
	/** Username shown below the badge (e.g. Swxy154). */
	username?: string
}

/**
 * Placeholder for rival camera in PK battle layout.
 * Includes bottom-right overlay: orange circle with points, username, and icon.
 */
export function PKBattleRivalSlot({
	pointsCount = 0,
	username = 'Rakip',
}: PKBattleRivalSlotProps) {
	return (
		<View style={styles.container}>
			<View style={styles.bottomRightOverlay}>
				<View style={styles.usernameRow}>
					<Text style={styles.username} numberOfLines={1}>
						{username}
					</Text>
					<Text style={styles.plusIcon}>+</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: '#1a1a1a',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	placeholderLabel: {
		fontSize: 18,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.5)',
	},
	bottomRightOverlay: {
		position: 'absolute',
		bottom: 16,
		right: 12,
		alignItems: 'center',
	},
	badgeCircle: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#FF9F43',
		justifyContent: 'center',
		alignItems: 'center',
	},
	badgeNumber: {
		fontSize: 16,
		fontWeight: '800',
		color: '#FFF',
	},
	usernameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
		gap: 6,
	},
	username: {
		fontSize: 12,
		fontWeight: '600',
		color: '#FFF',
		maxWidth: 80,
	},
	iconBtn: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'rgba(255,255,255,0.25)',
	},
	plusIcon: {
		fontSize: 12,
		fontWeight: '600',
		color: '#FFF',
	},
})
