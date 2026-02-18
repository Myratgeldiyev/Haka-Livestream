import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SecondFamilyIcon(props: any) {
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
				d='M5.75 12.75l.53-.572a1.437 1.437 0 012.18.157c.413.557.381 1.33-.075 1.85L5.75 16.75h2.932'
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

export default SecondFamilyIcon
