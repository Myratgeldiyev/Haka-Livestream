import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights } from '@/constants/typography'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type FilterType = 'all' | 'active' | 'new'

export function RecommendContent() {
	const [filterType, setFilterType] = useState<FilterType>('all')
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const filterOptions: { value: FilterType; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'new', label: 'New' },
	]

	const selectedFilter = filterOptions.find(opt => opt.value === filterType)

	return (
		<View style={styles.container}>
			<View style={styles.filterBar}>
				<Pressable
					style={styles.filterButton}
					onPress={() => setIsFilterOpen(true)}
				>
					<SendIcon />
					<Text style={styles.filterText}>{selectedFilter?.label}</Text>
					<DropdownIcon />
				</Pressable>

				<Pressable
					style={styles.editButton}
					onPress={() => router.push('/(main)/coin-seller/edit-quick-message')}
				>
					<SendIcon />
					<Text style={styles.editButtonText}>Edit Quick Message</Text>
				</Pressable>
			</View>

			<Modal
				visible={isFilterOpen}
				transparent
				animationType="fade"
				onRequestClose={() => setIsFilterOpen(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setIsFilterOpen(false)}
				>
					<View style={styles.dropdown}>
						{filterOptions.map(option => (
							<Pressable
								key={option.value}
								style={[
									styles.dropdownOption,
									filterType === option.value && styles.dropdownOptionActive,
								]}
								onPress={() => {
									setFilterType(option.value)
									setIsFilterOpen(false)
								}}
							>
								<Text
									style={[
										styles.dropdownOptionText,
										filterType === option.value && styles.dropdownOptionTextActive,
									]}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</Pressable>
			</Modal>

			{/* Empty content area - can be populated with recommend list */}
			<View style={styles.emptyContent} />
		</View>
	)
}

function SendIcon() {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
			<Path
				d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
				stroke="#10B981"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
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
		flex: 1,
	},
	filterBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: 24,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},
	filterButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	filterText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	editButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	editButtonText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.medium,
		color: '#10B981',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'flex-start',
		paddingTop: 200,
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
	dropdownOption: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: spacing.sm,
	},
	dropdownOptionActive: {
		backgroundColor: '#F3F4F6',
	},
	dropdownOptionText: {
		fontSize: fontSizes.md,
		color: '#374151',
	},
	dropdownOptionTextActive: {
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	emptyContent: {
		flex: 1,
	},
})
