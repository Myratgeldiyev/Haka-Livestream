import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { INVITE_FRIENDS } from './constants'

interface InviteFriendsHeaderProps {
	onBack?: () => void
	topInset?: number
}

export function InviteFriendsHeader({
	onBack,
	topInset = 0,
}: InviteFriendsHeaderProps) {
	return (
		<View style={[styles.container, { paddingTop: topInset + spacing.md }]}>
			<Pressable
				style={styles.backButton}
				onPress={onBack}
				hitSlop={12}
				accessibilityLabel='Go back'
				accessibilityRole='button'
			>
				<LeftArrowIcon props='' color='#000' />
			</Pressable>
			<Text style={styles.title}>{INVITE_FRIENDS.headerTitle}</Text>
			<View style={styles.placeholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.screen.horizontal,
		paddingBottom: spacing.sm,
		minHeight: spacing.header.height,
		backgroundColor: '#fff',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	placeholder: {
		width: 40,
		height: 40,
	},
})
