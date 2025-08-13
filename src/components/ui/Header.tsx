import * as Icon from '@phosphor-icons/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import useTheme from "../hooks/ThemeContext";
import { Link } from 'react-router-dom';

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
  'https://www.worldtravelguide.net/wp-content/uploads/2019/04/shu-Peru-Machu-Picchu-389136313-1440x823.jpg',

  // Mount Fuji, Japan
  'https://wallpapercat.com/w/full/8/8/6/1518154-2880x1800-desktop-hd-mount-fuji-japan-background-photo.jpg',

  // Statue of Liberty, New York
  'https://images.unsplash.com/photo-1565475783696-96001eff1b45?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000',

  // Eiffel Tower, Paris
  'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Rainbow Mountain, Peru
  'https://images.unsplash.com/photo-1584772121849-56c717d6c542?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8&ixlib=rb-4.0.3&q=60&w=3000',

  // Statue of Liberty, NYC
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Rainbow Mountain, Peru (different angle)
  'https://images.unsplash.com/photo-1545330785-15356daae141?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmJvdyUyMG1vdW50YWluJTIwcGVydXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',

  // Big Ben and Parliament, London
  // "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Big Ben, London

  // Icelandic Landscape (Reynisfjara Beach)
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',

  // Colosseum, Rome, Italy
  'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Santorini, Greece
  'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Taj Mahal, Agra, India
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Machu Picchu, Peru (second image)
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Sydney Opera House, Australia
  'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',

  // Mount Fuji, Japan (second image, winter season)
  'https://images.unsplash.com/photo-1610375229632-c7158c35a537?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnQlMjBmdWppfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000',

  // Santorini, Greece (premium photo)
  'https://www.visitgreece.gr/images/1743x752/jpg/files/merakos_05_santorini-oia_1743x752.jpg',

  // Sydney Opera House, Australia (night shot)
  'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwb3BlcmElMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',

  // Gerangerfjord, Norway
  'https://mybestplace.com/uploads/2023/01/Geirangerfjord-Norvegia-2.jpg',
];

export default function Header(props: HeaderProps) {
  // const { theme, changeTheme } = useTheme();
  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentCitySet(prev => (prev + 1) % citySets.length);
  //   }, 8000);
  //   return () => clearInterval(timer);
  // }, []);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsMenuOpen(true); // Force mobile menu to show
      } else {
        setIsMenuOpen(false); // Hide on larger screens
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <h1 className="text-red-400 flex text-center ">Name</h1>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-row items-center  text-white text-center px-6 justify-between z-20">
            {' '}
            <button
              onClick={() =>
                setCurrentBgIndex(
                  prev => (prev - 1 + backgroundImages.length) % backgroundImages.length
                )
              }
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() =>
                setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length)
              }
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
             <ChevronRight />
            </button>
          </div>
        </div>
      ))}

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      <h1></h1>

      {/* Header Bar */}
      <div className="fixed z-20  top-0 left-0 w-full backdrop-blur-md bg-black bg-opacity-30 shadow-lg transition-all duration-300 py-2 border-b-slate-400 b border-b-2">
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
          <div className="flex items-center justify-between px-6 py-0 max-w-7xl mx-auto">
            

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
          <nav className="hidden md:flex items-center gap-6">
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
            <Link
              to="blog"
              className="text-white hover:text-blue-300 flex items-center gap-2 transition-colors duration-200 font-medium"
            >
              Blog
              <Icon.Article size={18} />
            </Link>
            <div className="gap-0  border-blue-500 border-opacity-20 rounded-lg py-1 transition-opacity p-1 pl-4">
              <Link to="/sign-in">
                <button className="bg text-white px-6 py-3 rounded-l-lg  font-semibold font-sans transition-colors duration-200 shadow-lg hover:shadow-4xl">
                  Sign in
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-r-lg font-semibold font-sans transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Sign up
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Fullscreen Menu - Shows automatically on mobile (≤640px) */}
      {/* Professional Mobile Navigation Drawer */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-blue-950/80 to-black/80 backdrop-blur-md"
          onClick={closeMobileMenu}
        />
        {/* Drawer Panel */}
        <aside className="relative w-[90vw] max-w-xs h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform-gpu translate-x-0">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="Prince Onuoha"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow"
          />
          <span className="text-gray-900 dark:text-white text-lg font-semibold tracking-tight">
            Prince Onuoha
          </span>
        </div>
        <button
          onClick={closeMobileMenu}
          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          aria-label="Close menu"
        >
          <Icon.X size={26} weight="bold" className="text-blue-600 dark:text-blue-300" />
        </button>
          </div>
          {/* Nav Links */}
          <nav className="flex-1 flex flex-col gap-2 py-8 px-6">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.House size={22} weight="duotone" />
          Home
        </Link>
        <Link
          to="/about-us"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.User size={22} weight="duotone" />
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.Phone size={22} weight="duotone" />
          Contact Us
        </Link>
        <Link
          to="/services"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.Briefcase size={22} weight="duotone" />
          Services
        </Link>
        <Link
          to="/blog"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.Article size={22} weight="duotone" />
          Blog
        </Link>
        <Link
          to="/careers"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 transition"
          onClick={closeMobileMenu}
        >
          <Icon.Suitcase size={22} weight="duotone" />
          Careers
        </Link>
          </nav>
          {/* CTA Button */}
        <div className="px-6 pb-8">
          <Link to="/sign-in" onClick={closeMobileMenu}>
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all text-base">
              Sign in
            </button>
          </Link>
          <Link to="/sign-up" onClick={closeMobileMenu}>
            <button className="w-full mt-3 border border-blue-600 text-blue-700 dark:text-blue-300 dark:border-blue-400 font-semibold py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-all text-base">
              Create Account
            </button>
          </Link>
        </div>
        </aside>
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
