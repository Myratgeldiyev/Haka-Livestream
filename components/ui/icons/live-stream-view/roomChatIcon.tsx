import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function RoomChatIcon(props: any) {
	return (
		<Svg
			width={25}
			height={25}
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={25} height={25} rx={12.5} fill='#FC0' />
			<Path
				d='M6.364 12.5C5.614 12.5 5 11.9 5 11.167V7.833C5 7.1 5.614 6.5 6.364 6.5h5.454c.75 0 1.364.6 1.364 1.333v3.334c0 .733-.614 1.333-1.364 1.333h-1.364v2l-2.045-2H6.364zm12.272 4c.75 0 1.364-.6 1.364-1.333v-3.334c0-.733-.614-1.333-1.364-1.333h-4.09v.667c0 1.466-1.228 2.666-2.728 2.666v1.334c0 .733.614 1.333 1.364 1.333h1.364v2l2.045-2h2.045z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default RoomChatIcon
