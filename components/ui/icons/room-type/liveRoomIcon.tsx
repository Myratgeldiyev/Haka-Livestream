import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LiveRoomIcon(props: any) {
	return (
		<Svg
			width={14}
			height={14}
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M4.5 8.807V5.043a1 1 0 011.447-.894L9.711 6.03a1 1 0 010 1.788L5.947 9.7A1 1 0 014.5 8.807z'
				fill='#2859C5'
			/>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.09.009a.75.75 0 00-.232 1.482A5.502 5.502 0 017 12.425 5.5 5.5 0 011.884 8.95a.75.75 0 00-1.394.552A7.002 7.002 0 0014 6.925 7 7 0 008.09.009zm-2.466 1.49A.75.75 0 005.251.048a7 7 0 00-.938.314.75.75 0 10.576 1.385c.237-.099.482-.18.735-.246M3.17 2.88a.75.75 0 00-1.044-1.076A7 7 0 00.917 3.36a.75.75 0 101.303.744c.258-.452.578-.864.95-1.224zM1.554 6.052a.75.75 0 10-1.485-.21A7 7 0 000 6.828a.75.75 0 001.5 0c0-.264.018-.523.054-.776z'
				fill='#8FBFFA'
			/>
		</Svg>
	)
}

export default LiveRoomIcon
