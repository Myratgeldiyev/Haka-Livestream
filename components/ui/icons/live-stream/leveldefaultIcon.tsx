import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LevelDefaultIcon(props: any) {
	return (
		<Svg
			width={17}
			height={21}
			viewBox='0 0 17 21'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M7.033.57a1.5 1.5 0 012.355 0l6.603 8.369a2 2 0 010 2.478l-6.603 8.368a1.501 1.501 0 01-2.356 0L.43 11.418a2 2 0 010-2.478L7.033.572V.57z'
				fill='#DDD'
				fillOpacity={0.5}
			/>
		</Svg>
	)
}

export default LevelDefaultIcon
