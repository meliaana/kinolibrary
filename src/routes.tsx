// routes.tsx
import { createBrowserRouter, redirect } from 'react-router-dom';
import { AccountContent } from './components/AccountContent';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { OrderDetails } from './components/OrderDetails';
import { OrdersContent } from './components/OrdersContent';
import { OrdersLayout } from './components/OrdersLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    handle: {
      crumb: () => 'Login',
    },
  },
  {
    path: '/client',
    element: <Layout />,
    handle: {
      crumb: () => 'Home',
    },
    children: [
      { index: true, loader: () => redirect('/client/orders') },
      {
        path: 'orders',
        element: <OrdersLayout />,
        handle: { crumb: () => 'Orders' },
        children: [
          { index: true, element: <OrdersContent /> },
          {
            path: ':id/details',
            element: <OrderDetails />,
            handle: { crumb: () => 'Details' },
          },
        ],
      },

      {
        path: 'account',
        element: <AccountContent />,
        handle: {
          crumb: () => 'Account',
        },
      },
    ],
  },
]);
