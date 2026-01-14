import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <IndexPage /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
