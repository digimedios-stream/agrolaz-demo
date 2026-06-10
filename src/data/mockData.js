// ========================================
// AgroLaz — Mock Data (Argentina)
// ========================================

export const currentUser = {
  name: 'Ricardo Mendoza',
  role: 'Administrador',
  avatar: null,
  initials: 'RM',
  email: 'ricardo@agrolaz.com',
};

// --- Dashboard ---
export const dashboardStats = {
  produccion: { value: 12, label: 'Cultivos', trend: '+8%', trendUp: true },
  ventas: { value: '$458.000', label: 'USD', trend: '+12%', trendUp: true },
  agroquimicos: { value: 45, label: 'Unidades', alert: 'Bajo', alertType: 'danger' },
  maquinarias: { value: 8, label: 'Máquinas', alert: '2 Mant.', alertType: 'warning' },
};

export const ventasMensuales = [
  { mes: 'Ene', valor: 62000 },
  { mes: 'Feb', valor: 71000 },
  { mes: 'Mar', valor: 58000 },
  { mes: 'Abr', valor: 82000 },
  { mes: 'May', valor: 93000 },
  { mes: 'Jun', valor: 108000 },
];

export const produccionPorHortaliza = [
  { nombre: 'Tomate', porcentaje: 40, color: '#2D6A4F' },
  { nombre: 'Lechuga', porcentaje: 25, color: '#52B788' },
  { nombre: 'Cebolla', porcentaje: 20, color: '#EE9B00' },
  { nombre: 'Otros', porcentaje: 15, color: '#9CA3AF' },
];

export const ultimasActividades = [
  {
    id: 1,
    actividad: 'Riego Automatizado',
    icono: 'droplets',
    sector: 'Sector A - Tomates Roma',
    fecha: 'Hoy, 08:30 AM',
    estado: 'Completado',
    estadoType: 'success',
    encargado: { nombre: 'Juan Soto', initials: 'JS' },
  },
  {
    id: 2,
    actividad: 'Aplicación de Fertilizante',
    icono: 'flask-conical',
    sector: 'Sector C - Lechugas',
    fecha: 'Ayer, 04:15 PM',
    estado: 'En Progreso',
    estadoType: 'info',
    encargado: { nombre: 'María Alva', initials: 'MA' },
  },
  {
    id: 3,
    actividad: 'Venta de Producción',
    icono: 'receipt',
    sector: 'General - Venta Directa',
    fecha: 'Ayer, 10:00 AM',
    estado: 'Pendiente',
    estadoType: 'warning',
    encargado: { nombre: 'R. Mendoza', initials: 'RM' },
  },
  {
    id: 4,
    actividad: 'Mantenimiento Tractor',
    icono: 'tractor',
    sector: 'Maquinaria #08',
    fecha: '15 Jun, 07:00 AM',
    estado: 'Completado',
    estadoType: 'success',
    encargado: { nombre: 'P. López', initials: 'PL' },
  },
];

// --- Producción ---
export const produccionStats = {
  superficie: { value: '1,240', label: 'Hectáreas', trend: '+12% vs anterior' },
  porCosechar: { value: 18, label: 'Lotes' },
  estadoSalud: { value: 'Óptimo', percentage: 88 },
};

