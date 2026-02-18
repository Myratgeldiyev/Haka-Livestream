import { SearchIcon } from '@/components/ui/icons'
import { spacing } from '@/constants/spacing'
import { fontSizes } from '@/constants/typography'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

interface InviteMicSearchProps {
	value: string
	onChangeText: (text: string) => void
}

export function InviteMicSearch({ value, onChangeText }: InviteMicSearchProps) {
	return (
		<View style={styles.container}>
			<SearchIcon size={14} color='#000' />
			<TextInput
				style={styles.input}
				placeholder='Search User ID'
				placeholderTextColor='#000'
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 0.5,
		backgroundColor: '#F2F2F2',
		borderRadius: 20,
		paddingHorizontal: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	input: {
		fontSize: fontSizes.sm,
		color: '#fff',
	},
})
