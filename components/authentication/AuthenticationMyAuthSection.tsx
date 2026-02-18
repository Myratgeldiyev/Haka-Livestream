import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AUTHENTICATION } from './constants'

const AUTH_CHECK_SIZE = 175

export function AuthenticationMyAuthSection() {
	return (
		<View style={styles.container}>
			<View style={styles.textBlock}>
				<Text style={styles.title}>{AUTHENTICATION.myAuthTitle}</Text>
				<Text style={styles.description}>
					{AUTHENTICATION.myAuthDescription}
				</Text>
			</View>
			<View style={styles.iconWrap} pointerEvents='none'>
				<Image
					source={require('@/assets/images/auth-check.png')}
					style={styles.authCheckImage}
					resizeMode='contain'
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingHorizontal: spacing.screen.horizontal,
		paddingVertical: spacing.section.vertical,
	},
	textBlock: {
		alignSelf: 'stretch',
		paddingRight: AUTH_CHECK_SIZE * 0.5,
	},
	title: {
		fontSize: fontSizes.xxl,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xxl,
		color: AUTHENTICATION.textPrimary,
		marginBottom: spacing.xs,
	},
	description: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.md,
		color: AUTHENTICATION.textSecondary,
	},
	iconWrap: {
		position: 'absolute',
		top: -spacing.md,
		right: -spacing.sm,
		alignItems: 'center',
		justifyContent: 'center',
	},
	authCheckImage: {
		width: AUTH_CHECK_SIZE,
		height: AUTH_CHECK_SIZE,
	},
})
