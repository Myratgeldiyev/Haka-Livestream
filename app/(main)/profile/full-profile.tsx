import { profileApi } from '@/api/profile/profile.api'
import {
	CharmLevelCard,
	FansRankingButton,
	GiftGallerySection,
	ProfileDetailAvatar,
	ProfileDetailCover,
	ProfileDetailDataRow,
	ProfileDetailNavBar,
	ProfileDetailUserInfo,
	RichLevelCard,
} from '@/components/profile-detail'
import { PROFILE_DETAIL } from '@/components/profile-detail/constants'
import { FansRankingLikeButton } from '@/components/profile-detail/FansRankingLikeButton'
import { colors, profileColors } from '@/constants/colors'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { pickImageFromGallery } from '@/hooks/image-picker-from-gallery'
import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { useUserProfile } from '@/hooks/profile/useUserProfile'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useState } from 'react'
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

const PLACEHOLDER_IMAGES = [
	require('@/assets/images/stream-img.png'),
	require('@/assets/images/rank-1.png'),
	require('@/assets/images/rank-2.png'),
]

export default function FullProfileScreen() {
	const { userId: userIdParam } = useLocalSearchParams<{ userId?: string }>()
	const userId = userIdParam ?? null
	const isOwnProfile = !userId

	const myProfile = useMyProfile()
	const userProfile = useUserProfile(userId)

	const data = isOwnProfile ? myProfile.data : userProfile.data
	const isLoading = isOwnProfile ? myProfile.isLoading : userProfile.isLoading
	const error = isOwnProfile ? myProfile.error : userProfile.error
	const refetch = isOwnProfile ? myProfile.refetch : userProfile.refetch

	const [uploadingCover, setUploadingCover] = useState(false)

	const handleBack = () => router.back()
	const handleEdit = () => {}
	const handleMore = () => {}
	const handleSofa = () => {}
	const handleFansRanking = () => {}
	const handleGiftGalleryAdd = () => {}
	const handleFollow = () => {}
	const handleMessage = () => {}

	const handleCoverPress = useCallback(async () => {
		if (!isOwnProfile) return
		try {
			const image = await pickImageFromGallery()
			if (!image) return
			setUploadingCover(true)
			await profileApi.updateProfilePicture(image)
			await refetch()
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to update photo'
			console.error('Profile picture update failed:', err)
			alert(message)
		} finally {
			setUploadingCover(false)
		}
	}, [isOwnProfile, refetch])

	const displayName = data?.username ?? 'User'
	const displayId = data?.user_id?.toString() ?? '—'
	const avatarSource = data?.profile_picture
		? { uri: data.profile_picture }
		: undefined
	const followCount = data?.follow ?? 0
	const followersCount = data?.followers ?? 0

	if (isLoading) {
		return (
			<View style={styles.root}>
				<SafeAreaView style={[styles.safe, styles.centered]}>
					<ActivityIndicator size='large' color={profileColors.accent.purple} />
				</SafeAreaView>
			</View>
		)
	}

	if (error) {
		return (
			<View style={styles.root}>
				<SafeAreaView style={[styles.safe, styles.centered]}>
					<Text style={styles.errorText}>{error}</Text>
				</SafeAreaView>
			</View>
		)
	}

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle='light-content' />
				<ProfileDetailNavBar
					onBack={handleBack}
					variant={isOwnProfile ? 'own' : 'other'}
					onEdit={isOwnProfile ? handleEdit : undefined}
					onMore={!isOwnProfile ? handleMore : undefined}
				/>
				<ProfileDetailCover
					onSofaPress={handleSofa}
					onCoverPress={isOwnProfile ? handleCoverPress : undefined}
					uploading={uploadingCover}
					coverImageSource={
						data?.profile_picture ? { uri: data.profile_picture } : undefined
					}
				/>
				<ProfileDetailAvatar source={avatarSource} />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.whiteContent}>
						<ProfileDetailUserInfo
							name={displayName}
							userId={displayId}
							follow={followCount}
							followers={followersCount}
							showFollowButton={!isOwnProfile}
							onFollowPress={handleFollow}
						/>
						<ProfileDetailDataRow value='Wonderful moments' />
						<View style={styles.cardsRow}>
							<RichLevelCard level={6} sent='200M' />
							<CharmLevelCard level={6} received='200M' />
						</View>
						<View style={styles.fansRow}>
							<FansRankingButton variant='trophy' onPress={handleFansRanking} />
							<FansRankingLikeButton
								variant='heart'
								onPress={handleFansRanking}
							/>
						</View>
						<GiftGallerySection
							litCount={0}
							totalCount={16}
							thumbnails={PLACEHOLDER_IMAGES}
							onAddPress={isOwnProfile ? handleGiftGalleryAdd : undefined}
						/>
					</View>
				</ScrollView>
				{!isOwnProfile ? (
					<View style={styles.messageButtonWrap}>
						<Pressable style={styles.messageButton} onPress={handleMessage}>
							<Text style={styles.messageButtonText}>Message</Text>
						</Pressable>
					</View>
				) : null}
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
	centered: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorText: {
		color: profileColors.text?.secondary ?? '#6B7280',
		fontSize: 14,
		textAlign: 'center',
		paddingHorizontal: 24,
	},
	scroll: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollContent: {
		paddingBottom: spacing.xxl,
	},
	whiteContent: {
		backgroundColor: '#fff',
	},
	cardsRow: {
		flexDirection: 'row',
		gap: 12,
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		marginBottom: 12,
	},
	fansRow: {
		flexDirection: 'row',
		gap: 12,
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		marginBottom: 20,
	},
	messageButtonWrap: {
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		paddingVertical: 16,
		paddingBottom: spacing.xxl,
		backgroundColor: '#fff',
	},
	messageButton: {
		backgroundColor: colors.primary,
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: 'center',
		justifyContent: 'center',
	},
	messageButtonText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#fff',
	},
})
