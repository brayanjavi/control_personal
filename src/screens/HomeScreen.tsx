import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius, Shadows} from '../theme';
import {MetricCard} from '../components/MetricCard';
import {empleadosMock, contratosMock, movimientosMock} from '../services/mockData';

const totalEmpleados = empleadosMock.length;
const activos = empleadosMock.filter(e => e.estado === 'activo').length;
const contratosActivos = contratosMock.filter(c => c.estado === 'activo').length;
const movimientosPendientes = movimientosMock.filter(m => m.estado === 'pendiente').length;
const totalNomina = movimientosMock
  .filter(m => m.tipo === 'ingreso' && m.estado === 'procesado')
  .reduce((sum, m) => sum + m.monto, 0);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP', maximumFractionDigits: 0}).format(value);

type ModuleCardProps = {
  title: string;
  description: string;
  color: string;
  emoji: string;
};

const ModuleCard: React.FC<ModuleCardProps> = ({title, description, color, emoji}) => (
  <View style={[styles.moduleCard, {borderLeftColor: color}]}>
    <Text style={styles.moduleEmoji}>{emoji}</Text>
    <View style={styles.moduleContent}>
      <Text style={styles.moduleTitle}>{title}</Text>
      <Text style={styles.moduleDesc}>{description}</Text>
    </View>
  </View>
);

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero header */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Control Personal</Text>
          <Text style={styles.heroSubtitle}>
            Gestión integral de recursos humanos
          </Text>
          <Text style={styles.heroDate}>
            {new Date().toLocaleDateString('es-CO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        <View style={styles.body}>
          {/* Metrics */}
          <Text style={styles.sectionTitle}>Resumen general</Text>

          <View style={styles.metricsGrid}>
            <View style={styles.metricHalf}>
              <MetricCard
                label="Total Empleados"
                value={totalEmpleados}
                subValue={`${activos} activos`}
                color={Colors.primary}
              />
            </View>
            <View style={styles.metricHalf}>
              <MetricCard
                label="Contratos Activos"
                value={contratosActivos}
                color={Colors.secondary}
              />
            </View>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricHalf}>
              <MetricCard
                label="Movimientos Pendientes"
                value={movimientosPendientes}
                color={Colors.warning}
              />
            </View>
            <View style={styles.metricHalf}>
              <MetricCard
                label="Nómina Procesada"
                value={formatCurrency(totalNomina)}
                subValue="Mayo 2025"
                color={Colors.success}
              />
            </View>
          </View>

          {/* Modules */}
          <Text style={styles.sectionTitle}>Módulos</Text>

          <ModuleCard
            emoji="👥"
            title="Personal"
            description="Gestión de empleados, cargos y departamentos"
            color={Colors.primary}
          />
          <ModuleCard
            emoji="📋"
            title="Contratación"
            description="Contratos, vinculaciones y tipos de contrato"
            color={Colors.secondary}
          />
          <ModuleCard
            emoji="💰"
            title="Movimientos"
            description="Nómina, ingresos, egresos y descuentos"
            color={Colors.warning}
          />
          <ModuleCard
            emoji="📊"
            title="Información"
            description="Reportes, estadísticas y acceso a datos"
            color={Colors.info}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    fontSize: FontSizes.heading,
    fontWeight: '800',
    color: Colors.white,
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    marginTop: Spacing.xs,
  },
  heroDate: {
    fontSize: FontSizes.sm,
    color: 'rgba(255,255,255,0.65)',
    marginTop: Spacing.sm,
    textTransform: 'capitalize',
  },
  body: {
    padding: Spacing.lg,
    marginTop: -Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metricHalf: {
    flex: 1,
  },
  moduleCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    ...Shadows.sm,
  },
  moduleEmoji: {
    fontSize: 28,
    marginRight: Spacing.md,
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  moduleDesc: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
