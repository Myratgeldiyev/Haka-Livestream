import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { PROFILE_DETAIL } from './constants'

function TrophyIcon({ size = 28 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 28 28' fill='none'>
			<Path
				d='M8 4h12v4H8V4zm0 4h12v2a6 6 0 01-6 6h0a6 6 0 01-6-6V8zm-2 2v2a8 8 0 008 8h0a8 8 0 008-8v-2H6zm2 10v4h8v-4h2v6H6v-6h2zM6 2h2v2H6V2zm14 0h2v2h-2V2zM10 22h8v2h-8v-2z'
				fill='#D4A017'
			/>
			<Path
				d='M14 14v6m-2-4h4'
				stroke='#8B6914'
				strokeWidth={1}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function HeartIcon({ size = 28 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 28 28' fill='none'>
			<Path
				d='M14 24S3 17 3 11a5.5 5.5 0 019.5-3.5A5.5 5.5 0 0125 11c0 6-11 13-11 13z'
				fill='#E53935'
				stroke='#C62828'
				strokeWidth={1}
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function AvatarStack() {
	return (
		<View style={avatarStyles.stack}>
			<View style={[avatarStyles.circle, avatarStyles.backLeft]} />
			<View style={[avatarStyles.circle, avatarStyles.backRight]} />
			<View style={[avatarStyles.circle, avatarStyles.front]} />
		</View>
	)
}

const avatarStyles = StyleSheet.create({
	stack: {
		width: 48,
		height: 24,
		position: 'relative',
	},
	circle: {
		position: 'absolute',
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#4D77FF',
		borderWidth: 2,
		borderColor: '#fff',
	},
	backLeft: {
		left: 0,
		top: 2,
		width: 16,
		height: 16,
		borderRadius: 8,
	},
	backRight: {
		right: 0,
		top: 2,
		width: 16,
		height: 16,
		borderRadius: 8,
	},
	front: {
		left: 14,
		top: 0,
		width: 22,
		height: 22,
		borderRadius: 11,
	},
})

export type FansRankingVariant = 'trophy' | 'heart'

interface FansRankingButtonProps {
	variant: FansRankingVariant
	onPress?: () => void
}

export function FansRankingButton({
	variant,
	onPress,
}: FansRankingButtonProps) {
	const Icon = variant === 'trophy' ? TrophyIcon : HeartIcon
	return (
		<Pressable style={styles.wrapper} onPress={onPress}>
			<Image source={require('@/assets/images/fansRanking.png')} />
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		minHeight: 72,
		borderRadius: PROFILE_DETAIL.fansCardBorderRadius,
		backgroundColor: PROFILE_DETAIL.fansRankingBg,
		overflow: 'hidden',
		position: 'relative',
	},
	patternBg: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: PROFILE_DETAIL.fansRankingBg,
		opacity: 1,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
		gap: 10,
	},
	right: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
})
