import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import AudionsIcon2 from '../ui/icons/live-stream/audionsIcon2'

interface SeatItemProps {
	label: string
	isSelected?: boolean
	onPress?: () => void
}

function ChairIcon() {
	return (
		<Svg width={40} height={40} viewBox='0 0 40 40' fill='none'>
			<Path
				d='M8 28V32M32 28V32M10 20C10 18 12 16 16 16H24C28 16 30 18 30 20V24C30 26 28 28 24 28H16C12 28 10 26 10 24V20Z'
				stroke='#6B4EAB'
				strokeWidth={3}
				strokeLinecap='round'
				strokeLinejoin='round'
				fill='#6B4EAB'
			/>
			<Path
				d='M12 16V12C12 10 14 8 20 8C26 8 28 10 28 12V16'
				stroke='#6B4EAB'
				strokeWidth={3}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

export function SeatItem({ label, isSelected, onPress }: SeatItemProps) {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>
				<AudionsIcon2 />
			</View>
			<Text style={styles.label}>{label}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 8,
	},
	iconContainer: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '',
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontSize: 14,
		color: '#FFFFFF',
		fontWeight: '500',
	},
})
