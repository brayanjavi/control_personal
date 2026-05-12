# Control Personal

Aplicación de gestión integral de recursos humanos desarrollada con **React Native CLI** para plataformas **móvil (Android/iOS)** y **web**.

---

## Módulos

| Módulo | Descripción |
|---|---|
| 🏠 **Inicio** | Dashboard con métricas generales y acceso rápido a módulos |
| 👥 **Personal** | Gestión de empleados, búsqueda, filtros por estado y detalle de cada trabajador |
| 📋 **Contratación** | Contratos por tipo (indefinido, temporal, prácticas, por obra) y estado |
| 💰 **Movimientos** | Nómina, ingresos, egresos, descuentos y transferencias |
| 📊 **Información** | Reportes estadísticos: distribución por departamento, salarios, tipos de contrato |

---

## Tecnologías

- **React Native CLI** `0.73`
- **React Native Web** `0.19` – soporte de navegador vía Webpack
- **React Navigation** `6` – navegación por pestañas
- **TypeScript** – tipado estático
- **Jest** – pruebas unitarias

---

## Requisitos previos

- Node.js ≥ 18
- npm ≥ 9
- Android Studio (para Android) o Xcode (para iOS)

---

## Instalación

```bash
npm install
```

---

## Ejecución

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web (desarrollo)
```bash
npm run web
# Abre http://localhost:3000
```

### Web (build producción)
```bash
npm run build:web
# Output: /dist/bundle.web.js
```

### Metro bundler
```bash
npm start
```

---

## Pruebas

```bash
npm test
```

---

## Estructura del proyecto

```
control_personal/
├── src/
│   ├── navigation/        # AppNavigator (Bottom Tabs)
│   ├── screens/           # HomeScreen, PersonalScreen, ContratacionScreen, MovimientosScreen, InformacionScreen
│   ├── components/        # MetricCard, StatusBadge, ScreenHeader, ListCard
│   ├── services/          # mockData (datos de ejemplo)
│   ├── theme/             # Colores, tipografía, espaciado, sombras
│   └── types/             # TypeScript types (Empleado, Contrato, Movimiento…)
├── __tests__/             # Pruebas unitarias (Jest)
├── web/                   # index.html para React Native Web
├── App.tsx                # Componente raíz
├── index.js               # Entry point móvil
├── index.web.js           # Entry point web
├── webpack.config.js      # Configuración Webpack para web
└── metro.config.js        # Configuración Metro para móvil
```

---

## Capturas de pantalla

La interfaz usa una paleta azul primaria (`#1565C0`) con módulos claramente diferenciados por color e iconos.
