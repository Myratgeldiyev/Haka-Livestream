import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'

interface FamilyHeaderProps {
	onBack?: () => void
}

export function FamilyHeader({ onBack }: FamilyHeaderProps) {
	return (
		<View style={styles.container}>
			{onBack ? (
				<Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
					<LeftArrowIcon props={{}} color="#000" />
				</Pressable>
			) : (
				<View style={styles.backPlaceholder} />
			)}
			<Text style={styles.title}>Family Members</Text>
			<View style={styles.rightPlaceholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.screen.horizontal,
		paddingVertical: spacing.md,
		minHeight: spacing.header.height,
		backgroundColor: '#fff',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backPlaceholder: {
		width: 40,
		height: 40,
	},
	title: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	rightPlaceholder: {
		width: 40,
		height: 40,
	},
})
