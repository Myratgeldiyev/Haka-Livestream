import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AlertArrow(props: any) {
	return (
		<Svg
			width={15}
			height={14}
			viewBox='0 0 15 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M1 0L0 1.457 10.5 6.66 0 11.862l1 1.457 13.5-6.66L1 0z'
				fill='#D0AF1A'
			/>
		</Svg>
	)
}

export default AlertArrow
