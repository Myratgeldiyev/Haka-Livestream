import ProfileCameraIcon from '@/components/ui/icons/party/cameraIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Image,
	ImageSourcePropType,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { PROFILE_DETAIL } from './constants'

interface GiftGallerySectionProps {
	litCount?: number
	totalCount?: number
	thumbnails?: (ImageSourcePropType | { uri: string })[]
	onAddPress?: () => void
}

const GALLERY_ITEM_SIZE = 50

export function GiftGallerySection({
	litCount = 0,
	totalCount = 16,
	thumbnails = [],
	onAddPress,
}: GiftGallerySectionProps) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Gift Gallery</Text>
				<Text style={styles.count}>
					Lit: {litCount}/{totalCount}
				</Text>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{thumbnails.map((src, i) => (
					<View key={i} style={styles.thumbWrap}>
						<Image source={src} style={styles.thumb} resizeMode='cover' />
					</View>
				))}
				{onAddPress != null ? (
					<Pressable style={styles.cameraButton} onPress={onAddPress}>
						<ProfileCameraIcon />
					</Pressable>
				) : null}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		flexDirection: 'row',
		backgroundColor: '#EFEFEF',
		marginHorizontal: 16,
		gap: 5,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 8,
	},
	header: {
		alignItems: 'baseline',
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	count: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
	},
	scrollContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	thumbWrap: {
		width: GALLERY_ITEM_SIZE,
		height: GALLERY_ITEM_SIZE,
		borderRadius: 10,
		overflow: 'hidden',
		backgroundColor: '#E5E7EB',
	},
	thumb: {
		width: '100%',
		height: '100%',
	},
	cameraButton: {
		width: GALLERY_ITEM_SIZE,
		height: GALLERY_ITEM_SIZE,
		borderRadius: GALLERY_ITEM_SIZE / 2,
		justifyContent: 'center',
		alignSelf: 'flex-end',
	},
})
