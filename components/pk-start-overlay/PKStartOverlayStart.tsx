import { LinearGradient } from 'expo-linear-gradient'
import React, { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../room-item-overlays/item-overlay.styles'
import { PK_START_OVERLAY } from './constants'
import type { PKStartOverlayStartProps } from './types'

const DEBOUNCE_MS = 400

function PKStartOverlayStartInner({ onStartRandom }: PKStartOverlayStartProps) {
	const lastPressRef = React.useRef(0)

	const handlePress = React.useCallback(() => {
		const now = Date.now()
		if (now - lastPressRef.current < DEBOUNCE_MS) return
		lastPressRef.current = now
		onStartRandom()
	}, [onStartRandom])

	return (
		<View style={styles.card}>
			<Pressable
				style={styles.buttonWrap}
				onPress={handlePress}
				android_ripple={null}
			>
				<LinearGradient
					colors={[COLORS.gradientStart, COLORS.gradientEnd]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={styles.gradient}
				>
					<Text style={styles.label}>Start Random</Text>
				</LinearGradient>
			</Pressable>
		</View>
	)
}

export const PKStartOverlayStart = memo(PKStartOverlayStartInner)

const styles = StyleSheet.create({
	card: {
		width: PK_START_OVERLAY.startCard.width,
		minHeight: PK_START_OVERLAY.startCard.minHeight,
		borderRadius: PK_START_OVERLAY.startCard.borderRadius,
		overflow: 'hidden',
		backgroundColor: COLORS.background,
	},
	buttonWrap: {
		flex: 1,
		borderRadius: PK_START_OVERLAY.startCard.borderRadius,
		overflow: 'hidden',
		minHeight: 56,
		justifyContent: 'center',
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 56,
		paddingVertical: 14,
		paddingHorizontal: 24,
	},
	label: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
})
