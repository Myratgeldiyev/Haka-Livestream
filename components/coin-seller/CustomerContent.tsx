import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights } from '@/constants/typography'
import React, { useState } from 'react'
import {
	FlatList,
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import { LevelBadge } from '../ui/badges/LevelBadge'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'

type FilterType = 'all' | 'active' | 'inactive'

interface Customer {
	id: string
	name: string
	userId: string
	avatar?: string
	isVerified?: boolean
	level?: string | number
	tradeLast30Days: number
	tradeTimes: number
	lastTrade: string
}

interface CustomerContentProps {
	customers?: Customer[]
}

const MOCK_CUSTOMERS: Customer[] = [
	{
		id: '1',
		name: 'Rider',
		userId: '000000',
		isVerified: true,
		level: 'xx',
		tradeLast30Days: 7200000,
		tradeTimes: 14,
		lastTrade: '08-14 09:50',
	},
	{
		id: '2',
		name: 'Rider',
		userId: '000000',
		isVerified: true,
		level: 'xx',
		tradeLast30Days: 7200000,
		tradeTimes: 14,
		lastTrade: '08-14 09:50',
	},
	{
		id: '3',
		name: 'Rider',
		userId: '000000',
		isVerified: true,
		level: 'xx',
		tradeLast30Days: 7200000,
		tradeTimes: 14,
		lastTrade: '08-14 09:50',
	},
]

export function CustomerContent({
	customers = MOCK_CUSTOMERS,
}: CustomerContentProps) {
	const [filterType, setFilterType] = useState<FilterType>('all')
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	const filterOptions: { value: FilterType; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
		{ value: 'inactive', label: 'Inactive' },
	]

	const selectedFilter = filterOptions.find(opt => opt.value === filterType)

	const renderCustomer = ({ item }: { item: Customer }) => (
		<View style={styles.customerCard}>
			<View style={styles.customerHeader}>
				<View style={styles.customerInfo}>
					{item.avatar ? (
						<Image source={{ uri: item.avatar }} style={styles.avatar} />
					) : (
						<View style={[styles.avatar, styles.avatarPlaceholder]}>
							<Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
						</View>
					)}
					<View style={styles.nameContainer}>
						<View style={styles.nameRow}>
							<Text style={styles.customerName}>{item.name}</Text>
							{item.isVerified && <VerifiedIcon />}
							{item.level && <LevelBadge level={item.level} />}
						</View>
						<View style={styles.idRow}>
							<View style={styles.userBadge}>
								<Text style={styles.userBadgeText}>User</Text>
							</View>
							<Text style={styles.idText}>ID: {item.userId}</Text>
							<CopyIcon />
						</View>
					</View>
				</View>
				<Pressable style={styles.chatButton}>
					<ChatIcon />
				</Pressable>
			</View>

			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Trade last 30 days</Text>
					<View style={styles.statValue}>
						<GoldIcon />
						<Text style={styles.statAmount}>
							{item.tradeLast30Days.toLocaleString()}
						</Text>
					</View>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Trade times</Text>
					<Text style={styles.statNumber}>{item.tradeTimes}</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Last trade</Text>
					<Text style={styles.statDate}>{item.lastTrade}</Text>
				</View>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.filterButton}
				onPress={() => setIsFilterOpen(true)}
			>
				<Text style={styles.filterText}>{selectedFilter?.label}</Text>
				<DropdownIcon />
			</Pressable>

			<Modal
				visible={isFilterOpen}
				transparent
				animationType='fade'
				onRequestClose={() => setIsFilterOpen(false)}
			>
				<Pressable
					style={styles.modalOverlay}
					onPress={() => setIsFilterOpen(false)}
				>
					<View style={styles.dropdown}>
						{filterOptions.map(option => (
							<Pressable
								key={option.value}
								style={[
									styles.dropdownOption,
									filterType === option.value && styles.dropdownOptionActive,
								]}
								onPress={() => {
									setFilterType(option.value)
									setIsFilterOpen(false)
								}}
							>
								<Text
									style={[
										styles.dropdownOptionText,
										filterType === option.value &&
											styles.dropdownOptionTextActive,
									]}
								>
									{option.label}
								</Text>
							</Pressable>
						))}
					</View>
				</Pressable>
			</Modal>

			<FlatList
				data={customers}
				keyExtractor={item => item.id}
				renderItem={renderCustomer}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				scrollEnabled={false}
			/>
		</View>
	)
}

function VerifiedIcon() {
	return (
		<Svg width={16} height={16} viewBox='0 0 24 24' fill='none'>
			<Circle cx={12} cy={12} r={10} fill='#3B82F6' />
			<Path
				d='M8 12l3 3 5-5'
				stroke='#FFF'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function CopyIcon() {
	return (
		<Svg width={14} height={14} viewBox='0 0 24 24' fill='none'>
			<Rect
				x={8}
				y={8}
				width={12}
				height={12}
				rx={2}
				stroke='#9CA3AF'
				strokeWidth={2}
			/>
			<Path
				d='M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2'
				stroke='#9CA3AF'
				strokeWidth={2}
			/>
		</Svg>
	)
}

function ChatIcon() {
	return (
		<Svg width={20} height={20} viewBox='0 0 24 24' fill='none'>
			<Rect x={2} y={4} width={20} height={14} rx={2} fill='#FFF' />
			<Circle cx={8} cy={11} r={1.5} fill='#F59E0B' />
			<Circle cx={12} cy={11} r={1.5} fill='#F59E0B' />
			<Circle cx={16} cy={11} r={1.5} fill='#F59E0B' />
		</Svg>
	)
}

function DropdownIcon() {
	return (
		<Svg width={12} height={12} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M6 9l6 6 6-6'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: 16,
		flex: 1,
	},
	filterButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		marginBottom: spacing.sm,
	},
	filterText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		justifyContent: 'flex-start',
		paddingTop: 200,
		paddingHorizontal: spacing.lg,
	},
	dropdown: {
		backgroundColor: '#FFF',
		borderRadius: spacing.md,
		padding: spacing.sm,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	dropdownOption: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: spacing.sm,
	},
	dropdownOptionActive: {
		backgroundColor: '#F3F4F6',
	},
	dropdownOptionText: {
		fontSize: fontSizes.md,
		color: '#374151',
	},
	dropdownOptionTextActive: {
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	listContent: {
		paddingBottom: 40,
	},
	customerCard: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.md,
	},
	customerHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	customerInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatar: {
		width: 56,
		height: 56,
		borderRadius: 28,
	},
	avatarPlaceholder: {
		backgroundColor: '#E5E7EB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarText: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.semibold,
		color: '#6B7280',
	},
	nameContainer: {
		marginLeft: spacing.md,
		flex: 1,
	},
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	customerName: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	idRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		marginTop: 4,
	},
	userBadge: {
		backgroundColor: '#3B82F6',
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
	},
	userBadgeText: {
		fontSize: fontSizes.xs,
		color: '#FFF',
		fontWeight: fontWeights.medium,
	},
	idText: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	chatButton: {
		width: 40,
		height: 40,
		borderRadius: 8,
		backgroundColor: '#F59E0B',
		alignItems: 'center',
		justifyContent: 'center',
	},
	statsRow: {
		flexDirection: 'row',
		marginTop: spacing.md,
		paddingTop: spacing.md,
		borderTopWidth: 1,
		borderTopColor: '#F3F4F6',
	},
	statItem: {
		flex: 1,
	},
	statLabel: {
		fontSize: fontSizes.xs,
		color: '#6B7280',
		marginBottom: 4,
	},
	statValue: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	statAmount: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	statNumber: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	statDate: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
})
