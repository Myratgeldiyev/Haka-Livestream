import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function ThemeIcon(props: any) {
	return (
		<Svg
			width={51}
			height={45}
			viewBox='0 0 51 45'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={51} height={45} rx={22.5} fill='#fff' fillOpacity={0.1} />
			<Path
				d='M23.605 24.375v10H13.5v-10h10.105zm-2.526 2.5h-5.053v5h5.053v-5zM24.869 10l6.947 11.25H17.92L24.868 10zm0 4.825l-2.426 3.925h4.85l-2.425-3.925zm6.947 8.925c3.158 0 5.684 2.5 5.684 5.625S34.974 35 31.816 35c-3.158 0-5.684-2.5-5.684-5.625s2.526-5.625 5.684-5.625zm0 2.5c-.838 0-1.641.33-2.233.915a3.109 3.109 0 00-.925 2.21c0 .829.333 1.624.925 2.21a3.175 3.175 0 002.233.915c.837 0 1.64-.33 2.233-.915.592-.586.925-1.381.925-2.21s-.333-1.624-.925-2.21a3.175 3.175 0 00-2.233-.915z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default ThemeIcon
