import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { InviteMicSearch } from './InviteMicSearch'

interface InviteMicHeaderProps {
	searchValue: string
	onSearchChange: (text: string) => void
}

export function InviteMicHeader({
	searchValue,
	onSearchChange,
}: InviteMicHeaderProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Invite to mic</Text>
			<InviteMicSearch value={searchValue} onChangeText={onSearchChange} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		gap: spacing.md,
	},
	title: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
})
