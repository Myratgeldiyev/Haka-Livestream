import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

export const ANIMATION_DURATION = 300

export const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 24) + 10

export const OVERLAY_HEIGHT = SCREEN_HEIGHT * 0.72

export const COLORS = {
	background: '#252038',
	cardBackground: '#2A2444',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.7)',
	textTertiary: 'rgba(255, 255, 255, 0.4)',
	sectionTitle: '#FFFFFF',
	iconBackground: '#3D3556',
	iconBorder: 'rgba(255, 255, 255, 0.08)',
	divider: 'rgba(255, 255, 255, 0.1)',
}

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
}

export const FONT_SIZES = {
	xs: 10,
	sm: 12,
	md: 14,
	lg: 16,
	xl: 18,
	xxl: 20,
	title: 22,
}

export const GRID_ICON_SIZE = 72
export const GRID_COLUMNS = 4
export const GRID_ITEM_SPACING = 16

export const HORIZONTAL_PADDING = SCREEN_WIDTH * 0.04
export const ITEM_GAP = SCREEN_WIDTH * 0.03
export const GRID_CELL_SIZE =
	(SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - ITEM_GAP * 3) / 4
const ICON_SCALE = 0.68
export const ROOM_PLAY_ICON_SIZE = GRID_CELL_SIZE * ICON_SCALE

/** Responsive grid sizes from screen width (use with useWindowDimensions). Icon scale 0.78 for slightly larger tools. */
export function getGridSizes(width: number) {
	const horizontalPadding = width * 0.04
	const itemGap = width * 0.03
	const cellSize = (width - horizontalPadding * 2 - itemGap * 3) / 4
	const iconSize = cellSize * 0.78
	return { cellSize, iconSize, horizontalPadding, itemGap }
}

export const sharedStyles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.overlay,
	},
	overlayPressable: {
		flex: 1,
	},
	sheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: OVERLAY_HEIGHT,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 16,
		overflow: 'hidden',
	},
})
