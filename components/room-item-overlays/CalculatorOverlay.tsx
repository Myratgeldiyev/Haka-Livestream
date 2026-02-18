import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FireRoomPlay from '../ui/icons/room-play/FireRoomPlay'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZES,
	OVERLAY_HEIGHTS,
	SPACING,
	TIME_OPTION,
	sharedOverlayStyles,
} from './item-overlay.styles'
import type { CalculatorOverlayProps, TimeOption } from './item-overlay.types'
import { ItemOverlayWrapper } from './ItemOverlayWrapper'

const TIME_OPTIONS: TimeOption[] = [
	{ id: 'calc-5', label: '5 Min', value: 5 },
	{ id: 'calc-15', label: '15 Min', value: 15 },
	{ id: 'calc-30', label: '30 Min', value: 30 },
	{ id: 'calc-infinite', label: '∞ Mic', value: null },
]

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				sharedOverlayStyles.iconPlaceholder,
				{ width: size, height: size, borderRadius: size / 2 },
			]}
		/>
	)
}

function TimeOptionButton({
	option,
	isSelected,
	onSelect,
}: {
	option: TimeOption
	isSelected: boolean
	onSelect: () => void
}) {
	return (
		<Pressable
			style={[
				styles.timeOption,
				isSelected ? styles.timeOptionSelected : styles.timeOptionDefault,
			]}
			onPress={onSelect}
		>
			<Text
				style={[
					styles.timeOptionText,
					isSelected
						? styles.timeOptionTextSelected
						: styles.timeOptionTextDefault,
				]}
			>
				{option.label}
			</Text>
		</Pressable>
	)
}

export function CalculatorOverlay({
	visible,
	onClose,
	onStart,
}: CalculatorOverlayProps) {
	const [selectedTimeId, setSelectedTimeId] = useState<string>('calc-5')

	const handleStart = () => {
		const selectedOption = TIME_OPTIONS.find(opt => opt.id === selectedTimeId)
		onStart?.(selectedOption?.value ?? null)
	}

	return (
		<ItemOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.calculator}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<View style={styles.headerIconContainer}>
						<FireRoomPlay />
					</View>
					<Text style={styles.headerTitle}>Calculator</Text>
				</View>

				<View style={styles.timeSection}>
					<Text style={sharedOverlayStyles.sectionTitle}>Choose Time</Text>
					<View style={styles.timeOptionsGrid}>
						<View style={styles.timeOptionsRow}>
							{TIME_OPTIONS.slice(0, 3).map(option => (
								<TimeOptionButton
									key={option.id}
									option={option}
									isSelected={selectedTimeId === option.id}
									onSelect={() => setSelectedTimeId(option.id)}
								/>
							))}
						</View>
						<View style={styles.timeOptionsRowSecond}>
							<TimeOptionButton
								option={TIME_OPTIONS[3]}
								isSelected={selectedTimeId === TIME_OPTIONS[3].id}
								onSelect={() => setSelectedTimeId(TIME_OPTIONS[3].id)}
							/>
						</View>
					</View>
				</View>

				<Pressable style={styles.startButton} onPress={handleStart}>
					<Text style={styles.startButtonText}>Start</Text>
				</Pressable>
			</View>
		</ItemOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.md,
		marginBottom: SPACING.lg,
	},
	headerIconContainer: {
		width: 48,
		height: 48,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.gameCardBackground,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: FONT_SIZES.title,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	timeSection: {
		marginBottom: SPACING.xxl,
	},
	timeOptionsGrid: {
		gap: SPACING.md,
	},
	timeOptionsRow: {
		flexDirection: 'row',
		gap: SPACING.md,
	},
	timeOptionsRowSecond: {
		flexDirection: 'row',
		width: TIME_OPTION.minWidth + SPACING.xl,
	},
	timeOption: {
		flex: 1,
		height: TIME_OPTION.height,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: TIME_OPTION.minWidth,
	},
	timeOptionDefault: {
		backgroundColor: COLORS.timeOptionDefault,
	},
	timeOptionSelected: {
		backgroundColor: COLORS.timeOptionSelected,
	},
	timeOptionText: {
		fontSize: FONT_SIZES.lg,
		fontWeight: '600',
	},
	timeOptionTextDefault: {
		color: COLORS.textPrimary,
	},
	timeOptionTextSelected: {
		color: COLORS.textPrimary,
	},
	startButton: {
		marginTop: 'auto',
		height: 56,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
})
