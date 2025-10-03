// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import MenuSheet from './MenuSheet';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isHeaderVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // useEffect(() => {
  //   const controlHeader = () => {
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY < 100) setIsHeaderVisible(true);
  //     else if (currentScrollY > lastScrollY && currentScrollY > 100)
  //       setIsHeaderVisible(false);
  //     else if (currentScrollY < lastScrollY) setIsHeaderVisible(true);
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', controlHeader, { passive: true });
  //   return () => window.removeEventListener('scroll', controlHeader);
  // }, [lastScrollY]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Explore', path: '/explore-destination' },
    { name: 'Contact', path: '/contact-us' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: isHeaderVisible ? 0 : -80 }}
        transition={{ duration: 0.28 }}
        className="fixed abs top-0 left-0 right-0 z-50 h-16 py-10
                   bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 rounded-xl shadow-lg flex items-center justify-center">
              <Compass className="h-6 w-6 text-white drop-shadow-sm" />
            </div>
            <span className=" text-xl font-bold text-primary">
              TravelMate
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors duration-300
                     hover:text-primary
                     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                     after:bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 after:transition-all after:duration-300
                     hover:after:w-full
                     ${
                       isActive
                         ? 'text-primary after:w-full'
                         : 'text-muted-foreground'
                     }`
                  }
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </NavLink>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4 border-l border-border pl-6">
            <ThemeToggle />

            <Button
              asChild
              className="hidden lg:inline-flex bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              <Link to="/sign-up">Sign Up</Link>
            </Button>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <MenuSheet />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer equal to nav height */}
      <div aria-hidden className="h-16" />
    </>
  );
}


// <motion.nav
//   initial={{ y: -100 }}
//   animate={{ y: isHeaderVisible ? 0 : -100 }}
//   transition={{ duration: 0.3 }}
//   className="fixed top-0 left-0 right-0 z-50
//              bg-background/80 backdrop-blur-lg
//              border-b border-border"
// >
//   <div className="max-w-7xl mx-auto px-8 lg:px-16">
//     <div className="flex items-center justify-between h-16">
//       {/* Logo */}
//       <div className="text-xl font-bold text-primary">TravelApp</div>

//       {/* Nav items */}
//       <div className="flex items-center gap-6">
//         <a
//           href="#"
//           className="text-sm font-medium hover:text-primary transition-colors"
//         >
//           Home
//         </a>
//         <a
//           href="#"
//           className="text-sm font-medium hover:text-primary transition-colors"
//         >
//           Destinations
//         </a>
//         <a
//           href="#"
//           className="text-sm font-medium hover:text-primary transition-colors"
//         >
//           About
//         </a>
//         <a
//           href="#"
//           className="text-sm font-medium hover:text-primary transition-colors"
//         >
//           Contact
//         </a>
//       </div>

//       {/* Right side: Theme + Sign up */}
//       <div className="flex items-center gap-4 pl-6 ml-6 border-l border-border">
//         <ThemeToggle />
//         <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition">
//           Sign Up
//         </Button>
//       </div>
//     </div>
//   </div>
// </motion.nav>;
