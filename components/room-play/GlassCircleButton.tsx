import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const BACKGROUND = '#2C2440'
const GLASS_BASE = '#4B4367'
const GLASS_LIGHT = '#5A5278'
const GLASS_DARK = '#3D3555'
const GLASS_TRANSPARENT = 'rgba(75, 67, 103, 0.92)'
const TOP_REFLECTION = 'rgba(255, 255, 255, 0.22)'
const TOP_REFLECTION_MID = 'rgba(255, 255, 255, 0.06)'
const TOP_REFLECTION_END = 'rgba(255, 255, 255, 0)'
const HOTSPOT = 'rgba(255, 255, 255, 0.12)'
const HOTSPOT_END = 'rgba(255, 255, 255, 0)'
const EDGE_STROKE = 'rgba(255, 255, 255, 0.35)'
const SHADOW_COLOR = '#1B1628'

const CIRCLE_SIZE = SCREEN_WIDTH * 0.75

function GlassEdgeArc({ size }: { size: number }) {
	const r = size / 2
	const pathLeftTop = `M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0`
	const pathRightBottom = `M ${size} ${r} A ${r} ${r} 0 0 1 ${r} ${size}`
	return (
		<Svg
			width={size}
			height={size}
			style={StyleSheet.absoluteFill}
			pointerEvents="none"
			viewBox={`0 0 ${size} ${size}`}
		>
			<Path
				d={pathLeftTop}
				fill="none"
				stroke={EDGE_STROKE}
				strokeWidth={1.25}
				strokeLinecap="round"
			/>
			<Path
				d={pathRightBottom}
				fill="none"
				stroke={EDGE_STROKE}
				strokeWidth={1.25}
				strokeLinecap="round"
			/>
		</Svg>
	)
}

function SpeakerIcon() {
	return (
		<Svg
			width={48}
			height={48}
			viewBox="0 0 24 24"
			fill="none"
			style={styles.speakerSvg}
		>
			<Path
				d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
				fill="#FFFFFF"
			/>
		</Svg>
	)
}

export function GlassCircleButton({
	size = CIRCLE_SIZE,
	children,
	fullScreen = false,
}: {
	size?: number
	children?: React.ReactNode
	fullScreen?: boolean
}) {
	const content = (
		<View
			style={[
				styles.circleWrap,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
				},
		 ]}
		>
			<LinearGradient
				colors={[GLASS_LIGHT, GLASS_BASE, GLASS_TRANSPARENT, GLASS_DARK]}
				locations={[0, 0.35, 0.6, 1]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={[StyleSheet.absoluteFill, styles.circleRadius]}
			/>
			<View style={[StyleSheet.absoluteFill, styles.circleRadius, styles.topReflectionWrap]}>
				<LinearGradient
					colors={[TOP_REFLECTION, TOP_REFLECTION_MID, TOP_REFLECTION_END]}
					locations={[0, 0.4, 1]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={StyleSheet.absoluteFill}
				/>
			</View>
			<View style={[StyleSheet.absoluteFill, styles.circleRadius, styles.topReflectionWrap]}>
				<LinearGradient
					colors={[HOTSPOT, HOTSPOT_END]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={StyleSheet.absoluteFill}
				/>
			</View>
			<GlassEdgeArc size={size} />
			<View style={styles.iconWrap} pointerEvents="none">
				{children ?? <SpeakerIcon />}
			</View>
		</View>
	)

	if (fullScreen) {
		return (
			<View style={styles.screen}>
				{content}
			</View>
		)
	}
	return content
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: BACKGROUND,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: SCREEN_HEIGHT,
	},
	circleWrap: {
		position: 'relative',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		...Platform.select({
			ios: {
				shadowColor: SHADOW_COLOR,
				shadowOffset: { width: 6, height: 8 },
				shadowOpacity: 0.6,
				shadowRadius: 12,
			},
			android: { elevation: 10 },
		}),
	},
	circleRadius: {
		borderRadius: 9999,
	},
	topReflectionWrap: {
		overflow: 'hidden',
		borderRadius: 9999,
	},
	iconWrap: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
	speakerSvg: {
		...Platform.select({
			ios: {
				shadowColor: '#FFFFFF',
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.6,
				shadowRadius: 6,
			},
			android: {},
		}),
	},
})
