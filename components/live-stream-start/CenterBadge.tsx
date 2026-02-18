import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import CenterBadgeIcon from '../ui/icons/live-stream-view/centerBadge'

interface CenterBadgeProps {
	onPress?: () => void
}

export function CenterBadge({ onPress }: CenterBadgeProps) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<CenterBadgeIcon />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 30,
		height: 30,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconPlaceholder: {
		width: 28,
		height: 28,
		backgroundColor: 'rgba(255, 105, 140, 0.6)',
		borderRadius: 6,
	},
})
