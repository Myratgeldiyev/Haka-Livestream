import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AdminFilterIcon from '../ui/icons/admin-centre/AdminFilterIcon'
import { ADMIN_CENTER } from './constants'

interface AgencyFilterBarProps {
	periodLabel?: string
	onPrevPeriod?: () => void
	onNextPeriod?: () => void
	onFilterPress?: () => void
	onSortPress?: () => void
	sortLabel?: string
}

export function AgencyFilterBar({
	periodLabel = 'This Week',
	onPrevPeriod,
	onNextPeriod,
	onFilterPress,
	onSortPress,
	sortLabel = 'Join Time',
}: AgencyFilterBarProps) {
	return (
		<View style={styles.bar}>
			<View style={styles.periodRow}>
				<Pressable
					onPress={onPrevPeriod}
					style={styles.arrowBtn}
					accessibilityLabel='Previous period'
					accessibilityRole='button'
				>
					<Ionicons
						name='chevron-back'
						size={20}
						color={ADMIN_CENTER.valueColor}
					/>
				</Pressable>
				<Text style={styles.periodText} numberOfLines={1}>
					{periodLabel}
				</Text>
				<Pressable
					onPress={onNextPeriod}
					style={styles.arrowBtn}
					accessibilityLabel='Next period'
					accessibilityRole='button'
				>
					<Ionicons
						name='chevron-forward'
						size={20}
						color={ADMIN_CENTER.valueColor}
					/>
				</Pressable>
			</View>

			<Pressable
				onPress={onSortPress}
				style={styles.sortRow}
				accessibilityLabel={`Sort by ${sortLabel}`}
				accessibilityRole='button'
			>
				<AdminFilterIcon />
				<Text style={styles.sortText} numberOfLines={1}>
					{sortLabel}
				</Text>
				<Ionicons
					name='chevron-down'
					size={16}
					color={ADMIN_CENTER.valueColor}
				/>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	bar: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: ADMIN_CENTER.filterBarBorderRadius,
		paddingVertical: 8,
		gap: 8,
	},
	periodRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		gap: 4,
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderColor: ADMIN_CENTER.dividerColor,
	},
	arrowBtn: {
		padding: 2,
	},
	periodText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: ADMIN_CENTER.valueColor,
		maxWidth: 72,
	},
	iconBtn: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: ADMIN_CENTER.dividerColor,
	},
	sortRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: ADMIN_CENTER.dividerColor,
	},
	sortText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: ADMIN_CENTER.valueColor,
		maxWidth: 70,
	},
})
