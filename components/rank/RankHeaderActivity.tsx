import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
	ImageBackground,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'
import RankInfoIcon from '../ui/icons/rank/RankInfoIcon'
import { RankTabs } from './RankTabs'

type Props = {
	backgroundImage: ImageSourcePropType
	title: string
	subtitle: string
}

export const RankHeaderActivity: React.FC<Props> = ({ backgroundImage }) => {
	const insets = useSafeAreaInsets()
	const [active, setActive] = useState<'Top Agency' | 'Video chat Star'>(
		'Top Agency',
	)

	return (
		<ImageBackground source={backgroundImage} style={styles.container}>
			<View style={[styles.topBar, { top: insets.top + 8 }]}>
				<Pressable onPress={() => router.back()}>
					<LeftArrowIcon props={''} color='#fff' />
				</Pressable>

				<RankTabs />

				<Pressable>
					<RankInfoIcon />
				</Pressable>
			</View>

			<View style={styles.center}>
				<View style={styles.segment}>
					{(['Top Agency', 'Video chat Star'] as const).map(item => {
						const isActive = active === item

						if (isActive) {
							return (
								<Pressable key={item} onPress={() => setActive(item)}>
									<LinearGradient
										colors={['#1F0DF6', '#9F3EFF']}
										start={{ x: 0, y: 0 }}
										end={{ x: 1, y: 0 }}
										style={[styles.segmentBtn, styles.segmentActive]}
									>
										<Text style={styles.segmentText}>{item}</Text>
									</LinearGradient>
								</Pressable>
							)
						}

						return (
							<Pressable
								key={item}
								onPress={() => setActive(item)}
								style={styles.segmentBtn}
							>
								<Text style={styles.segmentText}>{item}</Text>
							</Pressable>
						)
					})}
				</View>
			</View>
		</ImageBackground>
	)
}
const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: 350,
		width: '100%',
	},

	topBar: {
		position: 'absolute',
		left: 16,
		right: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	center: {
		marginTop: 50,
		alignItems: 'center',
	},

	infoContainer: {
		display: 'flex',
		flexDirection: 'row',
		gap: 2,
		alignContent: 'center',
	},
	infoReward: {
		color: '#E5DB1A',
		fontSize: 16,
	},
	segment: {
		flexDirection: 'row',
		marginTop: 50,
		borderRadius: 999,
		backgroundColor: 'rgba(0,0,0,0.30)',
		padding: 4,
	},

	segmentBtn: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 999,
	},

	segmentActive: {
		borderRadius: 999,
	},

	segmentText: {
		color: '#FFF',
		fontWeight: '600',
	},

	bottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 16,
		alignItems: 'center',
	},
})
