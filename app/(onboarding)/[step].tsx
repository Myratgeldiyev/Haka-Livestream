import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useLocalSearchParams } from 'expo-router'
import {
	Dimensions,
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import React, { useEffect, useState } from 'react'
import Svg, { Path } from 'react-native-svg'

const { width, height } = Dimensions.get('window')

type OnboardingItem = {
	id: string
	title: string
	description: string
	image: any
}
const ANDROID_BOTTOM_EXTRA = Platform.OS === 'android' ? height * 0.08 : 0
const DATA: OnboardingItem[] = [
	{
		id: '1',
		title: 'Meet, Chat & Connect',
		description:
			'Find genuine connections in real time. Stream, share, and build moments that matter.',
		image: require('../../assets/images/Unsplash Image.png'),
	},
	{
		id: '2',
		title: 'Go Live, Feel Alive',
		description:
			'Share your energy, your stories, and your charm—connect instantly with people who get you.',
		image: require('../../assets/images/Unsplash Image.png'),
	},
	{
		id: '3',
		title: 'Intimacy Without Distance',
		description:
			'Break the barriers. Enjoy meaningful chats and live moments with people from anywhere.',
		image: require('../../assets/images/Unsplash Image2.png'),
	},
]

export default function OnboardingStepScreen() {
	const { step } = useLocalSearchParams<{ step: string }>()
	const [currentIndex, setCurrentIndex] = useState(0)

	const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / width)
		setCurrentIndex(index)
	}

	const finishOnboarding = async () => {
		await AsyncStorage.setItem('onboarding_seen', 'true')
		router.replace('/(auth)/sign-up')
	}

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null

		if (currentIndex === DATA.length - 1) {
			timer = setTimeout(() => {
				finishOnboarding()
			}, 2000)
		}

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [currentIndex])

	return (
		<View style={styles.container}>
			<StatusBar translucent backgroundColor='transparent' />

			<FlatList
				data={DATA}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={onScrollEnd}
				keyExtractor={item => item.id}
				bounces={false}
				renderItem={({ item }) => (
					<View style={{ width }}>
						<Image source={item.image} style={styles.image} />

						<View style={styles.pinkWrapper}>
							<Svg
								width={width}
								height={140}
								viewBox={`0 0 ${width} 140`}
								style={styles.svg}
							>
								<Path
									d={`
										M 0 30
										Q ${width * 0.45} 140 ${width} 80
										L ${width} 140
										L 0 140
										Z
									`}
									fill='#DB1359'
								/>
							</Svg>

							<View style={styles.pinkContent}>
								<Text style={styles.title}>{item.title}</Text>
								<Text style={styles.subtitle}>{item.description}</Text>

								{currentIndex === DATA.length - 1 && (
									<Text style={styles.autoText}>Continuing...</Text>
								)}
							</View>
						</View>
					</View>
				)}
			/>

			<View style={styles.dotsContainer}>
				{DATA.map((_, index) => (
					<View
						key={index}
						style={[styles.dot, index === currentIndex && styles.dotActive]}
					/>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},

	image: {
		width: '100%',
		height: height * 0.6,
		resizeMode: 'cover',
	},
	pinkWrapper: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		minHeight: height * 0.45 + ANDROID_BOTTOM_EXTRA,
	},

	svg: {
		position: 'absolute',
		top: -120,
	},

	pinkContent: {
		flex: 1,
		backgroundColor: '#DB1359',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 30,
		paddingBottom: Platform.OS === 'android' ? 32 : 0,
	},

	title: {
		fontSize: 24,
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 12,
		fontFamily: 'Poppins',
		letterSpacing: -0.33,
	},

	subtitle: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		lineHeight: 24,
		fontWeight: '300',
		letterSpacing: -0.33,
	},

	autoText: {
		marginTop: 16,
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)',
	},

	dotsContainer: {
		position: 'absolute',
		bottom: 40,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
	},

	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(255,255,255,0.4)',
	},

	dotActive: {
		backgroundColor: '#fff',
		width: 10,
	},
})
