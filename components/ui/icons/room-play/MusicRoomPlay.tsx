import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function MusicRoomPlay(props: any) {
	return (
		<Svg
			width={20}
			height={19}
			viewBox='0 0 20 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M6.375 14.9c0 1.573-1.26 2.85-2.812 2.85C2.009 17.75.75 16.472.75 14.9c0-1.574 1.26-2.85 2.813-2.85 1.553 0 2.812 1.275 2.812 2.85zm0 0V2.71c0-.52.394-.954.909-1L17.659.753a1 1 0 011.091 1.001V13.76c0 1.573-1.26 2.85-2.812 2.85-1.554 0-2.813-1.277-2.813-2.85 0-1.573 1.26-2.85 2.813-2.85 1.553 0 2.812 1.278 2.812 2.852'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default MusicRoomPlay
