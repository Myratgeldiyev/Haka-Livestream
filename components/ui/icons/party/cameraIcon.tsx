import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function VideoCameraIcon(props: any) {
	return (
		<Svg
			width={40}
			height={36}
			viewBox='0 0 40 36'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={40} height={36} rx={18} fill='#42ADE2' fillOpacity={0.5} />
			<Path
				d='M27 12h-1.586l-1-1c-.579-.579-1.595-1-2.414-1h-4c-.819 0-1.835.421-2.414 1l-1 1H13c-1.654 0-3 1.346-3 3v8c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-8c0-1.654-1.346-3-3-3zm-7 10a3.5 3.5 0 11.001-7.001A3.5 3.5 0 0120 22zm6-4.701a1.299 1.299 0 110-2.598 1.299 1.299 0 010 2.598z'
				fill='#08F'
			/>
		</Svg>
	)
}

export default VideoCameraIcon
