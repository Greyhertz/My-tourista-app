// components/MenuSheet.tsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, Info, BookOpen, Mail, User, MapPin, Menu, Settings, Compass } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const MenuSheet = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about-us', icon: Info },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Explore Destintion', path: '/explore-destination', icon: MapPin },
    { name: 'Contact', path: '/contact-us', icon: Mail },
    {name: 'Settings', path: '/settings', icon: Settings}
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] bg-background/95 backdrop-blur-md border-l border-border/50 shadow-xl flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b border-border/50">
          <SheetTitle className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              TravelMate
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Links */}
        <nav className="flex flex-col space-y-1 mt-4 px-2 flex-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-blue-600 scale-105 shadow-md'
                      : 'text-purple-500 hover:text-purple-600 hover:bg-accent/50 hover:translate-x-2'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="">
          <ThemeToggle/>
        </div>
        {/* Sign Up button */}
        <div className="px-4 py-4 border-t border-border/50">
          <Button asChild className="w-full h-12 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
            <Link to="/sign-up">
              <User className="mr-2 h-5 w-5" /> Sign Up
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
