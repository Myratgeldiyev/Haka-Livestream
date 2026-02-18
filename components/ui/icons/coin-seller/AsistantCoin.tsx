import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AsistantCoin(props: any) {
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
				d='M21.333 0H2.667C1.959 0 1.28.24.78.67.281 1.097 0 1.68 0 2.285v16c0 .606.281 1.187.781 1.616.5.429 1.178.67 1.886.67H8L12 24l4-3.429h5.333c.708 0 1.386-.24 1.886-.669.5-.429.781-1.01.781-1.616v-16c0-.606-.281-1.188-.781-1.617C22.719.241 22.041 0 21.333 0zm-6.826 12.434L12 17.143l-2.507-4.709L4 10.286l5.493-2.149L12 3.43l2.507 4.708L20 10.286'
				fill='#0D99FF'
			/>
		</Svg>
	)
}

export default AsistantCoin
