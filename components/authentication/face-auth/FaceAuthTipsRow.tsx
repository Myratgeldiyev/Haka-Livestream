import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AUTHENTICATION, FACE_AUTH } from '../constants'

const CIRCLE_SIZE = FACE_AUTH.tipIconCircleSize
const ICON_SIZE = FACE_AUTH.tipIconSize
const CIRCLE_BG = '#E8E8E8'

export function FaceAuthTipsRow() {
	return (
		<View style={styles.row}>
			{FACE_AUTH.tips.map((tip) => (
				<View key={tip.iconKey} style={styles.tip}>
					<View style={styles.iconCircle}>
						{tip.iconKey === 'eye' && (
							<Ionicons
								name="eye-outline"
								size={ICON_SIZE}
								color={AUTHENTICATION.textPrimary}
							/>
						)}
						{tip.iconKey === 'light' && (
							<Ionicons
								name="sunny-outline"
								size={ICON_SIZE}
								color={AUTHENTICATION.textPrimary}
							/>
						)}
						{tip.iconKey === 'minor' && (
							<View style={styles.minorWrap}>
								<Text style={styles.minorText}>18</Text>
								<Text style={styles.minorPlus}>+</Text>
							</View>
						)}
					</View>
					<Text style={styles.label} numberOfLines={2}>
						{tip.label}
					</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		paddingHorizontal: spacing.screen.horizontal,
		paddingVertical: spacing.lg,
		gap: spacing.sm,
	},
	tip: {
		flex: 1,
		alignItems: 'center',
		minWidth: 0,
	},
	iconCircle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		backgroundColor: CIRCLE_BG,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: spacing.sm,
	},
	minorWrap: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	minorText: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.lg,
		color: AUTHENTICATION.textPrimary,
	},
	minorPlus: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.sm,
		color: AUTHENTICATION.textPrimary,
		marginLeft: 1,
	},
	label: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.sm,
		color: AUTHENTICATION.textPrimary,
		textAlign: 'center',
	},
})
