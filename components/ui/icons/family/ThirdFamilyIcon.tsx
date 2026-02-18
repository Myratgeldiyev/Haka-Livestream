import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ThirdFamilyIcon(props: any) {
	return (
		<Svg
			width={15}
			height={22}
			viewBox='0 0 15 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M5.75 12.75c.326-.653.78-1 1.5-1 .73 0 1.5.456 1.5 1.25 0 .69-.56 1.25-1.25 1.25.69 0 1.25.56 1.25 1.25 0 .794-.77 1.25-1.5 1.25-.72 0-1.174-.347-1.5-1'
				stroke='#000'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M7.25 20.75a6.5 6.5 0 100-13 6.5 6.5 0 000 13z'
				stroke='#000'
				strokeWidth={1.5}
			/>
			<Path
				d='M4.25 8.25L.75.75m9.5 7.5l3.5-7.5m-3.5 0l-1 2.5m-1.5 4.5l-3-7'
				stroke='#000'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default ThirdFamilyIcon
