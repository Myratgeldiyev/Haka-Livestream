import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
interface P {
	color?: string
	props?: any
	width?: number
	height?: number
}
function RightArrowIcon({ color = '#fff', props, width = 12, height = 24 }: P) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox='0 0 12 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.657 12l-7.071 7.07L3 20.486l7.778-7.778a1 1 0 000-1.414L3 3.515 1.586 4.929l7.071 7.07z'
				fill={color}
				fillOpacity={0.7}
			/>
		</Svg>
	)
}

export default RightArrowIcon
