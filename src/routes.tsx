// routes.tsx
import { createBrowserRouter, redirect } from 'react-router-dom';
import { AccountContent } from './components/AccountContent';
import { Layout } from './components/Layout';
import { OrderDetails } from './components/OrderDetails';
import { OrdersContent } from './components/OrdersContent';

export const router = createBrowserRouter([
  {
    path: '/client',
    element: <Layout />, // renders Header + Main (nav + <Outlet/>)
    children: [
      { index: true, loader: () => redirect('/client/orders') },
      { path: 'orders', element: <OrdersContent /> },
      { path: 'account', element: <AccountContent /> },
      { path: 'orders/:id/details', element: <OrderDetails /> },
    ],
  },
]);
