import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const MIC_OPTIONS = ['5 Mic', '10 Mic', '15 Mic', '20 Mic'] as const
type MicOption = (typeof MIC_OPTIONS)[number]

interface MicCountSelectorProps {
	selectedMic: MicOption
	onMicSelect?: (mic: MicOption) => void
}

export function MicCountSelector({
	selectedMic,
	onMicSelect,
}: MicCountSelectorProps) {
	return (
		<View style={styles.container}>
			{MIC_OPTIONS.map(mic => (
				<Pressable
					key={mic}
					style={[styles.button, selectedMic === mic && styles.buttonActive]}
					onPress={() => onMicSelect?.(mic)}
				>
					<Text style={[styles.text, selectedMic === mic && styles.textActive]}>
						{mic}
					</Text>
				</Pressable>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		borderRadius: 16,
		backgroundColor: '#3D3A50',
	},
	buttonActive: {
		backgroundColor: '#7C4DFF',
	},
	text: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	textActive: {
		color: '#FFFFFF',
	},
})
