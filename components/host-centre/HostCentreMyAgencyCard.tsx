import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { HOST_CENTRE } from './constants'

interface HostCentreMyAgencyCardProps {
	agentName?: string
	agentAvatarUri?: string
	onPress?: () => void
}

export function HostCentreMyAgencyCard({
	agentName = 'Raj',
	agentAvatarUri,
	onPress,
}: HostCentreMyAgencyCardProps) {
	const content = (
		<View style={styles.card}>
			<Text style={styles.leftText}>My agency</Text>
			<View style={styles.rightWrap}>
				<Image
					source={require('@/assets/images/raj.png')}
					style={styles.avatar}
				/>

				<Text style={styles.name}>{agentName}</Text>
				<Text style={styles.arrow}>›</Text>
			</View>
			<View />
		</View>
	)
	if (onPress) return <Pressable onPress={onPress}>{content}</Pressable>
	return content
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: HOST_CENTRE.screenPadding,
		marginBottom: spacing.md,
		padding: spacing.md,
		backgroundColor: HOST_CENTRE.myAgencyCardBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.myAgencyCardBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
	},
	leftText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#fff',
	},
	avatarWrap: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
	},
	avatarPlaceholder: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#E0E0E0',
	},
	rightWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	name: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#fff',
	},
	arrow: {
		fontSize: 20,
		color: '#fff',
		fontWeight: fontWeights.medium,
	},
})
