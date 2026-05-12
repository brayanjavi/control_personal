// ────────────────────────────────────────────────────────
//  Navigation
// ────────────────────────────────────────────────────────

export type RootTabParamList = {
  Home: undefined;
  Personal: undefined;
  Contratacion: undefined;
  Movimientos: undefined;
  Informacion: undefined;
};

// ────────────────────────────────────────────────────────
//  Personal
// ────────────────────────────────────────────────────────

export type Empleado = {
  id: string;
  nombre: string;
  apellido: string;
  cargo: string;
  departamento: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo' | 'licencia';
  email: string;
  telefono: string;
  salario: number;
};

// ────────────────────────────────────────────────────────
//  Contratación
// ────────────────────────────────────────────────────────

export type EstadoContrato = 'activo' | 'pendiente' | 'vencido' | 'rescindido';

export type Contrato = {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  tipo: 'indefinido' | 'temporal' | 'practicas' | 'obra';
  fechaInicio: string;
  fechaFin?: string;
  salario: number;
  estado: EstadoContrato;
  observaciones?: string;
};

// ────────────────────────────────────────────────────────
//  Movimientos
// ────────────────────────────────────────────────────────

export type TipoMovimiento = 'ingreso' | 'egreso' | 'transferencia' | 'descuento';

export type Movimiento = {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  tipo: TipoMovimiento;
  concepto: string;
  monto: number;
  fecha: string;
  estado: 'procesado' | 'pendiente' | 'rechazado';
};

// ────────────────────────────────────────────────────────
//  Información / Reportes
// ────────────────────────────────────────────────────────

export type MetricaDashboard = {
  label: string;
  valor: number | string;
  icono: string;
  color: string;
  variacion?: number; // percentage change vs last period
};
