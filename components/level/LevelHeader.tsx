import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'
import { LEVEL_COLORS, LEVEL_LAYOUT } from './level.constants'
import type { LevelHeaderProps } from './level.types'

export function LevelHeader({
	activeTab,
	onTabChange,
	onBackPress,
}: LevelHeaderProps) {
	const isCharm = activeTab === 'charm'
	return (
		<View style={[styles.container, isCharm && styles.containerCharm]}>
			<View style={styles.topRow}>
				<Pressable
					onPress={onBackPress}
					style={styles.backButton}
					accessibilityLabel='Go back'
				>
					<LeftArrowIcon props='' color='#fff' />
				</Pressable>
				<Text style={styles.title}>My Level</Text>
				<View style={styles.spacer} />
			</View>
			<View style={styles.tabsRow}>
				<Pressable
					onPress={() => onTabChange('rich')}
					style={styles.tab}
					accessibilityRole='tab'
					accessibilityState={{ selected: activeTab === 'rich' }}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === 'rich' && styles.tabTextActive,
						]}
					>
						Rich Level
					</Text>
					{activeTab === 'rich' && <View style={styles.tabUnderline} />}
				</Pressable>
				<Pressable
					onPress={() => onTabChange('charm')}
					style={styles.tab}
					accessibilityRole='tab'
					accessibilityState={{ selected: activeTab === 'charm' }}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === 'charm' && styles.tabTextActive,
						]}
					>
						Charm Level
					</Text>
					{activeTab === 'charm' && <View style={styles.tabUnderline} />}
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: LEVEL_LAYOUT.horizontalPadding,
		paddingTop: 8,
		paddingBottom: 12,
	},
	containerCharm: {
		backgroundColor: '#620719',
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minHeight: LEVEL_LAYOUT.headerHeight - 24,
	},
	backButton: {
		padding: 8,
		marginLeft: -8,
	},
	iconPlaceholder: {
		width: 24,
		height: 24,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconPlaceholderText: {
		fontSize: 10,
		color: LEVEL_COLORS.text.primary,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: LEVEL_COLORS.text.primary,
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		pointerEvents: 'none',
	},
	spacer: {
		width: 24,
		height: 24,
	},
	tabsRow: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		gap: 24,
		height: LEVEL_LAYOUT.tabsHeight,
	},
	tab: {
		paddingBottom: 8,
	},
	tabText: {
		fontSize: 15,
		color: LEVEL_COLORS.header.tabInactive,
		fontWeight: '400',
	},
	tabTextActive: {
		color: LEVEL_COLORS.text.primary,
		fontWeight: '600',
	},
	tabUnderline: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 2,
		backgroundColor: LEVEL_COLORS.header.tabActiveUnderline,
		borderRadius: 1,
	},
})
