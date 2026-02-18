import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function GreenFlowerIcon(props: any) {
	return (
		<Svg
			width={10}
			height={10}
			viewBox='0 0 10 10'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M8.25 5A1.75 1.75 0 0010 3.25 3.25 3.25 0 006.75 0 1.75 1.75 0 005 1.75 1.75 1.75 0 003.25 0 3.25 3.25 0 000 3.25 1.75 1.75 0 001.75 5 1.75 1.75 0 000 6.75 3.25 3.25 0 003.25 10 1.75 1.75 0 005 8.25 1.75 1.75 0 006.75 10 3.25 3.25 0 0010 6.75 1.75 1.75 0 008.25 5zM5 7a2 2 0 110-4 2 2 0 010 4zm1.25-2a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z'
				fill='#18AC58'
			/>
		</Svg>
	)
}

export default GreenFlowerIcon
