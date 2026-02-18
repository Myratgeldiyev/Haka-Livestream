import { Avatar } from '@/components/ui/Avatar'
import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import CopyIcon from '../ui/icons/profile-header/copy-icon'
import GrassFill from '../ui/icons/profile-header/grassFill'
import MaleFill from '../ui/icons/profile-header/maleFill'
import RightArrowIcon from '../ui/icons/profile-header/right-arrow'
import VectorFill from '../ui/icons/profile-header/vectorFill'

interface ProfileHeaderProps {
	name: string
	id: string
	isNew?: boolean
	src?: string
}

export function ProfileHeader({
	name,
	id,
	isNew = false,
	src,
}: ProfileHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar src={src} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.name}>{name}</Text>

				<View style={styles.infoContainer}>
					<MaleFill />
					<GrassFill />
					<VectorFill />
				</View>

				<View style={styles.idContainer}>
					<Text style={styles.id}>ID: {id}</Text>
					<CopyIcon />
				</View>

				<Pressable
					style={styles.badgeContainer}
					onPress={() => router.push('/profile/full-profile')}
				>
					<View style={styles.badge}>
						<Text style={styles.badgeText}>New</Text>
					</View>
					<RightArrowIcon />
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
		paddingHorizontal: spacing.section.horizontal,
		paddingVertical: spacing.lg,
	},

	avatarContainer: {
		position: 'relative',
	},

	textContainer: {
		flex: 1,
		gap: spacing.xs,
		position: 'relative',
	},

	name: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: profileColors.text.primary,
	},

	infoContainer: {
		flexDirection: 'row',
		gap: spacing.xs,
	},

	idContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	id: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#000',
	},

	badgeContainer: {
		position: 'absolute',
		top: spacing.sm,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},

	badge: {
		backgroundColor: '#FF2D55',
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.md,
		borderRadius: 100,
	},

	badgeText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.bold,
		color: 'white',
	},
})
