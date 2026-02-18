/**
 * Platform-aware spacing system
 * iOS generally uses slightly larger margins/paddings
 * Android should feel more compact
 */

import { minTouchTarget, platformValue } from './platform'

/**
 * Base spacing scale (design tokens)
 * Values are optimized per platform
 */
const baseSpacing = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
}

/**
 * Platform-adjusted spacing
 * iOS gets slightly more generous spacing
 * Android is more compact per Material Design principles
 */
export const spacing = {
	// Core spacing scale with platform adjustments
	xs: platformValue(4, 4),
	sm: platformValue(8, 6),
	md: platformValue(12, 10),
	lg: platformValue(16, 14),
	xl: platformValue(20, 18),
	xxl: platformValue(24, 20),
	xxxl: platformValue(32, 28),

	// Section spacing (for major layout divisions)
	section: {
		horizontal: platformValue(16, 16),
		vertical: platformValue(44, 40),
	},

	// Card internal padding
	card: platformValue(16, 14),

	// Button padding
	button: {
		vertical: platformValue(12, 10),
		horizontal: platformValue(16, 14),
		// Small buttons
		smallVertical: platformValue(8, 6),
		smallHorizontal: platformValue(12, 10),
		// Large buttons
		largeVertical: platformValue(16, 14),
		largeHorizontal: platformValue(24, 20),
	},

	// Avatar sizes
	avatar: {
		tiny: platformValue(32, 32),
		small: platformValue(40, 38),
		medium: platformValue(48, 44),
		large: platformValue(56, 52),
		xlarge: platformValue(72, 68),
		huge: platformValue(88, 84),
	},

	// Icon sizes
	icon: {
		tiny: platformValue(16, 16),
		small: platformValue(20, 20),
		medium: platformValue(24, 24),
		large: platformValue(32, 32),
		xlarge: platformValue(40, 40),
	},

	// Input field spacing
	input: {
		paddingVertical: platformValue(14, 12),
		paddingHorizontal: platformValue(16, 14),
		minHeight: platformValue(48, 44),
	},

	// List item spacing
	listItem: {
		paddingVertical: platformValue(12, 10),
		paddingHorizontal: platformValue(16, 16),
		minHeight: platformValue(56, 52),
	},

	// Screen/container padding
	screen: {
		horizontal: platformValue(16, 16),
		vertical: platformValue(16, 12),
		top: platformValue(16, 12),
		bottom: platformValue(24, 16),
	},

	// Gap between elements (Flexbox gap)
	gap: {
		xs: platformValue(4, 4),
		sm: platformValue(8, 6),
		md: platformValue(12, 10),
		lg: platformValue(16, 14),
		xl: platformValue(24, 20),
	},

	// Touch target minimum sizes (for accessibility)
	touchTarget: minTouchTarget,

	// Header heights
	header: {
		height: platformValue(56, 56),
		paddingTop: platformValue(0, 0), // SafeArea handles iOS, StatusBar handles Android
	},

	// Tab bar
	tabBar: {
		height: platformValue(83, 64),
		paddingBottom: platformValue(24, 8),
		paddingTop: platformValue(12, 8),
		iconSize: platformValue(26, 24),
	},

	// Modal/sheet
	modal: {
		borderRadius: platformValue(20, 16),
		padding: platformValue(20, 16),
	},

	// Content margins (for text blocks, etc.)
	content: {
		marginBottom: platformValue(16, 12),
		paragraphGap: platformValue(12, 10),
	},
}

/**
 * Get spacing value with optional scale factor
 */
export function getSpacing(key: keyof typeof baseSpacing, scale = 1): number {
	return Math.round(spacing[key] * scale)
}

/**
 * Create consistent insets object
 */
export function createInsets(
	top: number,
	right?: number,
	bottom?: number,
	left?: number,
) {
	return {
		paddingTop: top,
		paddingRight: right ?? top,
		paddingBottom: bottom ?? top,
		paddingLeft: left ?? right ?? top,
	}
}

/**
 * Horizontal and vertical padding helpers
 */
export const paddingHelpers = {
	horizontal: (value: number) => ({
		paddingHorizontal: value,
	}),
	vertical: (value: number) => ({
		paddingVertical: value,
	}),
	all: (value: number) => ({
		padding: value,
	}),
}
