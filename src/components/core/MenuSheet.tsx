import { AnimatePresence, motion } from "framer-motion";
import { Compass, Camera, Calendar, Info, BookOpen, Menu, UserPlus, Icon, X, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

import { Link } from "react-router-dom";

// MenuSheet Component
const MenuSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NAV_LINKS = [
    {
      id: 'explore-destination',
      label: 'Destinations',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'experiences',
      label: 'Experiences',
      icon: <Camera className="w-5 h-5" />,
    },
    { id: 'deals', label: 'Deals', icon: <Calendar className="w-5 h-5" /> },
    { id: 'about-us', label: 'About', icon: <Info className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <BookOpen className="w-5 h-5" /> },
    {id: 'contact-us', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  const MotionLink = motion(Link);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-700 hover:text-orange-500"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-[320px] bg-white/95 backdrop-blur-xl border-l border-orange-200/50 shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r  from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">T</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      TravelMate
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2 flex-1">
                  {NAV_LINKS.map((item, index) => (
                    <MotionLink
                      key={item.id}
                      to={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-purple-50 hover:text-blue-600 transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-purple-100 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </MotionLink>
                  ))}
                </nav>

                {/* Sign Up Button */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <Button
                    className="w-full h-12 rounded-xl font-semibold shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    <Link to={'sign-up'}> Sign Up</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuSheet