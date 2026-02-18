import React from 'react'
import {
	ActivityIndicator,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	View,
} from 'react-native'
import ProfileChairIcon from '../ui/icons/profile-header/ProfileChairHeader'
import { PROFILE_DETAIL } from './constants'
import { ProfileDetailOnlineBadge } from './ProfileDetailOnlineBadge'

interface ProfileDetailCoverProps {
	coverImageSource?: ImageSourcePropType
	onSofaPress?: () => void

	onCoverPress?: () => void
	uploading?: boolean
}

export function ProfileDetailCover({
	coverImageSource,
	onSofaPress,
	onCoverPress,
	uploading = false,
}: ProfileDetailCoverProps) {
	return (
		<View style={styles.wrapper}>
			<Pressable
				style={[styles.cover, !coverImageSource && styles.coverSolid]}
				onPress={uploading ? undefined : onCoverPress}
			>
				{coverImageSource ? (
					<Image
						source={coverImageSource}
						style={StyleSheet.absoluteFill}
						resizeMode='cover'
					/>
				) : null}
				{uploading ? (
					<View style={styles.uploadingOverlay}>
						<ActivityIndicator size='large' color='#fff' />
					</View>
				) : null}
			</Pressable>
			<View style={styles.floatingRight}>
				<Pressable style={styles.sofaButton} onPress={onSofaPress}>
					<ProfileChairIcon />
				</Pressable>
				<ProfileDetailOnlineBadge />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: PROFILE_DETAIL.coverHeight,
		backgroundColor: PROFILE_DETAIL.headerBlue,
		position: 'relative',
	},
	cover: {
		...StyleSheet.absoluteFillObject,
	},
	coverSolid: {
		backgroundColor: PROFILE_DETAIL.headerBlue,
	},
	uploadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	floatingRight: {
		position: 'absolute',
		right: PROFILE_DETAIL.screenPadding,
		bottom: 12,
		alignItems: 'center',
		gap: 10,
	},
	sofaButton: {
		width: 48,
		height: 48,
		marginBottom: 30,
		borderRadius: 24,
		backgroundColor: PROFILE_DETAIL.floatingButtonBg,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
