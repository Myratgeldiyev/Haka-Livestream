import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import FirstFamilyIcon from '../ui/icons/family/FirstFamilyIcon'
import SecondFamilyIcon from '../ui/icons/family/SecondFamilyIcon'
import ThirdFamilyIcon from '../ui/icons/family/ThirdFamilyIcon'

interface FamilyRankBadgeProps {
	rank: number
}

function RibbonBadge({ rank }: { rank: number }) {
	return (
		<View style={badgeStyles.ribbonWrap}>
			<Svg width={28} height={36} viewBox='0 0 28 36' fill='none'>
				<Path d='M14 0L28 8v12L14 36L0 20V8L14 0z' fill='#000' />
			</Svg>
			<View style={badgeStyles.ribbonTextWrap}>
				<Text style={badgeStyles.ribbonText}>{rank}</Text>
			</View>
		</View>
	)
}

function MedalBadge({ rank }: { rank: number }) {
	return (
		<View style={badgeStyles.medalWrap}>
			<Svg width={32} height={40} viewBox='0 0 32 40' fill='none'>
				<Path
					d='M16 0c4 0 7 3 7 7v4c4 1 7 4 7 9 0 5-3 8-7 9l2 11H9l2-11c-4-1-7-4-7-9 0-5 3-8 7-9V7c0-4 3-7 7-7z'
					fill='#000'
				/>
			</Svg>
			<View style={badgeStyles.medalTextWrap}>
				<Text style={badgeStyles.medalText}>{rank}</Text>
			</View>
		</View>
	)
}

const badgeStyles = StyleSheet.create({
	ribbonWrap: {
		width: 28,
		height: 36,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ribbonTextWrap: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ribbonText: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
		lineHeight: lineHeights.lg,
	},
	medalWrap: {
		width: 32,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	medalTextWrap: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 4,
	},
	medalText: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
		lineHeight: lineHeights.lg,
	},
})

export function FamilyRankBadge({ rank }: FamilyRankBadgeProps) {
	if (rank === 1) {
		return <FirstFamilyIcon />
	}
	if (rank === 2) {
		return <SecondFamilyIcon />
	}
	if (rank === 3) {
		return <ThirdFamilyIcon />
	}
	return (
		<View style={styles.numberWrap}>
			<Text style={styles.numberText}>{rank}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	numberWrap: {
		minWidth: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	numberText: {
		fontSize: fontSizes.xxl,
		fontWeight: fontWeights.bold,
		color: '#000',
		lineHeight: lineHeights.xxl,
	},
})
