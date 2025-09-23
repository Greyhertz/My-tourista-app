// components/NotFound.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Compass, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-amber-100 via-rose-100 to-sky-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] bg-rose-200/30 dark:bg-rose-500/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute w-[700px] h-[700px] bg-amber-200/30 dark:bg-amber-500/10 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <Plane className="mx-auto w-20 h-20 text-rose-500 dark:text-amber-400 animate-bounce" />

        <h1 className="text-7xl md:text-9xl font-extrabold text-background">
          404
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
          Lost in Paradise 🌴
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Looks like you’ve wandered off the map. Don’t worry—there are plenty
          of adventures waiting for you!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition"
          >
            <Home className="w-5 h-5" /> Back Home
          </Link>
          <Link
            to="/explore-destination"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition"
          >
            <Compass className="w-5 h-5" /> Explore Destinations
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
