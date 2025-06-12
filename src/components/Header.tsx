import * as Icon from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
// import useTheme from "../hooks/ThemeContext";
import { Link } from "react-router-dom";

interface HeaderProps {
  stuff: {
    toggleDrawer: () => void;
  };
}

// Array of tourist destination background images
// const backgroundImages = [
//   // Machu Picchu, Peru
//   {
//     src: "https://www.worldtravelguide.net/wp-content/uploads/2019/04/shu-Peru-Machu-Picchu-389136313-1440x823.jpg",
//     name: "Machu Picchu , Peru",
//   },

//   // Mount Fuji, Japan
//   {
//     src: "https://wallpapercat.com/w/full/8/8/6/1518154-2880x1800-desktop-hd-mount-fuji-japan-background-photo.jpg",
//     name: "Mount Fuji, Japan",
//   },

//   // Statue of Liberty, New York
//   {
//     src: "https://images.unsplash.com/photo-1565475783696-96001eff1b45?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",
//     name: "Statue of Librty, New York",
//   },

//   // Eiffel Tower, Paris
//   {
//     src: "https://cdn.britannica.com/31/255531-050-B7E07090/eiffel-tower-paris-france-champ-de-mars-view.jpg",
//     name: "Eiffel tower, Paris",
//   },

//   // Rainbow Mountain, Peru
//   {
//     src: "https://images.unsplash.com/photo-1584772121849-56c717d6c542?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",
//     name: "Rainbow Mountain, Peru",
//   },

//   // Statue of Liberty, NYC
//   {
//     src: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Statue of Librty, New Yor",
//   },

//   // Rainbow Mountain, Peru (different angle)
//   {
//     img: "https://images.unsplash.com/photo-1545330785-15356daae141?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmJvdyUyMG1vdW50YWluJTIwcGVydXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
//     name: "RainBow Mountain , Peru",
//   },

//   // Big Ben and Parliament, London
//   {
//     img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Big Ben and pArliament, London",
//   },

//   // Icelandic Landscape (Reynisfjara Beach)
//   {
//     img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
//     name: "Icelandic Landscape (Renynisfjara Beach)",
//   },
//   // Colosseum, Rome, Italy
//   {
//     img: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Colosseum, Rome, Italy",
//   },

//   // Santorini, Greece
//   {
//     img: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Santorini Greece",
//   },

//   // Taj Mahal, Agra, India
//   {
//     img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Tag Mahal, Agra, India",
//   },

//   // Machu Picchu, Peru (second image)
//   {
//     img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Machu Piccu, Peru",
//   },

//   // Sydney Opera House, Australia
//   {
//     img: "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     name: "Sydney House, Australia",
//   },

//   // Mount Fuji, Japan (second image, winter season)
//   {
//     img: "https://images.unsplash.com/photo-1610375229632-c7158c35a537?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",
//     name: "Mount Fuji, Japan",
//   },

//   // Santorini, Greece (premium photo)
//   {
//     img: "https://www.visitgreece.gr/images/1743x752/jpg/files/merakos_05_santorini-oia_1743x752.jpg",
//     name: "Santorini, Greece",
//   },

//   // Sydney Opera House, Australia (night shot)
//   {
//     img: "https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwb3BlcmElMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
//     name: "Sydney Opera House, Australia (night shot)",
//   },

//   {
//     img: "https://mybestplace.com/uploads/2023/01/Geirangerfjord-Norvegia-2.jpg",
//     name: "Geirangerfjord, Norway",
//   },
// ];
const backgroundImages = [
  // Machu Picchu, Peru
  "https://www.worldtravelguide.net/wp-content/uploads/2019/04/shu-Peru-Machu-Picchu-389136313-1440x823.jpg",

  // Mount Fuji, Japan
  "https://wallpapercat.com/w/full/8/8/6/1518154-2880x1800-desktop-hd-mount-fuji-japan-background-photo.jpg",

  // Statue of Liberty, New York
  "https://images.unsplash.com/photo-1565475783696-96001eff1b45?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",

  // Eiffel Tower, Paris
  "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Rainbow Mountain, Peru
  "https://images.unsplash.com/photo-1584772121849-56c717d6c542?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000",

  // Statue of Liberty, NYC
  "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Rainbow Mountain, Peru (different angle)
  "https://images.unsplash.com/photo-1545330785-15356daae141?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmJvdyUyMG1vdW50YWluJTIwcGVydXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",

  // Big Ben and Parliament, London
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Icelandic Landscape (Reynisfjara Beach)
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

  // Colosseum, Rome, Italy
  "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Santorini, Greece
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Taj Mahal, Agra, India
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Machu Picchu, Peru (second image)
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Sydney Opera House, Australia
  "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",

  // Mount Fuji, Japan (second image, winter season)
  "https://images.unsplash.com/photo-1610375229632-c7158c35a537?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000",

  // Santorini, Greece (premium photo)
  "https://www.visitgreece.gr/images/1743x752/jpg/files/merakos_05_santorini-oia_1743x752.jpg",

  // Sydney Opera House, Australia (night shot)
  "https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwb3BlcmElMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",

  // Gerangerfjord, Norway
  "https://mybestplace.com/uploads/2023/01/Geirangerfjord-Norvegia-2.jpg",
];



