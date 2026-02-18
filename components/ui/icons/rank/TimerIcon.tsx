import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function TimerIcon(props: any) {
	return (
		<Svg
			width={14}
			height={16}
			viewBox='0 0 14 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M7.501 5.1a.5.5 0 00-1 0V8h-3a.5.5 0 000 1h3.5a.5.5 0 00.5-.5V5.1z'
				fill='#fff'
			/>
			<Path
				d='M5.5.5A.5.5 0 016 0h2a.5.5 0 110 1v.57c1.36.196 2.595.78 3.585 1.64l.012-.013.354-.354-.354-.353a.5.5 0 11.707-.708l1.414 1.415a.5.5 0 11-.707.707l-.353-.354-.354.354-.013.012A7 7 0 116 1.571V1a.5.5 0 01-.5-.5zm1.5 2a6 6 0 10.002 12A6 6 0 007 2.5z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default TimerIcon
