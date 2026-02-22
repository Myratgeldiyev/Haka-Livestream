import { Href, router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { MenuItem } from '@/components/profile/MenuItem'
import { MenuVideoIcon } from '@/components/profile/MenuVideoIcon'
import { spacing } from '@/constants/spacing'

import AboutUsIcon from '../ui/icons/aboutUs'
import AuthIcon from '../ui/icons/authIcon'
import BackpackIcon from '../ui/icons/backpackIcon'
import CoinSellerIcon from '../ui/icons/coinSellerIcon'
import FacebookIcon from '../ui/icons/facebookIcon'
import FamilyIcon from '../ui/icons/familyIcon'
import HelpIcon from '../ui/icons/helpIcon'
import InviteIcon from '../ui/icons/inviteIcon'
import LevelIcon from '../ui/icons/levelIcon'
import LiveData from '../ui/icons/livedataIcon'
import ActivityCenterIcon from '../ui/icons/profile/ActivityCenterIcon'
import AgencyApplyIcon from '../ui/icons/profile/AgencyApplyIcon'
import AgencyCenterIcon from '../ui/icons/profile/AgencyCenterIcon'
import ApplyHostIcon from '../ui/icons/profile/ApplyHostIcon'
import HostCenterIcon from '../ui/icons/profile/HostCenterIcon'
import SettingsIcon from '../ui/icons/settingsIcon'
import YoutubeIcon from '../ui/icons/youtubeIcon'

type MenuItemType = {
	id: string
	label: string
	icon: React.ReactNode
	link: Href
}

export function MenuGrid() {
	const menuItems: MenuItemType[] = [
		{
			id: 'agency',
			label: 'Apply for Agency',
			icon: <AgencyApplyIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'host',
			label: 'Apply for Host',
			icon: <ApplyHostIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'coin-seller',
			label: 'Coin Seller',
			icon: <CoinSellerIcon />,
			link: '/(main)/coin-seller' as const,
		},
		{
			id: 'invite',
			label: 'Invite',
			icon: <InviteIcon />,
			link: '/(main)/invite-friends' as const,
		},
		{
			id: 'shield',
			label: 'Auth',
			icon: <AuthIcon />,
			link: '/(main)/authentication' as const,
		},
		{
			id: 'level',
			label: 'Level',
			icon: <LevelIcon />,
			link: '/(main)/level' as const,
		},
		{
			id: 'backpack',
			label: 'Backpack',
			icon: <BackpackIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: <SettingsIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'live',
			label: 'Live Data',
			icon: <LiveData />,
			link: '/(main)/live-data' as const,
		},
		{
			id: 'help',
			label: 'Help',
			icon: <HelpIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'info',
			label: 'About Us',
			icon: <AboutUsIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'facebook',
			label: 'Facebook',
			icon: <FacebookIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'youtube',
			label: 'YouTube',
			icon: <YoutubeIcon />,
			link: '/(main)/become-agent' as const,
		},
		{
			id: 'family',
			label: 'Family',
			icon: <FamilyIcon />,
			link: '/(main)/family' as const,
		},
		{
			id: 'agency-center',
			label: 'Agency Center',
			icon: <AgencyCenterIcon />,
			link: '/(main)/agency-center' as const,
		},
		{
			id: 'admin-center',
			label: 'Admin Center',
			icon: <ActivityCenterIcon />,
			link: '/(main)/admin-center' as const,
		},
		{
			id: 'host-center',
			label: 'Host Center',
			icon: <HostCenterIcon />,
			link: '/(main)/host/host-center' as const,
		},
		{
			id: 'bd-center',
			label: 'BD Center',
			icon: <MenuVideoIcon source={require('@/assets/videos/bd_center.mp4')} />,
			link: '/(main)/become-agent' as const,
		},
	]

	return (
		<View style={styles.container}>
			{menuItems.map(item => {
				const pressableProps = item.link
					? { onPress: () => router.push(item.link) }
					: {}

				return (
					<Pressable
						key={item.id}
						style={styles.itemWrapper}
						{...pressableProps}
					>
						<MenuItem label={item.label} icon={item.icon} />
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacing.section.horizontal,
		paddingVertical: spacing.lg,
		backgroundColor: 'white',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.sm,
		marginHorizontal: spacing.lg,
		marginVertical: spacing.xl,
		borderRadius: spacing.md,
	},
	itemWrapper: {
		width: '23%',
		minWidth: 70,
	},
})
