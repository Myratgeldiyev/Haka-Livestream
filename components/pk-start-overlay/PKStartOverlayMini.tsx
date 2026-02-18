import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { PK_COLORS, PK_START_OVERLAY } from './constants'
import type { PKStartOverlayMiniProps } from './types'

function formatScore(n: number): string {
	return n.toLocaleString('en-US')
}

function PKStartOverlayMiniInner({ userA, userB }: PKStartOverlayMiniProps) {
	const size = PK_START_OVERLAY.mini.size
	const avatarSize = PK_START_OVERLAY.mini.avatarSize

	const sourceA = userA.avatarUri
		? { uri: userA.avatarUri }
		: userA.avatarSource
	const sourceB = userB.avatarUri
		? { uri: userB.avatarUri }
		: userB.avatarSource

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<View style={[styles.half, styles.left]}>
				{sourceA ? (
					<Image
						source={sourceA}
						style={[styles.avatar, { width: avatarSize, height: avatarSize }]}
						resizeMode='cover'
					/>
				) : (
					<View
						style={[
							styles.avatar,
							styles.avatarPlaceholder,
							{ width: avatarSize, height: avatarSize },
						]}
					/>
				)}
				<Text style={styles.score} numberOfLines={1}>
					{formatScore(userA.score)}
				</Text>
			</View>
			<View style={[styles.half, styles.right]}>
				{sourceB ? (
					<Image
						source={sourceB}
						style={[styles.avatar, { width: avatarSize, height: avatarSize }]}
						resizeMode='cover'
					/>
				) : (
					<View
						style={[
							styles.avatar,
							styles.avatarPlaceholder,
							{ width: avatarSize, height: avatarSize },
						]}
					/>
				)}
				<Text style={styles.score} numberOfLines={1}>
					{formatScore(userB.score)}
				</Text>
			</View>
		</View>
	)
}

export const PKStartOverlayMini = memo(PKStartOverlayMiniInner)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: PK_START_OVERLAY.mini.borderRadius,
		overflow: 'hidden',
	},
	half: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		paddingHorizontal: 6,
	},
	left: {
		backgroundColor: PK_COLORS.pink,
	},
	right: {
		backgroundColor: PK_COLORS.blue,
	},
	avatar: {
		borderRadius: 8,
		marginBottom: 4,
	},
	avatarPlaceholder: {
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	score: {
		fontSize: 10,
		fontWeight: '700',
		color: PK_COLORS.white,
	},
})
