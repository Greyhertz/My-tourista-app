// Router.tsx
import * as Icon from '@phosphor-icons/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
// import Touristcard from './pages/Touristcard';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignUpPage from './pages/SignUpPage';
import SettingsPage from './pages/Settings';
import ExploreDestinations from './pages/ExploreDestinations';
import DestinationDetails from './pages/DestinationDetails';
import BlogPage from './pages/BlogPage';
import BlogPostDetail from './pages/BlogPostDetails';
import Test from './pages/Test';
import BillingPage from './pages/BillingsPage';
import { IntegrationsList } from './pages/Intergration';
import PricingPage from './pages/Pricing';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="test" element={<Test />} />
        <Route
          path="explore-destination"
          element={<ExploreDestinations />}
          errorElement={
            <div className="p-6 text-destructive bg-background">
              <Icon.X className="inline mr-2" />
              Could not load destinations. Please check your connection.
            </div>
          }
        />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="blog/:slug" element={<BlogPostDetail />} />
        <Route path="destination/:city" element={<DestinationDetails />} />
        <Route
          path="*"
          element={
            <div className="p-6 text-destructive bg-background">
              404 - Page Not Found
            </div>
          }
        />
      </Route>
      <Route path="intergration" element={<IntegrationsList />} />{' '}
      <Route path="pricing" element={<PricingPage />} />
      <Route path="billing" element={<BillingPage />} />
    </Route>
  )
);
