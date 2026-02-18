import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type FilterType = 'all' | 'transfer' | 'recharge' | 'withdraw'

interface TypeFilterProps {
	value: FilterType
	onChange: (type: FilterType) => void
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
	{ value: 'all', label: 'All Type' },
	{ value: 'transfer', label: 'Transfer' },
	{ value: 'recharge', label: 'Recharge' },
	{ value: 'withdraw', label: 'Withdraw' },
]

export function TypeFilter({ value, onChange }: TypeFilterProps) {
	const [isOpen, setIsOpen] = useState(false)

	const selectedOption = FILTER_OPTIONS.find((opt) => opt.value === value)

	const handleSelect = (type: FilterType) => {
		onChange(type)
		setIsOpen(false)
	}

	return (
		<View style={styles.container}>
			<Pressable style={styles.button} onPress={() => setIsOpen(true)}>
				<Text style={styles.buttonText}>{selectedOption?.label}</Text>
				<DropdownIcon />
			</Pressable>

			<Modal
				visible={isOpen}
				transparent
				animationType="fade"
				onRequestClose={() => setIsOpen(false)}
			>
				<Pressable style={styles.overlay} onPress={() => setIsOpen(false)}>
					<View style={styles.dropdown}>
						{FILTER_OPTIONS.map((option) => (
							<Pressable
								key={option.value}
								style={[
									styles.option,
									value === option.value && styles.optionActive,
								]}
								onPress={() => handleSelect(option.value)}
							>
								<Text
									style={[
										styles.optionText,
										value === option.value && styles.optionTextActive,
									]}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</Pressable>
			</Modal>
		</View>
	)
}

function DropdownIcon() {
	return (
		<Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
			<Path
				d="M6 9l6 6 6-6"
				stroke="#000"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	buttonText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'flex-start',
		paddingTop: 180,
		paddingHorizontal: spacing.lg,
	},
	dropdown: {
		backgroundColor: '#FFF',
		borderRadius: spacing.md,
		padding: spacing.sm,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	option: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: spacing.sm,
	},
	optionActive: {
		backgroundColor: '#F3F4F6',
	},
	optionText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#374151',
	},
	optionTextActive: {
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
})
