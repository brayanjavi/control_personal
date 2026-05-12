import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors, Spacing, FontSizes, BorderRadius, Shadows} from '../theme';
import {ScreenHeader} from '../components/ScreenHeader';
import {StatusBadge} from '../components/StatusBadge';
import {empleadosMock} from '../services/mockData';
import {Empleado} from '../types';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

const Avatar: React.FC<{nombre: string; apellido: string; color: string}> = ({
  nombre,
  apellido,
  color,
}) => (
  <View style={[styles.avatar, {backgroundColor: color}]}>
    <Text style={styles.avatarText}>
      {nombre[0]}
      {apellido[0]}
    </Text>
  </View>
);

const avatarColors = [
  Colors.primary,
  Colors.secondary,
  Colors.warning,
  Colors.info,
  Colors.danger,
  Colors.success,
];

const EmpleadoCard: React.FC<{empleado: Empleado; index: number}> = ({
  empleado,
  index,
}) => (
  <View style={styles.card}>
    <Avatar
      nombre={empleado.nombre}
      apellido={empleado.apellido}
      color={avatarColors[index % avatarColors.length]}
    />
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={styles.nombre}>
          {empleado.nombre} {empleado.apellido}
        </Text>
        <StatusBadge variant={empleado.estado} />
      </View>
      <Text style={styles.cargo}>{empleado.cargo}</Text>
      <Text style={styles.departamento}>{empleado.departamento}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.salario}>{formatCurrency(empleado.salario)}</Text>
        <Text style={styles.fecha}>Desde {empleado.fechaIngreso}</Text>
      </View>
      <Text style={styles.contacto}>{empleado.email}</Text>
    </View>
  </View>
);

export const PersonalScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  const filtered = empleadosMock.filter(e => {
    const matchSearch =
      search.trim() === '' ||
      `${e.nombre} ${e.apellido}`.toLowerCase().includes(search.toLowerCase()) ||
      e.cargo.toLowerCase().includes(search.toLowerCase()) ||
      e.departamento.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filtroEstado === 'todos' || e.estado === filtroEstado;
    return matchSearch && matchEstado;
  });

  const filtros = ['todos', 'activo', 'inactivo', 'licencia'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader
        title="Personal"
        subtitle={`${empleadosMock.length} empleados registrados`}
      />
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre, cargo o departamento…"
          placeholderTextColor={Colors.textDisabled}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosRow}
        contentContainerStyle={styles.filtrosContent}>
        {filtros.map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFiltroEstado(f)}
            style={[
              styles.filtroBtn,
              filtroEstado === f && styles.filtroBtnActive,
            ]}>
            <Text
              style={[
                styles.filtroText,
                filtroEstado === f && styles.filtroTextActive,
              ]}>
              {f === 'todos' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No se encontraron empleados</Text>
        ) : (
          filtered.map((e, i) => (
            <EmpleadoCard key={e.id} empleado={e} index={i} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.background},
  searchBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
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
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filtroText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  filtroTextActive: {
    color: Colors.white,
  },
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...Shadows.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  avatarText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSizes.md,
  },
  cardContent: {flex: 1},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  nombre: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  cargo: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  departamento: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  salario: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.success,
  },
  fecha: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  contacto: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
