import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import CheckIcon from '../ui/icons/become-agent/CheckIcon'
import RightArrowIcon from '../ui/icons/profile-header/right-arrow'

const { height } = Dimensions.get('window')

export const ApplySuccess = () => {
	const translateY = useRef(new Animated.Value(height)).current
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(true)
			Animated.timing(translateY, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}).start()
		}, 1500)

		return () => clearTimeout(timer)
	}, [])

	const closeOverlay = () => {
		Animated.timing(translateY, {
			toValue: height,
			duration: 350,
			useNativeDriver: true,
		}).start(() => {
			setVisible(false)
		})
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('@/assets/images/haka-agency.png')}
				style={styles.imageBackground}
				imageStyle={styles.image}
				resizeMode='cover'
			>
				<View style={styles.block} />
				<View style={styles.blockWrapper}>
					<Text style={styles.heading}>Haka Agency policy</Text>
					<Text style={styles.text}>Abundant share ratio | Vast bonus</Text>
					<Pressable style={styles.button}>
						<Text style={styles.buttonTxt}>View details</Text>
						<RightArrowIcon props={8} color={'#E61662'} />
					</Pressable>
				</View>
			</ImageBackground>

			<View style={styles.successContent}>
				<CheckIcon />
				<Text style={styles.successTitle}>Application Success</Text>

				<View style={styles.containerWrapper}>
					<View style={styles.imagePlaceholder} />
					<Text style={styles.username}>Samir</Text>
				</View>
			</View>

			{visible && (
				<View style={StyleSheet.absoluteFill}>
					<Pressable style={styles.backdrop} onPress={closeOverlay} />

					<Animated.View
						style={[styles.overlay, { transform: [{ translateY }] }]}
					>
						<Text style={styles.overlayTitle}>
							You have the secure agency role
						</Text>
						<Text style={styles.overlayText}>
							We need to restart the app and switch your identity
						</Text>
						<Pressable
							style={styles.submitButton}
							onPress={() => router.replace('/(tabs)/live')}
						>
							<Text style={styles.submitText}>Restart</Text>
						</Pressable>
					</Animated.View>
				</View>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	imageBackground: {
		flexDirection: 'row',
		height: 180,
		marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 12,
		overflow: 'hidden',
	},
	image: {
		borderRadius: 12,
	},
	block: {
		width: '30%',
	},
	blockWrapper: {
		justifyContent: 'center',
	},
	heading: {
		fontSize: 28,
		fontWeight: '600',
		color: '#fff',
	},
	text: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '500',
	},
	button: {
		marginTop: 10,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	buttonTxt: {
		fontWeight: '600',
		color: '#E61662',
		fontSize: 14,
	},

	successContent: {
		flex: 1,
		marginTop: 80,
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	successTitle: {
		fontSize: 22,
		fontWeight: '600',
		marginTop: 20,
	},
	containerWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
	},
	imagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#D9D9D9',
		marginRight: 12,
	},
	username: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},

	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	overlay: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 322,
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 24,
	},
	overlayTitle: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 8,
	},
	overlayText: {
		textAlign: 'center',
		fontSize: 14,
		color: '#555',
	},
	submitButton: {
		marginTop: 40,
		backgroundColor: '#804EE4',
		height: 48,
		width: 300,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	submitText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
})
