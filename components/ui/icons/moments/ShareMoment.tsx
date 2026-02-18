import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ShareMoment(props: any) {
	return (
		<Svg
			width={24}
			height={20}
			viewBox='0 0 24 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M24 9.333L14.667 0v5.333C5.333 6.667 1.333 13.333 0 20c3.333-4.667 8-6.8 14.667-6.8v5.467L24 9.333z'
				fill={props.color}
			/>
		</Svg>
	)
}

export default ShareMoment
