import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg'

function HakaPriIcon(props: any) {
	return (
		<Svg
			width={44}
			height={18}
			viewBox='0 0 44 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={44} height={18} rx={9} fill='url(#paint0_linear_1682_123)' />
			<Path
				d='M10.521 12V3.797h1.653v3.27h.457v1.617h-.457V12h-1.652zm2.754-3.316V7.066h.457v-3.27h1.653V12h-1.653V8.684h-.457zM16.23 12l1.511-6.82h.176l.703 3.28-.773 3.54h-1.617zm2.496-.996l.351-1.617h.422l-1.242-5.59h1.629L21.818 12h-1.64l-.235-.996h-1.218zm3.808.996V3.797h1.652V12h-1.652zm2.121-3.996l1.254-4.207h1.63l-1.243 4.207L27.584 12h-1.617l-1.313-3.996zM28.134 12l1.512-6.82h.176l.703 3.28-.773 3.54h-1.617zm2.497-.996l.351-1.617h.422l-1.242-5.59h1.629L33.725 12h-1.641l-.234-.996h-1.22z'
				fill='#fff'
			/>
			<Defs>
				<LinearGradient
					id='paint0_linear_1682_123'
					x1={22}
					y1={0}
					x2={22}
					y2={18}
					gradientUnits='userSpaceOnUse'
				>
					<Stop stopColor='#44BDFB' />
					<Stop offset={1} stopColor='#B340FE' />
				</LinearGradient>
			</Defs>
		</Svg>
	)
}

export default HakaPriIcon
