import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius, Shadows} from '../theme';
import {ScreenHeader} from '../components/ScreenHeader';
import {StatusBadge} from '../components/StatusBadge';
import {movimientosMock} from '../services/mockData';
import {Movimiento, TipoMovimiento} from '../types';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const tipoConfig: Record<
  TipoMovimiento,
  {label: string; color: string; sign: string}
> = {
  ingreso: {label: 'Ingreso', color: Colors.success, sign: '+'},
  egreso: {label: 'Egreso', color: Colors.danger, sign: '-'},
  descuento: {label: 'Descuento', color: Colors.warning, sign: '-'},
  transferencia: {label: 'Transferencia', color: Colors.info, sign: '↔'},
};

const MovimientoCard: React.FC<{movimiento: Movimiento}> = ({movimiento}) => {
  const config = tipoConfig[movimiento.tipo];
  return (
    <View style={styles.card}>
      <View
        style={[styles.typeIndicator, {backgroundColor: config.color + '22'}]}>
        <Text style={[styles.typeSign, {color: config.color}]}>
          {config.sign}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <View style={{flex: 1}}>
            <Text style={styles.concepto} numberOfLines={1}>
              {movimiento.concepto}
            </Text>
            <Text style={styles.empleado}>{movimiento.empleadoNombre}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={[styles.monto, {color: config.color}]}>
              {config.sign !== '↔' ? config.sign : ''}
              {formatCurrency(movimiento.monto)}
            </Text>
            <StatusBadge variant={movimiento.estado} />
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View
            style={[
              styles.tipoPill,
              {backgroundColor: config.color + '18'},
            ]}>
            <Text style={[styles.tipoText, {color: config.color}]}>
              {config.label}
            </Text>
          </View>
          <Text style={styles.fecha}>{movimiento.fecha}</Text>
        </View>
      </View>
    </View>
  );
};

export const MovimientosScreen: React.FC = () => {
  const [filtro, setFiltro] = useState<TipoMovimiento | 'todos'>('todos');

  const tipos: Array<TipoMovimiento | 'todos'> = [
    'todos',
    'ingreso',
    'egreso',
    'descuento',
    'transferencia',
  ];

  const filtered = movimientosMock.filter(
    m => filtro === 'todos' || m.tipo === filtro,
  );

  const totalIngresos = movimientosMock
    .filter(m => m.tipo === 'ingreso')
    .reduce((s, m) => s + m.monto, 0);

  const totalEgresos = movimientosMock
    .filter(m => m.tipo === 'egreso' || m.tipo === 'descuento')
    .reduce((s, m) => s + m.monto, 0);

  const pendientes = movimientosMock.filter(m => m.estado === 'pendiente').length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader
        title="Movimientos"
        subtitle={`${movimientosMock.length} movimientos registrados`}
      />

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, {color: Colors.success}]}>
            {formatCurrency(totalIngresos)}
          </Text>
          <Text style={styles.summaryLabel}>Ingresos</Text>
        </View>
        <View style={[styles.summaryItem, styles.summaryBorder]}>
          <Text style={[styles.summaryValue, {color: Colors.danger}]}>
            {formatCurrency(totalEgresos)}
          </Text>
          <Text style={styles.summaryLabel}>Egresos + Desc.</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, {color: Colors.warning}]}>
            {pendientes}
          </Text>
          <Text style={styles.summaryLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Type filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosRow}
        contentContainerStyle={styles.filtrosContent}>
        {tipos.map(t => (
          <TouchableOpacity
            key={t}
            onPress={() => setFiltro(t)}
            style={[
              styles.filtroBtn,
              filtro === t && {
                backgroundColor:
                  t === 'todos'
                    ? Colors.primary
                    : tipoConfig[t as TipoMovimiento]?.color ?? Colors.primary,
                borderColor:
                  t === 'todos'
                    ? Colors.primary
                    : tipoConfig[t as TipoMovimiento]?.color ?? Colors.primary,
              },
            ]}>
            <Text
              style={[
                styles.filtroText,
                filtro === t && styles.filtroTextActive,
              ]}>
              {t === 'todos'
                ? 'Todos'
                : tipoConfig[t as TipoMovimiento]?.label ?? t}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No hay movimientos</Text>
        ) : (
          filtered.map(m => (
            <MovimientoCard key={m.id} movimiento={m} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.background},
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  summaryBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  summaryValue: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  filtrosRow: {
    maxHeight: 52,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filtrosContent: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  filtroBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filtroText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filtroTextActive: {color: Colors.white},
  list: {flex: 1},
  listContent: {padding: Spacing.md, paddingBottom: Spacing.xxl},
  empty: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
    fontSize: FontSizes.md,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  typeIndicator: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  typeSign: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
  },
  cardContent: {flex: 1},
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  cardRight: {
    alignItems: 'flex-end',
    marginLeft: Spacing.sm,
  },
  concepto: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  empleado: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  monto: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipoPill: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  tipoText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  fecha: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
});
