export const adminBrand = {
  name: 'WAX Admin',
  label: 'Panel operativo',
  description:
    'Base visual y estructural para catalogo, pedidos, clientes y contenido. La logica y los endpoints quedan pendientes para la siguiente fase.',
} as const;

export const adminNavigation = [
  { label: 'Resumen', path: '/', meta: '01' },
  { label: 'Catalogo', path: '/catalog', meta: '02' },
  { label: 'Pedidos', path: '/orders', meta: '03' },
  { label: 'Clientes', path: '/clients', meta: '04' },
  { label: 'Contenido', path: '/content', meta: '05' },
] as const;