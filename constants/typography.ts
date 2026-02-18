/**
 * Platform-aware typography system
 *
 * Key considerations:
 * - Android text renders thicker/bolder than iOS
 * - Android needs slightly more line height for readability
 * - Every Text element should have an explicit lineHeight
 */

import { Platform, TextStyle } from 'react-native'
import { platformValue, fontWeightMap } from './platform'

/**
 * Font sizes with platform awareness
 * Android may render slightly larger, so we compensate
 */
export const fontSizes = {
  xs: platformValue(10, 10),
  sm: platformValue(12, 12),
  md: platformValue(14, 14),
  lg: platformValue(16, 15),
  xl: platformValue(18, 17),
  xxl: platformValue(20, 19),
  xxxl: platformValue(24, 23),
  huge: platformValue(32, 30),
  display: platformValue(40, 38),
}

/**
 * Line heights per font size
 * Android needs more line height for optimal readability
 * Formula: fontSize * multiplier (iOS: 1.4, Android: 1.5)
 */
export const lineHeights = {
  xs: platformValue(14, 16),      // 10 * 1.4 / 1.6
  sm: platformValue(18, 20),      // 12 * 1.5 / 1.67
  md: platformValue(20, 22),      // 14 * 1.43 / 1.57
  lg: platformValue(24, 24),      // 16 * 1.5 / 1.6
  xl: platformValue(26, 28),      // 18 * 1.44 / 1.56
  xxl: platformValue(28, 30),     // 20 * 1.4 / 1.5
  xxxl: platformValue(32, 36),    // 24 * 1.33 / 1.5
  huge: platformValue(40, 44),    // 32 * 1.25 / 1.38
  display: platformValue(48, 52), // 40 * 1.2 / 1.3
}

/**
 * Font weights with platform compensation
 * Android renders fonts thicker, so we use lighter weights
 */
export const fontWeights = {
  regular: platformValue('400', '400') as TextStyle['fontWeight'],
  medium: platformValue('500', '500') as TextStyle['fontWeight'],
  semibold: platformValue('600', '500') as TextStyle['fontWeight'],
  bold: platformValue('700', '600') as TextStyle['fontWeight'],
}

/**
 * Letter spacing per platform
 * Android may need tighter letter spacing due to thicker rendering
 */
export const letterSpacing = {
  tight: platformValue(-0.5, -0.3),
  normal: platformValue(0, 0),
  wide: platformValue(0.5, 0.3),
  wider: platformValue(1, 0.7),
}

/**
 * Complete typography presets with all necessary properties
 * Every preset includes: fontSize, lineHeight, fontWeight
 */
export const typography = {
  // Legacy compatibility - sizes only
  sizes: fontSizes,
  weights: fontWeights,

  // Display text (heroes, large headings)
  display: {
    fontSize: fontSizes.display,
    lineHeight: lineHeights.display,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  } as TextStyle,

  // Headings
  h1: {
    fontSize: fontSizes.huge,
    lineHeight: lineHeights.huge,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
  } as TextStyle,

  h2: {
    fontSize: fontSizes.xxxl,
    lineHeight: lineHeights.xxxl,
    fontWeight: fontWeights.bold,
  } as TextStyle,

  h3: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    fontWeight: fontWeights.semibold,
  } as TextStyle,

  h4: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.semibold,
  } as TextStyle,

  h5: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.semibold,
  } as TextStyle,

  h6: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.semibold,
  } as TextStyle,

  // Body text
  bodyLarge: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.regular,
  } as TextStyle,

  body: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.regular,
  } as TextStyle,

  bodySmall: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.regular,
  } as TextStyle,

  // Labels and captions
  label: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.medium,
  } as TextStyle,

  labelSmall: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  } as TextStyle,

  caption: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.regular,
  } as TextStyle,

  // Buttons
  button: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  buttonSmall: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  buttonLarge: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.semibold,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  // Specialized
  tabLabel: {
    fontSize: platformValue(14, 13),
    lineHeight: platformValue(20, 20),
    fontWeight: fontWeights.semibold,
  } as TextStyle,

  badge: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.bold,
  } as TextStyle,

  input: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.regular,
  } as TextStyle,

  // Stats/numbers
  stat: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
    fontWeight: fontWeights.bold,
  } as TextStyle,

  statLabel: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
  } as TextStyle,
}

/**
 * Create text style with required lineHeight
 * Use this when creating custom text styles
 */
export function createTextStyle(
  fontSize: number,
  fontWeight: TextStyle['fontWeight'] = '400',
  options?: {
    lineHeightMultiplier?: number
    letterSpacing?: number
    color?: string
  }
): TextStyle {
  const multiplier = options?.lineHeightMultiplier ?? platformValue(1.4, 1.5)

  return {
    fontSize,
    lineHeight: Math.round(fontSize * multiplier),
    fontWeight,
    ...(options?.letterSpacing !== undefined && { letterSpacing: options.letterSpacing }),
    ...(options?.color && { color: options.color }),
  }
}

/**
 * Get line height for a given font size
 * Ensures consistent line height calculation
 */
export function getLineHeight(fontSize: number): number {
  const multiplier = platformValue(1.4, 1.5)
  return Math.round(fontSize * multiplier)
}
