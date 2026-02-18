import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LIVE_DATA } from '../constants'
import { LiveDataPkMetricCard } from './LiveDataPkMetricCard'

const WIN_BG = require('@/assets/images/Rectangle 47.png')
const PK_SCORE_BG = require('@/assets/images/Rectangle 48.png')
const SESSIONS_BG = require('@/assets/images/Rectangle 46.png')

interface LiveDataPkMetricsRowProps {
	winPercent?: string
	pkScore?: string
	sessions?: string
}

export function LiveDataPkMetricsRow({
	winPercent = '0.00%',
	pkScore = '0',
	sessions = '0',
}: LiveDataPkMetricsRowProps) {
	return (
		<View style={styles.row}>
			<LiveDataPkMetricCard
				label='Win%'
				value={winPercent}
				imageSource={WIN_BG}
			/>
			<LiveDataPkMetricCard
				label='PK Score'
				value={pkScore}
				imageSource={PK_SCORE_BG}
			/>
			<LiveDataPkMetricCard
				label='Sessions'
				value={sessions}
				imageSource={SESSIONS_BG}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginHorizontal: LIVE_DATA.screenPadding,
		marginTop: 12,
		gap: 10,
	},
})
