import { spacing } from '@/constants/spacing'
import React, { useRef } from 'react'
import {
	Animated,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

export const TopicEventBanner: React.FC = () => {
	const scaleAnim = useRef(new Animated.Value(1)).current

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.97,
			useNativeDriver: true,
			tension: 120,
			friction: 8,
		}).start()
	}

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
			tension: 120,
			friction: 8,
		}).start()
	}

	return (
		<TouchableOpacity
			activeOpacity={0.95}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			style={styles.wrapper}
		>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
				<ImageBackground
					source={require('@/assets/images/topic-event.png')}
					style={styles.container}
					imageStyle={styles.image}
				/>
			</Animated.View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: spacing.sm,
		marginTop: spacing.sm,
	},
	container: {
		height: 96,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		borderRadius: 16,
	},
})
