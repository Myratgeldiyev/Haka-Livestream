import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function PhotoRoomPlay(props: any) {
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
				d='M17.5 1h-15A1.5 1.5 0 001 2.5v15A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 1z'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M7 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm4.895 1.61a1 1 0 011.622.027l4.387 6.291a1 1 0 01-.82 1.572H6l5.895-7.89z'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default PhotoRoomPlay
