import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CheckIcon(props: any) {
	return (
		<Svg
			width={62}
			height={60}
			viewBox='0 0 62 60'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M31 60c17.12 0 31-13.431 31-30C62 13.431 48.12 0 31 0 13.88 0 0 13.431 0 30c0 16.569 13.88 30 31 30z'
				fill='#2F18B3'
			/>
			<Path
				d='M45.667 12l-22 21.6-7.334-7.2L9 33.6 23.667 48 53 19.2 45.667 12z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default CheckIcon
