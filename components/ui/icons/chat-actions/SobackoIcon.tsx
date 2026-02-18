import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SobackoIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M8 12a4 4 0 108 0 4 4 0 00-8 0z'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M16 12v1.5a2.5 2.5 0 105 0V12a9 9 0 10-5.5 8.28'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default SobackoIcon
