import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function EditPenIcon(props: any) {
	return (
		<Svg
			width={19}
			height={19}
			viewBox='0 0 19 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M12 3.172l3 3m-5 11h8m-16-4l-1 4 4-1L16.586 4.586a2 2 0 000-2.828l-.172-.172a2 2 0 00-2.828 0L2 13.172z'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default EditPenIcon
