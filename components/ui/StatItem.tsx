import { profileColors } from '@/constants/colors'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface StatItemProps {
	label: string
	value: string | number
	badge?: string
	onPress?: () => void
}

export function StatItem({ label, value, badge, onPress }: StatItemProps) {
	const content = (
		<>
			<View style={styles.valueContainer}>
				<Text style={styles.value}>{value}</Text>
				{badge && (
					<View style={styles.badge}>
						<Text style={styles.badgeText}>{badge}</Text>
					</View>
				)}
			</View>
			<Text style={styles.label}>{label}</Text>
		</>
	)

	if (onPress) {
		return (
			<Pressable style={styles.container} onPress={onPress}>
				{content}
			</Pressable>
		)
	}

	return <View style={styles.container}>{content}</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
	},
	valueContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	value: {
		fontSize: 16,
		fontWeight: '700',
		color: profileColors.text.primary,
		lineHeight: 28,
	},
	badge: {
		backgroundColor: profileColors.accent.pink,
		paddingVertical: 2,
		paddingHorizontal: 6,
		borderRadius: 4,
	},
	badgeText: {
		fontSize: 10,
		fontWeight: '600',
		color: profileColors.text.inverse,
	},
	label: {
		fontSize: 12,
		color: profileColors.text.tertiary,
		fontWeight: '500',
	},
})
