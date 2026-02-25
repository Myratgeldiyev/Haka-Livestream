import { LIVE_STREAM } from '@/constants/liveStream'
import { spacing } from '@/constants/spacing'
import React from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import EditIcon from '../ui/icons/live-stream/editIcon'

const TOP_INFO_WIDTH = 261

interface TopInfoOverlayProps {
	/** Room name to display (e.g. "Room Name" as placeholder). */
	roomName?: string
	/** Room image URI; when null/undefined, a black placeholder is shown. */
	roomImageUri?: string | null
	/** @deprecated Use roomName */
	username?: string
	/** @deprecated Use roomImageUri */
	image?: string
	onEditPress?: () => void
}

export function TopInfoOverlay({
	roomName,
	roomImageUri,
	username = 'Wateen',
	onEditPress,
	image,
}: TopInfoOverlayProps) {
	const { width: screenWidth } = useWindowDimensions()
	const overlayWidth = Math.min(
		TOP_INFO_WIDTH,
		screenWidth - spacing.screen.horizontal * 2,
	)
	const displayName = roomName ?? username
	const imageUri = roomImageUri ?? image ?? null

	return (
		<View
			style={[
				styles.container,
				{
					width: overlayWidth,
					transform: [{ translateX: -overlayWidth / 2 }],
				},
			]}
		>
			<View style={styles.leftBlock}>
				{imageUri ? (
					<Image
						source={{ uri: imageUri }}
						style={styles.profileImage}
						resizeMode='cover'
					/>
				) : (
					<View style={[styles.profileImage, styles.placeholderImage]} />
				)}
				<Text style={styles.username}>{displayName}</Text>
			</View>

			<Pressable style={styles.rightBlock} onPress={onEditPress}>
				<EditIcon />
				<Text style={styles.editText}>Edit</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 77,
		left: '50%',
		backgroundColor: 'rgba(211, 210, 209, 0.55)',
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	leftBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	profileImage: {
		width: LIVE_STREAM.sizes.topInfoImage.width,
		height: LIVE_STREAM.sizes.topInfoImage.height,
		borderRadius: 8,
	},
	placeholderImage: {
		backgroundColor: 'black',
	},
	username: {
		color: LIVE_STREAM.colors.white,
		fontSize: 16,
		fontWeight: '600',
	},
	rightBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	editText: {
		color: LIVE_STREAM.colors.white,
		fontSize: 14,
		fontWeight: '500',
	},
})
