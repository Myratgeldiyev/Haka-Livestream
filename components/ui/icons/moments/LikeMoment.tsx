import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LikeMoment(props: any) {
	return (
		<Svg
			width={26}
			height={23}
			viewBox='0 0 26 23'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M13 4.938l-1.013-1.313C10.813 2.103 9.08 1 7 1 3.68 1 1 3.638 1 6.906c0 1.22.373 2.35 1.013 3.282C3.093 11.776 13 22 13 22m0-17.063l1.013-1.312C15.187 2.103 16.92 1 19 1c3.32 0 6 2.638 6 5.906 0 1.22-.373 2.35-1.013 3.282C22.907 11.776 13 22 13 22'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default LikeMoment
