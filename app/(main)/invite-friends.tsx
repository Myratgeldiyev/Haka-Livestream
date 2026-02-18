import {
	InviteFriendsContent,
	InviteFriendsHeader,
} from '@/components/invite-friends'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function InviteFriendsScreen() {
	const insets = useSafeAreaInsets()
	const handleBack = useCallback(() => router.back(), [])

	return (
		<View style={styles.root}>
			<StatusBar barStyle='dark-content' backgroundColor='#fff' />
			<View style={[styles.statusBarFill, { height: insets.top }]} />
			<SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
				<InviteFriendsHeader onBack={handleBack} topInset={insets.top} />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={[
						styles.scrollContent,
						{ paddingBottom: insets.bottom + 24 },
					]}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='handled'
				>
					<InviteFriendsContent />
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fbf4be',
	},
	statusBarFill: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		zIndex: 1,
	},
	safe: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingTop: Platform.OS === 'ios' ? 0 : 8,
	},
})
