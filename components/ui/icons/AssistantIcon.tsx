import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

interface AssistantIconProps {
	color?: string
	width?: number
	height?: number
}

function AssistantIcon({
	color = '#8B5CF6',
	width = 24,
	height = 24,
}: AssistantIconProps) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Circle
				cx={12}
				cy={8}
				r={4}
				stroke={color}
				strokeWidth={2}
			/>
			<Path
				d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Path
				d="M16 4l2-2m0 0l2 2m-2-2v4"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

export default AssistantIcon
