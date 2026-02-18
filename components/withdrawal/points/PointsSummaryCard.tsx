import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CARD_BG = '#E53935'

interface PointsSummaryCardProps {
	availablePoints: string
	totalPoints: string
	unconfirmedPoints: string
}

function YellowDot() {
	return <View style={styles.yellowDot} />
}

export function PointsSummaryCard({
	availablePoints,
	totalPoints,
	unconfirmedPoints,
}: PointsSummaryCardProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.watermark}>HAKA</Text>
			<View style={styles.topRow}>
				<View>
					<View style={styles.labelRow}>
						<Text style={styles.label}>Available points</Text>
						<YellowDot />
					</View>
					<Text style={styles.value}>{availablePoints}</Text>
				</View>
			</View>
			<View style={styles.bottomRow}>
				<View>
					<View style={styles.labelRow}>
						<Text style={styles.label}>Total</Text>
						<YellowDot />
					</View>
					<Text style={styles.value}>{totalPoints}</Text>
				</View>
				<View>
					<View style={styles.labelRow}>
						<Text style={styles.label}>Unconfirmed</Text>
						<Text style={styles.qMark}>?</Text>
						<YellowDot />
					</View>
					<Text style={styles.value}>{unconfirmedPoints}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: CARD_BG,
		borderRadius: 16,
		padding: 20,
		marginBottom: 20,
		overflow: 'hidden',
		minHeight: 160,
		justifyContent: 'space-between',
	},
	watermark: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [{ translateX: -40 }, { translateY: -20 }, { rotate: '-25deg' }],
		fontSize: 48,
		fontWeight: '700',
		color: 'rgba(255,255,255,0.12)',
	},
	topRow: {},
	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginBottom: 4,
	},
	label: {
		fontSize: 13,
		color: '#FFFFFF',
	},
	value: {
		fontSize: 24,
		fontWeight: '700',
		color: '#FFFFFF',
	},
	qMark: {
		fontSize: 12,
		color: '#FFFFFF',
		opacity: 0.9,
	},
	yellowDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#FFB800',
	},
})
