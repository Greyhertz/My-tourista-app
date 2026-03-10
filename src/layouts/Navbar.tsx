import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MenuSheet from './MenuSheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/core/ThemeToggle';
import {
  Compass,
  Heart,
  User,
  LogOut,
  Map,
  ChevronDown,
  ShoppingCart,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/use-cart';

export default function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  const mainNav = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
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
              <span className="text-xs text-muted-foreground font-semibold -mt-1">
                Explore the World
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            {/* DESTINATIONS DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  Destinations
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/explore-destination" className="flex gap-2">
                    <Map size={16} /> Explore
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/find-destination">AI Planned Trip</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/saved-trips">Saved Trips</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* MAIN NAV LINKS */}
            {mainNav.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-primary transition-colors ${
                    isActive ? 'text-primary font-semibold' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* SAVED TRIPS */}
            <Link to="/saved-trips" className="hidden lg:block">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            {/* CART */}
            {user && (
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* PROFILE / AUTH */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email || 'Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/log-in">Sign In</Link>
                </Button>

                <Button asChild className="bg-gradient-to-r from-primary to-accent">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* MOBILE MENU */}
            <div className="lg:hidden">
              <MenuSheet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
