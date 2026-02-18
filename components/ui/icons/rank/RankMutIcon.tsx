import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function RankMutIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M21.103 12h-18.2v-1.42h14.58c-.62-.7-1.28-1.78-1.92-3.2h1.14c1.4 1.64 2.88 2.84 4.4 3.62v1zm-18.2 2.9h18.2v1.42H6.523c.62.7 1.28 1.78 1.92 3.2h-1.14c-1.4-1.64-2.88-2.84-4.4-3.62v-1z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default RankMutIcon