export const cultivos = [
  {
    id: 1,
    hortaliza: 'Tomate',
    emoji: '🍅',
    variedad: 'Cherry Red',
    lote: 'Lote A-12',
    superficie: '45.5 Ha',
    fechaSiembra: '12 Oct 2023',
    fechaCultivo: '15 Ene 2024',
    estado: 'Óptimo',
    estadoType: 'success',
  },
  {
    id: 2,
    hortaliza: 'Lechuga',
    emoji: '🥬',
    variedad: 'Romana Verde',
    lote: 'Lote B-04',
    superficie: '12.2 Ha',
    fechaSiembra: '28 Nov 2023',
    fechaCultivo: '20 Feb 2024',
    estado: 'Riego Crítico',
    estadoType: 'danger',
  },
  {
    id: 3,
    hortaliza: 'Zanahoria',
    emoji: '🥕',
    variedad: 'Chantenay Red',
    lote: 'Lote C-09',
    superficie: '30.0 Ha',
    fechaSiembra: '05 Oct 2023',
    fechaCultivo: '10 Feb 2024',
    estado: 'En Floración',
    estadoType: 'info',
  },
  {
    id: 4,
    hortaliza: 'Brócoli',
    emoji: '🥦',
    variedad: 'Calabrese',
    lote: 'Lote A-02',
    superficie: '22.8 Ha',
    fechaSiembra: '15 Nov 2023',
    fechaCultivo: '28 Feb 2024',
    estado: 'Mantenimiento',
    estadoType: 'warning',
  },
  {
    id: 5,
    hortaliza: 'Pimiento',
    emoji: '🫑',
    variedad: 'California Wonder',
    lote: 'Lote D-07',
    superficie: '18.3 Ha',
    fechaSiembra: '20 Sep 2023',
    fechaCultivo: '15 Dic 2023',
    estado: 'Óptimo',
    estadoType: 'success',
  },
  {
    id: 6,
    hortaliza: 'Choclo',
    emoji: '🌽',
    variedad: 'Dulce Precoz',
    lote: 'Lote E-01',
    superficie: '55.0 Ha',
    fechaSiembra: '01 Oct 2023',
    fechaCultivo: '20 Dic 2023',
    estado: 'Listo para cosechar',
    estadoType: 'warning',
  },
  {
    id: 7,
    hortaliza: 'Cebolla',
    emoji: '🧅',
    variedad: 'Morada',
    lote: 'Lote F-03',
    superficie: '15.0 Ha',
    fechaSiembra: '10 Ago 2023',
    fechaCultivo: '05 Nov 2023',
    estado: 'Cosechado',
    estadoType: 'neutral',
    rendimiento: '320 Ton',
  },
];

// --- Ventas ---
export const ventasStats = {
  totalFacturado: { value: '$1.245.800', trend: '+12.4%', trendUp: true },
  cantidadVentas: { value: 148, extra: '+8 ventas' },
  cosechaDestacada: {
    nombre: 'Cosecha de Soja',
    descripcion: 'Valor estimado de mercado actual basado en promedios de la región.',
    valor: '$4.5M ARS',
  },
};

export const ventas = [
  {
    id: 1,
    comprobante: 'FAC-00124',
    fecha: '12 Ago 2023',
    cliente: 'AgroExport S.A.',
    clienteCuit: 'CUIT 30-71245...',
    producto: 'Trigo Grado 1',
    cantidad: '25.5 Ton',
    pago: 'Transf.',
    pagoIcon: 'landmark',
    total: '$450.200',
  },
  {
    id: 2,
    comprobante: 'FAC-00125',
    fecha: '14 Ago 2023',
    cliente: 'Cooperativa Rural',
    clienteCuit: 'CUIT 33-54890...',
    producto: 'Maíz Pisingallo',
    cantidad: '12.0 Ton',
    pago: 'Cheque',
    pagoIcon: 'credit-card',
    total: '$215.000',
  },
  {
    id: 3,
    comprobante: 'FAC-00126',
    fecha: '15 Ago 2023',
    cliente: 'Semillas del Sur',
    clienteCuit: 'CUIT 30-11223...',
    producto: 'Girasol',
    cantidad: '8.5 Ton',
    pago: 'E-Check',
    pagoIcon: 'monitor',
    total: '$180.500',
  },
  {
    id: 4,
    comprobante: 'FAC-00127',
    fecha: '18 Ago 2023',
    cliente: 'Verdulería Don Pedro',
    clienteCuit: 'CUIT 20-33445...',
    producto: 'Tomate Cherry',
    cantidad: '2.0 Ton',
    pago: 'Efectivo',
    pagoIcon: 'banknote',
    total: '$95.000',
  },
  {
    id: 5,
    comprobante: 'FAC-00128',
    fecha: '20 Ago 2023',
    cliente: 'Mercado Central',
    clienteCuit: 'CUIT 30-67890...',
    producto: 'Lechuga Romana',
    cantidad: '5.0 Ton',
    pago: 'Transf.',
    pagoIcon: 'landmark',
    total: '$125.300',
  },
];

