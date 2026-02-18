import type { UserListItemProps } from '@/types/social/social.types'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { FemalePinkIcon } from '../ui/icons/social/femalePinkIcon'
import { GreenFlowerBadgeIcon } from '../ui/icons/social/greenFlowerBadeIcon'
import LikeSocialIcon from '../ui/icons/social/LikeSocialIcon'
import MutuallyIcon from '../ui/icons/social/MutuallyIcon'
import { SmallStarBadgeIcon } from '../ui/icons/social/starBadgeIcon'
import { sharedSocialStyles } from './styles'

function IconPlaceholder({ size, style }: { size: number; style?: object }) {
	return (
		<View
			style={[
				sharedSocialStyles.iconPlaceholder,
				{ width: size, height: size, borderRadius: size / 2 },
				style,
			]}
		/>
	)
}

function UserAvatar({
	avatarUri,
	avatarSource,
}: {
	avatarUri?: string
	avatarSource?: import('react-native').ImageSourcePropType
}) {
	if (avatarUri) {
		return (
			<Image source={{ uri: avatarUri }} style={sharedSocialStyles.avatar} />
		)
	}
	if (avatarSource) {
		return <Image source={avatarSource} style={sharedSocialStyles.avatar} />
	}
	return <View style={sharedSocialStyles.avatar} />
}

function RightContent({
	variant,
	visitTime,
	onPrimaryAction,
	onSecondaryAction,
}: {
	variant: UserListItemProps['variant']
	visitTime?: string
	onPrimaryAction?: () => void
	onSecondaryAction?: () => void
}) {
	if (variant === 'visitors') {
		return (
			<View style={sharedSocialStyles.rightContent}>
				<Text style={sharedSocialStyles.visitTime}>{visitTime}</Text>
			</View>
		)
	}

	if (variant === 'following') {
		return (
			<View style={sharedSocialStyles.rightContent}>
				<Pressable onPress={onPrimaryAction}>
					<LikeSocialIcon />
				</Pressable>
				<Pressable onPress={onSecondaryAction}>
					<MutuallyIcon />
				</Pressable>
			</View>
		)
	}

	return (
		<View style={sharedSocialStyles.rightContent}>
			<Pressable onPress={onPrimaryAction}>
				<MutuallyIcon />
			</Pressable>
		</View>
	)
}

export function UserListItem({
	user,
	variant,
	onPrimaryAction,
	onSecondaryAction,
}: UserListItemProps) {
	return (
		<View style={sharedSocialStyles.listItem}>
			<UserAvatar avatarUri={user.avatarUri} avatarSource={user.avatarSource} />

			<View style={sharedSocialStyles.userInfo}>
				<Text style={sharedSocialStyles.username}>{user.username}</Text>
				<View style={sharedSocialStyles.iconsRow}>
					<FemalePinkIcon count={'23'} />
					<GreenFlowerBadgeIcon count='25' />
					<SmallStarBadgeIcon count='20' />
				</View>
				<Text style={sharedSocialStyles.userId}>ID: {user.userId}</Text>
			</View>

			<RightContent
				variant={variant}
				visitTime={user.visitTime}
				onPrimaryAction={onPrimaryAction}
				onSecondaryAction={onSecondaryAction}
			/>
		</View>
	)
}
