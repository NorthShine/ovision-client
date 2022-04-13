import { Home } from '../pages/Home';
import { MainLayout } from '../layouts/MainLayout';
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
      }
    ]
  }
];
