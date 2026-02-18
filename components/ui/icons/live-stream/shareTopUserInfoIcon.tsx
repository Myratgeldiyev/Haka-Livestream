import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function ShareTopInfoIcon(props: any) {
	return (
		<Svg
			width={27}
			height={27}
			viewBox='0 0 27 27'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={27} height={27} rx={2} fill='#fff' fillOpacity={0.1} />
			<Path
				d='M22.039 13.5l-5.164-5.164v2.768l-.967.146c-4.85.686-8.134 3.229-10.013 7.121 2.61-1.845 5.85-2.733 9.855-2.733h1.125v3.026m-2.25-1.879c-5.029.236-8.629 2.047-11.25 5.715 1.125-5.625 4.5-11.25 12.375-12.375v-4.5l7.875 7.875-7.875 7.875v-4.613c-.371 0-.742.012-1.125.023z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default ShareTopInfoIcon
