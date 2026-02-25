import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function EditTopUserIcon(props: any) {
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
				d='M10 2.5H4.167A1.667 1.667 0 002.5 4.167v11.666A1.666 1.666 0 004.167 17.5h11.666a1.666 1.666 0 001.667-1.667V10'
				stroke='#FDFDFD'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M15.313 2.188a1.768 1.768 0 012.5 2.5l-7.511 7.511a1.667 1.667 0 01-.71.421l-2.395.7a.416.416 0 01-.517-.517l.7-2.394c.079-.268.224-.512.422-.71l7.51-7.511z'
				stroke='#FDFDFD'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default EditTopUserIcon
