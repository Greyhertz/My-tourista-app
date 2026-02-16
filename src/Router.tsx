// Router.tsx
import * as Icon from '@phosphor-icons/react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/Settings';
import ExploreDestinations from './pages/ExploreDestinations';
import DestinationDetails from './pages/DestinationDetails';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetails';
import Test from './pages/Test';
// import BillingPage from './pages/BillingsPage';
// import { IntegrationsList } from './pages/Intergration';
import PricingPage from './pages/Pricing';
import { Welcome } from './pages/Welcome';
// import Cart  from './pages/Cart';
import NotFound from './pages/NotFound';
import Reviewpage from './pages/Reviewpage';
import { MyForm } from './pages/form';

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
      { path: 'settings', element: <SettingsPage /> },
      { path: 'destination/:city', element: <DestinationDetails /> },
      // { path: 'integration', element: <IntegrationsList /> },
      // { path: 'billing', element: <BillingPage /> },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  { path: 'pricing', element: <PricingPage /> },
  // { path: '/cart', element: <Cart /> },
  { path: 'sign-up', element: <SignUpPage /> },
  { path: 'review/:name', element: <Reviewpage/> },
  { path: 'welcome', element: <Welcome /> },
  {path: 'my-form', element: <MyForm/>}
]);
