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
import {contratosMock} from '../services/mockData';
import {Contrato, EstadoContrato} from '../types';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const tipoLabel: Record<string, string> = {
  indefinido: 'Indefinido',
  temporal: 'Temporal',
  practicas: 'Prácticas',
  obra: 'Por obra',
};

const tipoColor: Record<string, string> = {
  indefinido: Colors.primary,
  temporal: Colors.info,
  practicas: Colors.secondary,
  obra: Colors.warning,
};

const ContratoCard: React.FC<{contrato: Contrato}> = ({contrato}) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.tipoBadge,
            {backgroundColor: tipoColor[contrato.tipo] + '22'},
          ]}>
          <Text
            style={[styles.tipoText, {color: tipoColor[contrato.tipo]}]}>
            {tipoLabel[contrato.tipo]}
          </Text>
        </View>
        <StatusBadge variant={contrato.estado} />
      </View>
      <Text style={styles.idText}>{contrato.id}</Text>
    </View>

    <Text style={styles.empleado}>{contrato.empleadoNombre}</Text>
    <View style={styles.fechaRow}>
      <Text style={styles.label}>Inicio: </Text>
      <Text style={styles.valor}>{contrato.fechaInicio}</Text>
      {contrato.fechaFin ? (
        <>
          <Text style={[styles.label, {marginLeft: Spacing.md}]}>Fin: </Text>
          <Text style={styles.valor}>{contrato.fechaFin}</Text>
        </>
      ) : null}
    </View>
    <View style={styles.salarioRow}>
      <Text style={styles.salario}>{formatCurrency(contrato.salario)}</Text>
      <Text style={styles.salarioLabel}> / mes</Text>
    </View>
    {contrato.observaciones ? (
      <Text style={styles.obs}>{contrato.observaciones}</Text>
    ) : null}
  </View>
);

export const ContratacionScreen: React.FC = () => {
  const [filtro, setFiltro] = useState<EstadoContrato | 'todos'>('todos');

  const estados: Array<EstadoContrato | 'todos'> = [
    'todos',
    'activo',
    'pendiente',
    'vencido',
    'rescindido',
  ];

  const filtered = contratosMock.filter(
    c => filtro === 'todos' || c.estado === filtro,
  );

  const totalActivos = contratosMock.filter(c => c.estado === 'activo').length;
  const totalVencidos = contratosMock.filter(c => c.estado === 'vencido').length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader
        title="Contratación"
        subtitle={`${totalActivos} activos · ${totalVencidos} vencidos`}
      />

      {/* Summary row */}
      <View style={styles.summaryRow}>
        {estados.slice(1).map(e => {
          const count = contratosMock.filter(c => c.estado === e).length;
          return (
            <View key={e} style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{count}</Text>
              <Text style={styles.summaryLabel}>
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosRow}
        contentContainerStyle={styles.filtrosContent}>
        {estados.map(e => (
          <TouchableOpacity
            key={e}
            onPress={() => setFiltro(e)}
            style={[styles.filtroBtn, filtro === e && styles.filtroBtnActive]}>
            <Text
              style={[
                styles.filtroText,
                filtro === e && styles.filtroTextActive,
              ]}>
              {e === 'todos' ? 'Todos' : e.charAt(0).toUpperCase() + e.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No hay contratos en este estado</Text>
        ) : (
          filtered.map(c => <ContratoCard key={c.id} contrato={c} />)
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
  summaryCount: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  summaryLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
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
  filtroBtnActive: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
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
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tipoBadge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  tipoText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  idText: {
    fontSize: FontSizes.xs,
    color: Colors.textDisabled,
  },
  empleado: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  fechaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  valor: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  salarioRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  salario: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.success,
  },
  salarioLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  obs: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
});
