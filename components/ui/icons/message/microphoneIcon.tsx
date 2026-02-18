import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function MicrophoneIcon(props: any) {
	return (
		<Svg
			width={10}
			height={16}
			viewBox='0 0 10 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M4.994 0a2.826 2.826 0 00-2.826 2.826v5.217a2.826 2.826 0 005.652 0V2.826A2.826 2.826 0 004.994 0z'
				fill='#fff'
			/>
			<Path
				d='M1.304 8.044a.652.652 0 00-1.304 0A5 5 0 004.348 13v.912H2.39a.652.652 0 100 1.304H7.61a.652.652 0 000-1.304H5.652V13A5 5 0 0010 8.044a.652.652 0 00-1.304 0 3.695 3.695 0 11-7.392 0z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default MicrophoneIcon
