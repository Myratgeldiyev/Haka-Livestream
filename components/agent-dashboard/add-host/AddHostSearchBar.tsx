import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

interface AddHostSearchBarProps {
	placeholder?: string
	onSearch?: (query: string) => void
}

export function AddHostSearchBar({
	placeholder = 'Please input the user id',
	onSearch,
}: AddHostSearchBarProps) {
	const [query, setQuery] = useState('')

	const handleSearch = () => {
		onSearch?.(query)
	}

	return (
		<View style={styles.row}>
			<View style={styles.inputWrap}>
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					placeholderTextColor={AGENT_DASHBOARD.labelColor}
					value={query}
					onChangeText={setQuery}
					returnKeyType='search'
					onSubmitEditing={handleSearch}
					accessibilityLabel='Search by user id'
				/>
				<View style={styles.searchIconWrap} pointerEvents='none'>
					<Ionicons
						name='search'
						size={20}
						color={AGENT_DASHBOARD.labelColor}
					/>
				</View>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.searchButton,
					pressed && styles.searchButtonPressed,
				]}
				onPress={handleSearch}
				accessibilityRole='button'
				accessibilityLabel='Search'
			>
				<Text style={styles.searchButtonText}>Search</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingBottom: 12,
	},
	inputWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: AGENT_DASHBOARD.addHostSearchBg,
		borderRadius: 22,
		paddingHorizontal: 14,
		minHeight: 44,
	},
	input: {
		flex: 1,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
		paddingVertical: 10,
	},
	searchIconWrap: {
		marginLeft: 8,
	},
	searchButton: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		justifyContent: 'center',
	},
	searchButtonPressed: {
		opacity: 0.7,
	},
	searchButtonText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
