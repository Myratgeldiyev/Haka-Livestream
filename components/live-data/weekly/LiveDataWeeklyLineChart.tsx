import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import { LIVE_DATA } from '../constants'

const PADDING_H = 20
const PADDING_TOP = 24
const PADDING_BOTTOM = 8
const POINT_R = 5
const CHART_HEIGHT = 100
const CHART_PADDING_H = POINT_R + 4

export interface WeeklyChartPoint {
	points: string
	duration: string
	date: string
}

interface LiveDataWeeklyLineChartProps {
	data?: WeeklyChartPoint[]
}

const DEFAULT_DATA: WeeklyChartPoint[] = Array.from({ length: 7 }, (_, i) => ({
	points: '0',
	duration: '00:00',
	date: `08-0${i + 1}`,
}))

export function LiveDataWeeklyLineChart({
	data = DEFAULT_DATA,
}: LiveDataWeeklyLineChartProps) {
	const dims = Dimensions.get('window')
	const cardWidth = dims.width - LIVE_DATA.screenPadding * 2 - PADDING_H * 2
	const plotWidth = cardWidth
	const innerPlotWidth = plotWidth - 2 * CHART_PADDING_H
	const n = Math.max(1, data.length - 1)

	const {
		pointsPath,
		durationPath,
		pointsCircles,
		durationCircles,
		dotXPositions,
	} = useMemo(() => {
		const pts = data.map((d, i) => ({
			x: CHART_PADDING_H + (i / n) * innerPlotWidth,
			pointsY: 0,
			durationY: CHART_HEIGHT,
		}))
		const scale = (v: number) => v
		const pointsPathD = pts
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${scale(p.pointsY)}`)
			.join(' ')
		const durationPathD = pts
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${scale(p.durationY)}`)
			.join(' ')
		return {
			pointsPath: pointsPathD,
			durationPath: durationPathD,
			pointsCircles: pts.map(p => ({ cx: p.x, cy: scale(p.pointsY) })),
			durationCircles: pts.map(p => ({ cx: p.x, cy: scale(p.durationY) })),
			dotXPositions: pts.map(p => p.x),
		}
		}, [data, innerPlotWidth, n])

	const TOP_LABEL_BOX = 28
	const BOTTOM_LABEL_BOX = 36

	return (
		<View style={styles.wrapper}>
			<View style={[styles.topLabels, { width: plotWidth }]}>
				{data.map((d, i) => (
					<View
						key={i}
						style={[
							styles.topLabelCell,
							{
								left: dotXPositions[i] - TOP_LABEL_BOX / 2,
								width: TOP_LABEL_BOX,
							},
						]}
					>
						<Text style={styles.valueText} numberOfLines={1}>
							{d.points}
						</Text>
					</View>
				))}
			</View>
			<View
				style={[
					styles.chartWrapper,
					{
						width: plotWidth,
						height: CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM,
					},
				]}
			>
				<Svg
					width={plotWidth}
					height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM}
					style={styles.svg}
				>
				<Path
					d={pointsPath}
					stroke={LIVE_DATA.chartPointsColor}
					strokeWidth={2}
					fill='none'
					transform={`translate(0, ${PADDING_TOP})`}
				/>
				{pointsCircles.map((c, i) => (
					<Circle
						key={`p-${i}`}
						cx={c.cx}
						cy={c.cy + PADDING_TOP}
						r={POINT_R}
						fill='#FFFFFF'
						stroke={LIVE_DATA.chartPointsColor}
						strokeWidth={LIVE_DATA.chartDotStrokeWidth}
					/>
				))}
				<Path
					d={durationPath}
					stroke={LIVE_DATA.chartDurationColor}
					strokeWidth={2}
					fill='none'
					transform={`translate(0, ${PADDING_TOP})`}
				/>
				{durationCircles.map((c, i) => (
					<Circle
						key={`d-${i}`}
						cx={c.cx}
						cy={c.cy + PADDING_TOP}
						r={POINT_R}
						fill='#FFFFFF'
						stroke={LIVE_DATA.chartDurationColor}
						strokeWidth={LIVE_DATA.chartDotStrokeWidth}
					/>
				))}
			</Svg>
				<View
					style={[
						styles.durationOverlay,
						{ top: PADDING_TOP + CHART_HEIGHT - 22 },
					]}
					pointerEvents="none"
				>
					{data.map((d, i) => (
						<View
							key={i}
							style={[
								styles.durationLabelCell,
								{
									left: dotXPositions[i] - TOP_LABEL_BOX / 2,
									width: TOP_LABEL_BOX,
								},
							]}
						>
							<Text style={styles.timeText} numberOfLines={1}>
								{d.duration}
							</Text>
						</View>
					))}
				</View>
			</View>
			<View style={[styles.bottomLabels, { width: plotWidth }]}>
				{data.map((d, i) => (
					<View
						key={i}
						style={[
							styles.bottomLabelCell,
							{
								left: dotXPositions[i] - BOTTOM_LABEL_BOX / 2,
								width: BOTTOM_LABEL_BOX,
							},
						]}
					>
						<Text style={styles.dateText} numberOfLines={1}>
							{d.date}
						</Text>
					</View>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: 'center',
		paddingHorizontal: PADDING_H,
	},
	topLabels: {
		position: 'relative',
		height: 20,
		marginBottom: 4,
	},
	chartWrapper: {
		position: 'relative',
	},
	durationOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 20,
	},
	durationLabelCell: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	topLabelCell: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomLabelCell: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	valueText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.valueColor,
	},
	svg: {
		overflow: 'visible',
	},
	bottomLabels: {
		position: 'relative',
		height: 22,
		marginTop: 4,
		paddingTop: 4,
	},
	timeText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.chartDurationColor,
	},
	dateText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.labelColor,
	},
})
