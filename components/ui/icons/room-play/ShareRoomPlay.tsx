import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ShareRoomPlay(props: any) {
	return (
		<Svg
			width={20}
			height={20}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M12 1h7v7M19 12.737V17.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 011 17.5v-15A1.5 1.5 0 012.5 1H7M10.9 9.1l7.65-7.65'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default ShareRoomPlay
