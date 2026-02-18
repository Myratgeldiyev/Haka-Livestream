import * as React from 'react'
import Svg, { Rect } from 'react-native-svg'

function BgRoomIcon(props: any) {
	return (
		<Svg
			width={64}
			height={58}
			viewBox='0 0 64 58'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect
				width={64}
				height={57.999}
				rx={28.9995}
				fill='#fff'
				fillOpacity={0.1}
			/>
		</Svg>
	)
}

export default BgRoomIcon