export const ventasResumen = {
  impuestosRetenidos: '$124.500',
  pendienteCobro: '$85.400',
  gananciaNeta: '$985.900',
};

// --- Agroquímicos ---
export const agroquimicosStats = {
  valorInventario: { value: '$4.250.000', trend: '+5.2% vs mes anterior' },
  insumosActivos: { value: 24, label: 'En stock actualmente' },
  proximaAplicacion: { value: '28 Oct', label: 'Lote 04 - Maíz' },
  ultimaAuditoria: { value: '15 Oct', label: 'Sin discrepancias' },
};

export const agroquimicosAlertas = {
  porVencer: {
    cantidad: 2,
    mensaje: 'Los lotes de Glifosato Pro y Urea Plus vencen en menos de 15 días.',
  },
  stockBajo: {
    cantidad: 3,
    mensaje: '3 insumos están por debajo del nivel de reposición recomendado.',
  },
};

export const agroquimicos = [
  {
    id: 1,
    producto: 'Glifosato 48% SL',
    lote: '#GL-9023',
    tipo: 'Herbicida',
    tipoColor: 'warning',
    stockActual: '250 L',
    stockMin: '500 L',
    porcentaje: 50,
    estado: 'Crítico',
    estadoType: 'danger',
    vencimiento: '12/11/2024',
  },
  {
    id: 2,
    producto: 'Urea Granulada',
    lote: '#NF-1120',
    tipo: 'Fertilizante',
    tipoColor: 'success',
    stockActual: '5.500 Kg',
    stockMin: '300 Kg',
    porcentaje: 100,
    estado: 'Óptimo',
    estadoType: 'success',
    vencimiento: '05/06/2025',
  },
  {
    id: 3,
    producto: 'Abamectina 1.8%',
    lote: '#BS-445',
    tipo: 'Insecticida',
    tipoColor: 'danger',
    stockActual: '45 L',
    stockMin: '80 L',
    porcentaje: 56,
    estado: 'Bajo',
    estadoType: 'warning',
    vencimiento: '28/10/2024',
  },
  {
    id: 4,
    producto: 'Fosfato Monoamónico',
    lote: '#FM-221',
    tipo: 'Fertilizante',
    tipoColor: 'success',
    stockActual: '2.200 Kg',
    stockMin: '500 Kg',
    porcentaje: 100,
    estado: 'Óptimo',
    estadoType: 'success',
    vencimiento: '15/09/2026',
  },
];

export const proximosVencimientos = [
  { id: 1, producto: 'Glifosato Pro Lote A', diasRestantes: 8 },
  { id: 2, producto: 'Urea Plus Lote Z', diasRestantes: 14 },
];

export const categoriasResumen = [
  { nombre: 'Herbicidas', porcentaje: 45, color: '#EE9B00' },
  { nombre: 'Fertilizantes', porcentaje: 30, color: '#2D6A4F' },
  { nombre: 'Insecticidas', porcentaje: 15, color: '#EE9B00' },
  { nombre: 'Otros', porcentaje: 10, color: '#9CA3AF' },
];

// --- Maquinarias ---
export const maquinariasStats = {
  flotaTotal: { value: 8, extra: '+2 este mes' },
  operativas: { value: 6, extra: '75% Disponibilidad' },
  enMantenimiento: { value: 2, hasAlert: true },
  servicesProximos: { value: 3, hasAlert: true },
};

export const alertasCriticas = [
  { id: 1, maquina: 'Cosechadora Case IH', problema: 'Service vencido hace 3 días' },
  { id: 2, maquina: 'Tractor Massey Ferguson', problema: 'Alerta de presión de aceite hidráulico' },
];

