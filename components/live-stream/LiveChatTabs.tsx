import { LIVE_STREAM, LiveStreamTab } from '@/constants/liveStream'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	LayoutChangeEvent,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

interface TabMeasurement {
	x: number
	width: number
}

interface LiveChatTabsProps {
	/** When provided, tab selection is controlled by the parent (e.g. so "Live" stays active when returning from chat screen). */
	activeTab?: LiveStreamTab
	onTabChange?: (tab: LiveStreamTab) => void
}

export function LiveChatTabs({ activeTab: controlledActiveTab, onTabChange }: LiveChatTabsProps) {
	const [internalActiveTab, setInternalActiveTab] = useState<LiveStreamTab>('Live')
	const [isReady, setIsReady] = useState(false)
	const measurements = useRef<Record<LiveStreamTab, TabMeasurement>>(
		{} as Record<LiveStreamTab, TabMeasurement>,
	).current

	const scaleX = useRef(new Animated.Value(0)).current
	const indicatorLeft = useRef(new Animated.Value(0)).current
	const indicatorWidth = useRef(0)

	const isControlled = controlledActiveTab !== undefined
	const activeTab = isControlled ? controlledActiveTab : internalActiveTab

	const onTabLayout = (tab: LiveStreamTab) => (e: LayoutChangeEvent) => {
		const { x, width } = e.nativeEvent.layout
		measurements[tab] = { x, width }

		if (tab === activeTab && !isReady) {
			indicatorLeft.setValue(x)
			indicatorWidth.current = width
			setIsReady(true)

			Animated.spring(scaleX, {
				toValue: 1,
				useNativeDriver: true,
				tension: 100,
				friction: 10,
			}).start()
		}
	}

	const animateIndicator = (tab: LiveStreamTab) => {
		const m = measurements[tab]
		if (!m) return

		scaleX.setValue(0)
		indicatorLeft.setValue(m.x)
		indicatorWidth.current = m.width

		Animated.spring(scaleX, {
			toValue: 1,
			useNativeDriver: true,
			tension: 80,
			friction: 8,
		}).start()
	}

	// When controlled activeTab changes (e.g. parent resets to 'Live' on focus), sync indicator
	useEffect(() => {
		if (!isControlled || !isReady) return
		const m = measurements[controlledActiveTab!]
		if (m) animateIndicator(controlledActiveTab!)
	}, [isControlled, controlledActiveTab, isReady])

	const handleTabPress = (tab: LiveStreamTab) => {
		if (tab === activeTab) return
		if (!isControlled) {
			setInternalActiveTab(tab)
			animateIndicator(tab)
		}
		onTabChange?.(tab)
	}

	const activeMeasurement = measurements[activeTab]

	return (
		<View style={styles.container}>
			<View style={styles.tabsRow}>
				{LIVE_STREAM.tabs.map(tab => (
					<Pressable
						key={tab}
						onPress={() => handleTabPress(tab)}
						onLayout={onTabLayout(tab)}
						style={styles.tabButton}
					>
						<Text
							style={[
								styles.tabText,
								activeTab === tab && styles.activeTabText,
							]}
						>
							{tab}
						</Text>
					</Pressable>
				))}
			</View>

			{isReady && activeMeasurement && (
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
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		position: 'relative',
		marginTop: 30,
	},
	tabsRow: {
		flexDirection: 'row',
		gap: 32,
		paddingBottom: 8,
	},
	tabButton: {
		paddingVertical: 5,
		paddingHorizontal: 4,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'rgba(255, 255, 255, 0.6)',
	},
	activeTabText: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	indicator: {
		position: 'absolute',
		bottom: 0,
		height: 3,
		backgroundColor: '#FFFFFF',
		borderRadius: 1.5,
	},
})
