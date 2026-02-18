import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GameRankingOverlay } from '../game-ranking'
import CloseCircleIcon from '../ui/icons/live-stream-view/closeIcon'
import ViewersIcon from '../ui/icons/live-stream-view/viewersIcon'

interface TopRightControlsProps {
	viewerCount?: number
	onClose?: () => void | Promise<void>
	roomId: string
}

export function TopRightControls({
	viewerCount = 0,
	onClose,
	roomId,
}: TopRightControlsProps) {
	const [gameRankingVisible, setGameRankingVisible] = useState(false)

	const handleClose = async () => {
		await onClose?.()
	}

	return (
		<>
			<View style={styles.container}>
				<Pressable
					style={styles.viewerContainer}
					onPress={() => setGameRankingVisible(true)}
				>
					<ViewersIcon />
					<Text style={styles.viewerCount}>{viewerCount}</Text>
				</Pressable>
				<Pressable style={styles.closeButton} onPress={handleClose}>
					<CloseCircleIcon />
				</Pressable>
			</View>

			<GameRankingOverlay
				roomId={roomId}
				visible={gameRankingVisible}
				onClose={() => setGameRankingVisible(false)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	viewerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: '#DFDFDF',
		paddingHorizontal: 7,
		paddingVertical: 4,
		borderRadius: 6,
	},
	viewerIconPlaceholder: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	viewerCount: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
	},
	closeButton: {
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeText: {
		fontSize: 20,
		color: '#FFFFFF',
		fontWeight: '300',
		marginTop: -2,
	},
})
