import { SearchIcon } from '@/components/ui/icons'
import CopyLink from '@/components/ui/icons/room-tools/CopyLinkIcon'
import FaceBookIcon from '@/components/ui/icons/room-tools/FacebookIcon'
import WhatsAppIcon from '@/components/ui/icons/room-tools/WhatsappIcon'
import XIcon from '@/components/ui/icons/room-tools/XIcon'
import type {
	ShareOverlayProps,
	SharePlatform,
	ToolUser,
} from '@/types/room-tools/room-tool.types'
import React, { useState } from 'react'
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import {
	BORDER_RADIUS,
	COLORS,
	OVERLAY_HEIGHTS,
	SPACING,
	sharedToolOverlayStyles,
} from '../styles'
import { ToolOverlayWrapper } from './ToolOverlayWrapper'

const SHARE_PLATFORMS: SharePlatform[] = [
	{
		id: 'copy-link',
		name: 'Copy link',
		iconColor: COLORS.sharePlatformCopyLink,
		icon: <CopyLink />,
	},
	{
		id: 'whatsapp',
		name: 'WhatsApp',
		iconColor: COLORS.sharePlatformWhatsApp,
		icon: <WhatsAppIcon />,
	},
	{
		id: 'facebook',
		name: 'Facebook',
		iconColor: COLORS.sharePlatformFacebook,
		icon: <FaceBookIcon />,
	},
	{ id: 'x', name: 'X', iconColor: COLORS.sharePlatformX, icon: <XIcon /> },
]

function UserShareItem({
	user,
	onShare,
}: {
	user: ToolUser
	onShare: () => void
}) {
	return (
		<View style={sharedToolOverlayStyles.userListItem}>
			{user.avatarUri ? (
				<Image source={{ uri: user.avatarUri }} style={styles.userAvatar} />
			) : user.avatarSource ? (
				<Image source={user.avatarSource} style={styles.userAvatar} />
			) : (
				<View style={styles.userAvatar} />
			)}
			<View style={sharedToolOverlayStyles.userInfo}>
				<Text style={sharedToolOverlayStyles.userName}>{user.name}</Text>
			</View>
			<Pressable style={styles.shareButton} onPress={onShare}>
				<Text style={sharedToolOverlayStyles.actionButtonText}>Share</Text>
			</Pressable>
		</View>
	)
}

function SharePlatformButton({
	platform,
	onPress,
}: {
	platform: SharePlatform
	onPress: () => void
}) {
	return (
		<Pressable
			style={sharedToolOverlayStyles.sharePlatformItem}
			onPress={onPress}
		>
			<View
				style={[
					sharedToolOverlayStyles.sharePlatformIcon,
					{ backgroundColor: platform.iconColor },
				]}
			>
				{platform.icon}
			</View>
			<Text style={sharedToolOverlayStyles.sharePlatformName}>
				{platform.name}
			</Text>
		</Pressable>
	)
}

export function ShareOverlay({
	visible,
	onClose,
	users,
	onShare,
	onPlatformShare,
	onSearch,
}: ShareOverlayProps) {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (text: string) => {
		setSearchQuery(text)
		onSearch?.(text)
	}

	const handleShare = (user: ToolUser) => {
		onShare?.(user)
	}

	const handlePlatformShare = (platform: SharePlatform) => {
		onPlatformShare?.(platform)
	}

	const renderItem = ({ item }: { item: ToolUser }) => (
		<UserShareItem user={item} onShare={() => handleShare(item)} />
	)

	return (
		<ToolOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.large}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={sharedToolOverlayStyles.headerTitle}>Share to</Text>
					<View style={sharedToolOverlayStyles.searchContainer}>
						<View style={styles.inputBar}>
							<SearchIcon color='#000' />
							<TextInput
								style={styles.inputText}
								placeholder='Search User ID'
								placeholderTextColor={'#000'}
							/>
						</View>
						<TextInput
							style={sharedToolOverlayStyles.searchInput}
							placeholder='Search User ID'
							placeholderTextColor={COLORS.textPlaceholder}
							value={searchQuery}
							onChangeText={handleSearch}
						/>
					</View>
				</View>

				<FlatList
					data={users}
					keyExtractor={item => item.id}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					ListEmptyComponent={
						<View style={sharedToolOverlayStyles.emptyContainer}>
							<Text style={sharedToolOverlayStyles.emptyText}>
								No users found
							</Text>
						</View>
					}
				/>

				<View style={sharedToolOverlayStyles.sharePlatformsContainer}>
					{SHARE_PLATFORMS.map(platform => (
						<SharePlatformButton
							key={platform.id}
							platform={platform}
							onPress={() => handlePlatformShare(platform)}
						/>
					))}
				</View>
			</View>
		</ToolOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.xl,
	},
	listContent: {
		flexGrow: 1,
	},
	userAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: COLORS.iconPlaceholder,
	},
	shareButton: {
		height: 25,
		paddingHorizontal: SPACING.xl,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: '#804EE4',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputBar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputText: {
		paddingHorizontal: 5,
		backgroundColor: 'none',
	},
})
