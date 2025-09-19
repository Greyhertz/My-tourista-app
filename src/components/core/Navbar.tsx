// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useTheme } from 'next-themes';
import { Compass, MapPin, Phone } from 'lucide-react';
import MenuSheet from './MenuSheet';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';

export default function Navbar() {
  // const [isVisible, setIsVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Explore', path: '/explore-destination' },
    { name: 'Contact', path: '/contact-us' },
    { name: 'Settings', path: '/settings' },
  ];

  // const ThemeToggle = () => (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" size="icon">
  //         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //         <Palette className="absolute h-[1.2rem] w-[1.2rem] scale-0 [.theme-ocean_&]:scale-100 [.theme-sunset_&]:scale-100" />
  //         <span className="sr-only">Toggle theme</span>
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent align="end" className="w-36">
  //       <DropdownMenuItem onClick={() => setTheme('light')}>
  //         <Sun className="mr-2 h-4 w-4" /> Light
  //       </DropdownMenuItem>
  //       <DropdownMenuItem onClick={() => setTheme('dark')}>
  //         <Moon className="mr-2 h-4 w-4" /> Dark
  //       </DropdownMenuItem>
  //       <DropdownMenuItem onClick={() => setTheme('system')}>
  //         <Palette className="mr-2 h-4 w-4" /> System
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
 
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHeaderVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50  container bg-  backdrop-blur-md shadow-md px-6 rounded-lg py-20 transition-transform"
    >
      {/* <div className="container mx-auto px-6 "> */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 rounded-xl shadow-lg flex items-center justify-center">
            <Compass className="h-6 w-6 text-white drop-shadow-sm" />
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
            TravelMate
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium tracking-wide transition-colors duration-300 ${
                  isActive
                    ? 'text-foreground drop-shadow-sm' // active item uses main foreground color
                    : 'text-foreground hover:text-foreground' // non-active adapts to theme
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Sign Up Button */}
          <Button
            asChild
            className="hidden lg:inline-flex 
                bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 
                text-white font-semibold px-5 py-2  shadow-md
                transition-all duration-300
                hover:shadow-lg hover:scale-105 hover:brightness-110"
          >
            <Link to="/sign-up">Sign Up</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MenuSheet />
          </div>
        </div>
      </div>
      {/* </div> */}
    </motion.nav>
  );
}
