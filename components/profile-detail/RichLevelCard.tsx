import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { PROFILE_DETAIL } from './constants'

function RichIcon({ size = 44 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 44 44' fill='none'>
			<Path
				d='M22 2l4.5 9 10 1.5-7.25 7 1.75 10L22 25l-8.5 4.5 1.75-10-7.25-7 10-1.5L22 2z'
				fill='#FFB02E'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinejoin='round'
			/>
			<Path d='M22 14a4 4 0 110 8 4 4 0 010-8z' fill='#fff' opacity={0.9} />
		</Svg>
	)
}

interface RichLevelCardProps {
	level: number
	sent: string
	onPress?: () => void
}

export function RichLevelCard({ level, sent, onPress }: RichLevelCardProps) {
	return (
		<Pressable style={styles.wrapper} onPress={onPress}>
			<LinearGradient
				colors={[...PROFILE_DETAIL.richGradient]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradient}
			>
				<View style={styles.iconWrap}>
					<Image
						style={{ width: 44, height: 44 }}
						source={require('@/assets/images/rich-label.png')}
					/>
				</View>
				<View style={styles.textWrap}>
					<Text style={styles.title}>RICH</Text>
					<Text style={styles.sub}>Level: {level}</Text>
					<Text style={styles.sub}>Sent: {sent}</Text>
				</View>
			</LinearGradient>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		minHeight: 88,

		borderWidth: 1,
		borderColor: '#009FD9',
		borderRadius: PROFILE_DETAIL.cardBorderRadius,
	},
	gradient: {
		flex: 1,

		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderRadius: PROFILE_DETAIL.cardBorderRadius,
		gap: 12,
	},
	iconWrap: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	textWrap: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
		letterSpacing: 0.5,
	},
	sub: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#fff',
		opacity: 0.95,
		textAlign: 'center',
	},
})
