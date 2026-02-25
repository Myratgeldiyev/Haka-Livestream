import DownArrowIcon from '@/components/ui/icons/chat/DownArrowIcon'
import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import GoldIcon from '@/components/ui/icons/live-stream/GoldIcon'
import { spacing } from '@/constants/spacing'
import { router } from 'expo-router'
import React, { useMemo, useState } from 'react'
import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const STORE_COLORS = {
	background: '#231A36',
	header: '#2B1F45',
	cardBg: '#3C2E52',
	pillActive: '#4B3B66',
	text: '#FFFFFF',
	textMuted: 'rgba(255,255,255,0.7)',
	coin: '#D4AF37',
}

const MAIN_TABS = ['Store', 'Mine', 'Box', 'Level'] as const
const CATEGORIES = [
	'Entry',
	'Frame',
	'Chat Bubble',
	'Theme',
	'Special ID',
	'Profile Card',
]

type StoreItem = {
	id: string
	title: string
	price: number
}

const MOCK_ITEMS: StoreItem[] = Array.from({ length: 6 }, (_, i) => ({
	id: `item-${i + 1}`,
	title: 'lorem Ipsum',
	price: 15000,
}))

function StoreItemCard({ item }: { item: StoreItem }) {
	return (
		<View style={styles.itemCard}>
			<View style={styles.itemImagePlaceholder} />
			<Text style={styles.itemTitle} numberOfLines={1}>
				{item.title}
			</Text>
			<View style={styles.itemPriceRow}>
				<GoldIcon size={18} />
				<Text style={styles.itemPrice}>{item.price.toLocaleString()}</Text>
			</View>
		</View>
	)
}

export default function StoreScreen() {
	const [activeTab, setActiveTab] =
		useState<(typeof MAIN_TABS)[number]>('Store')
	const [activeCategory, setActiveCategory] = useState(2) // Chat Bubble

	const { width } = useWindowDimensions()
	const horizontalPadding = spacing.screen.horizontal * 2
	const gap = spacing.gap.md
	const numColumns = 2
	const cardWidth = useMemo(
		() => (width - horizontalPadding - gap) / numColumns,
		[width],
	)

	return (
		<SafeAreaView style={styles.safe} edges={['top']}>
			<View style={styles.header}>
				<Pressable
					onPress={() => router.back()}
					style={styles.backButton}
					hitSlop={12}
				>
					<LeftArrowIcon props color='#fff' />
				</Pressable>
				<View style={styles.tabsRow}>
					<View style={styles.tabsInner}>
						{MAIN_TABS.map(tab => (
							<Pressable
								key={tab}
								onPress={() => setActiveTab(tab)}
								style={styles.tabTouch}
							>
								<Text
									style={[
										styles.tabText,
										activeTab === tab && styles.tabTextActive,
									]}
								>
									{tab}
								</Text>
							</Pressable>
						))}
						<DownArrowIcon />
					</View>
				</View>
			</View>

			<View style={styles.categoriesWrap}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.categoriesScroll}
					style={styles.categoriesScrollView}
				>
					{CATEGORIES.map((cat, idx) => {
						const isActive = activeCategory === idx
						return (
							<Pressable
								key={cat}
								onPress={() => setActiveCategory(idx)}
								style={({ pressed }) => [
									styles.categoryPill,
									isActive && styles.categoryPillActive,
									pressed && styles.categoryPillPressed,
								]}
							>
								<Text
									style={[
										styles.categoryText,
										isActive && styles.categoryTextActive,
									]}
									numberOfLines={1}
								>
									{cat}
								</Text>
							</Pressable>
						)
					})}
				</ScrollView>
			</View>

			<FlatList
				data={MOCK_ITEMS}
				keyExtractor={item => item.id}
				numColumns={numColumns}
				key={numColumns}
				contentContainerStyle={styles.gridContent}
				columnWrapperStyle={[styles.gridRow, { gap }]}
				renderItem={({ item }) => (
					<View style={[styles.cardWrapper, { width: cardWidth }]}>
						<StoreItemCard item={item} />
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: STORE_COLORS.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: STORE_COLORS.header,
		paddingHorizontal: spacing.screen.horizontal,
		paddingVertical: spacing.md,
		gap: spacing.sm,
	},
	backButton: {
		padding: spacing.xs,
		justifyContent: 'center',
		minWidth: 44,
		minHeight: 44,
	},
	backArrow: {
		fontSize: 32,
		color: STORE_COLORS.text,
		fontWeight: '300',
	},
	tabsRow: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabsInner: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: 220,
		maxWidth: 280,
		width: '70%',
	},
	tabTouch: {
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.xs,
	},
	tabText: {
		fontSize: 15,
		color: STORE_COLORS.textMuted,
		fontWeight: '500',
	},
	tabTextActive: {
		color: STORE_COLORS.text,
		fontWeight: '600',
	},
	tabCaret: {
		fontSize: 12,
		color: STORE_COLORS.textMuted,
	},
	categoriesWrap: {
		backgroundColor: STORE_COLORS.header,
		minHeight: 52,
		justifyContent: 'center',
	},
	categoriesScrollView: {
		flexGrow: 0,
	},
	categoriesScroll: {
		paddingHorizontal: spacing.screen.horizontal,
		paddingVertical: spacing.md,
		gap: spacing.md,
		flexDirection: 'row',
		alignItems: 'center',
		paddingEnd: spacing.screen.horizontal + spacing.md,
	},
	categoryPill: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: 22,
		minHeight: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoryPillActive: {
		backgroundColor: '#fff',
	},
	categoryPillPressed: {
		opacity: 0.85,
	},
	categoryText: {
		fontSize: 10,
		color: '#fff',
		textAlign: 'center',
		fontWeight: '400',
	},
	categoryTextActive: {
		color: '#3D168B',
		fontWeight: '600',
	},
	gridContent: {
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.lg,
		paddingBottom: spacing.xxxl,
	},
	gridRow: {
		marginBottom: spacing.gap.md,
	},
	cardWrapper: {
		alignItems: 'stretch',
	},
	itemCard: {
		backgroundColor: '#38334C',
		borderRadius: 16,
		overflow: 'hidden',
		paddingBottom: spacing.md,
	},
	itemImagePlaceholder: {
		aspectRatio: 1,
		backgroundColor: STORE_COLORS.cardBg,
	},
	itemTitle: {
		fontSize: 14,
		color: STORE_COLORS.text,
		textAlign: 'center',
		marginTop: spacing.sm,
		paddingHorizontal: spacing.xs,
	},
	itemPriceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		marginTop: spacing.xs,
	},
	itemPrice: {
		fontSize: 14,
		color: STORE_COLORS.text,
		fontWeight: '600',
	},
	coinIcon: {
		backgroundColor: STORE_COLORS.coin,
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',
	},
	coinSymbol: {
		color: '#1a1a1a',
		fontWeight: '700',
	},
})
