import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function MicSpeakIcon(props: any) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={40} height={40} rx={20} fill='#fff' fillOpacity={0.2} />
			<Path
				d='M27.07 19.175a1 1 0 01.85 1.132A8.004 8.004 0 0121 27.103v1.062a1 1 0 11-2 0v-1.062a8.005 8.005 0 01-6.92-6.796 1 1 0 011.98-.284 6.001 6.001 0 0011.878 0 1 1 0 011.131-.848zM20 9.165a5 5 0 015 5v5a5 5 0 11-10 0v-5a5 5 0 015-5z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default MicSpeakIcon
