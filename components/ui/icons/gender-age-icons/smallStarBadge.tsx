import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SmallStarBadge(props: any) {
	return (
		<Svg
			width={11}
			height={11}
			viewBox='0 0 11 11'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M10.497 5.247a.74.74 0 01-.492.703L7.03 7.031 5.95 10.005a.75.75 0 01-1.406 0L3.463 7.03.489 5.95a.75.75 0 010-1.406l2.974-1.081L4.543.489a.75.75 0 011.407 0l1.081 2.974 2.974 1.08a.74.74 0 01.492.704z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default SmallStarBadge
