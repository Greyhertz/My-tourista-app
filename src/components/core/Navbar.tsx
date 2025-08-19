// import { Link } from "react-router-dom";
// import * as Icon from "@phosphor-icons/react";


// type Theme = "system" | "light" | "dark";

// interface NavbarProps {
//   onClose: () => void;
//   onThemeChange: (theme:Theme) => void;
//   currentTheme: Theme;
//   themeDropdownOpen: boolean;
//   toggleThemeDropdown: () => void;
//   isDarkMode: boolean;
// }

// export default function Navbar({
//   onClose,
//   onThemeChange,
//   themeDropdownOpen,
//   toggleThemeDropdown,
// }: NavbarProps)
// {

//   return (
//     <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition relative h-full">
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full"
//         aria-label="Close drawer"
//       >
//         <Icon.X size={20} />
//       </button>

//       {/* User Profile Section */}
//       <div className="user flex flex-row items-center gap-3 px-4 py-4 border-b dark:border-gray-700">
//         <img
//           className="w-10 h-10 rounded-full border-2 object-cover"
//           src="https://i.pravatar.cc/100"
//           alt="User"
//         />
//         <h3 className="text-md font-serif text-blue-500 text-2xl">
//           Prince Onuoha
//         </h3>
//       </div>

//       {/* Navigation */}
//       <nav>
//         <ul className="space-y-4 text-sm">
//           {/* Theme Selector */}
//           <li className="relative">
//             <button
//               onClick={toggleThemeDropdown}
//               className="w-full flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600 "
//             >
//               <span className="font-semibold">
//                 <Icon.Palette size={20} />
//               </span>
//               <span>Theme</span>
//             </button>

//             {themeDropdownOpen && (
//               <ul className="absolute bg-white dark:bg-gray-800 text-black dark:text-white left-full ml-2 mt-1 rounded shadow-md z-10">
//                 <li
//                   className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer focus focus:to-blue-500"
//                   onClick={() => onThemeChange('light')}
//                 >
//                   <Icon.Sun size={20} className="mr-2" weight="fill" />
//                   Light
//                 </li>
//                 <li
//                   className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => onThemeChange('dark')}
//                 >
//                   <Icon.Moon size={20} className="mr-2" weight="fill" />
//                 Dark
//                 </li>
//                 <li
//                   className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => onThemeChange('system')}
//                 >
//                   <Icon.Desktop size={20} className="mr-2" weight="fill" />
//                   System
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Navigation Items */}
//           <li>
//             <Link
//               to="explore-destination"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >

//               <span>
//                 <Icon.Path size={20} weight="fill" />
//               </span>
//               <span>Explore Destinations</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="profile"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.Lightbulb size={20} weight="fill" />
//               </span>
//               <span>Travel Tips</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="book-trip"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.CalendarDots size={20} weight="fill" />
//               </span>
//               <span>Book Your Trip</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="contact"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.PhoneOutgoing size={20} weight="fill" />
//               </span>
//               <span>Contact Us</span>
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="Blog"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.PhoneOutgoing size={20} weight="fill" />
//               </span>
//               <span>Blog</span>
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="settings"
//               onClick={onClose}
//               className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.GearFine size={20} weight="fill" />
//               </span>
//               <span>Account Settings</span>
//             </Link>
//           </li>
//           <li>
//             <button
//               onClick={onClose}
//               className="w-full flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
//             >
//               <span>
//                 <Icon.SignOut size={20} weight="fill" />
//               </span>
//               <span>Log Out</span>
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

// TravelSheet.tsx
// TravelMenuSheet.tsx
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import {
//   Compass,
//   BookOpen,
//   UserPlus,
//   MapPin,
//   Calendar,
//   Hotel,
//   Camera,
//   Info,
// } from "lucide-react"

// export function Navbar() {
//   return (
//     <Sheet>
//       {/* Trigger Button */}
//       <SheetTrigger asChild>
//         <Button variant="default" className="rounded-xl">
//           Open Menu
//         </Button>
//       </SheetTrigger>

//       {/* Sheet Content */}
//       <SheetContent className="w-[320px] sm:w-[360px]">
//         <SheetHeader>
//           <SheetTitle className="text-xl font-semibold">
//             🌍 TravelMate
//           </SheetTitle>
//         </SheetHeader>

//         <div className="mt-6 flex flex-col gap-5 text-lg">
//           {/* Explore Destinations */}
//           <button className="flex items-center gap-3 hover:text-blue-600 transition">
//             <Compass className="w-5 h-5 text-blue-500" />
//             Explore Destinations
//           </button>

//           {/* Travel Blog */}
//           <button className="flex items-center gap-3 hover:text-green-600 transition">
//             <BookOpen className="w-5 h-5 text-green-500" />
//             Travel Blog
//           </button>

//           {/* Bookings */}
//           <button className="flex items-center gap-3 hover:text-purple-600 transition">
//             <Calendar className="w-5 h-5 text-purple-500" />
//             My Bookings
//           </button>

//           {/* Hotels */}
//           <button className="flex items-center gap-3 hover:text-pink-600 transition">
//             <Hotel className="w-5 h-5 text-pink-500" />
//             Hotels & Stays
//           </button>

//           {/* Attractions */}
//           <button className="flex items-center gap-3 hover:text-orange-600 transition">
//             <Camera className="w-5 h-5 text-orange-500" />
//             Attractions
//           </button>

//           {/* Map */}
//           <button className="flex items-center gap-3 hover:text-teal-600 transition">
//             <MapPin className="w-5 h-5 text-teal-500" />
//             Interactive Map
//           </button>

//           {/* About */}
//           <button className="flex items-center gap-3 hover:text-gray-600 transition">
//             <Info className="w-5 h-5 text-gray-500" />
//             About Us
//           </button>

//           {/* Sign Up */}
//           <Button className="mt-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
//             <UserPlus className="mr-2 h-4 w-4" />
//             Sign Up
//           </Button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }

// Main Navbar Component


import { motion } from 'framer-motion';
import MenuSheet from './MenuSheet';
import { Link } from 'react-router-dom';
// import typ { Link } from 'react-router-dom';

const NAV_LINKS = [
  {
    id: 'Destinations',
    link: 'explore-destination',
  },
  {
    id: 'Experiences',
    link: 'travel-blog',
  },
  {
    id: 'Deals',
    link: 'book-trip',
  },
  {
    id: 'About',
    link: 'about-us',
  },
  {
    id: 'Blog',
    link: 'blog',
  },
  {
    id: 'Contact',
    link: 'contact-us',
  }

  
]

const Navbar = ({ isVisible }) => {
  return (
    <motion.nav
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className="fixed top-0 w-full z-50  bg-white/90 border-b border-orange-200/50 shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">T</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            TravelMate
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map(
            items => (
              <Link
                key={items.id}
                to={`/${items.link}`}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-300 font-medium"
              >
                {items.id}
              </Link>
            )
          )}
        </div>

        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 hover:text-blue-500 font-medium "
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            Plan Trip
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <MenuSheet />
      </div>
    </motion.nav>
  );
};

export default Navbar