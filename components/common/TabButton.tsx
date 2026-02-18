import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const underlineWidth = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(underlineWidth, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [isActive, underlineWidth]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
        <Animated.View
          style={[
            styles.underline,
            {
              width: underlineWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
    color: colors.gray600,
  },
  labelActive: {
    color: colors.gray900,
    fontWeight: typography.weights.bold,
  },
  underline: {
    height: 3,
    backgroundColor: colors.gray900,
    marginTop: spacing.xs,
    borderRadius: 2,
  },
});
