import type { SocialHeaderProps } from '@/types/social/social.types'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'
import SearchUserIcon from '../ui/icons/SearchUserIcon'
import { sharedSocialStyles } from './styles'

export function SocialHeader({ title, onBack, onSearch }: SocialHeaderProps) {
	return (
		<View style={sharedSocialStyles.header}>
			<Pressable style={sharedSocialStyles.headerIconButton} onPress={onBack}>
				<LeftArrowIcon />
			</Pressable>
			<Text style={sharedSocialStyles.headerTitle}>{title}</Text>
			<Pressable style={sharedSocialStyles.headerIconButton} onPress={onSearch}>
				<SearchUserIcon />
			</Pressable>
		</View>
	)
}
