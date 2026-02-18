import FemaleIcon from '@/components/ui/icons/gender-age-icons/femaleIcon'
import CloseIcon from '@/components/ui/icons/room-tools/CloseIcon'
import type {
	ApplyerOverlayProps,
	ToolUser,
} from '@/types/room-tools/room-tool.types'
import React from 'react'
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { OVERLAY_HEIGHTS, sharedToolOverlayStyles } from '../styles'
import { ToolOverlayWrapper } from './ToolOverlayWrapper'

function UserListItem({
	user,
	onAccept,
}: {
	user: ToolUser
	onAccept: () => void
}) {
	return (
		<View style={sharedToolOverlayStyles.userListItem}>
			{user.avatarUri ? (
				<Image
					source={{ uri: user.avatarUri }}
					style={sharedToolOverlayStyles.userAvatar}
				/>
			) : user.avatarSource ? (
				<Image
					source={user.avatarSource}
					style={sharedToolOverlayStyles.userAvatar}
				/>
			) : (
				<View style={sharedToolOverlayStyles.userAvatar} />
			)}
			<View style={sharedToolOverlayStyles.userInfo}>
				<Text style={sharedToolOverlayStyles.userName}>{user.name}</Text>
				{user.genderBadge === 'male' && (
					<View style={styles.maleIcon}>
						<FemaleIcon />
					</View>
				)}
				{user.genderBadge === 'female' && (
					<View style={styles.femaleIcon}>
						<FemaleIcon />
					</View>
				)}
			</View>
			<Pressable
				style={sharedToolOverlayStyles.actionButton}
				onPress={onAccept}
			>
				<Text style={sharedToolOverlayStyles.actionButtonText}>Accept</Text>
			</Pressable>
		</View>
	)
}

export function ApplyerOverlay({
	visible,
	onClose,
	users,
	onAccept,
}: ApplyerOverlayProps) {
	const handleAccept = (user: ToolUser) => {
		onAccept?.(user)
	}

	const renderItem = ({ item }: { item: ToolUser }) => (
		<UserListItem user={item} onAccept={() => handleAccept(item)} />
	)

	return (
		<ToolOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.large}
		>
			<View style={styles.content}>
				<View style={sharedToolOverlayStyles.header}>
					<Text style={sharedToolOverlayStyles.headerTitle}>
						Applying User: {users.length}
					</Text>
					<Pressable
						style={sharedToolOverlayStyles.closeButton}
						onPress={onClose}
					>
						<CloseIcon />
					</Pressable>
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
								No applying users
							</Text>
						</View>
					}
				/>
			</View>
		</ToolOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	listContent: {
		flexGrow: 1,
	},
	femaleIcon: {
		width: 20,
		height: 20,
		backgroundColor: '#F9467D',
		padding: 5,
		borderRadius: 100,
	},
	maleIcon: {
		width: 20,
		height: 20,
		backgroundColor: '#0088FF',
		padding: 5,
		borderRadius: 100,
	},
})
