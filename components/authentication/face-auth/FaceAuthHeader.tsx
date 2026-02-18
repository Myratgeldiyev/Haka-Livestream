import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AUTHENTICATION, FACE_AUTH } from '../constants'

interface FaceAuthHeaderProps {
	onBack?: () => void
	currentStep?: number
}

export function FaceAuthHeader({
	onBack,
	currentStep = 1,
}: FaceAuthHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.titleRow}>
				{onBack ? (
					<Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
						<LeftArrowIcon props={{}} color="#000" />
					</Pressable>
				) : (
					<View style={styles.backPlaceholder} />
				)}
				<Text style={styles.title}>{FACE_AUTH.headerTitle}</Text>
				<View style={styles.rightPlaceholder} />
			</View>
			<View style={styles.stepsRow}>
				{[1, 2, 3].map((step) => (
					<View key={step} style={styles.stepWrapper}>
						{step > 1 && <View style={styles.stepLine} />}
						<View
							style={[
								styles.stepCircle,
								step <= currentStep && styles.stepCircleActive,
							]}
						>
							<Text
								style={[
									styles.stepNumber,
									step <= currentStep && styles.stepNumberActive,
								]}
							>
								{step}
							</Text>
						</View>
						{step < 3 && <View style={styles.stepLine} />}
					</View>
				))}
			</View>
		</View>
	)
}

const circleSize = 24
const lineFlex = 1

const styles = StyleSheet.create({
	container: {
		backgroundColor: AUTHENTICATION.cardBg,
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.md,
		paddingBottom: spacing.lg,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: spacing.header.height,
		marginBottom: spacing.md,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backPlaceholder: { width: 40, height: 40 },
	title: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xl,
		color: AUTHENTICATION.textPrimary,
	},
	rightPlaceholder: { width: 40, height: 40 },
	stepsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	stepLine: {
		width: 24,
		height: 2,
		backgroundColor: '#E0E0E0',
	},
	stepCircle: {
		width: circleSize,
		height: circleSize,
		borderRadius: circleSize / 2,
		borderWidth: 2,
		borderColor: AUTHENTICATION.textPrimary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	stepCircleActive: {
		backgroundColor: AUTHENTICATION.textPrimary,
	},
	stepNumber: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.sm,
		color: AUTHENTICATION.textPrimary,
	},
	stepNumberActive: {
		color: AUTHENTICATION.cardBg,
	},
})
