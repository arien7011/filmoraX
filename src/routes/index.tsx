import { MainLayout } from '@/shared/components';
import { LazyPage } from '@/shared/components/common';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Lazy load pages
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const MovieDetailPage = lazy(() => import('@/pages/MovieDetailPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const MoviesPage = lazy(() => import('@/pages/MoviesPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyPage><LandingPage /></LazyPage>,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <LazyPage><HomePage /></LazyPage>,
      },
      {
        path: '/movie/:id',
        element: <LazyPage><MovieDetailPage /></LazyPage>,
      },
      {
        path: '/movies/:category',
        element: <LazyPage><MoviesPage /></LazyPage>,
      },
      {
        path: '/search',
        element: <LazyPage><SearchPage /></LazyPage>,
      },
      {
        path: '/favorites',
        element: <LazyPage><FavoritesPage /></LazyPage>,
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
    element: <LazyPage><NotFoundPage /></LazyPage>,
  },
]);