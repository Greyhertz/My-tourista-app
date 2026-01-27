// // Router.tsx
// import * as Icon from '@phosphor-icons/react';
// import { createBrowserRouter } from 'react-router-dom';

// import MainLayout from './layouts/MainLayout';
// import Homepage from './pages/Homepage';
// import AboutUs from './pages/AboutUs';
// import ContactUs from './pages/ContactUs';
// // import SignUpPage from './pages/SignUpPage';
// import SettingsPage from './pages/Settings';
// import ExploreDestinations from './pages/ExploreDestinations';
// import DestinationDetails from './pages/DestinationDetails';
// import BlogPage from './pages/BlogPage';
// import BlogPostDetail from './pages/BlogPostDetails';
// import Test from './pages/Test';
// // import BillingPage from './pages/BillingsPage';
// // import { IntegrationsList } from './pages/Intergration';
// import PricingPage from './pages/Pricing';
// import { Welcome } from './pages/Welcome';
// // import Cart  from './pages/Cart';
// import NotFound from './pages/NotFound';
// import Reviewpage from './pages/Reviewpage';
// import { MyForm } from './pages/Form';
// import PlanTripPage from './pages/PlanTripPage';
// import FindDestinationPage from './pages/FindDestinationPage';
// import { el } from 'date-fns/locale';
// import SavedTrips from './pages/SavedTrips';
// import LoginPage from './pages/LoginPage';
// import AdminDashboard from './pages/AdminDashboard';
// import SignUpPage from './pages/SignUpPage';
// import Dashboard from './pages/Dashboard';
// import UserDashboard from './pages/UserDasboard';
// import ProtectedRoute from './pages/protectedRoute';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Homepage /> },
//       { path: 'about-us', element: <AboutUs /> },
//       { path: 'blog', element: <BlogPage /> },
//       { path: '/blog/:slug', element: <BlogPostDetail /> },
//       { path: 'contact-us', element: <ContactUs /> },
//       { path: 'test', element: <Test /> },
//       {
//         path: 'explore-destination',
//         element: <ExploreDestinations />,
//         errorElement: (
//           <div className="p-6 text-destructive bg-background">
//             <Icon.X className="inline mr-2" />
//             Could not load destinations. Please check your connection.
//           </div>
//         ),
//       },
//       { path: 'destination/:city', element: <DestinationDetails /> },
//       // { path="/destination/:city" element={< DestinationDetails />}
//       { path: '/saved-trips', element: <SavedTrips /> },
//       { path: '/plan-trip/:city', element: <PlanTripPage /> },
//       { path: '/find-destination', element: <FindDestinationPage /> },
//       // { path: 'integration', element: <IntegrationsList /> },
//       // { path: 'billing', element: <BillingPage /> },

//       {
//         path: '*',
//         element: <NotFound />,
//       },
//     ],
//   },
//   { path: 'settings', element: <SettingsPage /> },

//   { path: 'pricing', element: <PricingPage /> },
//   // { path: '/cart', element: <Cart /> },
//   { path: 'sign-up', element: <SignUpPage /> },
//   { path: 'log-in', element: <LoginPage /> },
//   { path: '/admin', element: <AdminDashboard /> },
//   {
//     path: '/dashboard',
//     element: (
//       <ProtectedRoute requiredRole="admin">
//         {' '}
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/user-dashboard',
//     element: (
//       <ProtectedRoute requiredRole="user">
//         {' '}
//         <UserDashboard />{' '}
//       </ProtectedRoute>
//     ),
//   },
//   { path: 'review/:name', element: <Reviewpage /> },
//   { path: 'welcome', element: <Welcome /> },
//   { path: 'my-form', element: <MyForm /> },
// ]);


// Router.tsx - FIXED VERSION
import * as Icon from '@phosphor-icons/react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SettingsPage from './pages/Settings';
import ExploreDestinations from './pages/ExploreDestinations';
import DestinationDetails from './pages/DestinationDetails';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetails';
import Test from './pages/Test';
import PricingPage from './pages/Pricing';
import { Welcome } from './pages/Welcome';
import NotFound from './pages/NotFound';
import Reviewpage from './pages/Reviewpage';
import { MyForm, UseQueryForm } from './pages/Form';
import PlanTripPage from './pages/PlanTripPage';
import FindDestinationPage from './pages/FindDestinationPage';
import SavedTrips from './pages/SavedTrips';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/Signup-Page'; 
import AdminDashboard from './pages/Dashboard';
// import UserDashboard from './pages/UserDashboard'; // Fixed typo
import ProtectedRoute from './pages/protectedRoute';
import UserDashboard from './pages/UserDasboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'blog', element: <BlogPage /> },
      { path: '/blog/:slug', element: <BlogPostDetail /> },
      { path: 'contact-us', element: <ContactUs /> },
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
      { path: 'destination/:city', element: <DestinationDetails /> },
      { path: '/saved-trips', element: <SavedTrips /> },
      { path: '/plan-trip/:city', element: <PlanTripPage /> },
      { path: '/find-destination', element: <FindDestinationPage /> },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  
  // Public routes (outside MainLayout)
  { path: 'settings', element: <SettingsPage /> },
  { path: 'pricing', element: <PricingPage /> },
  { path: 'sign-up', element: <SignUpPage /> },
  { path: 'log-in', element: <LoginPage /> },
  { path: 'review/:name', element: <Reviewpage /> },
  { path: 'welcome', element: <Welcome /> },
  { path: 'my-form', element: <MyForm /> },

  // Protected routes - FIXED
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="user">
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {path: '/form', element: <UseQueryForm />},
]);