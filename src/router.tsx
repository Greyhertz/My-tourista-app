import * as Icon from '@phosphor-icons/react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import SettingsPage from './pages/Settings';
import ExploreDestinations from './pages/ExploreDestinations';
import { DestinationDetailPage } from './pages/DestinationDetailsPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetails';
import Test from './pages/Test';
import PricingPage from './pages/Pricing';
import { Welcome } from './pages/Welcome';
import NotFound from './pages/NotFound';
import Reviewpage from './pages/Reviewpage';
import { MyForm } from './pages/Form';
import PlanTripPage from './pages/PlanTripPage';
import FindDestinationPage from './pages/FindDestinationPage';
import SavedTrips from './pages/SavedTrips';
<<<<<<< HEAD
<<<<<<< Updated upstream
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
=======
import { SignUpPage } from './pages/SignUpPage';
>>>>>>> Stashed changes
import AdminDashboard from './pages/Dashboard';
=======
import { SignUpPage } from './pages/SignUpPage';
import AdminDashboard from './pages/Dashboard/Dashboard';
>>>>>>> frontend/core
import ProtectedRoute from './pages/protectedRoute';
import { UserDashboardLayout } from './layouts/DashboardLayout';
import { CheckoutPage } from './pages/Checkout';
import { CartPage } from './pages/Cart';
import { DestinationsPage } from './pages/DestinationPage';
import { SignInPage } from './pages/Login-Page';
<<<<<<< HEAD
import { BookingsPage } from './pages/BookingPage';
=======

>>>>>>> frontend/core
import AdminConfig from './pages/Admin-config';
import { ProfilePage } from './pages/ProfilePage';
import { MyReviewsPage } from './pages/Reviews';
import { MockSidebar } from './components/core/AppSidebar';
import { AdminUsersPage } from './pages/AdminUser';
import { RequireAdmin } from './components/auth/RequireAdmin';
<<<<<<< HEAD
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
=======
>>>>>>> frontend/core

// FIX: A simple placeholder for the /dashboard index so the layout doesn't re-render itself
function DashboardHome() {
  return <Navigate to="/dashboard" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'blog', element: <BlogPage /> },
      { path: '/blog/:slug', element: <BlogPostDetail /> },
      { path: 'test', element: <Test /> },
      {
        path: 'explore-destination',
        element: <ExploreDestinations />,
        errorElement: (
          <div className="p-6 text-destructive bg-background">
            <Icon.X className="inline mr-2" />
            Could not load destinations. Please check your connection.
          </div>
        ),
      },
      { path: 'destinations', element: <DestinationsPage /> },
      { path: 'destinations/:id', element: <DestinationDetailPage /> },
      { path: '/saved-trips', element: <SavedTrips /> },
      { path: '/plan-trip/:city', element: <PlanTripPage /> },
      { path: '/find-destination', element: <FindDestinationPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  // Public routes (outside MainLayout)
  { path: 'sidebar', element: <MockSidebar /> },
  { path: 'settings', element: <SettingsPage /> },
  { path: 'pricing', element: <PricingPage /> },
  { path: 'sign-up', element: <SignUpPage /> },
  { path: 'log-in', element: <SignInPage /> },
  { path: 'review/:name', element: <Reviewpage /> },
  { path: 'welcome', element: <Welcome /> },
  { path: 'my-form', element: <MyForm /> },
  { path: 'admin-config', element: <AdminConfig /> },

  // Legacy standalone admin route
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  // Dashboard (protected)
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="user">
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // FIX: index was incorrectly rendering <UserDashboardLayout /> again (the layout, not a page).
      // Now it renders nothing extra — the layout's <Outlet /> handles showing the right content.
      { index: true, element: null },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'reviews', element: <MyReviewsPage /> },
<<<<<<< HEAD
      { path: '', element: <MyReviewsPage /> },
      // FIX: Re-enabled RequireAdmin wrapper — was commented out, leaving this route unprotected
       {path:"admin", 
        element:(
          <RequireAdmin>
            <AdminOverviewPage />
          </RequireAdmin>
      )
      },  
      {
        path: 'admin/users',
=======
      // FIX: Re-enabled RequireAdmin wrapper — was commented out, leaving this route unprotected
      {
        path: 'admin',
>>>>>>> frontend/core
        element: (
          <RequireAdmin>
            <AdminUsersPage />
          </RequireAdmin>
        ),
      },
<<<<<<< HEAD
       {
        path: 'admin/audit-logs',
        element: (
          <RequireAdmin>
            <AdminAuditLogsPage />
          </RequireAdmin>
        ),
      },
    ],
  },
<<<<<<< Updated upstream
=======

  { path: '/form', element: <UseQueryForm /> },
>>>>>>> Stashed changes
=======
    ],
  },

  { path: '/form', element: <UseQueryForm /> },
>>>>>>> frontend/core
]);