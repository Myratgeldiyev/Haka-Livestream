import FemaleIcon from '@/components/ui/icons/gender-age-icons/femaleIcon'
import CopyIcon from '@/components/ui/icons/profile-header/copy-icon'
import RoundedFlagIndia from '@/components/ui/icons/RoundedFlagIndia'
import { profileColors } from '@/constants/colors'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PROFILE_DETAIL } from './constants'

interface ProfileDetailUserInfoProps {
	name: string
	ageBadge?: string
	userId: string
	location?: string
	follow: number
	followers: number
	onCopyId?: () => void
	/** When true, show Follow button (person+) next to username (other user's profile). */
	showFollowButton?: boolean
	onFollowPress?: () => void
}

export function ProfileDetailUserInfo({
	name,
	ageBadge = '.28',
	userId,
	location,
	follow,
	followers,
	onCopyId,
	showFollowButton = false,
	onFollowPress,
}: ProfileDetailUserInfoProps) {
	const avatarTotalSize =
		PROFILE_DETAIL.avatarSize + PROFILE_DETAIL.avatarBorderWidth * 2
	const paddingTopAvatar =
		avatarTotalSize / 2 + PROFILE_DETAIL.avatarGapToContent

	return (
		<View style={[styles.container, { paddingTop: paddingTopAvatar }]}>
			<View style={styles.nameRow}>
				<Text style={styles.name}>{name}</Text>
				{showFollowButton ? (
					<Pressable
						style={styles.followButton}
						onPress={onFollowPress}
						hitSlop={8}
					>
						<Text style={styles.followIcon}>⊕</Text>
					</Pressable>
				) : null}
			</View>
			<View style={styles.metaRow}>
				<View style={styles.flagWrap}>
					<RoundedFlagIndia width={18} height={18} />
				</View>
				<Text style={styles.heart}>♥</Text>
				<View style={styles.femaleBadge}>
					<FemaleIcon />
					<Text style={styles.femaleText}>{ageBadge}</Text>
				</View>
				<Text style={styles.id}>ID: {userId}</Text>
				<Pressable onPress={onCopyId} hitSlop={8}>
					<CopyIcon />
				</Pressable>
				{location ? <Text style={styles.location}>{location}</Text> : null}
			</View>
			<View style={styles.statsRow}>
				<Text style={styles.statsText}>Follow: {follow}</Text>
				<Text style={styles.statsText}>Followers: {followers}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		paddingBottom: 12,
	},
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 8,
	},
	name: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: '#000',
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
	followButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: profileColors.accent.pink,
		justifyContent: 'center',
		alignItems: 'center',
	},
	followIcon: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '600',
	},
	metaRow: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		gap: 6,
		marginBottom: 8,
	},
	flagWrap: {
		overflow: 'hidden',
		borderRadius: 9,
	},
	heart: {
		fontSize: 12,
		color: '#EC4899',
	},
	femaleBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
		backgroundColor: PROFILE_DETAIL.femaleBadgeBg,
		paddingVertical: 2,
		paddingHorizontal: 6,
		borderRadius: 100,
	},
	femaleText: {
		fontSize: 10,
		fontWeight: '600',
		color: '#fff',
	},
	id: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		fontWeight: 600,
	},
	location: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
	},
	statsRow: {
		flexDirection: 'row',
		gap: 16,
	},
	statsText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
	},
})
