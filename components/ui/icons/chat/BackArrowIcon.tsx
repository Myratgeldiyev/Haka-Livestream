import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
	size?: number
	color?: string
}

export function BackArrowIcon({ size = 24, color = '#000' }: Props) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M15 18L9 12L15 6'
				stroke={color}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}
