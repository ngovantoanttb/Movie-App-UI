import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MovieDetail from './pages/MovieDetail.jsx';
import RootLayout from './pages/RootLayout.jsx';
import TVShowDetail from '@pages/TVShowDetail';

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
