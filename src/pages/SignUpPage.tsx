import { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
  'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Eiffel Tower, Paris
  'https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Grand Canyon
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Big Ben, London
  'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Colosseum, Rome
  'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Santorini, Greece
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Taj Mahal, India
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Machu Picchu, Peru
  'https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Sydney Opera House, Australia
  'https://www.visitgreece.gr/images/1743x752/jpg/files/merakos_05_santorini-oia_1743x752.jpg',
];

const rotatingHeadings = [
  'Discover New Destinations',
  'Book Exotic Getaways',
  'Experience New Cultures',
  'Find Hidden Gems',
  'Adventure Awaits',
];

const headingVariants = [
  {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
  },
  {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  },
];

export default function SignUpPage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Preload background images
    backgroundImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    const interval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
      setHeadingIndex(prev => (prev + 1) % rotatingHeadings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const validateUser = () =>
  {
    
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-black">
      {/* Left Side with background and rotating heading */}
      <div className="md:w-1/2 h-auto relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundImages[currentBgIndex]}
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10 px-6 text-center">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.h1
                key={rotatingHeadings[headingIndex]}
                {...headingVariants[headingIndex % headingVariants.length]}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: 0.2,
                }}
                className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                {rotatingHeadings[headingIndex]}
              </motion.h1>
              g
            </AnimatePresence>

            <p className="text-lg mt-4 text-white/80">
              Join us and plan your next adventure effortlessly
            </p>

            <button
              className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-300"
              onClick={() => (window.location.href = '/signup')}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <form className="w-full max-w-md space-y-6">
          <h2 className="text-2xl md:text-5xl font-extrabold text-black w-full">
            SignUp with{' '}
            <span className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              TravelMate
            </span>
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm text-gray-700 font-semibold hover:underline"
            >
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/4 text-gray-700"
                size={20}
              />
              <input
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm text-gray-700 font-semibold "
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/4 text-gray-700"
                size={20}
              />
              <input
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                type="text"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-700 font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/4 text-gray-700"
                size={20}
              />
              <input
                className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-10 border border-gray-300 rounded-lg text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="******"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform-translate-y-1/2 text-gray-700 hover:text-gray-400 transition-colors duration-200"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-black border-opacity-30"></div>
            <span className="px-4 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 border-t border-black border-opacity-30"></div>
          </div>

          {/* Social Sign Up Options */}
          <div className="space-y-3">
            {/* Google Sign Up */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 shadow-sm hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Apple Sign Up */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
