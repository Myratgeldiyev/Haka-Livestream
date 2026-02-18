import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function TotalHostIcon(props: any) {
	return (
		<Svg
			width={50}
			height={43}
			viewBox='0 0 50 43'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={50} height={43} rx={21.5} fill='#F9467D' />
			<Path
				d='M22.998 27.5c0-4.078 3.057-7.44 6.999-7.931v-.07c.258-.376.998-.999.998-2.002 0-1.003-.998-2.002-.998-2.499C30.002 11 27.962 9.5 25 9.5c-2.836 0-5.002 1.5-5.002 5.498 0 .502-.998 1.5-.998 2.499 0 .998.712 1.66.998 2.001 0 0 0 .999.502 2.499 0 .501.998.998 1.5 1.5 0 .501 0 .998-.502 2.001L16 26.502c-2.002.496-3 3.998-3 6.998h12.722a7.983 7.983 0 01-2.724-6zm8.002-6a6 6 0 100 12 6 6 0 100-12zm3.998 6.998h-3v3h-2.001v-3h-3v-2.001h3v-3h2.001v3h3v2.001z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default TotalHostIcon
