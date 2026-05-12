import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius, Shadows} from '../theme';

type Props = {
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  style?: ViewStyle;
};

export const MetricCard: React.FC<Props> = ({
  label,
  value,
  subValue,
  color = Colors.primary,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.indicator, {backgroundColor: color}]} />
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, {color}]}>{value}</Text>
        {subValue ? <Text style={styles.subValue}>{subValue}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  indicator: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  subValue: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
