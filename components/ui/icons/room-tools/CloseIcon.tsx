import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CloseIcon(props: any) {
	return (
		<Svg
			width={12}
			height={12}
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M.75 11.236l5.243-5.243 5.243 5.243m0-10.486L5.992 5.993.75.75'
				stroke='#000'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default CloseIcon
