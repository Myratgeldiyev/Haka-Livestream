import { RoomResponse } from '@/api/live-chat/room.types'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import React, { useState } from 'react'
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import FollowRoomIcon from '../ui/icons/chat/FollowRoomIcon'
import { CenterBadge } from './CenterBadge'
import { TopUserInfoSheet } from './TopUserInfoSheet'

export type PasswordApiContext = 'chat' | 'live'

interface TopUserInfoProps {
	data: RoomResponse | null
	onEditPress: () => void
	userRole?: RoomPlayUserRole
	isFollowing?: boolean
	onToggleFollow?: () => void
	/** Use 'chat' on chat/[roomId], 'live' on live/[roomId] so password API uses correct backend. */
	passwordContextMode?: PasswordApiContext
}

export function TopUserInfo({
	data,
	onEditPress,
	userRole,
	isFollowing,
	onToggleFollow,
	passwordContextMode,
}: TopUserInfoProps) {
	const [sheetVisible, setSheetVisible] = useState(false)

	const handlePress = () => {
		setSheetVisible(true)
	}

	const handleClose = () => {
		setSheetVisible(false)
	}

	return (
		<>
			<ImageBackground
				source={require('@/assets/images/top-user.info.png')}
				style={styles.container}
				imageStyle={styles.backgroundImage}
			>
				<Pressable style={styles.infoPressable} onPress={handlePress}>
					<View style={styles.avatarContainer}>
						<Image
							source={
								data?.room_image
									? { uri: data.room_image }
									: data?.owner?.profile_picture
										? { uri: data.owner.profile_picture }
										: require('../../assets/images/stream-img.png')
							}
							style={styles.avatarImage}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
							{data?.title}
						</Text>
						<Text
							style={styles.displayId}
							numberOfLines={1}
							ellipsizeMode='tail'
						>
							{data?.display_id ?? ''}
						</Text>
					</View>
				</Pressable>
				<View style={styles.followButtonWrap}>
					{userRole === 'owner' ? (
						<CenterBadge />
					) : isFollowing ? (
						<CenterBadge onPress={onToggleFollow} />
					) : (
						<FollowRoomIcon onPress={onToggleFollow} />
					)}
				</View>
			</ImageBackground>

			<TopUserInfoSheet
				visible={sheetVisible}
				onClose={handleClose}
				data={data}
				userRoleOverride={userRole}
				passwordContextMode={passwordContextMode}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingRight: 12,
		paddingVertical: 6,
		alignSelf: 'flex-start',
	},
	backgroundImage: {
		borderRadius: 12,
	},
	infoPressable: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatarContainer: {
		width: 38,
		height: 38,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#C4C4C4',
	},
	followButtonWrap: {
		marginLeft: 10,
	},
	avatarImage: {
		width: 38,
		height: 38,
		borderRadius: 10,
	},
	textContainer: {
		justifyContent: 'center',
		marginRight: 4,
		maxWidth: 120,
	},
	title: {
		fontSize: 12,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	displayId: {
		fontSize: 8,
		color: 'rgba(255, 255, 255, 0.8)',
		marginTop: 3,
	},
})
