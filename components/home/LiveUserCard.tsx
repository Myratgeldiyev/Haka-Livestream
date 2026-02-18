import { FireIcon, LocationIcon } from '@/components/ui/icons'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LiveUser } from '@/types'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import {
	Animated,
	Easing,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from 'react-native'

const GRID_GAP = spacing.md

interface LiveUserCardProps {
	user: LiveUser
	index: number
	onPress?: (user: LiveUser) => void
}

// Proportional scale factors for responsive layout (based on card size)
const BADGE_TOP = 0.06
const BADGE_LEFT = 0.06
const CROWN_SIZE = 0.14
const CONTENT_PAD_H = 0.06
const CONTENT_PAD_B = 0.05

export const LiveUserCard: React.FC<LiveUserCardProps> = ({
	user,
	index,
	onPress,
}) => {
	const { width: screenWidth } = useWindowDimensions()
	const horizontalPadding = spacing.lg * 2
	const cardWidth = (screenWidth - horizontalPadding - GRID_GAP) / 2
	const cardHeight = cardWidth * 0.95 // Maintain aspect ratio

	// Responsive values derived from card dimensions
	const badgeTop = cardHeight * BADGE_TOP
	const badgeLeft = cardWidth * BADGE_LEFT
	const crownSize = Math.min(cardWidth * CROWN_SIZE, 28)
	const contentPadH = cardWidth * CONTENT_PAD_H
	const contentPadB = cardHeight * CONTENT_PAD_B
	const badgePadH = Math.max(cardWidth * 0.04, spacing.xs)
	const badgePadV = Math.max(cardHeight * 0.025, spacing.xs)
	const rowGap = Math.max(cardHeight * 0.02, spacing.xs)

	const fadeAnim = useRef(new Animated.Value(0)).current
	const translateY = useRef(new Animated.Value(30)).current
	const scaleAnim = useRef(new Animated.Value(0.95)).current

	useEffect(() => {
		const delay = index * 80

		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 450,
				delay,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: 0,
				duration: 500,
				delay,
				easing: Easing.out(Easing.back(1.2)),
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 450,
				delay,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
		]).start()
	}, [index])

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => onPress?.(user)}
			onPressIn={() =>
				Animated.spring(scaleAnim, {
					toValue: 0.96,
					useNativeDriver: true,
				}).start()
			}
			onPressOut={() =>
				Animated.spring(scaleAnim, {
					toValue: 1,
					useNativeDriver: true,
				}).start()
			}
		>
			<Animated.View
				style={[
					styles.container,
					{
						width: cardWidth,
						height: cardHeight,
						opacity: fadeAnim,
						transform: [{ translateY }, { scale: scaleAnim }],
					},
				]}
			>
				<Image source={{ uri: user.imageUrl }} style={styles.image} />

				<View
					style={[styles.liveBadgeWrapper, { top: badgeTop, left: badgeLeft }]}
				>
					<View
						style={[
							styles.liveBadgeMain,
							{ paddingHorizontal: badgePadH, paddingVertical: badgePadV },
						]}
					>
						<Text style={styles.liveBadgeText}>Delhi No.10</Text>
					</View>
					<View
						style={[
							styles.liveBadgeCrown,
							{
								width: crownSize,
								height: crownSize,
								left: -crownSize * 0.25,
								top: '50%',
								marginTop: -crownSize / 2,
							},
						]}
					>
						<Image
							source={require('../../assets/images/emojis_crown.png')}
							style={{ width: crownSize * 0.7, height: crownSize * 0.7 }}
							resizeMode='contain'
						/>
					</View>
				</View>

				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.65)']}
					style={styles.gradientOverlay}
				/>

				<View
					style={[
						styles.contentContainer,
						{
							paddingHorizontal: contentPadH,
							paddingBottom: contentPadB,
						},
					]}
				>
					<View style={[styles.topRow, { marginBottom: rowGap }]}>
						<View
							style={[
								styles.locationBadge,
								{
									paddingHorizontal: badgePadH,
									paddingVertical: badgePadV,
								},
							]}
						>
							<LocationIcon size={10} color='#FFF' />
							<Text style={styles.locationText}>{user.location}</Text>
						</View>

						<View
							style={[
								styles.statusBadge,
								{
									paddingHorizontal: badgePadH * 1.2,
									paddingVertical: badgePadV,
								},
							]}
						>
							<Text style={styles.statusText}>{user.status}</Text>
						</View>
					</View>

					<View style={styles.bottomRow}>
						<View style={styles.nameContainer}>
							<Text style={styles.nameText}>{user.name}</Text>
							<Text style={styles.flagText}>{user.country}</Text>
						</View>

						<View style={styles.popularityContainer}>
							<FireIcon size={16} />
							<Text style={styles.popularityText}>{user.popularity}</Text>
						</View>
					</View>
				</View>
			</Animated.View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: spacing.lg,
		overflow: 'hidden',
		backgroundColor: '#E8E8E8',
		marginBottom: GRID_GAP,
	},

	image: {
		width: '100%',
		height: '100%',
	},

	gradientOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: '55%',
	},

	contentContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},

	liveBadgeWrapper: {
		position: 'absolute',
	},

	liveBadgeMain: {
		borderRadius: 999,
		backgroundColor: 'rgba(238,78,108,0.77)',
		borderWidth: 1,
		borderColor: '#FFE500',
	},

	liveBadgeText: {
		color: '#FFF',
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
	},

	liveBadgeCrown: {
		position: 'absolute',
		borderRadius: 999,
		backgroundColor: '#FF2D55',
		justifyContent: 'center',
		alignItems: 'center',
	},

	topRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	locationBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(38, 36, 36, 0.50)',
		borderRadius: spacing.md,
		gap: spacing.xs,
	},

	locationText: {
		color: '#fff',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
	},

	statusBadge: {
		backgroundColor: 'rgba(38, 36, 36, 0.50)',
		borderRadius: spacing.md,
	},

	statusText: {
		color: '#FFF',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
	},

	bottomRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},

	nameText: {
		color: '#FFF',
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
	},

	flagText: {
		fontSize: fontSizes.md,
	},

	popularityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	popularityText: {
		color: '#FFF',
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
	},
})
