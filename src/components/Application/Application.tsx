// Application.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes';
import { DataLoader } from '../DataLoader';
import { ToastShelf } from '../ToastShelf';

export default function Application() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={null} />
      <ToastShelf />
      <DataLoader />
    </>
  );
}
