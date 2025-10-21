import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import PrivateToursPage from './pages/PrivateToursPage.jsx'
import TourDetailPage from './pages/TourDetailPage.jsx'
import GastronomyPage from './pages/GastronomyPage.jsx'
import RestaurantDetailPage from './pages/RestaurantDetailPage.jsx'
import BlogListPage from './pages/BlogListPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/bebas-neue'
import '@fontsource/kumbh-sans' // base (regular)
import '@fontsource/kumbh-sans/700.css' // bold
import './i18n/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/gallery',
    element: <GalleryPage />,
  },
  {
    path: '/tours',
    element: <PrivateToursPage />,
  },
  {
    path: '/tours/:id',
    element: <TourDetailPage />,
  },
  {
    path: '/gastronomy',
    element: <GastronomyPage />,
  },
  {
    path: '/gastronomy/:id',
    element: <RestaurantDetailPage />,
  },
  {
    path: '/blog',
    element: <BlogListPage />,
  },
  {
    path: '/blog/:id',
    element: <BlogPostPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
