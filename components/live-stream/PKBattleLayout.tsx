import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import RoomLiveIcon from '@/components/ui/icons/live-stream-view/roomLiveIcon'
import { CameraView } from './CameraView'
import { PKBattleRivalSlot } from './PKBattleRivalSlot'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const HALF_WIDTH = SCREEN_WIDTH / 2
const TOP_BAR_HEIGHT = 56

const PINK_GRADIENT = [
	'#FF6B9D',
	'#F9467D',
	'#E91E78',
	'#C2185B',
] as const
const BLUE_GRADIENT = [
	'#42A5F5',
	'#2196F3',
	'#1976D2',
	'#0D47A1',
] as const

export interface PKBattleLayoutProps {
	scoreA?: number
	scoreB?: number
	winCountA?: number
	winCountB?: number
	/** Duration in seconds for countdown; when 0, timer shows 00:00 and does not tick. */
	durationSeconds?: number
	onEndBattle: () => void
}

function formatScore(n: number): string {
	return n.toLocaleString('en-US')
}

function formatTime(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = seconds % 60
	return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function PKBattleLayout({
	scoreA = 767,
	scoreB = 243,
	winCountA = 0,
	winCountB = 0,
	durationSeconds = 60,
	onEndBattle,
}: PKBattleLayoutProps) {
	const insets = useSafeAreaInsets()
	const [timeLeft, setTimeLeft] = useState(durationSeconds)

	useEffect(() => {
		if (durationSeconds <= 0 || timeLeft <= 0) return
		const t = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) return 0
				return prev - 1
			})
		}, 1000)
		return () => clearInterval(t)
	}, [durationSeconds, timeLeft])

	const TIMER_BADGE_WIDTH = 88

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.topBar,
					{ paddingTop: insets.top, height: TOP_BAR_HEIGHT + insets.top },
				]}
			>
				<View style={styles.scoreBarJoined}>
					<LinearGradient
						colors={PINK_GRADIENT}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						style={styles.scoreBlockLeft}
					>
						<Text style={styles.scoreBig}>{formatScore(scoreA)}</Text>
						<Text style={styles.winText}>WIN x{winCountA}</Text>
					</LinearGradient>
					<LinearGradient
						colors={BLUE_GRADIENT}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						style={styles.scoreBlockRight}
					>
						<Text style={styles.scoreBig}>{formatScore(scoreB)}</Text>
						<Text style={styles.winText}>WIN x{winCountB}</Text>
					</LinearGradient>
				</View>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.endBtn,
					{ top: (TOP_BAR_HEIGHT + insets.top) - 36 },
					pressed && styles.endBtnPressed,
				]}
				onPress={onEndBattle}
			>
				<Text style={styles.endBtnText}>Bitir PK</Text>
			</Pressable>
			<View style={styles.camerasRowWrapper}>
				<View style={styles.camerasRow}>
					<View style={styles.half}>
						<CameraView />
					</View>
					<View style={styles.half}>
						<PKBattleRivalSlot pointsCount={160} username="Swxy154" />
					</View>
				</View>
				<View
					style={[
						styles.timerCenter,
						{
							left: HALF_WIDTH - TIMER_BADGE_WIDTH / 2,
						},
					]}
				>
					<RoomLiveIcon width={18} height={18} />
					<Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	topBar: {
		paddingHorizontal: 0,
		paddingBottom: 0,
		justifyContent: 'flex-end',
		backgroundColor: '#000',
	},
	scoreBarJoined: {
		flexDirection: 'row',
		flex: 1,
		width: '100%',
	},
	scoreBlockLeft: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingLeft: 12,
		paddingVertical: 8,
	},
	scoreBlockRight: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 12,
		paddingVertical: 8,
	},
	scoreBig: {
		fontSize: 26,
		fontWeight: '800',
		color: '#FFF',
	},
	winText: {
		fontSize: 11,
		fontWeight: '600',
		color: 'rgba(255,255,255,0.95)',
		marginTop: 2,
	},
	timerText: {
		fontSize: 14,
		fontWeight: '700',
		color: '#FFF',
	},
	endBtn: {
		position: 'absolute',
		right: 12,
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 6,
		zIndex: 10,
	},
	endBtnPressed: {
		opacity: 0.9,
	},
	endBtnText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#FFF',
	},
	camerasRowWrapper: {
		flex: 1,
		position: 'relative',
		width: SCREEN_WIDTH,
	},
	camerasRow: {
		flex: 1,
		flexDirection: 'row',
		width: SCREEN_WIDTH,
	},
	timerCenter: {
		position: 'absolute',
		top: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		width: 88,
		backgroundColor: 'rgba(0,0,0,0.6)',
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 6,
		zIndex: 10,
	},
	half: {
		width: HALF_WIDTH,
		flex: 1,
		overflow: 'hidden',
		alignSelf: 'stretch',
	},
})
