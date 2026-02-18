import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LIVE_DATA } from './constants'

export type MainTab = 'live' | 'pk'
export type SubTab =
	| 'daily'
	| 'weekly'
	| 'monthly'
	| 'random'
	| 'friend'
	| 'team'

interface LiveDataHeaderProps {
	mainTab: MainTab
	subTab: SubTab
	onBack?: () => void
	onMainTabChange?: (tab: MainTab) => void
	onSubTabChange?: (tab: SubTab) => void
}

const MAIN_TABS: { id: MainTab; label: string }[] = [
	{ id: 'live', label: 'Live data' },
	{ id: 'pk', label: 'PK data' },
]

const LIVE_SUB_TABS: { id: SubTab; label: string }[] = [
	{ id: 'daily', label: 'Daily' },
	{ id: 'weekly', label: 'Weekly Data' },
	{ id: 'monthly', label: 'Monthly Data' },
]

const PK_SUB_TABS: { id: SubTab; label: string }[] = [
	{ id: 'random', label: 'Random PK' },
	{ id: 'friend', label: 'Friend PK' },
	{ id: 'team', label: 'Team PK' },
]

export function LiveDataHeader({
	mainTab,
	subTab,
	onBack,
	onMainTabChange,
	onSubTabChange,
}: LiveDataHeaderProps) {
	return (
		<View style={styles.wrapper}>
			<View style={styles.topRow}>
				<Pressable
					onPress={onBack}
					style={styles.backBtn}
					hitSlop={12}
					accessibilityLabel="Go back"
					accessibilityRole="button"
				>
					<LeftArrowIcon props="" color="#000" />
				</Pressable>
				<View style={styles.mainTabs}>
					{MAIN_TABS.map((tab) => (
						<Pressable
							key={tab.id}
							onPress={() => onMainTabChange?.(tab.id)}
							style={styles.mainTab}
							accessibilityRole="tab"
							accessibilityState={{ selected: mainTab === tab.id }}
						>
							<Text
								style={[
									styles.mainTabText,
									mainTab === tab.id && styles.mainTabTextActive,
								]}
							>
								{tab.label}
							</Text>
							{mainTab === tab.id && <View style={styles.mainTabUnderline} />}
						</Pressable>
					))}
				</View>
			</View>
			<View style={styles.subTabs}>
				{(mainTab === 'live' ? LIVE_SUB_TABS : PK_SUB_TABS).map((tab) => (
					<Pressable
						key={tab.id}
						onPress={() => onSubTabChange?.(tab.id)}
						style={styles.subTab}
						accessibilityRole="tab"
						accessibilityState={{ selected: subTab === tab.id }}
					>
						<Text
							style={[
								styles.subTabText,
								subTab === tab.id && styles.subTabTextActive,
							]}
						>
							{tab.label}
						</Text>
						{subTab === tab.id && <View style={styles.subTabUnderline} />}
					</Pressable>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: LIVE_DATA.screenPadding,
		paddingTop: 8,
		paddingBottom: 12,
		backgroundColor: LIVE_DATA.screenBg,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		minHeight: 40,
	},
	backBtn: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
		zIndex: 1,
	},
	mainTabs: {
		position: 'absolute',
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	mainTab: {
		alignItems: 'center',
		paddingVertical: 8,
	},
	mainTabText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.inactiveColor,
	},
	mainTabTextActive: {
		fontWeight: fontWeights.bold,
		color: LIVE_DATA.activeColor,
	},
	mainTabUnderline: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: LIVE_DATA.mainTabUnderlineHeight,
		backgroundColor: LIVE_DATA.activeColor,
		borderRadius: 1,
	},
	subTabs: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		marginTop: 4,
	},
	subTab: {
		alignItems: 'center',
		paddingVertical: 6,
	},
	subTabText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: LIVE_DATA.activeColor,
	},
	subTabTextActive: {
		fontWeight: fontWeights.bold,
	},
	subTabUnderline: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: LIVE_DATA.subTabUnderlineHeight,
		backgroundColor: LIVE_DATA.activeColor,
		borderRadius: 1,
	},
})
