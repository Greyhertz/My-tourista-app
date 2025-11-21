// components/MenuSheet.tsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Home,
  Info,
  BookOpen,
  Mail,
  User,
  MapPin,
  Menu,
  Settings,
  Compass,
  Sparkle,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MenuSheetBlogWidget } from './BlogWidget';
import { Separator } from '@/components/ui/separator';
 // Import the widget

const MenuSheet = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close sheet when navigation occurs
  const handleLinkClick = () => {
    setOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about-us', icon: Info },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'AI-trip planner', path: '/find-destination', icon: Sparkles },
    { name: 'Explore Destination', path: '/explore-destination', icon: MapPin },
    { name: 'Contact', path: '/contact-us', icon: Mail },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[350px] bg-background/95 backdrop-blur-md border-l border-border/50 shadow-xl flex flex-col overflow-y-auto"
      >
        {/* Header */}
        <SheetHeader className="px-4 py-4 border-b border-border/50">
          <SheetTitle className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg flex items-center justify-center">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  TravelMate
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Explore the World
                </span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-1 mt-4 px-2 gap-5">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text'
                      : ' hover:bg-accent/50 hover:translate-x-2'
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

        {/* Blog Widgets Section */}
        <div className="px-2 mt-6 flex-1">
          {/* Divider */}
          <div className=" mx-2 mb-4" />

          {/* Latest Stories Widget */}
          {/* <MenuSheetBlogWidget
            title="Latest Stories"
            limit={3}
            onLinkClick={handleLinkClick}
            className="mb-4"
          /> */}

          {/* Travel Tips Widget */}
          {/* <MenuSheetBlogWidget
            title="Travel Tips"
            category="tips"
            limit={2}
            onLinkClick={handleLinkClick}
            className="mb-4 border-t border-border/20 pt-4"
          /> */}

          {/* Destinations Widget */}
          {/* <MenuSheetBlogWidget
            title="Popular Destinations"
            category="destinations"
            limit={2}
            onLinkClick={handleLinkClick}
            className="border-t border-border/20 pt-4"
          /> */}
        </div>
            <Separator />
        
        {/* Footer Section */}
        <div className="px-4 py-4 mt-auto space-y-4 ">
          {/* Theme Toggle */}
          <div className="flex justify-center"></div>

          {/* Sign Up Button */}
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-center font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/sign-up" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Get Started
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
