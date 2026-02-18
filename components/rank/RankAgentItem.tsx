import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	ColorValue,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import { PinkDiamond } from './PinkDiamod'
import { PurpleDiamond } from './PurpleDiamond'

export type Rank = 1 | 2 | 3 | 'other'

type GradientColors = readonly [ColorValue, ColorValue]

type Props = {
	rank: Rank
	username: string
	userImage: ImageSourcePropType
}

const BG_BY_RANK: Record<Rank, GradientColors> = {
	1: ['#FEB022', '#F7C874'],
	2: ['#7897D8', '#4179F0'],
	3: ['#CE8F66', '#DF7835'],
	other: ['#689FC4', '#3088C3'],
}

const FRAME_BY_RANK: Partial<Record<1 | 2 | 3, ImageSourcePropType>> = {
	1: require('@/assets/images/frames/agent-1.png'),
	2: require('@/assets/images/frames/agent-2.png'),
	3: require('@/assets/images/frames/agent-2.png'),
}

export const RankAgentItem: React.FC<Props> = ({
	rank,
	username,
	userImage,
}) => {
	const frameImage = rank !== 'other' ? FRAME_BY_RANK[rank] : undefined

	return (
		<LinearGradient
			colors={BG_BY_RANK[rank]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.container}
		>
			<View style={styles.imageWrapper}>
				<Image source={userImage} style={styles.avatar} />

				{frameImage && <Image source={frameImage} style={styles.frame} />}
			</View>

			<View style={styles.center}>
				<View style={styles.usernameRow}>
					<Text style={styles.username}>{username}</Text>
				</View>
				<View style={styles.usernameRow}>
					<PurpleDiamond number='27' />
					<PinkDiamond number='66' />
				</View>
				<View style={styles.right}>
					<Image source={require('@/assets/images/diamon-squ.png')} />
					<Text style={styles.rewardText}>12,30,000</Text>
				</View>
			</View>
			<View>
				<View style={styles.right}>
					<GoldIcon />
					<Text style={styles.rewardText}>400,000</Text>
				</View>
				<View style={styles.right}>
					<Image source={require('@/assets/images/diamon-squ.png')} />
					<Text style={styles.rewardText}>120,000</Text>
				</View>
				<Pressable style={styles.textBtn}>
					<Text style={styles.text}>Unreceived</Text>
				</Pressable>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 88,
		borderRadius: 16,
		borderWidth: 3,
		borderColor: '#E5DB1A',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 19,
		marginBottom: 12,
	},
	text: {
		textAlign: 'center',
	},
	textBtn: {
		backgroundColor: 'rgba(203, 203, 203, 0.25)',
		borderRadius: 16,
		padding: 3,
	},
	imageWrapper: {
		width: 52,
		height: 54,

		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},

	avatar: {
		width: 55,
		height: 55,
		borderRadius: 999,
		zIndex: 1,
	},

	frame: {
		position: 'absolute',
		width: 76,
		height: 80,
		zIndex: 2,
	},

	center: {
		flex: 1,
		marginLeft: 12,
	},

	usernameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginBottom: 6,
	},

	username: {
		color: '#000',
		fontWeight: '700',
		fontSize: 16,
	},

	flagPlaceholder: {
		width: 16,
		height: 16,
		borderRadius: 4,
		backgroundColor: 'rgba(0,0,0,0.25)',
	},

	statRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},

	iconPlaceholder: {
		width: 14,
		height: 14,
		borderRadius: 4,
		backgroundColor: 'rgba(0,0,0,0.35)',
	},

	statText: {
		color: '#2B1600',
		fontWeight: '600',
		fontSize: 13,
	},

	right: {
		flexDirection: 'row',
		marginBottom: 2,
		alignItems: 'center',
		gap: 4,
	},

	rewardText: {
		color: '#2B1600',
		fontWeight: '700',
		fontSize: 14,
	},
})
