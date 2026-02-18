import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function MessageRoomPlay(props: any) {
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
				d='M4.455 16L0 19.5V1a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H4.455zm-.692-2H18V2H2v13.385L3.763 14zM9 7h2v2H9V7zM5 7h2v2H5V7zm8 0h2v2h-2V7z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default MessageRoomPlay
