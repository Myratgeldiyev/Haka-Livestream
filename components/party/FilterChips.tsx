import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import PartyBurgerIcon from '../ui/icons/party/partyBurgerIcon'
import RoundedFlagIndia from '../ui/icons/RoundedFlagIndia'

const colors = {
	chipBg: '#dfbaffff',
	chipActiveBg: '#5F22D9',
	chipText: '#1A1A1A',
	chipActiveText: '#FFFFFF',
	border: '#E0E0E0',
}

interface FilterItem {
	id: string
	label: string
	hasFlag?: boolean
}

interface FilterChipsProps {
	items: FilterItem[]
	activeId: string
	onSelect: (id: string) => void
}

export function FilterChips({ items, activeId, onSelect }: FilterChipsProps) {
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{items.map(item => {
					const isActive = item.id === activeId
					return (
						<Pressable
							key={item.id}
							style={[styles.chip, isActive && styles.chipActive]}
							onPress={() => onSelect(item.id)}
						>
							{item.hasFlag && <RoundedFlagIndia />}
							<Text
								style={[styles.chipText, isActive && styles.chipTextActive]}
							>
								{item.label}
							</Text>
						</Pressable>
					)
				})}
			</ScrollView>
			<Pressable style={styles.menuButton}>
				<PartyBurgerIcon />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: spacing.lg,
		paddingRight: spacing.sm,
		paddingVertical: spacing.sm,
	},
	scrollContent: {
		gap: spacing.md,
		paddingRight: spacing.sm,
	},
	chip: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.xs,
		paddingVertical: spacing.xs,
		borderRadius: spacing.xxxl,
		backgroundColor: '#DFBCEC',
		borderWidth: 1,
		borderColor: colors.border,
		gap: spacing.sm,
		minWidth: 50,
	},
	chipActive: {
		backgroundColor: colors.chipActiveBg,
		borderColor: colors.chipActiveBg,
	},
	chipText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#fff',
	},
	chipTextActive: {
		color: colors.chipActiveText,
	},
	flagIcon: {
		width: spacing.xl,
		height: spacing.xl,
		borderRadius: spacing.xl / 2,
		backgroundColor: '#4CAF50',
	},
	menuButton: {
		padding: spacing.sm,
	},
	menuIcon: {
		width: spacing.icon.medium,
		height: spacing.icon.medium,
		borderRadius: spacing.sm,
	},
})
