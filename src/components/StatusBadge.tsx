import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius} from '../theme';

type BadgeVariant = 'activo' | 'inactivo' | 'licencia' | 'pendiente' | 'vencido' | 'rescindido' | 'procesado' | 'rechazado';

const badgeConfig: Record<BadgeVariant, {bg: string; text: string; label: string}> = {
  activo: {bg: Colors.active, text: Colors.activeText, label: 'Activo'},
  inactivo: {bg: Colors.inactive, text: Colors.inactiveText, label: 'Inactivo'},
  licencia: {bg: Colors.pending, text: Colors.pendingText, label: 'Licencia'},
  pendiente: {bg: Colors.pending, text: Colors.pendingText, label: 'Pendiente'},
  vencido: {bg: '#E3F2FD', text: '#1565C0', label: 'Vencido'},
  rescindido: {bg: Colors.inactive, text: Colors.inactiveText, label: 'Rescindido'},
  procesado: {bg: Colors.active, text: Colors.activeText, label: 'Procesado'},
  rechazado: {bg: Colors.inactive, text: Colors.inactiveText, label: 'Rechazado'},
};

type Props = {
  variant: BadgeVariant;
  style?: ViewStyle;
};

export const StatusBadge: React.FC<Props> = ({variant, style}) => {
  const config = badgeConfig[variant] ?? badgeConfig.activo;
  return (
    <View style={[styles.badge, {backgroundColor: config.bg}, style]}>
      <Text style={[styles.text, {color: config.text}]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
