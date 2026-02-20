import { useRouter } from 'expo-router'
import React from 'react'
import {
	Image,
	ImageBackground,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'

const FRAME_BY_RANK: Record<1 | 2 | 3, ImageSourcePropType> = {
	1: require('@/assets/images/rank-2-frame.png'),
	2: require('@/assets/images/rank-1-frame.png'),
	3: require('@/assets/images/rank-3-frame.png'),
}

const BG_BY_RANK: Record<1 | 2 | 3, ImageSourcePropType> = {
	1: require('@/assets/images/rank-2.png'),
	2: require('@/assets/images/rank-1.png'),
	3: require('@/assets/images/rank-3.png'),
}

export type Block = {
	city: string
	value: string
	score: string
	avatars: string[]
	rank: 1 | 2 | 3
}

type Props = {
	data: Block[]
}
export const StateTopBlocks: React.FC<Props> = ({ data }) => {
	const router = useRouter()
	return (
		<View style={styles.row}>
			{data.map((item, index) => {
				const frame = FRAME_BY_RANK[item.rank]
				const bg = BG_BY_RANK[item.rank]

				return (
					<Pressable
						onPress={() => router.push('/(main)/rank/city')}
						key={index}
						style={[styles.wrapper, item.rank === 2 && styles.middleWrapper]}
					>
						<ImageBackground source={bg} style={styles.card} resizeMode='cover'>
							<Text style={styles.city}>{item.city}</Text>

							<View style={styles.avatars}>
								{item.avatars.map((img, i) => (
									<Image
										key={i}
										source={{ uri: img }}
										style={[styles.avatar, { marginLeft: i === 0 ? 0 : -6 }]}
									/>
								))}
							</View>

							<Text style={styles.value}>{item.value}</Text>

							<View style={styles.bottom}>
								<CoinIcon />
								<Text style={styles.score}>{item.score}</Text>
							</View>
						</ImageBackground>

						<Image source={frame} style={styles.frame} resizeMode='contain' />
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 0,
		marginTop: 36,
		marginBottom: 20,
	},
	wrapper: {
		width: 135,
		height: 175,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	middleWrapper: {
		marginTop: -16,
	},

	card: {
		width: 105,
		height: 155,
		alignItems: 'center',
		paddingTop: 12,
		overflow: 'hidden',
		zIndex: 1,
	},

	frame: {
		position: 'absolute',
		width: 135,
		height: 175,
		zIndex: 2,
		pointerEvents: 'none',
	},

	city: {
		color: '#FFF',
		fontWeight: '700',
		marginBottom: 8,
	},

	avatars: {
		flexDirection: 'row',
		marginBottom: 8,
	},

	avatar: {
		width: 20,
		height: 20,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: '#FFF',
	},

	value: {
		color: '#FFF',
		fontWeight: '700',
		marginBottom: 6,
	},

	bottom: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	icon: {
		color: '#FFF',
	},

	score: {
		color: '#FFF',
		fontWeight: '600',
	},
})
