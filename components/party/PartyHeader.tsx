import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import PartyCrownIcon from '../ui/icons/party/partyCrownIcon'
import SearchIcon from '../ui/icons/party/searchIcon'

const colors = {
	text: '#1A1A1A',
	textMuted: '#888888',
	primary: '#FF2D55',
}

interface PartyHeaderProps {
	activeTab: 'party' | 'following'
	onTabChange: (tab: 'party' | 'following') => void
}

export function PartyHeader({ activeTab, onTabChange }: PartyHeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.tabs}>
				<Pressable onPress={() => onTabChange('party')}>
					<Text style={[styles.tab, activeTab === 'party' && styles.tabActive]}>
						Party
					</Text>
					{activeTab === 'party' && <View style={styles.underline} />}
				</Pressable>
				<Pressable onPress={() => onTabChange('following')}>
					<Text
						style={[styles.tab, activeTab === 'following' && styles.tabActive]}
					>
						Following
					</Text>
					{activeTab === 'following' && <View style={styles.underline} />}
				</Pressable>
			</View>
			<View style={styles.actions}>
				<SearchIcon />
				<PartyCrownIcon />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},
	tabs: {
		flexDirection: 'row',
		gap: spacing.xxl,
	},
	tab: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.semibold,
		color: colors.textMuted,
	},
	tabActive: {
		color: colors.text,
	},
	underline: {
		height: 2,
		backgroundColor: colors.text,
		marginTop: spacing.xs,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.lg,
	},
	iconPlaceholder: {
		width: spacing.icon.medium,
		height: spacing.icon.medium,
		backgroundColor: '#DDD',
		borderRadius: spacing.xs,
	},
	rankIcon: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		backgroundColor: '#FFD700',
		borderRadius: spacing.sm,
	},
})
