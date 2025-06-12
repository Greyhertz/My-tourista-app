// router.tsx

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
import Profile from "./pages/Profile";
import { contactLoader } from "./loaders/Loader";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />

        <Route path="about-us" element={<AboutUs />} />
        <Route
          path="explore-destination"
          element={
            <Touristcard
              entry={{
                img: {
                  src: "",
                  alt: "",
                },
                country: "",
                googleMapsLink: "",
                title: "",
                dates: "",
                text: "",
              }}
            />
          }
        />
      </Route>

      <Route path="contact-us" element={<ContactUs />} loader={contactLoader} />
      <Route path="sign-up" element={<SignUpPage />} />
      {/* <Route path="profile" element={<Profile username={<Username />}/>} /> */}
      <Route path="profile" element={<Profile />} />

      <Route
        path="*"
        element={<div className="p-6 text-red-500">404 - Page Not Found</div>}
      />
    </>
  )
);
