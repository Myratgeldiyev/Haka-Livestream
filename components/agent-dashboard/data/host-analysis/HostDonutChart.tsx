import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { AGENT_DASHBOARD } from '../../constants'

const SIZE = 170
const STROKE = 30
const R = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2
const CIRCUMFERENCE = 2 * Math.PI * R

interface HostDonutChartProps {
	centerValue?: number
	centerLabel?: string
	segments?: { color: string; ratio: number }[]
}

const DEFAULT_SEGMENTS = [
	{ color: AGENT_DASHBOARD.hostAnalysisDonutBlue, ratio: 0.5 },
	{ color: AGENT_DASHBOARD.hostAnalysisDonutPink, ratio: 0.35 },
	{ color: AGENT_DASHBOARD.hostAnalysisDonutPurple, ratio: 0.15 },
]

export function HostDonutChart({
	centerValue = 4,
	centerLabel = 'Number',
	segments = DEFAULT_SEGMENTS,
}: HostDonutChartProps) {
	const rings = useMemo(() => {
		let offset = 0
		return segments.map(seg => {
			const dashLen = seg.ratio * CIRCUMFERENCE
			const gapLen = CIRCUMFERENCE - dashLen
			const result = {
				color: seg.color,
				strokeDasharray: `${dashLen} ${gapLen}`,
				strokeDashoffset: -offset,
			}
			offset += dashLen
			return result
		})
	}, [segments])

	return (
		<View style={styles.wrap}>
			<Svg width={SIZE} height={SIZE} style={styles.svg}>
				{rings.map((ring, i) => (
					<Circle
						key={i}
						cx={CX}
						cy={CY}
						r={R}
						fill='transparent'
						stroke={ring.color}
						strokeWidth={STROKE}
						strokeDasharray={ring.strokeDasharray}
						strokeDashoffset={ring.strokeDashoffset}
						transform={`rotate(-90 ${CX} ${CY})`}
					/>
				))}
			</Svg>
			<View style={styles.centerLabel} pointerEvents='none'>
				<Text style={styles.centerValue}>{centerValue}</Text>
				<Text style={styles.centerSub}>{centerLabel}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		width: SIZE,
		height: SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	svg: {
		position: 'absolute',
	},
	centerLabel: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 0,
	},
	centerValue: {
		fontSize: fontSizes.huge,
		lineHeight: lineHeights.huge,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
	centerSub: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
	},
})
