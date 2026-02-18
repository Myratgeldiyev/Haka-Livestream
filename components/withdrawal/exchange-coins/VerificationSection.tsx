import RefreshIcon from '@/components/ui/icons/withdrawal/RefreshIcon'
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

interface VerificationSectionProps {
	code: string
	onCodeChange: (text: string) => void
	displayCode: string
	onRefreshCode: () => void
}

export function VerificationSection({
	code,
	onCodeChange,
	displayCode,
	onRefreshCode,
}: VerificationSectionProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Verification quantity</Text>
			<View style={styles.row}>
				<TextInput
					style={styles.input}
					value={code}
					onChangeText={onCodeChange}
					placeholder='Enter verification code'
					placeholderTextColor='#9CA3AF'
					keyboardType='number-pad'
				/>
				<Pressable style={styles.codeBox} onPress={onRefreshCode}>
					<Text style={styles.codeText}>{displayCode}</Text>
					<RefreshIcon />
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 44,
		marginBottom: 24,
	},
	title: {
		fontSize: 16,
		fontWeight: '700',
		color: '#111111',
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		gap: 10,
	},
	input: {
		flex: 2,
		fontSize: 15,
		color: '#111111',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 10,
		paddingVertical: 14,
		paddingHorizontal: 14,
		minHeight: 48,
	},
	codeBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#9B7BE8',
		borderRadius: 16,
		paddingVertical: 14,
		paddingHorizontal: 14,
		minHeight: 48,
	},
	codeText: {
		fontSize: 15,
		fontWeight: '600',
		color: '#000',
	},
	refreshIcon: {
		fontSize: 20,
		color: '#fff',
		fontWeight: '600',
	},
})
