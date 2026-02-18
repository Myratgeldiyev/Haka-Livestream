import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'

const GRADES = ['S', 'A', 'B', 'C', 'D', 'E', 'F'] as const
export type GradeId = (typeof GRADES)[number]

interface GradeButtonRowProps {
	selectedGrade?: GradeId
	onSelectGrade?: (grade: GradeId) => void
}

export function GradeButtonRow({
	selectedGrade = 'B',
	onSelectGrade,
}: GradeButtonRowProps) {
	return (
		<View style={styles.row}>
			{GRADES.map(grade => {
				const isSelected = selectedGrade === grade
				return (
					<Pressable
						key={grade}
						style={[
							styles.gradeButton,
							isSelected && styles.gradeButtonActive,
						]}
						onPress={() => onSelectGrade?.(grade)}
						accessibilityRole="button"
						accessibilityState={{ selected: isSelected }}
					>
						<Text
							style={[
								styles.gradeText,
								isSelected && styles.gradeTextActive,
							]}
						>
							{grade}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	gradeButton: {
		minWidth: 36,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 20,
		backgroundColor: AGENT_DASHBOARD.hostAnalysisGradeButtonBg,
		alignItems: 'center',
		justifyContent: 'center',
		...(Platform.OS === 'ios'
			? { shadowColor: AGENT_DASHBOARD.cardShadowColor, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 }
			: { elevation: 2 }),
	},
	gradeButtonActive: {
		backgroundColor: AGENT_DASHBOARD.hostAnalysisGradeButtonActiveBg,
	},
	gradeText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.valueColor,
	},
	gradeTextActive: {
		fontWeight: fontWeights.bold,
	},
})
