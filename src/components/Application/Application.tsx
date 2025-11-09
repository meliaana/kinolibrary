// Application.tsx
import { useEffect } from 'react';
import { redirect, RouterProvider } from 'react-router-dom';
import { orderDetailsActor } from '../../machines/orders.machine';
import { router } from '../../routes';
import { ToastShelf } from '../ToastShelf';

export default function Application() {
  useEffect(() => {
    const fetchOrders = async () => {
      const territoriesResponse = await fetch('/api/Metadata/territories');

      if (territoriesResponse.status === 401) throw redirect('/login');

      const territoriesData = await territoriesResponse.json();
      orderDetailsActor.send({
        type: 'order.territories.update',
        data: { territories: territoriesData },
      });

      const platformsResponse = await fetch('/api/Metadata/platforms');
      if (platformsResponse.status === 401) throw redirect('/login');

      const platformsData = await platformsResponse.json();
      orderDetailsActor.send({
        type: 'order.platforms.update',
        data: { platforms: platformsData },
      });
    };
    fetchOrders();
  }, []);

  return (
    <>
      <RouterProvider router={router} fallbackElement={null} />
      <ToastShelf />
    </>
  );
}
