import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/shared/components';
import { LandingPage } from '@/pages/LandingPage';
import { HomePage } from '@/pages/HomePage';
import { MovieDetailPage } from '@/pages/MovieDetailPage';
import { SearchPage } from '@/pages/SearchPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { MoviesPage } from '@/pages/MoviesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '/movies/:category',
        element: <MoviesPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/profile',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
  {
    path: '/login',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/register',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);