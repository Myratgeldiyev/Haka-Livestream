import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function FilterIcon(props: any) {
	return (
		<Svg
			width={17}
			height={26}
			viewBox='0 0 17 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path d='M1 25V1zm5-12V1zm5 0V1zm5 12V1z' fill='#000' />
			<Path
				d='M1 25V1m5 12V1m5 12V1m5 24V1'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M5.722 19L8.5 25l2.778-6H5.722z'
				fill='#000'
				stroke='#000'
				strokeWidth={2}
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default FilterIcon
