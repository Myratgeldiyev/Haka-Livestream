import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function MoreVideo(props: any) {
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
				d='M4.5 14.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm7.5 0a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm7.5 0a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default MoreVideo
