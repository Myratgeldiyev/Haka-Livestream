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
import { CountdownTimer } from './CountdownTimer'
import { RankTabKey } from './RankTabs'

type Props = {
	backgroundImage: ImageSourcePropType
	title: string
	subtitle: string
}

export const RankHeaderCity: React.FC<Props> = ({
	backgroundImage,
	title,
	subtitle,
}) => {
	const insets = useSafeAreaInsets()
	const [activeTab, setActiveTab] = useState<RankTabKey>('State')

	return (
		<ImageBackground source={backgroundImage} style={styles.container}>
			<View style={[styles.topBar, { top: insets.top + 8 }]}>
				<Pressable onPress={() => router.back()}>
					<LeftArrowIcon props color='#fff' />
				</Pressable>
			</View>
			<View style={styles.textWrapper}>
				<Image source={require('@/assets/images/city-star.png')} />
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.countText}>End Countdown</Text>
				<Pressable onPress={() => {}}>
					<LinearGradient
						colors={['#FEE77E', '#FFB628']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={styles.containerBtn}
					>
						<Text style={styles.textBtn}>NO.2</Text>
					</LinearGradient>
				</Pressable>
			</View>
			<View style={styles.center}>
				<CountdownTimer time='08:08:08' />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 360,
		width: '100%',
		position: 'relative',
	},
	textWrapper: {
		flex: 1,
		marginTop: 50,
		alignItems: 'center',
	},
	title: {
		color: '#FFF063',
		fontSize: 42,
		fontWeight: '600',
		textAlign: 'center',
		textShadowColor: 'rgba(0,0,0,0.45)',
		textShadowOffset: { width: 0, height: 3 },
		textShadowRadius: 6,
	},

	topBar: {
		position: 'absolute',
		left: 16,
		right: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	icon: {
		color: '#FFF',
		fontSize: 18,
	},
	countText: {
		color: '#5B3213',
		fontWeight: '600',
		marginTop: 10,
	},

	center: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 150,
		alignItems: 'center',
	},

	country: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingHorizontal: 12,
		paddingVertical: 5,

		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		gap: 6,
	},

	flag: {
		fontSize: 16,
	},

	countryText: {
		fontSize: 18,
		color: '#FFF',
		fontWeight: '600',
	},

	arrow: {
		color: '#FFF',
		fontSize: 16,
	},
	containerBtn: {
		position: 'absolute',
		top: -140,
		right: -200,
		width: 90,
		height: 50,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBtn: {
		color: '#560706',
		fontWeight: '700',
		fontSize: 16,
	},
})
