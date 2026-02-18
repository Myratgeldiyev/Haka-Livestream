import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {
	width?: number
	height?: number
	color?: string
}

const RankDownArrowIcon: React.FC<Props> = ({
	width = 14,
	height = 10,
	color = '#fff',
	...rest
}) => {
	return (
		<Svg
			width={width}
			height={height}
			viewBox='0 0 14 10'
			fill='none'
			{...rest}
		>
			<Path d='M14 0L7 9.32 0 0h14z' fill={color} />
		</Svg>
	)
}

export default RankDownArrowIcon
