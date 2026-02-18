import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LikeVideo(props: any) {
	return (
		<Svg
			width={24}
			height={22}
			viewBox='0 0 24 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M12 22l-1.74-1.583C4.08 14.818 0 11.114 0 6.594 0 2.889 2.904 0 6.6 0c2.088 0 4.092.971 5.4 2.494C13.308.97 15.312 0 17.4 0 21.096 0 24 2.89 24 6.594c0 4.52-4.08 8.224-10.26 13.823L12 22z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default LikeVideo
