import {
	ChatIcon,
	GameIcon,
	LiveIcon,
	PartyIcon,
	ProfileIcon,
} from '@/components/ui/icons'
import { colors } from '@/constants/colors'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ACTIVE = '#FF2D55'
const INACTIVE = '#DDDDDD'
const ICON_SIZE = 24
const TAB_BAR_HEIGHT = 52

function TabIcon({
	focused,
	children,
}: {
	focused: boolean
	children: React.ReactNode
}) {
	return (
		<View style={styles.tabItem}>
			<View
				style={[styles.iconWrapper, { opacity: focused ? 1 : 0.6 }]}
				pointerEvents='none'
			>
				{children}
			</View>
		</View>
	)
}

export default function TabsLayout() {
	const insets = useSafeAreaInsets()

	return (
		<>
			<StatusBar style='dark' backgroundColor={colors.white} />

			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarHideOnKeyboard: true,

					tabBarStyle: [
						styles.tabBar,
						{
							height: TAB_BAR_HEIGHT + insets.bottom,
							paddingBottom: insets.bottom,
						},
					],

					tabBarItemStyle: styles.tabBarItem,
				}}
			>
				<Tabs.Screen
					name='live'
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused}>
								<LiveIcon
									color={focused ? ACTIVE : INACTIVE}
									size={ICON_SIZE}
								/>
							</TabIcon>
						),
					}}
				/>

				<Tabs.Screen
					name='party'
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused}>
								<PartyIcon
									color={focused ? ACTIVE : INACTIVE}
									size={ICON_SIZE}
								/>
							</TabIcon>
						),
					}}
				/>

				<Tabs.Screen
					name='index'
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused}>
								<GameIcon
									color={focused ? ACTIVE : INACTIVE}
									size={ICON_SIZE}
								/>
							</TabIcon>
						),
					}}
				/>

				<Tabs.Screen
					name='messages'
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused}>
								<ChatIcon
									color={focused ? ACTIVE : INACTIVE}
									size={ICON_SIZE}
								/>
							</TabIcon>
						),
					}}
				/>

				<Tabs.Screen
					name='profile'
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused}>
								<ProfileIcon
									color={focused ? ACTIVE : INACTIVE}
									size={ICON_SIZE}
								/>
							</TabIcon>
						),
					}}
				/>
			</Tabs>
		</>
	)
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: colors.white,
		borderTopWidth: 0,

		elevation: 12,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: -3 },
		shadowOpacity: 0.08,
		shadowRadius: 10,
	},

	tabBarItem: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	tabItem: {
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},

	iconWrapper: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
