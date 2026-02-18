import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'

interface DetailsHeaderProps {
	title?: string
}

export function DetailsHeader({ title = 'Details' }: DetailsHeaderProps) {
	const insets = useSafeAreaInsets()

	return (
		<View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
			<Pressable onPress={() => router.back()} style={styles.backButton}>
				<LeftArrowIcon props='' color='#000' />
			</Pressable>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.placeholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#E4F7F4',
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	backButton: {
		padding: spacing.sm,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	placeholder: {
		width: 40,
		color: '#000',
	},
})
