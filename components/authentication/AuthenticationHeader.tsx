import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AUTHENTICATION } from './constants'

interface AuthenticationHeaderProps {
	onBack?: () => void
}

export function AuthenticationHeader({ onBack }: AuthenticationHeaderProps) {
	return (
		<View style={styles.container}>
			{onBack ? (
				<Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
					<LeftArrowIcon props={{}} color="#000" />
				</Pressable>
			) : (
				<View style={styles.backPlaceholder} />
			)}
			<Text style={styles.title}>{AUTHENTICATION.headerTitle}</Text>
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
		backgroundColor: AUTHENTICATION.cardBg,
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
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xl,
		color: AUTHENTICATION.textPrimary,
	},
	rightPlaceholder: {
		width: 40,
		height: 40,
	},
})
