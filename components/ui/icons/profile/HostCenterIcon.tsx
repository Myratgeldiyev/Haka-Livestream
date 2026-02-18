import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function HostCenterIcon(props: any) {
	return (
		<Svg
			width={50}
			height={50}
			viewBox='0 0 50 50'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M29.587 24.973a7.413 7.413 0 100-14.826 7.413 7.413 0 000 14.826zM30.325 38.574c-1.483-1-3.155-1.74-5.19-1.74-3.05 0-5.823 3.493-8.895 2.965-3.072-.528-4.114-4.995-2.224-6.672'
				stroke='#5F22D9'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M22.173 18.451l-8.887 12.143a1.482 1.482 0 00.149 1.924l1.21 1.213a1.483 1.483 0 001.949.13l11.643-8.888'
				stroke='#5F22D9'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default HostCenterIcon
