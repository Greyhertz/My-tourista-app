// router.tsximport * as Icon from '@phosphor-icons/react';
import * as Icon from '@phosphor-icons/react';



import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import Touristcard from "./pages/Touristcard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignUpPage from "./pages/SignUpPage";
// import Profile from "./pages/Profile";
// import { contactLoader } from "./loaders/Loader";
import ExploreDestinations from "./pages/ExploreDestinations";
import DestinationDetails from "./pages/DestinationDetails";
import BlogPage from "./pages/BlogPage";
import BlogPostDetail from "./pages/BlogPostDetails";     
// import { exploreLoader } from "./loaders/exploreLoader";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />

        <Route path="about-us" element={<AboutUs />} />
        <Route
          path=""
          element={
            <Touristcard
              entry={{
                img: {
                  src: '',
                  alt: '',
                },
                country: '',
                googleMapsLink: '',
                title: '',
                dates: '',
                text: '',
              }}
            />
          }
        />
        <Route path="blog" element={<BlogPage />} />
      </Route>
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="sign-up" element={<SignUpPage />} />

      <Route
        path="explore-destination"
        element={<ExploreDestinations />}
        // loader={exploreLoader}
        errorElement={
          <div className="p-6 text-red-600">
            {' '}
            <Icon.X />
            Could not load destinations. Please check your connection.
          </div>
        }
      />
      <Route path="/blog/:slug" element={<BlogPostDetail />} />
      {/* Nested Routes for Explore Destinations */}
      <Route path="/destination/:city" element={<DestinationDetails />} />

      <Route
        path="*"
        element={<div className="p-6 text-red-500">404 - Page Not Found</div>}
      />
    </>
  )
);

