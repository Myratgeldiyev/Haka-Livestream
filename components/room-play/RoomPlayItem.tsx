import React from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import { COLORS, getGridSizes } from './room-play-styles'
import type { RoomPlayItemProps } from './room-play.types'

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				styles.iconPlaceholder,
				{ width: size * 0.5, height: size * 0.5 },
			]}
		/>
	)
}

export function RoomPlayItem({
	item,
	onPress,
	showBackground = true,
}: RoomPlayItemProps) {
	const { width: screenWidth } = useWindowDimensions()
	const { cellSize, iconSize } = getGridSizes(screenWidth)

	const renderContent = () => {
		if (item.imageSource) {
			const showToggle = item.toggleActive !== undefined
			const imgSize = iconSize * 1.0
			return (
				<>
					<Image
						source={item.imageSource}
						style={[
							styles.image,
							{
								width: imgSize,
								height: imgSize,
								borderRadius: iconSize * 0.125,
							},
						]}
					/>
					{showToggle && (
						<View
							style={[
								styles.toggleTrack,
								{
									right: iconSize * 0.35,
									top: iconSize * 0.72,
								},
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
		return <IconPlaceholder size={iconSize} />
	}

	return (
		<Pressable
			style={[styles.container, { width: cellSize }]}
			onPress={onPress}
		>
			<View
				style={[
					styles.iconContainer,
					{
						width: iconSize,
						height: iconSize,
						marginBottom: screenWidth * 0.012,
					},
				]}
			>
				{renderContent()}
			</View>
			<Text
				style={[styles.label, { fontSize: Math.max(10, screenWidth * 0.028) }]}
				numberOfLines={1}
			>
				{item.name}
			</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconPlaceholder: {},
	image: {},
	toggleTrack: {
		position: 'absolute',
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
		color: COLORS.textSecondary,
		textAlign: 'center',
	},
})
