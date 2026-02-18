import React, { useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text } from 'react-native'

interface AnimatedTabProps {
	label: string
	active?: boolean
	onPress?: () => void
}

export function AnimatedTabMessage({
	label,
	active = false,
	onPress,
}: AnimatedTabProps) {
	const scaleAnim = useRef(new Animated.Value(1)).current

	const handlePressIn = () => {
		Animated.spring(scaleAnim, {
			toValue: 0.92,
			useNativeDriver: true,
			tension: 100,
			friction: 7,
		}).start()
	}

	const handlePressOut = () => {
		Animated.spring(scaleAnim, {
			toValue: 1,
			useNativeDriver: true,
			tension: 100,
			friction: 7,
		}).start()
	}

	return (
		<Pressable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View
				style={{
					transform: [{ scale: scaleAnim }],
				}}
			>
				<Text style={[styles.tab, active && styles.activeTab]}>{label}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	tab: {
		fontSize: 16,
		fontWeight: '500',
		color: '#999',
	},
	activeTab: {
		fontWeight: '700',
		color: '#000',
	},
})
