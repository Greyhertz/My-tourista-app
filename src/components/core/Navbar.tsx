import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronDown, User, LogIn, Menu } from 'lucide-react';
import MenuSheet from './MenuSheet';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Destinations',
      path: '/find-destination',
      // path: '/explore-destinaton',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Explore', path: '/explore-destination' },
        { name: 'AI-planned trip', path: '/find-destination' },
        // { name: 'Popular Places', path: '/explore-destinations' },
        { name: 'Hidden Gems', path: '/hidden-gems' },
      ],
    },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
    { name: 'Saved Trips', path: '/saved-trips' },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map(item => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
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
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />

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

            <div className="lg:hidden">
              <MenuSheet />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      {isScrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className=""
        />
      )}
    </motion.nav>
  );
}
<nav className=" w-full bg-white/95 backdrop-blur-xl z-40 border-b border-gray-100 shadow-sm">
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

export const MainNav = () => {
  return(
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
        </div>
      </div>
    </div>
  </nav>
  )
}