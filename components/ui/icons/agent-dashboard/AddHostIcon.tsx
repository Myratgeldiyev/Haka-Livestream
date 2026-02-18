import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AddHostIcon(props: any) {
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
				d='M13 12a5 5 0 015 5v1a2 2 0 01-2 2H2a2 2 0 01-2-2v-1a5 5 0 015-5h8zm4-6a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 01-2 0v-1h-1a1 1 0 110-2h1V7a1 1 0 011-1zM9 0a5 5 0 110 10A5 5 0 019 0z'
				fill='#FF383C'
			/>
		</Svg>
	)
}

export default AddHostIcon
