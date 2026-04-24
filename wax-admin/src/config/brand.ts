export const adminBrand = {
  name: 'WAX Admin',
  label: 'Panel operativo',
  description:
    'Panel interno para gestion administrativa con acceso restringido a usuarios con rol de administrador.',
} as const;

export const adminNavigation = [
  { label: 'Catalogo', path: '/catalog', meta: '01' },
  { label: 'Pedidos', path: '/orders', meta: '02' },
] as const;