export const maquinarias = [
  {
    id: 1,
    nombre: 'Tractor John Deere 5075E',
    idCode: 'MAQ-2024-001',
    icono: 'tractor',
    horasKm: '1,245 Horas totales',
    estado: 'Operativa',
    estadoType: 'success',
    proximoService: '1500hs',
    serviceProgress: 83,
    serviceLabel: 'Próximo Service (1500hs)',
  },
  {
    id: 2,
    nombre: 'Cosechadora Case IH',
    idCode: 'MAQ-2024-042',
    icono: 'tractor',
    horasKm: '3,890 Horas totales',
    estado: 'En Mantenimiento',
    estadoType: 'warning',
    proximoService: 'Reparación de Trilla',
    serviceProgress: 100,
    serviceLabel: 'Reparación de Trilla',
    vencido: true,
  },
  {
    id: 3,
    nombre: 'Tractor Massey Ferguson',
    idCode: 'MAQ-2023-015',
    icono: 'tractor',
    horasKm: '980 Horas totales',
    estado: 'Operativa',
    estadoType: 'success',
    proximoService: '1000hs',
    serviceProgress: 98,
    serviceLabel: 'Próximo Service (1000hs)',
  },
  {
    id: 4,
    nombre: 'Pulverizadora Pla Map 3',
    idCode: 'MAQ-2024-019',
    icono: 'spray-can',
    horasKm: '5,120 Km totales',
    estado: 'Fuera de Servicio',
    estadoType: 'danger',
    proximoService: 'Mantenimiento Preventivo',
    serviceProgress: 0,
    serviceLabel: 'Mantenimiento Preventivo',
  },
];

export const mantenimientoSugerido = [
  { id: 1, maquina: 'Sembradora Agrometal', tarea: 'Engrase general y revisión de discos' },
  { id: 2, maquina: 'Tractor John Deere 5075E', tarea: 'Cambio de filtros de aire (50hs restantes)' },
];

// --- Personal ---
export const personalStats = {
  empleadosActivos: { value: 14, label: 'Activos' },
  asistenciaHoy: { value: '92%', label: 'Presentes hoy' },
  sueldosMes: { value: '$2.850.000', label: 'Total sueldos' },
};

export const empleados = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    initials: 'JP',
    dni: '28.456.789',
    cargo: 'Capataz General',
    fechaIngreso: '15 Mar 2019',
    telefono: '+54 9 381 555-1234',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 2,
    nombre: 'María García',
    initials: 'MG',
    dni: '32.123.456',
    cargo: 'Peón General',
    fechaIngreso: '22 Jun 2020',
    telefono: '+54 9 381 555-5678',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 3,
    nombre: 'Carlos López',
    initials: 'CL',
    dni: '25.789.012',
    cargo: 'Tractorista',
    fechaIngreso: '10 Ene 2018',
    telefono: '+54 9 381 555-9012',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 4,
    nombre: 'Ana Rodríguez',
    initials: 'AR',
    dni: '35.234.567',
    cargo: 'Técnica Agrónoma',
    fechaIngreso: '05 Sep 2021',
    telefono: '+54 9 381 555-3456',
    estado: 'Licencia',
    estadoType: 'warning',
  },
  {
    id: 5,
    nombre: 'Pedro Martínez',
    initials: 'PM',
    dni: '30.567.890',
    cargo: 'Operario de Riego',
    fechaIngreso: '18 Feb 2022',
    telefono: '+54 9 381 555-7890',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 6,
    nombre: 'Laura Fernández',
    initials: 'LF',
    dni: '33.890.123',
    cargo: 'Administrativa',
    fechaIngreso: '01 Abr 2020',
    telefono: '+54 9 381 555-2345',
    estado: 'Inactivo',
    estadoType: 'neutral',
  },
];

