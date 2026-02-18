import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
	Image,
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
import RankStarIcon from '../ui/icons/rank/RankStar'
import { RankTabs } from './RankTabs'

type Props = {
	backgroundImage: ImageSourcePropType
	title: string
	subtitle: string
}

export const RankHeaderAgent: React.FC<Props> = ({ backgroundImage }) => {
	const insets = useSafeAreaInsets()
	const [active, setActive] = useState<'Income' | 'Amount'>('Income')

	const progress = 0.5

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
					{(['Income', 'Amount'] as const).map(item => {
						const isActive = active === item
						return (
							<Pressable
								key={item}
								onPress={() => setActive(item)}
								style={[styles.segmentBtn, isActive && styles.segmentActive]}
							>
								<Text style={styles.segmentText}>{item}</Text>
							</Pressable>
						)
					})}
				</View>

				<View style={styles.infoBlock}>
					<View style={styles.infoContainer}>
						<Text style={styles.infoText}>Level:</Text>
						<RankStarIcon />
						<RankStarIcon />
						<RankStarIcon />
						<RankStarIcon />
						<RankStarIcon />
					</View>

					<View style={styles.infoContainer}>
						<Text style={styles.infoText}>Reward: </Text>
						<Image source={require('@/assets/images/luckybag.png')} />
						<Text style={styles.infoReward}>12,023</Text>
					</View>

					<LinearGradient
						colors={['#FEE77E', '#FFB628']}
						style={styles.containerBtn}
					>
						<Text style={styles.textBtn}>MAX</Text>
					</LinearGradient>
				</View>
			</View>

			<View style={styles.bottom}>
				<View style={styles.progressValues}>
					<Text style={styles.progressLabel}>123,455</Text>
					<Text style={styles.progressLabel}>999,999,999</Text>
				</View>

				<View style={styles.progressBg}>
					<View
						style={[styles.progressFill, { width: `${progress * 100}%` }]}
					/>
					<Text style={styles.progressPercent}>50%</Text>
				</View>
				<View style={styles.maxContainer}>
					<RankInfoIcon />
					<Text style={styles.maxReward}>Maximum Reward :</Text>
					<Image source={require('@/assets/images/luckybag.png')} />
					<Text style={styles.maxRewardText}>12,002,432</Text>
				</View>
			</View>
		</ImageBackground>
	)
}
const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: 487,
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
		marginTop: 140,
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
		borderRadius: 999,
		backgroundColor: 'rgba(0,0,0,0.30)',
		overflow: 'hidden',
	},

	segmentBtn: {
		paddingHorizontal: 24,
		paddingVertical: 8,
	},

	segmentActive: {
		backgroundColor: '#A14D1E',
		borderRadius: 999,
	},
	bottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 16,
		alignItems: 'center',
	},
	segmentText: {
		color: '#FFF',
		fontWeight: '600',
	},

	infoBlock: {
		position: 'relative',
		marginTop: 66,
		width: '65%',
		backgroundColor: '#A931F4',
		borderRadius: 10,
		paddingVertical: 20,
		borderWidth: 2,
		borderColor: '#E5DB1A',
		padding: 12,
		alignItems: 'flex-start',
		gap: 4,
	},

	infoText: {
		alignContent: 'center',
		color: '#FFF',
		fontWeight: '600',
		fontSize: 16,
	},

	progressValues: {
		marginTop: 16,
		width: '85%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	maxRewardText: {
		color: '#E5DB1A',
	},
	progressLabel: {
		color: '#FFF',
		fontWeight: '600',
	},

	progressBg: {
		marginTop: 6,
		width: '85%',
		height: 15,
		backgroundColor: '#D9D9D9',
		borderRadius: 16,
		justifyContent: 'center',
		overflow: 'hidden',
	},

	progressFill: {
		height: '100%',
		backgroundColor: '#FEB032',
		borderRadius: 16,
		position: 'absolute',
		left: 0,
		top: 0,
	},

	progressPercent: {
		alignSelf: 'center',
		fontWeight: '700',
		color: '#fff',
	},

	maxReward: {
		marginTop: 8,
		color: '#FFF',
		fontWeight: '600',
	},
	containerBtn: {
		position: 'absolute',
		top: 20,
		left: 225,
		width: 60,
		height: 34,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBtn: {
		color: '#560706',
		fontWeight: '700',
		fontSize: 16,
	},
	maxContainer: {
		justifyContent: 'flex-start',
		width: '100%',
		paddingHorizontal: 30,
		alignItems: 'center',
		gap: 5,
		marginTop: 10,
		flexDirection: 'row',
	},
})
