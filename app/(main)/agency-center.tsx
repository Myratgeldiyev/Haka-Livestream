import {
	AgencyCenterChooseTitle,
	AgencyCenterHeader,
	AgencyCenterMethod1Card,
	AgencyCenterMethod2Card,
	AgencyCenterNoteSection,
} from '@/components/agency-center'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

export default function AgencyCenterScreen() {
	const handleBack = useCallback(() => router.back(), [])
	const handleMethod1Continue = useCallback((_agentId: string) => {
		router.push('/agent-dashboard')
	}, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle="dark-content" />
				<AgencyCenterHeader onBack={handleBack} />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<AgencyCenterChooseTitle />
					<AgencyCenterMethod1Card onContinue={handleMethod1Continue} />
					<AgencyCenterMethod2Card />
					<AgencyCenterNoteSection />
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	safe: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
})
