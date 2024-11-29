import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import RootLayout from './pages/RootLayout.jsx';
import TVShowDetail from '@pages/TVShowDetail';
import ModalProvider from '@context/ModalProvider';
import PeoplePage from '@pages/PeoplePage';
import { DEFAULT_HEADERS } from '@hooks/useFetch';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetail />,
      },
      {
        path: '/tv/:id',
        element: <TVShowDetail />,
      },
      {
        path: '/people/:id',
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `${import.meta.env.VITE_API_HOST}/person/${params.id}?append_to_response=combined_credits`,
            {...DEFAULT_HEADERS}
          );

          return res;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
);
