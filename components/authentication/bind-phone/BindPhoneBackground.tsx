import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BIND_PHONE } from '../constants'

export function BindPhoneBackground({ children }: { children: React.ReactNode }) {
	const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
	const layout = { width: screenWidth, height: screenHeight }

	const circles = [
		{ size: layout.width * 0.7, top: -layout.width * 0.2, left: -layout.width * 0.15 },
		{ size: layout.width * 0.6, top: layout.height * 0.1, right: -layout.width * 0.2 },
		{ size: layout.width * 0.5, bottom: layout.height * 0.2, left: -layout.width * 0.1 },
		{ size: layout.width * 0.55, top: layout.height * 0.4, right: -layout.width * 0.15 },
		{ size: layout.width * 0.45, bottom: -layout.width * 0.1, right: -layout.width * 0.1 },
	]

	return (
		<LinearGradient
			colors={[BIND_PHONE.bgGradientStart, BIND_PHONE.bgGradientEnd]}
			style={styles.gradient}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			{circles.map((c, i) => (
				<View
					key={i}
					style={[
						styles.circle,
						{
							width: c.size,
							height: c.size,
							borderRadius: c.size / 2,
							...(c.top !== undefined && { top: c.top }),
							...(c.bottom !== undefined && { bottom: c.bottom }),
							...(c.left !== undefined && { left: c.left }),
							...(c.right !== undefined && { right: c.right }),
						},
					]}
				/>
			))}
			{children}
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	gradient: {
		flex: 1,
	},
	circle: {
		position: 'absolute',
		backgroundColor: BIND_PHONE.patternColor,
	},
})
