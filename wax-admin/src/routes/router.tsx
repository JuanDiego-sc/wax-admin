import { createBrowserRouter, Navigate } from 'react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { LoginPage } from '@/pages/LoginPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { RequiredAdminAuth } from '@/routes/RequiredAdminAuth';
import { routePaths } from '@/routes/routePaths';

export const router = createBrowserRouter([
  {
    path: routePaths.login,
    Component: LoginPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: routePaths.forbidden,
    Component: ForbiddenPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    Component: RequiredAdminAuth,
    children: [
      {
        path: routePaths.overview,
        Component: AdminLayout,
        ErrorBoundary: RouteErrorPage,
        children: [
          {
            index: true,
            element: <Navigate to={routePaths.orders} replace />,
          },
          {
        path: routePaths.catalog,
            Component: DashboardPage,
          },
          {
            path: routePaths.orders,
            Component: DashboardPage,
          },
          {
            path: routePaths.clients,
            Component: DashboardPage,
          },
          {
            path: routePaths.content,
            Component: DashboardPage,
          },
          {
            path: routePaths.notFound,
            Component: DashboardPage,
          },
        ],
      },
    ],
  },
]);