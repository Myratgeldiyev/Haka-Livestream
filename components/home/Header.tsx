import React from 'react'
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TabButton } from '@/components/common/TabButton'
import { colors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { typography } from '@/constants/typography'
import { LiveTab } from '@/types'
import { router } from 'expo-router'
import { SearchIcon } from '../ui/icons'

const tabs: { id: LiveTab; label: string }[] = [
	{ id: 'nearby', label: 'Nearby' },
	{ id: 'follow', label: 'Follow' },
	{ id: 'live', label: 'Live' },
	{ id: 'new', label: 'New' },
]

type HeaderProps = {
	activeTab: LiveTab
	onTabChange: (tabId: LiveTab) => void
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
	return (
		<SafeAreaView edges={['top']} style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.tabContainer}>
					{tabs.map(tab => (
						<View key={tab.id} style={styles.tabItem}>
							<TabButton
								label={tab.label}
								isActive={activeTab === tab.id}
								onPress={() => onTabChange(tab.id)}
							/>
						</View>
					))}
				</View>

				<View style={styles.rightSection}>
					<TouchableOpacity style={styles.iconButton}>
						<SearchIcon color={colors.black} />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.rankButton}
						onPress={() => router.push('/(main)/rank/state')}
					>
						<Image
							source={require('../../assets/images/crown.png')}
							style={styles.rankImage}
						/>
						<Text style={styles.rankText}>All</Text>
						<Text style={styles.chevron}>▼</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: colors.primaryLight,
	},

	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},

	tabContainer: {
		flexDirection: 'row',
		flexShrink: 1,
	},

	tabItem: {
		marginRight: spacing.sm,
	},

	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: spacing.sm,
	},

	iconButton: {
		width: 36,
		height: 36,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: spacing.sm,
	},

	rankButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: 20,
	},

	rankImage: {
		width: 16,
		height: 16,
		marginRight: spacing.xs,
	},

	rankText: {
		fontSize: typography.sizes.sm,
		fontWeight:
			Platform.OS === 'ios'
				? typography.weights.semibold
				: typography.weights.medium,
		color: colors.primary,
		marginRight: 4,
	},

	chevron: {
		fontSize: typography.sizes.xs,
		color: colors.primary,
	},
})
