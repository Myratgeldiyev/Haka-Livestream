import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

type IndiaFlagRoundedProps = {
	size?: number
}

function IndiaFlagRounded({ size = 32 }: IndiaFlagRoundedProps) {
	return (
		<Svg width={size} height={size} viewBox='0 0 32 32' fill='none'>
			<Circle cx={16} cy={16} r={1} fill='#fff' />
			<Path d='M0 0h32v10H0z' fill='#FF9933' />
			<Path d='M0 10h32v12H0z' fill='#FFFFFF' />
			<Path d='M0 22h32v10H0z' fill='#138808' />
			<Circle cx={16} cy={16} r={3} stroke='#000080' strokeWidth={1} />
		</Svg>
	)
}

export default IndiaFlagRounded
