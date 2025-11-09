// routes.tsx
import { createBrowserRouter, redirect } from 'react-router-dom';
import { AccountContent } from './components/AccountContent';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { OrderDetails } from './components/OrderDetails';
import { OrdersContent } from './components/OrdersContent';
import { OrdersLayout } from './components/OrdersLayout';

async function accountLoader() {
  const res = await fetch('/api/Account');
  if (res.status === 401) throw redirect('/login');
  if (!res.ok) throw new Error('Failed to load account');
  const data = await res.json();
  // console.log('data', data);
  return {
    user: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  };
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    handle: {
      crumb: () => 'Login',
    },
  },
  {
    id: 'client-root',
    path: '/client',
    element: <Layout />,
    loader: accountLoader,
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
