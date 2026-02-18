import * as React from 'react'
import Svg, { Circle, Defs, Image, Pattern, Use } from 'react-native-svg'

function RankIndiaPlagIcon(props: any) {
	return (
		<Svg
			width={50}
			height={50}
			viewBox='0 0 50 50'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			{...props}
		>
			<Circle cx={25} cy={25} r={25} fill='url(#pattern0_2581_491)' />
			<Defs>
				<Pattern
					id='pattern0_2581_491'
					patternContentUnits='objectBoundingBox'
					width={1}
					height={1}
				>
					<Use
						xlinkHref='#image0_2581_491'
						transform='matrix(.00613 0 0 .00613 -.448 0)'
					/>
				</Pattern>
				<Image
					id='image0_2581_491'
					width={309}
					height={163}
					preserveAspectRatio='none'
					xlinkHref='data:image/png;base64,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'
				/>
			</Defs>
		</Svg>
	)
}

export default RankIndiaPlagIcon
