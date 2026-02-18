import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const SELECTED_COLOR = '#9B7BE8'

interface DateRangeOverlayContentProps {
	options: readonly string[]
	selectedValue: string
	onSelect: (value: string) => void
}

export function DateRangeOverlayContent({
	options,
	selectedValue,
	onSelect,
}: DateRangeOverlayContentProps) {
	return (
		<View style={styles.container}>
			{options.map(option => {
				const isSelected = option === selectedValue
				return (
					<Pressable
						key={option}
						style={styles.option}
						onPress={() => onSelect(option)}
					>
						<Text
							style={[
								styles.optionText,
								isSelected && styles.optionTextSelected,
							]}
						>
							{option}
						</Text>
						{isSelected && <Text style={styles.checkmark}>✓</Text>}
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		minWidth: 200,
		paddingVertical: 8,
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	optionText: {
		fontSize: 15,
		color: '#111111',
		fontWeight: '500',
	},
	optionTextSelected: {
		color: SELECTED_COLOR,
		fontWeight: '600',
	},
	checkmark: {
		fontSize: 14,
		color: SELECTED_COLOR,
		fontWeight: '700',
	},
})
