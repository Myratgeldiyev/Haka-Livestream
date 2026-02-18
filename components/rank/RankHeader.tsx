import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { router } from 'expo-router'
import React from 'react'
import {
	ImageBackground,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'
import RankDownArrowIcon from '../ui/icons/rank/RankDownArrowIcon'
import RankIndiaPlagIcon from '../ui/icons/rank/RankIndiaFlagIcon'
import RankInfoIcon from '../ui/icons/rank/RankInfoIcon'
import { CountdownTimer } from './CountdownTimer'
import { RankTabs } from './RankTabs'

type Props = {
	backgroundImage: ImageSourcePropType
	title: string
	subtitle: string
}

export const RankHeader: React.FC<Props> = ({
	backgroundImage,
	title,
	subtitle,
}) => {
	const insets = useSafeAreaInsets()
	const { height } = useWindowDimensions()
	const headerHeight = height * 0.4 // 40% of screen height

	return (
		<ImageBackground source={backgroundImage} style={[styles.container, { height: headerHeight }]}>
			<View style={[styles.topBar, { top: insets.top + 8 }]}>
				<Pressable onPress={() => router.back()}>
					<LeftArrowIcon props={''} color='#fff' />
				</Pressable>

				<RankTabs />

				<Pressable>
					<RankInfoIcon />
				</Pressable>
			</View>

			<View style={styles.center}>
				<CountdownTimer time='08:08:08' />
			</View>

			<View style={styles.country}>
				<RankIndiaPlagIcon />
				<Text style={styles.countryText}>India</Text>
				<RankDownArrowIcon />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},

	topBar: {
		position: 'absolute',
		left: spacing.lg,
		right: spacing.lg,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	icon: {
		color: '#FFF',
		fontSize: fontSizes.xl,
	},

	center: {
		flex: 1,
		justifyContent: 'center',
		marginTop: '35%',
		alignItems: 'center',
	},

	country: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderTopLeftRadius: spacing.md,
		borderBottomLeftRadius: spacing.md,
		gap: spacing.sm,
	},

	flag: {
		fontSize: fontSizes.lg,
	},

	countryText: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		color: '#FFF',
		fontWeight: fontWeights.semibold,
	},

	arrow: {
		color: '#FFF',
		fontSize: fontSizes.lg,
	},
})
