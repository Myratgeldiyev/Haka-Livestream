import { useAgencyHostStore } from '@/store/agency-host.store'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { AgencyCenterMethodLabelBadge } from './AgencyCenterMethodLabelBadge'
import { AGENCY_CENTER } from './constants'

interface AgencyCenterMethod1CardProps {
	onContinue?: (agentId: string) => void
}

export function AgencyCenterMethod1Card({
	onContinue,
}: AgencyCenterMethod1CardProps) {
	const [agentId, setAgentId] = useState('')
	const applyForHostLoading = useAgencyHostStore(s => s.applyForHostLoading)
	const applyForHostError = useAgencyHostStore(s => s.applyForHostError)
	const clearApplyForHostError = useAgencyHostStore(s => s.clearApplyForHostError)

	const handleContinue = () => {
		if (applyForHostLoading) return
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
				onChangeText={text => {
					setAgentId(text)
					if (applyForHostError) clearApplyForHostError()
				}}
				autoCapitalize='none'
				autoCorrect={false}
			/>
			{applyForHostError ? (
				<Text style={styles.errorText}>{applyForHostError}</Text>
			) : null}
			<Pressable
				style={styles.button}
				onPress={handleContinue}
				android_ripple={null}
				disabled={applyForHostLoading}
			>
				{applyForHostLoading ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<Text style={styles.buttonText}>{AGENCY_CENTER.method1Button}</Text>
				)}
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
		marginBottom: spacing.xs,
		minHeight: 48,
	},
	errorText: {
		fontSize: fontSizes.sm,
		color: '#E53935',
		marginBottom: spacing.md,
	},
	button: {
		height: AGENCY_CENTER.method1ButtonHeight,
		width: '100%',
		borderRadius: AGENCY_CENTER.method1ButtonBorderRadius,
		backgroundColor: '#804EE4',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
	},
	buttonText: {
		fontSize: AGENCY_CENTER.method1ButtonFontSize,
		fontWeight: AGENCY_CENTER.method1ButtonFontWeight,
		color: AGENCY_CENTER.method1ButtonTextColor,
	},
})
