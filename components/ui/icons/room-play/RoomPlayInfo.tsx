import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function RoomPlayInfo(props: any) {
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
				d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 12a1 1 0 110 2 1 1 0 010-2zm0-9.5a3.625 3.625 0 011.348 6.99.8.8 0 00-.305.201c-.044.05-.051.114-.05.18L13 14a1 1 0 01-1.993.117L11 14v-.25c0-1.153.93-1.845 1.604-2.116a1.626 1.626 0 10-2.229-1.509 1 1 0 01-2 0A3.625 3.625 0 0112 6.5z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default RoomPlayInfo
