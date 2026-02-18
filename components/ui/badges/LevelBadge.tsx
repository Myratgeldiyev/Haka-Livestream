import { fontSizes, fontWeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
	ClipPath,
	Defs,
	default as G,
	Path,
	default as Svg,
} from 'react-native-svg'

interface LevelBadgeProps {
	level: string | number
}

export function LevelBadge({ level }: LevelBadgeProps) {
	return (
		<View style={styles.container}>
			<DiamondIcon />
			<Text style={styles.levelText}>{level}</Text>
		</View>
	)
}

function DiamondIcon(props: any) {
	return (
		<Svg
			width={12}
			height={12}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<G clipPath='url(#clip0_1603_727)'>
				<Path
					d='M11.287 5.194c.45.45.45 1.181 0 1.612l-4.48 4.481c-.45.45-1.182.45-1.613 0L.713 6.807c-.45-.45-.45-1.182 0-1.613L5.193.713c.45-.45 1.182-.45 1.613 0l4.481 4.48z'
					fill='#9970C4'
				/>
				<Path
					d='M10.763 5.269c.393.394.393 1.05 0 1.462L6.73 10.763c-.393.393-1.05.393-1.462 0L1.238 6.73c-.394-.393-.394-1.05 0-1.462l4.03-4.031c.395-.394 1.051-.394 1.463 0l4.032 4.03z'
					fill='#ACE1EF'
				/>
				<Path
					d='M9.563 4.313h-.47L7.689 2.905v-.469l.75-.75h.468l1.406 1.407v.469l-.75.75zm-6 6h-.47L1.689 8.905v-.469l.75-.75h.468l1.406 1.407v.469l-.75.75zm6-2.626h-.47L7.689 9.095v.469l.75.75h.468l1.406-1.407v-.469l-.75-.75zm-6-6h-.47L1.689 3.095v.469l.75.75h.468l1.406-1.407v-.469l-.75-.75zM6.43 6l1.631-2.063L6 5.57 3.937 3.938 5.57 6 3.938 8.063 6 6.43l2.063 1.631L6.43 6z'
					fill='#42ADE2'
				/>
				<Path
					d='M7.406 5.794a.318.318 0 010 .431l-1.2 1.2a.318.318 0 01-.43 0l-1.2-1.2a.318.318 0 010-.43l1.2-1.2a.318.318 0 01.43 0l1.2 1.2z'
					fill='#fff'
				/>
			</G>
			<Defs>
				<ClipPath id='clip0_1603_727'>
					<Path fill='#fff' d='M0 0H12V12H0z' />
				</ClipPath>
			</Defs>
		</Svg>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#B8E4F0',
		paddingHorizontal: 4,
		paddingVertical: 2,
		borderRadius: 12,
		gap: 4,
	},
	levelText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.bold,
		color: '#FFF',
	},
})
