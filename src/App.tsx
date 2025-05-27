import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import MainLayout from "./layouts/MainLayout";
import Touristcard from "./components/Touristcard";
import SignUpPage from "./pages/SignUpPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
     
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="explore-destination" element={<Touristcard entry={{
          img: {
            src: "",
            alt: ""
          },
          country: "",
          googleMapsLink: "",
          title: "",
          dates: "",
          text: ""
        }} />} />
        
      </Route>
        <Route path="about-us" element={<AboutUs />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route index element={<Homepage />} />
       <Route path="*" element={<div className="p-6 text-red-500">404 - Page Not Found</div>} />

    </Routes>
  );
}

export default App;
