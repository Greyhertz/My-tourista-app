import { motion } from 'framer-motion';
import {
  Compass,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Plane,
  Headphones,
  ArrowRight,
  Heart,
  Shield,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pb-10 pt-2 px-6 bg-card text-card-foreground border-muted backdrop-blur-sm">
      <div className="container mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand + socials */}
          <div className="md:col-span-2 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-7 h-7 bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 rounded-xl shadow-lg flex items-center justify-center">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r text-primary">
                TravelMate
              </span>
            </div>

            <p className="text-base text-foreground text-clip- leading-relaxed mb-6 max-w-md">
              Creating unforgettable travel experiences since 2010. Your
              adventure starts here with AI-powered planning and world-class
              service.
            </p>

            {/* socials */}
            <div className="flex space-x-4 justify-center md:justify-start">
              {[
                {
                  icon: Facebook,
                  label: 'Facebook',
                  color: 'hover:bg-blue-600 hover:text-white',
                },
                {
                  icon: Twitter,
                  label: 'Twitter',
                  color: 'hover:bg-black hover:text-white',
                },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  color:
                    'hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white',
                },
                {
                  icon: Youtube,
                  label: 'YouTube',
                  color: 'hover:bg-red-600 hover:text-white',
                },
              ].map(({ icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-1.5 rounded-full  transition-colors duration-300 bg-muted ${color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                  aria-label={label}
                >
                  <Icon className={`${color} text-foreground`} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: 'Destinations',
              icon: <Globe className="w-4 h-4 mr-2" />,
              items: [
                'Europe',
                'Asia',
                'Americas',
                'Africa',
                'Oceania',
                'Popular Cities',
              ],
            },
            {
              title: 'Services',
              icon: <Plane className="w-4 h-4 mr-2" />,
              items: [
                'Flight Booking',
                'Hotels',
                'Car Rental',
                'Tours',
                'Travel Insurance',
                'Visa Assistance',
              ],
            },
            {
              title: 'Support',
              icon: <Headphones className="w-4 h-4 mr-2" />,
              items: [
                'Help Center',
                'Contact Us',
                'Travel Guide',
                'Blog',
                'Reviews',
                'Mobile App',
              ],
            },
          ].map((col, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <h3 className="font-semibold mb-6 flex items-center text-lg text-primary">
                {col.icon}
                {col.title}
              </h3>
              <ul className="flex flex-wrap justify-center gap-4    md:flex-col md:justify-start md:gap-0 md:space-y-4">
                {col.items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-muted pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start">
              <Heart className="w-4 h-4 mr-2 text-destructive" fill="red" />©{' '}
              {new Date().getFullYear()} TravelMate. All rights reserved. Made
              with love for travelers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 gap-3 text-sm text-center">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                link => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="flex items-center justify-center text-green-700 dark:text-green-500 hover:text-foreground transition-colors"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {link}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
