import {
	HOST_CENTRE,
	HostCentreAgencyButtons,
	HostCentreHeader,
	HostCentreHostOnMicCard,
	HostCentreIncomeCardsRow,
	HostCentreMyAgencyCard,
	HostCentreOfficialContactCard,
	HostCentreTimeDurationCard,
} from '@/components/host-centre'
import { spacing } from '@/constants/spacing'
import { LinearGradient } from 'expo-linear-gradient'
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

export default function HostCentreScreen() {
	const handleBack = useCallback(() => router.back(), [])
	const handleMyAgencyPress = useCallback(() => {}, [])
	const handleRulePress = useCallback(() => {}, [])
	const handleBecomeAgency = useCallback(() => {}, [])
	const handleLeaveAgency = useCallback(() => {}, [])
	const handleChangeAgency = useCallback(() => {}, [])
	const handleOfficialContactPress = useCallback(() => {}, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle='dark-content' />
				<HostCentreHeader onBack={handleBack} />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<LinearGradient
						colors={[HOST_CENTRE.gradientStart, HOST_CENTRE.gradientEnd]}
						style={styles.gradientWrap}
						start={{ x: 0, y: 0 }}
						end={{ x: 0, y: 1 }}
					>
						<HostCentreMyAgencyCard onPress={handleMyAgencyPress} />
						<HostCentreHostOnMicCard onRulePress={handleRulePress} />
					</LinearGradient>
					<View style={styles.whiteSection}>
						<HostCentreIncomeCardsRow />
						<HostCentreTimeDurationCard />
						<HostCentreAgencyButtons
							onBecomeAgency={handleBecomeAgency}
							onLeaveAgency={handleLeaveAgency}
							onChangeAgency={handleChangeAgency}
						/>
						<HostCentreOfficialContactCard
							onPress={handleOfficialContactPress}
						/>
					</View>
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
		paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
	gradientWrap: {
		paddingTop: spacing.sm,
		paddingBottom: spacing.md,
	},
	whiteSection: {
		backgroundColor: '#fff',
		paddingBottom: 24,
		marginTop: spacing.md,
	},
})
