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
  // const { setTheme, theme } = useTheme();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     setIsScrolled(currentScrollY > 20);

  //     // Always keep navbar visible - no hiding behavior
  //     setIsVisible(true);
  //     setLastScrollY(currentScrollY);
  //   };

    // let ticking = false;
    // const throttledScroll = () => {
    //   if (!ticking) {
    //     requestAnimationFrame(() => {
    //       handleScroll();
    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // };

  //   window.addEventListener('scroll', throttledScroll);
  //   return () => window.removeEventListener('scroll', throttledScroll);
  // }, [lastScrollY]);

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
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-500  rounded-xl flex items-center justify-center">
              <Compass className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              TravelMate
            </span>
          </div>
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-primary hover:text-destructive group-hover:w-full'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center space-x-2">
            <div className="bg-pri">
              <ThemeToggle />
            </div>
            <div className="lg:hidden">
              <MenuSheet />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}



  