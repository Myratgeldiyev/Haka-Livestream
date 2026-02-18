import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function RankLeftArrow(props: any) {
	return (
		<Svg
			width={10}
			height={14}
			viewBox='0 0 10 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path d='M9.32 14L0 7l9.32-7v14z' fill='#000' />
		</Svg>
	)
}

export default RankLeftArrow
