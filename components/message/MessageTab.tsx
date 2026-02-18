import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import FilterIcon from '../ui/icons/message/filterIcon'

type TabKey = 'all' | 'unread' | 'familiar'

const TABS = [
	{ key: 'all', label: 'All' },
	{ key: 'unread', label: 'Unread' },
	{ key: 'familiar', label: 'Familiar Faces' },
] as const

interface TabMeasurement {
	x: number
	width: number
}

export function MessageTabs() {
	const [activeTab, setActiveTab] = useState<TabKey>('all')
	const measurements = useRef<Record<TabKey, TabMeasurement>>(
		{} as Record<TabKey, TabMeasurement>,
	).current

	const scaleX = useRef(new Animated.Value(0)).current
	const translateX = useRef(new Animated.Value(0)).current

	const onTabLayout = (key: TabKey) => (e: LayoutChangeEvent) => {
		const { x, width } = e.nativeEvent.layout
		measurements[key] = { x, width }
	}

	const animateIndicator = (key: TabKey) => {
		const m = measurements[key]
		if (!m) return

		translateX.setValue(m.x + m.width / 2)
		scaleX.setValue(0)

		Animated.spring(scaleX, {
			toValue: 1,
			useNativeDriver: true,
			tension: 90,
			friction: 12,
		}).start()
	}

	const onPressTab = (key: TabKey) => {
		if (key === activeTab) return
		setActiveTab(key)
		animateIndicator(key)
	}

	useEffect(() => {
		animateIndicator(activeTab)
	}, [])

	const activeMeasurement = measurements[activeTab]

	return (
		<View style={styles.container}>
			<View style={styles.tabsWrapper}>
				<View style={styles.tabsRow}>
					{TABS.map(tab => (
						<Pressable
							key={tab.key}
							onPress={() => onPressTab(tab.key)}
							onLayout={onTabLayout(tab.key)}
						>
							<Text
								style={[styles.tab, activeTab === tab.key && styles.activeTab]}
							>
								{tab.label}
							</Text>
						</Pressable>
					))}
				</View>

				{activeMeasurement && (
					<Animated.View
						style={[
							styles.indicator,
							{
								width: activeMeasurement.width,
								left: activeMeasurement.x,
								transform: [{ scaleX }],
							},
						]}
					/>
				)}
			</View>

			<FilterIcon />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.sm,
	},
	tabsWrapper: {
		position: 'relative',
	},
	tabsRow: {
		flexDirection: 'row',
		gap: spacing.lg,
		paddingBottom: spacing.sm,
	},
	tab: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#999',
	},
	activeTab: {
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	indicator: {
		position: 'absolute',
		bottom: 0,
		height: 2,
		backgroundColor: '#000',
		borderRadius: 1,
	},
	contentContainer: {
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md,
	},
	contentText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#667085',
	},
})
