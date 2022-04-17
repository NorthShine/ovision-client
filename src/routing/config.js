import { Home } from '../pages/Home';
import { MainLayout } from '../layouts/MainLayout';
import { Room } from '../pages/Room';
// import { PrivateElement } from './PrivateElement';
// import { Outlet } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
        // Example usage of private elements
        // element: <PrivateElement element={<AppLayout />} />,
        // children: [
        //   { path: '/', element: <Home /> },
        // ]
      },
      {
        path: '/rooms/:roomId',
        element: <Room />
      }
    ]
  }
];
