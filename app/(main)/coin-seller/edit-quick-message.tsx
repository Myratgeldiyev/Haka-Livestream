import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'

const MAX_LENGTH = 100

export default function EditQuickMessageScreen() {
	const insets = useSafeAreaInsets()
	const [message, setMessage] = useState('')

	const handleSubmit = () => {
		// Handle submit logic
		router.back()
	}

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<LeftArrowIcon props="" color="#000" />
				</Pressable>
				<Text style={styles.headerTitle}>Edit Quick Messages</Text>
				<Pressable onPress={handleSubmit} style={styles.submitButton}>
					<Text style={styles.submitText}>Submit</Text>
				</Pressable>
			</View>

			{/* Content */}
			<View style={styles.content}>
				{/* Label */}
				<View style={styles.labelRow}>
					<Text style={styles.asterisk}>*</Text>
					<Text style={styles.label}>Selling price of coins</Text>
				</View>

				{/* Text Input Card */}
				<View style={styles.inputCard}>
					<TextInput
						style={styles.textInput}
						placeholder="Please Enter message"
						placeholderTextColor="#9CA3AF"
						value={message}
						onChangeText={setMessage}
						maxLength={MAX_LENGTH}
						multiline
						textAlignVertical="top"
					/>
					<Text style={styles.counter}>
						{message.length}/{MAX_LENGTH}
					</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E4F7F4',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#E4F7F4',
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	backButton: {
		padding: spacing.sm,
	},
	headerTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	submitButton: {
		padding: spacing.sm,
	},
	submitText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#7C3AED',
	},
	content: {
		flex: 1,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	asterisk: {
		fontSize: fontSizes.md,
		color: '#EF4444',
		marginRight: spacing.xs,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#6B7280',
	},
	inputCard: {
		backgroundColor: '#FFF',
		borderRadius: spacing.md,
		padding: spacing.lg,
		minHeight: 200,
	},
	textInput: {
		flex: 1,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		minHeight: 150,
	},
	counter: {
		fontSize: fontSizes.sm,
		color: '#9CA3AF',
		textAlign: 'right',
		marginTop: spacing.sm,
	},
})
