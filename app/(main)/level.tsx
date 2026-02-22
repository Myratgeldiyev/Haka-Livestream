import {
	CharmLevelTabContent,
	LevelHeader,
	RichLevelTabContent,
} from '@/components/level'
import type { LevelTabId } from '@/components/level'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	ImageBackground,
	StatusBar as RNStatusBar,
	StyleSheet,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function LevelScreen() {
	const insets = useSafeAreaInsets()
	const [activeTab, setActiveTab] = useState<LevelTabId>('rich')

	const handleBackPress = useCallback(() => {
		router.back()
	}, [])

	const isCharm = activeTab === 'charm'

	return (
		<>
			<StatusBar style="light" />
			<View style={styles.container}>
				<RNStatusBar
					barStyle="light-content"
					backgroundColor={isCharm ? '#620719' : undefined}
				/>
				{isCharm && (
					<View
						style={[styles.statusBarCharm, { height: insets.top }]}
						pointerEvents="none"
					/>
				)}
				<ImageBackground
					source={require('@/assets/images/blue bg 1.png')}
					style={[styles.background, { paddingTop: insets.top }]}
					resizeMode="cover"
				>
					<LevelHeader
						activeTab={activeTab}
						onTabChange={setActiveTab}
						onBackPress={handleBackPress}
					/>
					<View style={styles.content}>
						{activeTab === 'charm' && (
							<View
								style={[StyleSheet.absoluteFill, styles.charmOverlay]}
								pointerEvents="none"
							/>
						)}
						{activeTab === 'rich' && <RichLevelTabContent />}
						{activeTab === 'charm' && <CharmLevelTabContent />}
					</View>
				</ImageBackground>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0A1121',
	},
	background: {
		flex: 1,
		width: '100%',
	},
	content: {
		flex: 1,
		minHeight: 0,
		overflow: 'hidden',
	},
	charmOverlay: {
		backgroundColor: '#620719',
	},
	statusBarCharm: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#620719',
		zIndex: 1,
	},
})
