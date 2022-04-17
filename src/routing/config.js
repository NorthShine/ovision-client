import { Home } from '../pages/Home';
import { MainLayout } from '../layouts/MainLayout';
import { Room } from '../pages/Room';
import { FaceId } from '../pages/FaceId';
import { Outlet } from 'react-router';
// import { PrivateElement } from './PrivateElement';

export const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <FaceId />
      },
      {
        path: '/',
        element: <MainLayout />,
        // Example usage of private elements
        // element: <PrivateElement element={<AppLayout />} />,
        children: [
          { path: '/chat', element: <Home /> },
          { path: '/rooms/:roomId', element: <Room /> }
        ]
      }
    ]
  }
];
