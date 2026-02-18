import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { PROFILE_DETAIL } from './constants'

function CharmIcon({ size = 44 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 44 44' fill='none'>
			<Path
				d='M22 4l3 6 6.5 1-4.75 4.5 1.25 7L22 19l-5.5 3.5 1.25-7L13 11l6.5-1L22 4z'
				fill='#9D7BDB'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinejoin='round'
			/>
			<Path d='M22 16a3 3 0 110 6 3 3 0 010-6z' fill='#FFD700' opacity={0.95} />
		</Svg>
	)
}

interface CharmLevelCardProps {
	level: number
	received: string
	onPress?: () => void
}

export function CharmLevelCard({
	level,
	received,
	onPress,
}: CharmLevelCardProps) {
	return (
		<Pressable style={styles.wrapper} onPress={onPress}>
			<LinearGradient
				colors={[...PROFILE_DETAIL.charmGradient]}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={styles.gradient}
			>
				<View style={styles.iconWrap}>
					<Image
						style={{ width: 44, height: 44 }}
						source={require('@/assets/images/charm-label.png')}
					/>
				</View>
				<View style={styles.textWrap}>
					<Text style={styles.title}>CHARM</Text>
					<Text style={styles.sub}>Level: {level}</Text>
					<Text style={styles.sub}>Received: {received}</Text>
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
		borderColor: '#E04F5F',
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
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
		letterSpacing: 0.5,
		textAlign: 'center',
	},
	sub: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#fff',
		opacity: 0.95,
		textAlign: 'center',
	},
})
