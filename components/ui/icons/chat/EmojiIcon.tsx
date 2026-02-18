import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

interface Props {
	size?: number
	color?: string
}

export function EmojiIcon({ size = 24, color = '#667085' }: Props) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.5} />
			<Circle cx={9} cy={10} r={1.5} fill={color} />
			<Circle cx={15} cy={10} r={1.5} fill={color} />
			<Path
				d='M8 14C8.5 15.5 10 17 12 17C14 17 15.5 15.5 16 14'
				stroke={color}
				strokeWidth={1.5}
				strokeLinecap='round'
			/>
		</Svg>
	)
}
