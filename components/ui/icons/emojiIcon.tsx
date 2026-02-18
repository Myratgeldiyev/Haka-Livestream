import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function EmojiIcon(props: any) {
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
				fillRule='evenodd'
				clipRule='evenodd'
				d='M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm2.8 11.857A3.98 3.98 0 0110 13a3.98 3.98 0 01-2.8-1.143 1 1 0 10-1.4 1.428A5.98 5.98 0 0010 15a5.98 5.98 0 004.2-1.715 1 1 0 00-1.4-1.428zM6.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default EmojiIcon
