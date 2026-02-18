import IndiaFlag from '@/components/ui/flags/indiaFlag'
import HakaPriIcon from '@/components/ui/icons/agent-dashboard/HakaPriIcon'
import CopyIcon from '@/components/ui/icons/profile-header/copy-icon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

const AVATAR_SIZE = 60
const WAGE_EMPTY_SIZE = 24

export interface AddHostListItemData {
	id: string
	name: string
	userId: string
	tag?: string
	avatarUri?: string | null
	level: number
	hourlyWage?: string | null
}

interface AddHostListItemProps {
	item: AddHostListItemData
	onCopyUserId?: (userId: string) => void
}

export function AddHostListItem({ item, onCopyUserId }: AddHostListItemProps) {
	const showEmptyWage = item.hourlyWage == null || item.hourlyWage === ''

	return (
		<View style={styles.row}>
			<View style={styles.colUser}>
				<View style={styles.userBlock}>
					{item.avatarUri ? (
						<Image
							source={{ uri: item.avatarUri }}
							style={styles.avatar}
							resizeMode='cover'
						/>
					) : (
						<View style={styles.avatarPlaceholder} />
					)}
					<View style={styles.userInfo}>
						<View style={styles.flagWrap}>
							<Text style={styles.name} numberOfLines={1}>
								{item.name}
							</Text>
							<IndiaFlag width={20} height={14} />
						</View>

						<View style={styles.userIdRow}>
							<Text style={styles.userId} numberOfLines={1}>
								{item.userId}
							</Text>
							<Pressable
								onPress={() => onCopyUserId?.(item.userId)}
								hitSlop={8}
								style={styles.copyButton}
								accessibilityLabel={`Copy ${item.userId}`}
								accessibilityRole='button'
							>
								<CopyIcon />
							</Pressable>
						</View>
						{item.tag ? <HakaPriIcon /> : null}
					</View>
				</View>
			</View>
			<View style={styles.colLevel}>
				<Text style={styles.level}>{item.level}</Text>
			</View>
			<View style={styles.colWage}>
				{showEmptyWage ? (
					<View style={styles.wageEmpty}>
						<Text style={styles.wageEmptyText}>/</Text>
					</View>
				) : (
					<Text style={styles.wageValue} numberOfLines={1}>
						{item.hourlyWage}
					</Text>
				)}
			</View>
			<View style={styles.colSuper} />
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingVertical: 12,
		marginBottom: 10,
	},
	colUser: {
		flex: 2,
		minWidth: 0,
	},
	colLevel: {
		width: 48,
		alignItems: 'center',
	},
	colWage: {
		flex: 1,
		minWidth: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	colSuper: {
		width: 56,
		alignItems: 'center',
	},
	userBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	avatarPlaceholder: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		backgroundColor: AGENT_DASHBOARD.dividerColor,
	},
	userInfo: {
		flex: 1,
		gap: 2,
		minWidth: 0,
	},
	name: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
	userIdRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	userId: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.labelColor,
	},
	copyButton: {
		padding: 2,
	},
	tag: {
		alignSelf: 'flex-start',
		backgroundColor: AGENT_DASHBOARD.addHostTagBg,
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 6,
		marginTop: 2,
	},
	tagText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
	flagWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	level: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
	wageEmpty: {
		width: WAGE_EMPTY_SIZE,
		height: 30,
		borderRadius: WAGE_EMPTY_SIZE / 2,
		backgroundColor: '#80C3FF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wageEmptyText: {
		fontSize: 14,
		fontWeight: fontWeights.medium,
		color: '#0088FF',
	},
	wageValue: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: AGENT_DASHBOARD.valueColor,
	},
})
