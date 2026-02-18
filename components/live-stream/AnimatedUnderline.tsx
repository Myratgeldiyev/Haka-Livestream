import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

interface AnimatedUnderlineProps {
	isActive: boolean
	width: number
	color?: string
	height?: number
}

export function AnimatedUnderline({
	isActive,
	width,
	color = '#FFFFFF',
	height = 2,
}: AnimatedUnderlineProps) {
	const scaleX = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.spring(scaleX, {
			toValue: isActive ? 1 : 0,
			useNativeDriver: true,
			tension: 100,
			friction: 10,
		}).start()
	}, [isActive, scaleX])

	return (
		<Animated.View
			style={[
				styles.underline,
				{
					width,
					height,
					backgroundColor: color,
					transform: [{ scaleX }],
				},
			]}
		/>
	)
}

const styles = StyleSheet.create({
	underline: {
		position: 'absolute',
		bottom: 0,
		borderRadius: 1,
	},
})
