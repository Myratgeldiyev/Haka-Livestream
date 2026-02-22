import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LEVEL_COLORS, LEVEL_LAYOUT } from './level.constants'
import type { UserProfileCardProps } from './level.types'

let LevelDiamondSvg: React.ComponentType<{
	width: number
	height: number
}> | null = null
try {
	LevelDiamondSvg = require('@/assets/images/level-diamond.svg').default
} catch {
	LevelDiamondSvg = null
}

let LevelDiamondPng: number | null = null
try {
	LevelDiamondPng = require('@/assets/images/level-diamond.png')
} catch {
	LevelDiamondPng = null
}

export function UserProfileCard({
	userName = 'MD Samir',
	currentLevel = 'Level 35',
	upgradeText = 'Level 1 upgrade requires xxx coins',
	gemImageSource,
}: UserProfileCardProps) {
	const gemSize = LEVEL_LAYOUT.gemIconSize
	return (
		<View style={styles.card}>
			<View style={styles.mainRow}>
				<View style={styles.leftColumn}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
						<Image
							source={require('@/assets/images/stream-img.png')}
							style={{ width: 60, height: 60, borderRadius: 999 }}
						/>
						<View>
							<Text style={styles.userName}>{userName}</Text>
							<View style={styles.levelBadge}>
								<View style={styles.levelBadgeIcon}>
									<Text style={styles.levelBadgeIconText}>icon</Text>
								</View>
								<Text style={styles.levelBadgeText}>{currentLevel}</Text>
							</View>
						</View>
					</View>
					<View style={styles.progressSection}>
						<View style={styles.progressBar} />
						<Text style={styles.upgradeText}>{upgradeText}</Text>
						<Pressable style={styles.rechargeButton} accessibilityRole='button'>
							<Text style={styles.rechargeButtonText}>Recharge</Text>
						</Pressable>
					</View>
				</View>
				<View style={styles.gemPlaceholder}>
					{gemImageSource != null ? (
						<Image
							source={gemImageSource}
							style={{ width: gemSize, height: gemSize }}
							resizeMode='contain'
						/>
					) : LevelDiamondSvg ? (
						<LevelDiamondSvg
							width={gemSize}
							height={gemSize}
						/>
					) : LevelDiamondPng ? (
						<Image
							source={LevelDiamondPng}
							style={{ width: gemSize, height: gemSize }}
							resizeMode='contain'
						/>
					) : (
						<Text style={styles.placeholderLabel}>icon</Text>
					)}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		borderRadius: LEVEL_LAYOUT.cardBorderRadius,
		padding: 20,
		marginTop: 16,
		marginBottom: 8,
	},
	mainRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	leftColumn: {
		flex: 1,
	},
	avatarPlaceholder: {
		width: LEVEL_LAYOUT.avatarSize,
		height: LEVEL_LAYOUT.avatarSize,
		borderRadius: LEVEL_LAYOUT.avatarSize / 2,
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderWidth: 1,
		borderColor: LEVEL_COLORS.text.tertiary,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	placeholderLabel: {
		fontSize: 10,
		color: LEVEL_COLORS.text.secondary,
	},
	userName: {
		fontSize: 17,
		fontWeight: '700',
		color: LEVEL_COLORS.text.primary,
		marginBottom: 8,
	},
	levelBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		backgroundColor: LEVEL_COLORS.purple.primary,
		paddingVertical: 6,
		paddingLeft: 8,
		paddingRight: 12,
		borderRadius: LEVEL_LAYOUT.badgeHeight / 2,
		gap: 6,
	},
	levelBadgeIcon: {
		width: 16,
		height: 16,
		borderRadius: 4,
		backgroundColor: 'rgba(255,255,255,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	levelBadgeIconText: {
		fontSize: 8,
		color: LEVEL_COLORS.text.primary,
	},
	levelBadgeText: {
		fontSize: 13,
		fontWeight: '600',
		color: LEVEL_COLORS.text.primary,
	},
	gemPlaceholder: {
		width: LEVEL_LAYOUT.gemIconSize,
		height: LEVEL_LAYOUT.gemIconSize,
		justifyContent: 'center',
		alignItems: 'center',
	},
	progressSection: {
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255,255,255,0.08)',
	},
	progressBar: {
		height: LEVEL_LAYOUT.progressBarHeight,
		backgroundColor: '#DDDDDD',
		borderRadius: 2,
		opacity: 0.5,
		marginBottom: 10,
	},
	upgradeText: {
		fontSize: 13,
		color: LEVEL_COLORS.text.primary,
		marginBottom: 12,
	},
	rechargeButton: {
		alignSelf: 'flex-start',
		backgroundColor: LEVEL_COLORS.purple.primary,
		paddingVertical: 4,
		paddingHorizontal: 14,
		borderRadius: 18,
	},
	rechargeButtonText: {
		fontSize: 12,
		fontWeight: '700',
		color: LEVEL_COLORS.text.primary,
	},
})
