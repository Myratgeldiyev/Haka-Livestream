import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, Text } from 'react-native'

interface Props {
	label: string
	active: boolean
	onPress: () => void
}

export function AnimatedTabMessage({ label, active, onPress }: Props) {
	const scaleAnim = useRef(new Animated.Value(active ? 1 : 0.9)).current
	const opacityAnim = useRef(new Animated.Value(active ? 1 : 0.5)).current

	useEffect(() => {
		Animated.parallel([
			Animated.spring(scaleAnim, {
				toValue: active ? 1 : 0.9,
				useNativeDriver: true,
				tension: 100,
				friction: 8,
			}),
			Animated.timing(opacityAnim, {
				toValue: active ? 1 : 0.5,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start()
	}, [active, scaleAnim, opacityAnim])

	return (
		<Pressable onPress={onPress}>
			<Animated.View
				style={[
					styles.container,
					{
						transform: [{ scale: scaleAnim }],
						opacity: opacityAnim,
					},
				]}
			>
				<Text style={[styles.text, active && styles.activeText]}>{label}</Text>
			</Animated.View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	text: {
		fontSize: 18,
		fontWeight: '700',
		color: '#999',
	},
	activeText: {
		color: '#000',
	},
})
