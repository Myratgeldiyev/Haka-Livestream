import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function OnlineMoment(props: any) {
	return (
		<Svg
			width={22}
			height={23}
			viewBox='0 0 22 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect x={0.5} y={0.5} width={21} height={22} rx={10.5} fill='#5F22D9' />
			<Rect x={0.5} y={0.5} width={21} height={22} rx={10.5} stroke='#fff' />
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8 11v6H6v-6h2zm4 0v6h-2v-6h2zm4 6v-6h-2v6h2z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default OnlineMoment
