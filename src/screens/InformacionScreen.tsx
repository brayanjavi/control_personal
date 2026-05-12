import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius, Shadows} from '../theme';
import {ScreenHeader} from '../components/ScreenHeader';
import {empleadosMock, contratosMock, movimientosMock} from '../services/mockData';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

// Compute aggregated stats
const stats = {
  totalEmpleados: empleadosMock.length,
  activos: empleadosMock.filter(e => e.estado === 'activo').length,
  inactivos: empleadosMock.filter(e => e.estado === 'inactivo').length,
  licencia: empleadosMock.filter(e => e.estado === 'licencia').length,
  contratosActivos: contratosMock.filter(c => c.estado === 'activo').length,
  contratosVencidos: contratosMock.filter(c => c.estado === 'vencido').length,
  contratosRescindidos: contratosMock.filter(c => c.estado === 'rescindido').length,
  totalNomina: movimientosMock
    .filter(m => m.tipo === 'ingreso' && m.estado === 'procesado')
    .reduce((s, m) => s + m.monto, 0),
  totalDescuentos: movimientosMock
    .filter(m => m.tipo === 'descuento' && m.estado === 'procesado')
    .reduce((s, m) => s + m.monto, 0),
  movimientosPendientes: movimientosMock.filter(m => m.estado === 'pendiente').length,
};

// Department breakdown
const deptMap: Record<string, number> = {};
empleadosMock.forEach(e => {
  deptMap[e.departamento] = (deptMap[e.departamento] ?? 0) + 1;
});
const deptEntries = Object.entries(deptMap).sort((a, b) => b[1] - a[1]);

// Salary breakdown
const avgSalario =
  empleadosMock
    .filter(e => e.salario > 0)
    .reduce((s, e) => s + e.salario, 0) /
  empleadosMock.filter(e => e.salario > 0).length;

const maxSalario = Math.max(...empleadosMock.map(e => e.salario));
const minSalario = Math.min(...empleadosMock.filter(e => e.salario > 0).map(e => e.salario));

type SectionProps = {title: string; children: React.ReactNode};

const Section: React.FC<SectionProps> = ({title, children}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

type DataRowProps = {label: string; value: string | number; valueColor?: string};

const DataRow: React.FC<DataRowProps> = ({label, value, valueColor}) => (
  <View style={styles.dataRow}>
    <Text style={styles.dataLabel}>{label}</Text>
    <Text style={[styles.dataValue, valueColor ? {color: valueColor} : {}]}>
      {value}
    </Text>
  </View>
);

type BarProps = {label: string; count: number; total: number; color: string};

const DeptBar: React.FC<BarProps> = ({label, count, total, color}) => (
  <View style={styles.barItem}>
    <View style={styles.barHeader}>
      <Text style={styles.barLabel}>{label}</Text>
      <Text style={styles.barCount}>{count}</Text>
    </View>
    <View style={styles.barTrack}>
      <View
        style={[
          styles.barFill,
          {width: `${(count / total) * 100}%` as any, backgroundColor: color},
        ]}
      />
    </View>
  </View>
);

export const InformacionScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader
        title="Información"
        subtitle="Reportes y estadísticas generales"
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Personal summary */}
        <Section title="📋 Resumen de Personal">
          <View style={styles.card}>
            <DataRow label="Total empleados" value={stats.totalEmpleados} />
            <DataRow
              label="Activos"
              value={stats.activos}
              valueColor={Colors.success}
            />
            <DataRow
              label="Inactivos"
              value={stats.inactivos}
              valueColor={Colors.danger}
            />
            <DataRow
              label="En licencia"
              value={stats.licencia}
              valueColor={Colors.warning}
            />
          </View>
        </Section>

        {/* Contracts summary */}
        <Section title="📝 Resumen de Contratación">
          <View style={styles.card}>
            <DataRow
              label="Contratos activos"
              value={stats.contratosActivos}
              valueColor={Colors.success}
            />
            <DataRow
              label="Contratos vencidos"
              value={stats.contratosVencidos}
              valueColor={Colors.info}
            />
            <DataRow
              label="Contratos rescindidos"
              value={stats.contratosRescindidos}
              valueColor={Colors.danger}
            />
          </View>
        </Section>

        {/* Nómina summary */}
        <Section title="💰 Resumen de Nómina">
          <View style={styles.card}>
            <DataRow
              label="Total nómina procesada"
              value={formatCurrency(stats.totalNomina)}
              valueColor={Colors.success}
            />
            <DataRow
              label="Total descuentos"
              value={formatCurrency(stats.totalDescuentos)}
              valueColor={Colors.danger}
            />
            <DataRow
              label="Movimientos pendientes"
              value={stats.movimientosPendientes}
              valueColor={Colors.warning}
            />
          </View>
        </Section>

        {/* Salary stats */}
        <Section title="📈 Estadísticas Salariales">
          <View style={styles.card}>
            <DataRow
              label="Salario promedio"
              value={formatCurrency(avgSalario)}
              valueColor={Colors.primary}
            />
            <DataRow
              label="Salario máximo"
              value={formatCurrency(maxSalario)}
              valueColor={Colors.success}
            />
            <DataRow
              label="Salario mínimo"
              value={formatCurrency(minSalario)}
              valueColor={Colors.info}
            />
          </View>
        </Section>

        {/* Department breakdown */}
        <Section title="🏢 Distribución por Departamento">
          <View style={styles.card}>
            {deptEntries.map(([dept, count], i) => (
              <DeptBar
                key={dept}
                label={dept}
                count={count}
                total={stats.totalEmpleados}
                color={
                  [
                    Colors.primary,
                    Colors.secondary,
                    Colors.warning,
                    Colors.info,
                    Colors.success,
                  ][i % 5]
                }
              />
            ))}
          </View>
        </Section>

        {/* Contrato types */}
        <Section title="📊 Tipos de Contrato">
          <View style={styles.card}>
            {(['indefinido', 'temporal', 'practicas', 'obra'] as const).map(
              (tipo, i) => {
                const count = contratosMock.filter(c => c.tipo === tipo).length;
                return (
                  <DeptBar
                    key={tipo}
                    label={
                      {
                        indefinido: 'Indefinido',
                        temporal: 'Temporal',
                        practicas: 'Prácticas',
                        obra: 'Por obra',
                      }[tipo]
                    }
                    count={count}
                    total={contratosMock.length}
                    color={
                      [
                        Colors.primary,
                        Colors.info,
                        Colors.secondary,
                        Colors.warning,
                      ][i]
                    }
                  />
                );
              },
            )}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.background},
  scroll: {flex: 1},
  scrollContent: {padding: Spacing.md, paddingBottom: Spacing.xxl},
  section: {marginBottom: Spacing.md},
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadows.sm,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  dataLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  dataValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  barItem: {
    marginBottom: Spacing.sm,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  barCount: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  barTrack: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});