export const pagos = [
  {
    id: 1,
    empleado: 'Juan Pérez',
    periodo: 'Oct 2024',
    monto: '$285.000',
    fechaPago: '05 Nov 2024',
    metodo: 'Transferencia',
    comprobante: 'REC-001',
  },
  {
    id: 2,
    empleado: 'María García',
    periodo: 'Oct 2024',
    monto: '$195.000',
    fechaPago: '05 Nov 2024',
    metodo: 'Efectivo',
    comprobante: 'REC-002',
  },
  {
    id: 3,
    empleado: 'Carlos López',
    periodo: 'Oct 2024',
    monto: '$245.000',
    fechaPago: '05 Nov 2024',
    metodo: 'Transferencia',
    comprobante: 'REC-003',
  },
];

export const asistencia = {
  mes: 'Octubre 2024',
  dias: 31,
  registros: [
    { empleado: 'Juan Pérez', presente: 22, ausente: 1, tarde: 2, sinRegistro: 6 },
    { empleado: 'María García', presente: 20, ausente: 3, tarde: 1, sinRegistro: 7 },
    { empleado: 'Carlos López', presente: 23, ausente: 0, tarde: 1, sinRegistro: 7 },
    { empleado: 'Pedro Martínez', presente: 21, ausente: 2, tarde: 2, sinRegistro: 6 },
  ],
};

// --- Usuarios (Sistema) ---
export const usuarios = [
  {
    id: 1,
    nombre: 'Ricardo Mendoza',
    email: 'ricardo@agrolaz.com',
    rol: 'Administrador',
    rolColor: 'primary',
    ultimoAcceso: 'Hace 5 min',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 2,
    nombre: 'Elena Castro',
    email: 'elena@agrolaz.com',
    rol: 'Gerente',
    rolColor: 'info',
    ultimoAcceso: 'Ayer, 18:30',
    estado: 'Activo',
    estadoType: 'success',
  },
  {
    id: 3,
    nombre: 'Marcos Silva',
    email: 'marcos@agrolaz.com',
    rol: 'Operador',
    rolColor: 'warning',
    ultimoAcceso: '15 Oct 2024',
    estado: 'Inactivo',
    estadoType: 'neutral',
  },
];

// --- Combustible ---
export const combustibleStats = {
  cisterna: { value: '4.200', max: '5.000', label: 'Litros en Cisterna Principal' },
  bidones: { value: '350', max: '500', label: 'Litros en Bidones Móviles' },
  consumoMensual: { value: '1.450 L', trend: '+12% vs mes anterior', trendUp: false },
  ultimoGasto: { value: '$850.000', label: 'Última compra a YPF Agro' },
};

export const movimientosCombustible = [
  {
    id: 1,
    fecha: '12 Nov 2024 - 08:30',
    tipo: 'Consumo',
    tipoColor: 'warning',
    origen: 'Cisterna',
    destino: 'Tractor John Deere 5075E',
    litros: '- 120 L',
    operario: 'Carlos López',
    odometro: '1,250 hs',
    ticketUrl: '/placeholder-ticket.jpg',
  },
  {
    id: 2,
    fecha: '10 Nov 2024 - 15:00',
    tipo: 'Consumo',
    tipoColor: 'warning',
    origen: 'Bidón #02',
    destino: 'Pulverizadora Pla',
    litros: '- 45 L',
    operario: 'Pedro Martínez',
    odometro: '5,125 km',
    ticketUrl: null,
  },
  {
    id: 3,
    fecha: '05 Nov 2024 - 10:15',
    tipo: 'Abastecimiento',
    tipoColor: 'success',
    origen: 'Proveedor: YPF Agro',
    destino: 'Cisterna',
    litros: '+ 3.500 L',
    operario: 'Juan Pérez',
    odometro: '-',
    ticketUrl: '/placeholder-factura.jpg',
  },
  {
    id: 4,
    fecha: '02 Nov 2024 - 07:45',
    tipo: 'Consumo',
    tipoColor: 'warning',
    origen: 'Cisterna',
    destino: 'Cosechadora Case IH',
    litros: '- 250 L',
    operario: 'Carlos López',
    odometro: '3,892 hs',
    ticketUrl: '/placeholder-surtidor.jpg',
  },
];
