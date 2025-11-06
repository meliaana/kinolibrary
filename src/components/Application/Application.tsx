// Application.tsx
import { RouterProvider } from 'react-router-dom';
import { useSingleEffect } from '../../hooks/useSingleEffect';
import { orderDetailsActor } from '../../machines/orders.machine';
import { router } from '../../routes';

export default function Application() {
  useSingleEffect(() => {
    const fetchOrders = async () => {
      const territoriesResponse = await fetch('/api/Metadata/territories');
      const territoriesData = await territoriesResponse.json();
      orderDetailsActor.send({
        type: 'order.territories.update',
        data: { territories: territoriesData },
      });

      const platformsResponse = await fetch('/api/Metadata/platforms');
      const platformsData = await platformsResponse.json();
      orderDetailsActor.send({
        type: 'order.platforms.update',
        data: { platforms: platformsData },
      });
    };
    fetchOrders();
  }, []);

  return <RouterProvider router={router} fallbackElement={null} />;
}
