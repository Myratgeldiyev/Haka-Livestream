import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

interface LocationBadgeProps {
  location: string;
  flag?: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({ location, flag = '🇮🇳' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📍</Text>
      <Text style={styles.text}>{location}</Text>
      <Text style={styles.flag}>{flag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: typography.sizes.sm,
    marginRight: spacing.xs,
  },
  text: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.white,
    marginRight: spacing.xs,
  },
  flag: {
    fontSize: typography.sizes.sm,
  },
});
