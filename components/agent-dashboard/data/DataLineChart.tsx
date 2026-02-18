import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Line, Path } from 'react-native-svg'
import { AGENT_DASHBOARD } from '../constants'

const CHART_PURPLE = AGENT_DASHBOARD.dataChartLine
const GRID_COLOR = AGENT_DASHBOARD.dataChartGrid
const DOT_COLOR = AGENT_DASHBOARD.dataChartDot
const Y_LABELS = ['0', '20M', '40M', '60M', '80M', '100M']
const Y_VALUES = [0, 20, 40, 60, 80, 100]
const X_LABELS = ['07-14', '07-15', '07-16', '07-17', '07-18', '07-19', '07-20']
const LEGEND_YEAR = '2025'

const PADDING_LEFT = 36
const PADDING_RIGHT = 16
const PADDING_TOP = 12
const PADDING_BOTTOM = 28
const LEGEND_HEIGHT = 24

interface DataLineChartProps {
	width?: number
	height?: number
	dataPoints?: number[]
}

const DEFAULT_DATA = [50, 35, 55, 85, 15, 5, 10]

export function DataLineChart({
	width,
	height = 200,
	dataPoints = DEFAULT_DATA,
}: DataLineChartProps) {
	const dims = Dimensions.get('window')
	const fallbackWidth =
		dims.width - AGENT_DASHBOARD.screenPadding * 2 - PADDING_LEFT - PADDING_RIGHT
	const chartWidth =
		width != null && width > 0 ? width : Math.max(200, fallbackWidth)
	const chartHeight = height - PADDING_TOP - PADDING_BOTTOM - LEGEND_HEIGHT

	const { pathD, circles, gridLines, yTicks, xTicks } = useMemo(() => {
		const maxY = 100
		const minY = 0
		const rangeY = maxY - minY
		const plotWidth = chartWidth
		const plotHeight = chartHeight
		const points = dataPoints.map((y, i) => {
			const x = (i / Math.max(1, dataPoints.length - 1)) * plotWidth
			const py = plotHeight - ((y - minY) / rangeY) * plotHeight
			return { x, y: py, value: y }
		})
		const pathD = points
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
			.join(' ')
		const circles = points.map(p => ({ cx: p.x, cy: p.y }))
		const hGridCount = 5
		const vGridCount = Math.max(1, dataPoints.length - 1)
		const hLines: { y: number }[] = []
		for (let i = 0; i <= hGridCount; i++) {
			hLines.push({ y: (i / hGridCount) * plotHeight })
		}
		const vLines: { x: number }[] = []
		for (let i = 0; i <= vGridCount; i++) {
			vLines.push({ x: (i / vGridCount) * plotWidth })
		}
		return {
			pathD,
			circles,
			gridLines: { h: hLines, v: vLines },
		}
	}, [chartWidth, chartHeight, dataPoints])

	return (
		<View style={[styles.wrapper, { width: chartWidth + PADDING_LEFT + PADDING_RIGHT }]}>
			<View style={[styles.chartRow, { height: chartHeight + PADDING_TOP + PADDING_BOTTOM }]}>
				<View style={styles.yAxis}>
					{Y_LABELS.map((label, i) => (
						<View
							key={label}
							style={[
								styles.yTick,
								{
									top:
										PADDING_TOP +
										(1 - i / (Y_LABELS.length - 1)) * (chartHeight - 12) - 6,
								},
							]}
						>
							<Text style={styles.yLabel}>{label}</Text>
						</View>
					))}
				</View>
				<View style={styles.plotWrap}>
					<Svg
						width={chartWidth}
						height={chartHeight + PADDING_TOP + PADDING_BOTTOM}
						style={styles.svg}
					>
						{gridLines.h.map((line, i) => (
							<Line
								key={`h-${i}`}
								x1={0}
								y1={PADDING_TOP + line.y}
								x2={chartWidth}
								y2={PADDING_TOP + line.y}
								stroke={GRID_COLOR}
								strokeWidth={1}
								strokeDasharray="4 4"
							/>
						))}
						{gridLines.v.map((line, i) => (
							<Line
								key={`v-${i}`}
								x1={line.x}
								y1={PADDING_TOP}
								x2={line.x}
								y2={PADDING_TOP + chartHeight}
								stroke={GRID_COLOR}
								strokeWidth={1}
								strokeDasharray="4 4"
							/>
						))}
						<Path
							d={pathD}
							stroke={CHART_PURPLE}
							strokeWidth={2}
							fill="none"
							transform={`translate(0, ${PADDING_TOP})`}
						/>
						{circles.map((c, i) => (
							<Circle
								key={i}
								cx={c.cx}
								cy={c.cy + PADDING_TOP}
								r={4}
								fill={DOT_COLOR}
							/>
						))}
					</Svg>
				</View>
			</View>
			<View style={[styles.xAxis, { paddingLeft: PADDING_LEFT, paddingRight: PADDING_RIGHT }]}>
				{X_LABELS.map(label => (
					<View key={label} style={styles.xTick}>
						<Text style={styles.xLabel}>{label}</Text>
					</View>
				))}
			</View>
			<View style={styles.legendRow}>
				<View style={styles.legendLine} />
				<View style={styles.legendDot} />
				<View style={styles.legendLine} />
				<Text style={styles.legendText}>{LEGEND_YEAR}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		alignSelf: 'stretch',
	},
	chartRow: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	yAxis: {
		width: PADDING_LEFT,
		paddingTop: PADDING_TOP,
	},
	yTick: {
		position: 'absolute',
		left: 0,
		marginTop: -10,
	},
	yLabel: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.labelColor,
	},
	plotWrap: {
		flex: 1,
		overflow: 'hidden',
	},
	svg: {
		overflow: 'visible',
	},
	xAxis: {
		flexDirection: 'row',
		height: PADDING_BOTTOM,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	xTick: {
		flex: 1,
		alignItems: 'center',
	},
	xLabel: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.labelColor,
	},
	legendRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		paddingTop: 8,
		paddingBottom: 4,
		paddingLeft: PADDING_LEFT,
	},
	legendLine: {
		width: 16,
		height: 2,
		backgroundColor: CHART_PURPLE,
		borderRadius: 1,
	},
	legendDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: DOT_COLOR,
	},
	legendText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: CHART_PURPLE,
	},
})
