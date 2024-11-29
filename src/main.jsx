/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout.jsx';
import ModalProvider from '@context/ModalProvider';
import { DEFAULT_HEADERS } from '@hooks/useFetch';
import SearchPage from '@pages/SearchPage';

const MovieDetail = lazy(() => import('@pages/MovieDetail'));
const TVShowDetail = lazy(() => import('@pages/TVShowDetail'));
const HomePage = lazy(() => import('@pages/HomePage'));
const PeoplePage = lazy(() => import('@pages/PeoplePage'));

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
            {
              headers: {
                ...DEFAULT_HEADERS,
              },
            },
          );
          return res;
        },
      },
      {
        path: '/search',
        element: <SearchPage />
      }
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
