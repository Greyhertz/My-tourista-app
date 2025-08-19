
// Main Navbar Component


import { motion } from 'framer-motion';
import MenuSheet from './MenuSheet';
import { Link } from 'react-router-dom';

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

export default Navbar;