export const adminBrand = {
  name: 'WAX Admin',
  label: 'Panel operativo',
  description:
    'Panel interno para gestion administrativa con acceso restringido a usuarios con rol de administrador.',
} as const;

export const adminNavigation = [
  { label: 'Pedidos', path: '/orders', meta: '01' },
] as const;