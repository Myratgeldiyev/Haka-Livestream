import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AgencyCenterIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M9.998 18c0-4.078 3.057-7.44 6.999-7.931v-.07c.258-.376.998-.999.998-2.002 0-1.003-.998-2.002-.998-2.499C17.002 1.5 14.963 0 12 0 9.164 0 6.998 1.5 6.998 5.498 6.998 6 6 6.998 6 7.997c0 .998.713 1.66.998 2.001 0 0 0 .999.502 2.499 0 .501.998.998 1.5 1.5 0 .501 0 .998-.502 2.001L3 17.002C.998 17.498 0 21 0 24h12.722a7.983 7.983 0 01-2.724-6zM18 12a6 6 0 100 12 6 6 0 100-12zm3.998 6.998h-3v3h-2.001v-3h-3v-2.001h3v-3h2.001v3h3v2.001z'
				fill='#5F22D9'
			/>
		</Svg>
	)
}

export default AgencyCenterIcon
