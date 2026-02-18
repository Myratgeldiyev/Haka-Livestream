import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ScamAlert(props: any) {
	return (
		<Svg
			width={20}
			height={24}
			viewBox='0 0 20 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M9.818 0a2.182 2.182 0 00-2.16 2.492 7.636 7.636 0 00-5.476 7.326v8.728H1.09a1.09 1.09 0 100 2.181h17.454a1.09 1.09 0 000-2.181h-1.09V9.818a7.636 7.636 0 00-5.477-7.326A2.182 2.182 0 009.818 0zM12 22.91A1.09 1.09 0 0110.91 24H8.726a1.09 1.09 0 110-2.182h2.182A1.09 1.09 0 0112 22.91z'
				fill='#D1723A'
			/>
		</Svg>
	)
}

export default ScamAlert
