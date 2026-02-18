/**
 * Platform-aware design system utilities
 * Provides platform-specific values for iOS and Android
 */

import { Platform, Dimensions, StatusBar, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// Platform detection
export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

// Screen dimensions
export const screenWidth = SCREEN_WIDTH
export const screenHeight = SCREEN_HEIGHT

// Pixel ratio for density-aware scaling
const pixelRatio = PixelRatio.get()

/**
 * StatusBar height handling
 * - iOS: Dynamic based on device (notch vs non-notch)
 * - Android: StatusBar.currentHeight
 */
export const statusBarHeight = Platform.select({
  ios: 0, // SafeAreaView handles this on iOS
  android: StatusBar.currentHeight ?? 24,
  default: 0,
})

/**
 * Platform-specific scale factors
 * Android renders slightly differently, so we apply subtle adjustments
 */
export const platformScale = {
  // Android text renders slightly thicker, so we can use slightly smaller sizes
  fontSize: Platform.select({ ios: 1, android: 0.97, default: 1 }) ?? 1,
  // iOS generally has more generous spacing
  spacing: Platform.select({ ios: 1, android: 0.92, default: 1 }) ?? 1,
  // Line height multiplier (Android needs slightly more)
  lineHeight: Platform.select({ ios: 1, android: 1.05, default: 1 }) ?? 1,
}

/**
 * Platform-aware value selector with TypeScript support
 */
export function platformValue<T>(ios: T, android: T): T {
  return Platform.select({ ios, android, default: ios }) ?? ios
}

/**
 * Scale a value based on screen width (responsive)
 * Base width is 375 (iPhone SE/8)
 */
export function scaleWidth(size: number): number {
  const baseWidth = 375
  return Math.round((SCREEN_WIDTH / baseWidth) * size)
}

/**
 * Scale font size with platform awareness
 */
export function scaleFontSize(size: number): number {
  const scaled = size * platformScale.fontSize
  // Ensure minimum readability
  return Math.max(Math.round(scaled), 10)
}

/**
 * Minimum touch target sizes per platform guidelines
 * - iOS Human Interface Guidelines: 44pt minimum
 * - Android Material Design: 48dp minimum
 */
export const minTouchTarget = {
  width: platformValue(44, 48),
  height: platformValue(44, 48),
}

/**
 * Check if device has a notch (for SafeArea handling)
 */
export const hasNotch = (): boolean => {
  if (isIOS) {
    // Check for notched iPhones based on screen dimensions
    return (
      (SCREEN_HEIGHT >= 812 || SCREEN_WIDTH >= 812) && // iPhone X and later
      !Platform.isPad
    )
  }
  return false
}

/**
 * Safe area insets defaults (use react-native-safe-area-context for actual values)
 */
export const defaultSafeAreaInsets = {
  top: platformValue(hasNotch() ? 44 : 20, statusBarHeight ?? 24),
  bottom: platformValue(hasNotch() ? 34 : 0, 0),
  left: 0,
  right: 0,
}

/**
 * Keyboard behavior per platform
 */
export const keyboardBehavior = platformValue<'padding' | 'height' | undefined>(
  'padding',
  'height'
)

/**
 * Navigation bar height (bottom)
 */
export const navigationBarHeight = platformValue(83, 56)

/**
 * Header height (top)
 */
export const headerHeight = platformValue(44, 56)

/**
 * Tab bar height
 */
export const tabBarHeight = platformValue(83, 64)

/**
 * Platform-specific animation configuration
 */
export const animationConfig = {
  // iOS uses spring animations, Android uses standard easing
  duration: platformValue(300, 250),
  useNativeDriver: true,
  // Spring config
  spring: {
    tension: platformValue(100, 120),
    friction: platformValue(8, 10),
  },
}

/**
 * Font weight mapping for platform consistency
 * Android renders fonts thicker, so we may use lighter weights
 */
export const fontWeightMap = {
  thin: platformValue('100', '100') as '100',
  light: platformValue('300', '300') as '300',
  regular: platformValue('400', '400') as '400',
  medium: platformValue('500', '400') as '500' | '400', // Android renders 500 thick
  semibold: platformValue('600', '500') as '600' | '500',
  bold: platformValue('700', '600') as '700' | '600',
  heavy: platformValue('800', '700') as '800' | '700',
  black: platformValue('900', '800') as '900' | '800',
}
