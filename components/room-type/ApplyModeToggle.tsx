import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface ApplyModeToggleProps {
	isEnabled: boolean
	onToggle?: (value: boolean) => void
}

export function ApplyModeToggle({ isEnabled, onToggle }: ApplyModeToggleProps) {
	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				<Text style={styles.label}>Apply Mode</Text>
				<Pressable
					style={[styles.toggle, isEnabled && styles.toggleActive]}
					onPress={() => onToggle?.(!isEnabled)}
				>
					<View
						style={[styles.toggleThumb, isEnabled && styles.toggleThumbActive]}
					/>
				</Pressable>
			</View>
			<View style={styles.divider} />
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		gap: 16,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	label: {
		fontSize: 18,
		fontWeight: '700',
		color: '#FFFFFF',
	},
	toggle: {
		width: 56,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#3D3A50',
		justifyContent: 'center',
		paddingHorizontal: 3,
	},
	toggleActive: {
		backgroundColor: '#4CAF50',
	},
	toggleThumb: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#FFFFFF',
	},
	toggleThumbActive: {
		alignSelf: 'flex-end',
	},
	divider: {
		height: 1,
		backgroundColor: '#4a14b670',
	},
})
