import { Link, NavLink, useLocation } from 'react-router-dom';
<<<<<<< Updated upstream:src/components/core/Navbar.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronDown, User, LogIn, Menu } from 'lucide-react';
import MenuSheet from './MenuSheet';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';
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

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/core/ThemeToggle';
import MenuSheet from './MenuSheet';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/use-cart';
>>>>>>> Stashed changes:src/layouts/Navbar.tsx

export default function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { items } = useCart();

  const mainNav = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
<<<<<<< Updated upstream:src/components/core/Navbar.tsx
    <motion.nav
      initial={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm
        ${isScrolled}
        `}
    >
      <div className=" max-w-[1400px] mx-auto px-6 lg:px-8 l">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          {/* <Link to="/" className="flex items-center space-x-3 group">
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
          </Link> */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Wanderlust
            </span>
          </div>
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TravelMate
            </span>
          </Link>
>>>>>>> Stashed changes:src/layouts/Navbar.tsx

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            {/* DESTINATIONS DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-primary">
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
                  <Link to="/hidden-gems">Hidden Gems</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* MAIN NAV LINKS */}
            {mainNav.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                className={`hover:text-primary transition ${
                  isActive(item.path) ? 'text-primary font-semibold' : ''
                }`}
              >
<<<<<<< Updated upstream:src/components/core/Navbar.tsx
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1                        
 
                        ${
                          location.pathname.includes(item.path)
                          // ? 'text-primary bg-primary/10'
                          // : 'text-foreground hover:text-primary hover:bg-muted/50'
                        }
                      `}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            duration: 0.25,
                            ease: 'easeOut',
                          }}
                          className="absolute top-full left-0 mt-2 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-xl overflow-hidden"
                        >
                          {item.dropdownItems?.map(dropItem => (
                            <Link
                              key={dropItem.path}
                              to={dropItem.path}
                              className={`block px-4 py-3 text-sm font-bold transition-all ${
                                isActiveRoute(dropItem.path)
                                  ? 'bg-primary/10 text-primary'
                                  : 'hover:bg-muted'
                              }`}
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-[15px] font-medium duration-300 text-gray-600 hover:text-blue-600 transition-colors ${
                      isActiveRoute(item.path)
                      // ? 'text-primary bg-primary/10'
                      // : 'text-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    {item.name}
                    {isActiveRoute(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        transition={{
                          type: 'spring',
                          bounce: 0.25,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </NavLink>
                )}
              </div>
                {item.name}
              </NavLink>
>>>>>>> Stashed changes:src/layouts/Navbar.tsx
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

<<<<<<< Updated upstream:src/components/core/Navbar.tsx
            <div className="hidden lg:flex items-center space-x-2 ">
              {/* <Button asChild variant="ghost" size="sm" className="font-medium">
                <Link to="/log-in" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Log in
                </Link>
              </Button> */}

              <Button
                asChild
                className="bg-secondary hover:bg-secondary-foreground text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/sign-up" className="flex items-center gap-2">
                  {/* <User className="w-4 h-4" /> */}
                  Get Started
                </Link>
              </Button>
            </div>
            {/* SAVED TRIPS */}
            <Link to="/saved-trips">
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
>>>>>>> Stashed changes:src/layouts/Navbar.tsx

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
                  
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/bookings">My Bookings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/log-in">Sign In</Link>
                </Button>

                <Button asChild>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
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
<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Wanderlust
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
        <a
          href="#destinations"
          className="text-gray-900 hover:text-blue-600 transition-colors"
        >
          Destinations
        </a>
        <a
          href="#tours"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Tours
        </a>
        <a
          href="#experiences"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Experiences
        </a>
        <a
          href="#blog"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Blog
        </a>
        <a
          href="#contact"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Contact
        </a>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <ThemeToggle />
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all">
          <Link to="/sign-up">Get Started</Link>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </div>
  </div>
</nav>