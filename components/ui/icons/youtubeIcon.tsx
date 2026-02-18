import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function YoutubeIcon(props: any) {
	return (
		<Svg
			width={50}
			height={45}
			viewBox='0 0 50 45'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M27.98 22.5l-6.48 3.645v-7.29l6.48 3.645z'
				fill='#5F22D9'
				stroke='#5F22D9'
			/>
			<Path
				d='M25 13c12 0 12 0 12 9.5S37 32 25 32s-12 0-12-9.5S13 13 25 13z'
				stroke='#5F22D9'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default YoutubeIcon
