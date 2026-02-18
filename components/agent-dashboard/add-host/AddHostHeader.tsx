import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

type AddHostTab = 'host' | 'invite_agent'

interface AddHostHeaderProps {
	activeTab?: AddHostTab
	onBack?: () => void
	onTabChange?: (tab: AddHostTab) => void
}

export function AddHostHeader({
	activeTab = 'host',
	onBack,
	onTabChange,
}: AddHostHeaderProps) {
	return (
		<View style={styles.row}>
			<View style={styles.side}>
				<Pressable
					onPress={onBack}
					style={styles.backButton}
					hitSlop={12}
					accessibilityLabel='Go back'
					accessibilityRole='button'
				>
					<LeftArrowIcon props='' color='#000' />
				</Pressable>
			</View>
			<View style={styles.tabs}>
				<Pressable
					style={styles.tab}
					onPress={() => onTabChange?.('host')}
					accessibilityRole='tab'
					accessibilityState={{ selected: activeTab === 'host' }}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === 'host' && styles.tabTextActive,
						]}
					>
						Host
					</Text>
					<Ionicons
						name='chevron-down'
						size={16}
						color={
							activeTab === 'host'
								? AGENT_DASHBOARD.valueColor
								: AGENT_DASHBOARD.labelColor
						}
					/>
				</Pressable>
				<Pressable
					style={styles.tab}
					onPress={() => onTabChange?.('invite_agent')}
					accessibilityRole='tab'
					accessibilityState={{ selected: activeTab === 'invite_agent' }}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === 'invite_agent' && styles.tabTextActive,
						]}
					>
						Invite agent
					</Text>
				</Pressable>
			</View>
			<View style={styles.side} />
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
	},
	side: {
		width: 40,
		alignItems: 'flex-start',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	tabs: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
	tab: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	tabText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.labelColor,
	},
	tabTextActive: {
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
