import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { HOST_CENTRE } from './constants'

interface HostCentreOfficialContactCardProps {
	contactName?: string
	contactAvatarUri?: string
	onPress?: () => void
}

export function HostCentreOfficialContactCard({
	contactName = 'Rider',
	contactAvatarUri,
	onPress,
}: HostCentreOfficialContactCardProps) {
	const content = (
		<View style={styles.card}>
			<Text style={styles.leftText}>Official contect</Text>
			<View style={styles.avatarWrap}>
				<Image
					source={require('@/assets/images/raj.png')}
					style={styles.avatar}
				/>
				<View style={styles.rightWrap}>
					<Text style={styles.name}>{contactName}</Text>
					<Text style={styles.arrow}>›</Text>
				</View>
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
		marginBottom: spacing.xxl,
		padding: spacing.md,
		backgroundColor: HOST_CENTRE.cardLightPurpleBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.cardRedBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
	},
	leftText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: HOST_CENTRE.textDark,
	},
	avatarWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 5,
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
		color: HOST_CENTRE.textDark,
	},
	arrow: {
		fontSize: 20,
		color: HOST_CENTRE.textDark,
		fontWeight: fontWeights.medium,
	},
})
