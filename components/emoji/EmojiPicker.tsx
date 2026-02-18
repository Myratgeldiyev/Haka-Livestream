import {
	EMOJI_CONFIG,
	getEmojiDisplaySource,
	toEmojiPlaceholder,
	type EmojiCategory,
} from '@/constants/emoji'
import { Image } from 'expo-image'
import React, { useCallback, useMemo, useState } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const GAP = 8
const EMOJI_SIZE = 40

const CATEGORIES: { key: EmojiCategory; label: string }[] = [
	{ key: 'NORMAL', label: 'NORMAL' },
	{ key: 'vip', label: 'VIP' },
]

export interface EmojiPickerProps {
	onEmojiSelect?: (placeholder: string) => void
	onEmojiPress?: (id: string) => void
}

export function EmojiPicker({ onEmojiSelect, onEmojiPress }: EmojiPickerProps) {
	const [category, setCategory] = useState<EmojiCategory>('NORMAL')

	const filteredConfig = useMemo(
		() =>
			EMOJI_CONFIG.filter(
				item => (item.category ?? 'NORMAL') === category
			),
		[category]
	)

	const handlePress = useCallback(
		(id: string) => {
			if (onEmojiPress) {
				onEmojiPress(id)
				return
			}
			if (onEmojiSelect) {
				onEmojiSelect(toEmojiPlaceholder(id))
			}
		},
		[onEmojiPress, onEmojiSelect]
	)

	return (
		<View style={styles.container}>
			<View style={styles.tabs}>
				{CATEGORIES.map(({ key, label }) => (
					<Pressable
						key={key}
						style={[styles.tab, category === key && styles.tabActive]}
						onPress={() => setCategory(key)}
					>
						<Text
							style={[
								styles.tabLabel,
								category === key && styles.tabLabelActive,
							]}
						>
							{label}
						</Text>
					</Pressable>
				))}
			</View>
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={[styles.grid, { gap: GAP }]}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				{filteredConfig.map(item => (
					<EmojiCell key={item.id} item={item} onPress={handlePress} />
				))}
			</ScrollView>
		</View>
	)
}

interface EmojiCellProps {
	item: (typeof EMOJI_CONFIG)[number]
	onPress: (id: string) => void
}

function EmojiCell({ item, onPress }: EmojiCellProps) {
	const displaySource = getEmojiDisplaySource(item.id)

	const handlePress = () => onPress(item.id)

	return (
		<Pressable style={styles.emojiCell} onPress={handlePress} hitSlop={4}>
			{displaySource != null ? (
				<Image
					source={displaySource as ImageSourcePropType}
					style={styles.emojiImage}
					contentFit='contain'
				/>
			) : (
				<View style={styles.fallback}>
					<Text style={styles.fallbackText}>?</Text>
				</View>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: GAP,
		backgroundColor: 'rgba(40, 38, 56, 0.98)',
		borderRadius: 12,
		maxHeight: 260,
	},
	tabs: {
		flexDirection: 'row',
		marginBottom: GAP,
		gap: 4,
	},
	tab: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
		backgroundColor: 'rgba(255,255,255,0.08)',
	},
	tabActive: {
		backgroundColor: 'rgba(255,255,255,0.2)',
	},
	tabLabel: {
		fontSize: 13,
		color: 'rgba(255,255,255,0.7)',
	},
	tabLabelActive: {
		color: '#fff',
		fontWeight: '600',
	},
	scroll: { maxHeight: 204 },
	grid: { flexDirection: 'row', flexWrap: 'wrap' },
	emojiCell: {
		width: EMOJI_SIZE,
		height: EMOJI_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emojiImage: { width: EMOJI_SIZE - 4, height: EMOJI_SIZE - 4 },
	fallback: {
		width: EMOJI_SIZE - 4,
		height: EMOJI_SIZE - 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderRadius: 8,
		padding: 2,
	},
	fallbackText: {
		fontSize: 9,
		color: 'rgba(255,255,255,0.7)',
	},
})
