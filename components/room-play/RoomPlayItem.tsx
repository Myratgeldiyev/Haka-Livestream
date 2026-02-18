import React from 'react'
import {
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { COLORS, GRID_CELL_SIZE, ROOM_PLAY_ICON_SIZE } from './room-play-styles'
import type { RoomPlayItemProps } from './room-play.types'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

function IconPlaceholder() {
	return <View style={styles.iconPlaceholder} />
}

export function RoomPlayItem({
	item,
	onPress,
	showBackground = true,
}: RoomPlayItemProps) {
	const renderContent = () => {
		if (item.imageSource) {
			const showToggle = item.toggleActive !== undefined
			return (
				<>
					<Image source={item.imageSource} style={styles.image} />
					{showToggle && (
						<View
							style={[
								styles.toggleTrack,
								item.toggleActive
									? styles.toggleTrackOn
									: styles.toggleTrackOff,
							]}
							pointerEvents='none'
						>
							<View
								style={[
									styles.toggleThumb,
									item.toggleActive
										? styles.toggleThumbOn
										: styles.toggleThumbOff,
								]}
							/>
						</View>
					)}
				</>
			)
		}
		if (item.icon) return item.icon
		return <IconPlaceholder />
	}

	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.iconContainer}>{renderContent()}</View>
			<Text style={styles.label} numberOfLines={1}>
				{item.name}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: GRID_CELL_SIZE,
	},
	iconContainer: {
		width: ROOM_PLAY_ICON_SIZE,
		height: ROOM_PLAY_ICON_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SCREEN_WIDTH * 0.012,
	},
	iconPlaceholder: {
		width: ROOM_PLAY_ICON_SIZE * 0.5,
		height: ROOM_PLAY_ICON_SIZE * 0.5,
	},
	image: {
		width: ROOM_PLAY_ICON_SIZE * 0.9,
		height: ROOM_PLAY_ICON_SIZE * 0.9,
		borderRadius: ROOM_PLAY_ICON_SIZE * 0.125,
	},
	toggleTrack: {
		position: 'absolute',
		right: 15,
		top: 35,
		width: 10,
		height: 6,
		borderRadius: 3,
		justifyContent: 'center',
		paddingHorizontal: 1,
	},
	toggleTrackOn: {
		backgroundColor: '#4ADE80',
		alignItems: 'flex-end',
	},
	toggleTrackOff: {
		backgroundColor: 'rgba(255,255,255,0.35)',
		alignItems: 'flex-start',
	},
	toggleThumb: {
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0.5 },
		shadowOpacity: 0.2,
		shadowRadius: 0.5,
		elevation: 1,
	},
	toggleThumbOn: {},
	toggleThumbOff: {},
	label: {
		fontSize: Math.max(10, SCREEN_WIDTH * 0.028),
		color: COLORS.textSecondary,
		textAlign: 'center',
	},
})
