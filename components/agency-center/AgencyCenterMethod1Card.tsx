import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { AgencyCenterMethodLabelBadge } from './AgencyCenterMethodLabelBadge'
import { AGENCY_CENTER } from './constants'

interface AgencyCenterMethod1CardProps {
	onContinue?: (agentId: string) => void
}

export function AgencyCenterMethod1Card({
	onContinue,
}: AgencyCenterMethod1CardProps) {
	const [agentId, setAgentId] = useState('')

	const handleContinue = () => {
		onContinue?.(agentId.trim())
	}

	return (
		<View style={styles.card}>
			<AgencyCenterMethodLabelBadge label={AGENCY_CENTER.method1Label} />
			<Text style={styles.title}>{AGENCY_CENTER.method1Title}</Text>
			<Text style={styles.description}>{AGENCY_CENTER.method1Description}</Text>
			<TextInput
				style={styles.input}
				placeholder={AGENCY_CENTER.method1Placeholder}
				placeholderTextColor={AGENCY_CENTER.inputPlaceholder}
				value={agentId}
				onChangeText={setAgentId}
				autoCapitalize='none'
				autoCorrect={false}
			/>
			<Pressable
				style={styles.button}
				onPress={handleContinue}
				android_ripple={null}
			>
				<Text style={styles.buttonText}>{AGENCY_CENTER.method1Button}</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: AGENCY_CENTER.screenPadding,
		marginBottom: spacing.lg,
		padding: spacing.xxl,
		borderWidth: AGENCY_CENTER.cardBorderWidth,
		borderColor: AGENCY_CENTER.cardBorder,
		borderRadius: AGENCY_CENTER.cardBorderRadius,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: AGENCY_CENTER.highlightText,
		marginBottom: spacing.xs,
		textAlign: 'center',
	},
	description: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		marginBottom: spacing.md,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: AGENCY_CENTER.inputBorder,
		borderRadius: AGENCY_CENTER.cardBorderRadius,
		paddingVertical: spacing.button.vertical,
		paddingHorizontal: spacing.button.horizontal,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		marginBottom: spacing.md,
		minHeight: 48,
	},
	button: {
		height: AGENCY_CENTER.method1ButtonHeight,
		paddingHorizontal: AGENCY_CENTER.method1ButtonPaddingHorizontal,
		borderRadius: AGENCY_CENTER.method1ButtonBorderRadius,
		backgroundColor: AGENCY_CENTER.method1ButtonBackground,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
		alignSelf: 'flex-start',
	},
	buttonText: {
		fontSize: AGENCY_CENTER.method1ButtonFontSize,
		fontWeight: AGENCY_CENTER.method1ButtonFontWeight,
		color: AGENCY_CENTER.method1ButtonTextColor,
	},
})
