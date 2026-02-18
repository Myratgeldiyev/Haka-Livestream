import type {
	SocialTabBarProps,
	SocialTabType,
} from '@/types/social/social.types'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { sharedSocialStyles } from './styles'

const TABS: { key: SocialTabType; label: string }[] = [
	{ key: 'friends', label: 'Friends' },
	{ key: 'following', label: 'Following' },
	{ key: 'followers', label: 'Followers' },
	{ key: 'visitors', label: 'Visitors' },
]

export function SocialTabBar({ activeTab, onTabChange }: SocialTabBarProps) {
	return (
		<View style={sharedSocialStyles.tabBar}>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{TABS.map(tab => {
					const isActive = activeTab === tab.key
					return (
						<Pressable
							key={tab.key}
							style={[
								sharedSocialStyles.tabItem,
								isActive && sharedSocialStyles.tabItemActive,
							]}
							onPress={() => onTabChange(tab.key)}
						>
							<Text
								style={[
									sharedSocialStyles.tabText,
									isActive && sharedSocialStyles.tabTextActive,
								]}
							>
								{tab.label}
							</Text>
						</Pressable>
					)
				})}
			</ScrollView>
		</View>
	)
}
