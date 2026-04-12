import { createBrowserRouter } from 'react-router';
import { AdminLayout } from '@/layouts/AdminLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { RouteErrorPage } from '@/pages/RouteErrorPage';
import { routePaths } from '@/routes/routePaths';

export const router = createBrowserRouter([
  {
    path: routePaths.overview,
    Component: AdminLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: routePaths.catalog,
        element: <PlaceholderPage section="Catalog" />,
      },
      {
        path: routePaths.orders,
        element: <PlaceholderPage section="Orders" />,
      },
      {
        path: routePaths.clients,
        element: <PlaceholderPage section="Clients" />,
      },
      {
        path: routePaths.content,
        element: <PlaceholderPage section="Content" />,
      },
      {
        path: routePaths.notFound,
        element: <PlaceholderPage section="Page not found" />,
      },
    ],
  },
]);