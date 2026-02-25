import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function DownArrowIcon(props: any) {
	return (
		<Svg
			width={16}
			height={11}
			viewBox='0 0 16 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M16 .701L14.25 0 8 7.363 1.75 0 0 .701l8 9.466 8-9.466z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default DownArrowIcon
