import { MenuGrid } from '@/components/profile/MenuGrid'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileStats } from '@/components/profile/ProfileStats'
import { QuickActions } from '@/components/profile/QuickAction'
import { WalletSection } from '@/components/profile/WalletSection'
import { profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights } from '@/constants/typography'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { useAuthStore } from '@/store/auth.store'
import { router } from 'expo-router'
import React from 'react'
import {
	ActivityIndicator,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'

export default function ProfileScreen() {
	const { data, isLoading, error } = useMyProfile()
	const logout = useAuthStore(state => state.logout)

	const handleLogout = async () => {
		await logout()
		router.replace('/(auth)/login-phone')
	}
	if (isLoading) {
		return (
			<SafeAreaView style={styles.safe}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size='large' color={profileColors.accent.purple} />
				</View>
			</SafeAreaView>
		)
	}

	if (error) {
		return (
			<SafeAreaView style={styles.safe}>
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			</SafeAreaView>
		)
	}

	const displayName = data?.username ?? 'User'
	const displayId = data?.user_id?.toString() ?? '000000'

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<ProfileHeader
					src={data?.profile_picture}
					name={displayName}
					id={displayId}
					isNew={false}
					level={data?.level}
				/>

				<ProfileStats
					friends={data?.friends ?? 0}
					follow={data?.follow ?? 0}
					followers={data?.followers ?? 0}
					visitors={data?.visitors ?? 0}
				/>

				<QuickActions />
				<WalletSection top_up={data?.top_up} withdrawal={data?.withdraw} />
				{/* <BusinessSection /> */}
				<MenuGrid />
				<Pressable onPress={handleLogout}>
					<Text style={{ textAlign: 'center' }}>Log out</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: profileColors.background.secondary,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},

	scrollContent: {
		paddingBottom: spacing.xxl,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.xl,
	},

	errorText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		color: '#FF3B30',
		textAlign: 'center',
	},
})
