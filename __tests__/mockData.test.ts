/**
 * Mock data unit tests
 * @format
 */

import {empleadosMock, contratosMock, movimientosMock} from '../src/services/mockData';

describe('empleadosMock', () => {
  it('should have at least one employee', () => {
    expect(empleadosMock.length).toBeGreaterThan(0);
  });

  it('every employee should have required fields', () => {
    empleadosMock.forEach(e => {
      expect(e.id).toBeTruthy();
      expect(e.nombre).toBeTruthy();
      expect(e.apellido).toBeTruthy();
      expect(e.cargo).toBeTruthy();
      expect(e.departamento).toBeTruthy();
      expect(['activo', 'inactivo', 'licencia']).toContain(e.estado);
    });
  });

  it('active employees have salary > 0', () => {
    empleadosMock
      .filter(e => e.estado === 'activo')
      .forEach(e => {
        expect(e.salario).toBeGreaterThan(0);
      });
  });
});

describe('contratosMock', () => {
  it('should have at least one contract', () => {
    expect(contratosMock.length).toBeGreaterThan(0);
  });

  it('every contract should have required fields', () => {
    contratosMock.forEach(c => {
      expect(c.id).toBeTruthy();
      expect(c.empleadoId).toBeTruthy();
      expect(c.empleadoNombre).toBeTruthy();
      expect(['indefinido', 'temporal', 'practicas', 'obra']).toContain(c.tipo);
      expect(['activo', 'pendiente', 'vencido', 'rescindido']).toContain(c.estado);
    });
  });
});

describe('movimientosMock', () => {
  it('should have at least one movement', () => {
    expect(movimientosMock.length).toBeGreaterThan(0);
  });

  it('every movement should have a positive amount', () => {
    movimientosMock.forEach(m => {
      expect(m.monto).toBeGreaterThan(0);
    });
  });

  it('every movement should have valid tipo', () => {
    movimientosMock.forEach(m => {
      expect(['ingreso', 'egreso', 'transferencia', 'descuento']).toContain(
        m.tipo,
      );
    });
  });

  it('every movement should have valid estado', () => {
    movimientosMock.forEach(m => {
      expect(['procesado', 'pendiente', 'rechazado']).toContain(m.estado);
    });
  });
});
