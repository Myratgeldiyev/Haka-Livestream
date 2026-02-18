import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { LIVE_DATA } from './constants'

interface LiveDataDatePickerProps {
	date: string
	onPress?: () => void
}

export function LiveDataDatePicker({ date, onPress }: LiveDataDatePickerProps) {
	return (
		<Pressable
			onPress={onPress}
			style={styles.wrapper}
			accessibilityLabel={`Select date, current: ${date}`}
			accessibilityRole='button'
		>
			<Text style={styles.text} numberOfLines={1}>
				{date}
			</Text>
			<Ionicons name='chevron-down' size={16} color={LIVE_DATA.valueColor} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		alignSelf: 'flex-start',
		gap: 4,
		paddingVertical: 4,
		paddingHorizontal: 12,
		backgroundColor: LIVE_DATA.datePickerBg,
		borderRadius: 16,
	},
	text: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: LIVE_DATA.valueColor,
	},
})
