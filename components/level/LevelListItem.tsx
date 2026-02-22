import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {
	CHARM_LEVEL_SVG_HEIGHT,
	CHARM_LEVEL_SVG_WIDTH,
	getCharmLevelSvgComponent,
} from './charm-level-svgs'
import { LEVEL_COLORS, LEVEL_LAYOUT } from './level.constants'
import type { LevelBadgeVariant, LevelListItemProps } from './level.types'

const BADGE_ICON_SIZE = 18

function renderBadgeIcon(badgeIcon: LevelListItemProps['badgeIcon']) {
	if (badgeIcon == null) {
		return <Text style={styles.badgeIconText}>icon</Text>
	}
	if (typeof badgeIcon === 'function') {
		const IconComponent = badgeIcon
		return <IconComponent width={BADGE_ICON_SIZE} height={BADGE_ICON_SIZE} />
	}
	if (
		typeof badgeIcon === 'number' ||
		(typeof badgeIcon === 'object' && 'uri' in badgeIcon)
	) {
		return (
			<Image
				source={badgeIcon as number | { uri: string }}
				style={{ width: BADGE_ICON_SIZE, height: BADGE_ICON_SIZE }}
				resizeMode='contain'
			/>
		)
	}
	return (
		<View
			style={[
				styles.badgeIconInner,
				{ width: BADGE_ICON_SIZE, height: BADGE_ICON_SIZE },
			]}
		>
			{badgeIcon}
		</View>
	)
}

function getBadgeStyles(variant: LevelBadgeVariant) {
	switch (variant) {
		case 'level0':
			return {
				backgroundColor: LEVEL_COLORS.badge.level0Bg,
				iconBg: LEVEL_COLORS.badge.level0Icon,
			}
		case 'orange':
			return {
				backgroundColor: LEVEL_COLORS.orange.badge,
				iconBg: '#',
			}
		default:
			return {
				backgroundColor: LEVEL_COLORS.badge.defaultBg,
				iconBg: '#',
			}
	}
}

export function LevelListItem({
	levelLabel,
	coinRange,
	badgeNumber,
	badgeVariant,
	badgeIcon,
	useCharmSvg,
}: LevelListItemProps) {
	const badgeStyles = getBadgeStyles(badgeVariant)

	if (useCharmSvg) {
		const CharmSvg = getCharmLevelSvgComponent(badgeNumber)
		return (
			<View style={[styles.container, styles.containerCharmSvg]}>
				<View style={styles.leftContent}>
					<Text style={styles.levelLabel}>{levelLabel}</Text>
					<Text style={styles.coinRange}>{coinRange}</Text>
				</View>
				<View style={styles.charmSvgWrap}>
					<CharmSvg
						width={CHARM_LEVEL_SVG_WIDTH}
						height={CHARM_LEVEL_SVG_HEIGHT}
					/>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.leftContent}>
				<Text style={styles.levelLabel}>{levelLabel}</Text>
				<Text style={styles.coinRange}>{coinRange}</Text>
			</View>
			<View
				style={[styles.badge, { backgroundColor: badgeStyles.backgroundColor }]}
			>
				<View
					style={[styles.badgeIcon, { backgroundColor: badgeStyles.iconBg }]}
				>
					{renderBadgeIcon(badgeIcon)}
				</View>
				<Text style={styles.badgeNumber}>{badgeNumber}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#000',
		borderRadius: LEVEL_LAYOUT.listItemBorderRadius,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginHorizontal: LEVEL_LAYOUT.horizontalPadding,
		marginBottom: LEVEL_LAYOUT.listItemGap,
	},
	leftContent: {
		flex: 1,
		marginRight: 12,
	},
	levelLabel: {
		fontSize: 15,
		fontWeight: '600',
		color: LEVEL_COLORS.text.primary,
		marginBottom: 4,
	},
	coinRange: {
		fontSize: 13,
		color: LEVEL_COLORS.text.secondary,
	},
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingLeft: 10,
		paddingRight: 14,
		borderRadius: LEVEL_LAYOUT.badgeHeight / 1.5,
		gap: 8,
		minWidth: 72,
		justifyContent: 'flex-end',
	},
	badgeIcon: {
		width: BADGE_ICON_SIZE,
		height: BADGE_ICON_SIZE,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	badgeIconInner: {
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},
	badgeIconText: {
		fontSize: 8,
		color: LEVEL_COLORS.text.primary,
	},
	badgeNumber: {
		fontSize: 15,
		fontWeight: '700',
		color: LEVEL_COLORS.text.primary,
	},
	containerCharmSvg: {
		overflow: 'visible',
	},
	charmSvgWrap: {
		width: CHARM_LEVEL_SVG_WIDTH,
		height: CHARM_LEVEL_SVG_HEIGHT,
		overflow: 'visible',
		flexShrink: 0,
	},
})
