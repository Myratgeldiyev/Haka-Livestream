import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

interface SearchInputProps {
	value: string
	onChangeText: (text: string) => void
	placeholder?: string
}

export function SearchInput({
	value,
	onChangeText,
	placeholder = 'Please input the user id',
}: SearchInputProps) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#9CA3AF"
			/>
			<View style={styles.iconContainer}>
				<SearchIcon />
			</View>
		</View>
	)
}

function SearchIcon() {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
			<Circle cx={11} cy={11} r={7} stroke="#9CA3AF" strokeWidth={2} />
			<Path
				d="M16 16l4 4"
				stroke="#9CA3AF"
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: 24,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
	},
	input: {
		flex: 1,
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		paddingVertical: spacing.xs,
	},
	iconContainer: {
		marginLeft: spacing.sm,
	},
})
