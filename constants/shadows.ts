/**
 * Platform-aware shadow and elevation system
 *
 * iOS: Uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * Android: Uses elevation (Material Design elevation)
 *
 * This utility ensures equivalent visual depth on both platforms
 */

import { Platform, ViewStyle } from 'react-native'
import { platformValue, isIOS, isAndroid } from './platform'

/**
 * Shadow presets with platform-appropriate values
 * Elevation levels follow Material Design guidelines
 */
export type ShadowLevel = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

interface ShadowStyle {
  // iOS shadow properties
  shadowColor?: string
  shadowOffset?: { width: number; height: number }
  shadowOpacity?: number
  shadowRadius?: number
  // Android elevation
  elevation?: number
  // Background color required for Android elevation
  backgroundColor?: string
}

/**
 * Create cross-platform shadow style
 * @param elevation - Material Design elevation level (0-24)
 * @param shadowColor - Shadow color (default: black)
 */
export function createShadow(
  elevation: number,
  shadowColor: string = '#000000'
): ViewStyle {
  if (elevation === 0) {
    return {}
  }

  if (isIOS) {
    // iOS shadow calculation based on elevation
    // Higher elevation = larger spread and offset
    const shadowOpacity = Math.min(0.08 + elevation * 0.02, 0.35)
    const shadowRadius = elevation * 0.8
    const shadowOffsetY = Math.min(elevation * 0.5, 8)

    return {
      shadowColor,
      shadowOffset: { width: 0, height: shadowOffsetY },
      shadowOpacity,
      shadowRadius,
    }
  }

  // Android uses elevation directly
  return {
    elevation,
  }
}

/**
 * Predefined shadow levels
 * These provide consistent depth across the app
 */
export const shadows = {
  none: createShadow(0),

  // Extra small - subtle depth (cards, chips)
  xs: {
    ...createShadow(1),
    // iOS specific fine-tuning
    ...(isIOS && {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
    }),
  } as ViewStyle,

  // Small - slight elevation (buttons, list items)
  sm: {
    ...createShadow(2),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    }),
  } as ViewStyle,

  // Medium - standard cards
  md: {
    ...createShadow(4),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
    }),
  } as ViewStyle,

  // Large - elevated cards, dropdowns
  lg: {
    ...createShadow(8),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    }),
  } as ViewStyle,

  // Extra large - modals, popovers
  xl: {
    ...createShadow(12),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 14,
    }),
  } as ViewStyle,

  // XXL - dialogs, drawers
  xxl: {
    ...createShadow(24),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
    }),
  } as ViewStyle,
}

/**
 * Semantic shadow presets for specific use cases
 */
export const shadowPresets = {
  // Card shadows
  card: shadows.sm,
  cardElevated: shadows.md,
  cardHover: shadows.lg,

  // Button shadows
  button: shadows.xs,
  buttonPressed: shadows.none,
  buttonFloating: shadows.lg,

  // Navigation shadows
  header: {
    ...createShadow(4),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }),
  } as ViewStyle,

  tabBar: {
    ...createShadow(8),
    ...(isIOS && {
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    }),
  } as ViewStyle,

  // Bottom sheet
  bottomSheet: {
    ...createShadow(16),
    ...(isIOS && {
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    }),
  } as ViewStyle,

  // Modal/dialog
  modal: shadows.xxl,

  // Dropdown/popover
  dropdown: shadows.lg,

  // Avatar
  avatar: shadows.xs,

  // Input focused
  inputFocused: {
    ...createShadow(2),
    ...(isIOS && {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    }),
  } as ViewStyle,

  // Toast/snackbar
  toast: shadows.lg,
}

/**
 * Get shadow style by level name
 */
export function getShadow(level: ShadowLevel): ViewStyle {
  return shadows[level]
}

/**
 * Create colored shadow (primarily for iOS)
 * Android doesn't support colored shadows natively
 */
export function createColoredShadow(
  color: string,
  elevation: number = 4
): ViewStyle {
  if (isIOS) {
    const shadowOpacity = Math.min(0.15 + elevation * 0.02, 0.4)
    const shadowRadius = elevation * 0.8

    return {
      shadowColor: color,
      shadowOffset: { width: 0, height: elevation * 0.5 },
      shadowOpacity,
      shadowRadius,
    }
  }

  // Android falls back to regular elevation
  // Note: Android 9+ supports colored shadows with android:outlineSpotShadowColor
  // but React Native doesn't expose this yet
  return {
    elevation,
  }
}

/**
 * Inner shadow simulation (not natively supported)
 * This creates an approximate effect using a View with border
 */
export const innerShadowStyle = (color: string = 'rgba(0,0,0,0.1)'): ViewStyle => ({
  borderWidth: 1,
  borderColor: color,
})

/**
 * Utility to add shadow only on specific sides
 * Useful for headers (bottom shadow) or tabs (top shadow)
 */
export function directionalShadow(
  direction: 'top' | 'bottom' | 'left' | 'right',
  elevation: number = 4
): ViewStyle {
  if (isAndroid) {
    return { elevation }
  }

  const offsets: Record<string, { width: number; height: number }> = {
    top: { width: 0, height: -elevation * 0.5 },
    bottom: { width: 0, height: elevation * 0.5 },
    left: { width: -elevation * 0.5, height: 0 },
    right: { width: elevation * 0.5, height: 0 },
  }

  return {
    shadowColor: '#000',
    shadowOffset: offsets[direction],
    shadowOpacity: 0.1,
    shadowRadius: elevation * 0.8,
  }
}