export default function Header(props: HeaderProps) {
  // const { theme, changeTheme } = useTheme();
  const [currentBgIndex, setCurrentBgIndex] = React.useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsMenuOpen(true); // Force mobile menu to show
      } else {
        setIsMenuOpen(false); // Hide on larger screens
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // const ToggleIcon = () => {
  //   if(theme === "dark"){
  //     return <Icon.Sun size={20} color="#ffffff" weight="fill"/>
  //   } else {
  //     return <Icon.Moon size={20} color="blue" weight="fill" />
  //   }
  // }

    return (
    <header className="relative min-h-[70vh] overflow-hidden p-0 m-0">
      {/* Background Images with Smooth Transitions */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out max-h-[100vh] ${
            index === currentBgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      ))}

      {/* Dark Overlay for Better Text Readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40" /> */}

      {/* Header Bar */}
      <div className="fixed z-20  top-0 left-0 w-full backdrop-blur-md bg-blue-400 bg-opacity-30 shadow-lg transition-all duration-300 py-4">
        <div className="flex items-center justify-between px-6 py-1 max-w-7xl mx-auto">
          {/* Mobile Menu Button - Just visible, doesn't control menu */}
          <button
            onClick={props.stuff?.toggleDrawer}
            className=" p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
            aria-label="Toggle drawer"
          >
            <Icon.List size={24} weight="regular" className="text-white" />
          </button>

          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src="https://i.pravatar.cc/100"
                alt="Prince Onuoha"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <h1 className="text-white text-xl font-semibold font-serif drop-shadow-lg">
              Prince Onuoha
            </h1>
            {/* <div className="flex justify-end p-4">
              <button
                onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
                className="  dark:border-white border-blue-700 border-2 rounded-full p-2"
              >
              {/* <ToggleIcon /> */}
              {/* </button> */}
            {/* </div> */}
          </div>

          {/* Desktop Nav - Hidden on screens < 640px */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              to="/"
              className="text-white hover:text-blue-300 flex items-center gap-2 transition-colors duration-200 font-medium"
            >
              Home
              <Icon.House size={18} />
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:text-blue-300 flex items-center gap-2 transition-colors duration-200 font-medium"
            >
              About Us
              <Icon.User size={18} />
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-blue-300 flex items-center gap-2 transition-colors duration-200 font-medium"
            >
              Contact Us
              <Icon.Phone size={18} />
            </Link>
            <Link to="/sign-up">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg ml-4 font-semibold font-sans transition-colors duration-200 shadow-lg hover:shadow-xl">
                Sign in
              </button>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Fullscreen Menu - Shows automatically on mobile (≤640px) */}
      <div
        className={`sm:hidden fixed inset-0 z-30 bg-black bg-opacity-95 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <button
              onClick={props.stuff?.toggleDrawer}
              className=" p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Toggle drawer"
            >
              <Icon.List size={24} weight="regular" className="text-white" />
            </button>

            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                alt="Prince Onuoha"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <h2 className="text-white text-lg font-semibold">
                Prince Onuoha
              </h2>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <Icon.X size={24} weight="regular" className="text-white" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6">
            <Link
              to="/"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.House size={28} />
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.User size={28} />
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.Phone size={28} />
              Contact Us
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.Briefcase size={28} />
              Services
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.Article size={28} />
              Blog
            </Link>
            <Link
              to="/careers"
              className="text-white hover:text-blue-400 text-2xl font-medium transition-all duration-300 hover:scale-110 flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <Icon.Suitcase size={28} />
              Careers
            </Link>

            {/* Mobile Sign In Button */}
            <Link to="/sign-up" className="mt-8" onClick={closeMobileMenu}>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Content (Optional - you can add content here) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-6">
          {/* Add hero content here if needed */}
        </div>
      </div>
    </header>
  );
}
