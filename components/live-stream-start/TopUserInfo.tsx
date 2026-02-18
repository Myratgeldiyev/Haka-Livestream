import { RoomResponse } from '@/api/live-chat/room.types'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { CenterBadge } from './CenterBadge'
import { TopUserInfoSheet } from './TopUserInfoSheet'

interface TopUserInfoProps {
	data: RoomResponse | null
	onEditPress: () => void
	/** When provided (live stream), overrides role in sheet and uses stream API. */
	userRole?: RoomPlayUserRole
}

export function TopUserInfo({ data, onEditPress, userRole }: TopUserInfoProps) {
	const [sheetVisible, setSheetVisible] = useState(false)

	const handlePress = () => {
		setSheetVisible(true)
	}

	const handleClose = () => {
		setSheetVisible(false)
	}

	return (
		<>
			<Pressable onPress={handlePress}>
				<View style={styles.container}>
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
						<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
							{data?.title}
						</Text>
						<Text
							style={styles.displayId}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{data?.id ?? ''}
						</Text>
					</View>
					<CenterBadge />
				</View>
			</Pressable>

			<TopUserInfoSheet
				visible={sheetVisible}
				onClose={handleClose}
				data={data}
				userRoleOverride={userRole}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		gap: 10,
		alignSelf: 'flex-start',
	},
	avatarContainer: {
		width: 38,
		height: 38,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#C4C4C4',
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
