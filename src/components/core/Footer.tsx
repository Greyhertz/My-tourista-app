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
    <footer className="py-20 px-6 bg-card text-card-foreground border-t border-muted backdrop-blur-sm">
      <div className="container mx-auto">
        {/* Top grid */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand + socials */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                TravelMate
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Creating unforgettable travel experiences since 2010. Your
              adventure starts here with AI-powered planning and world-class
              service.
            </p>

            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
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
            <div key={index}>
              <h3 className="font-semibold mb-6 flex items-center text-lg text-primary">
                {col.icon}
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center">
              <Heart className="w-4 h-4 mr-2 text-destructive" fill="red" />©{' '}
              {new Date().getFullYear()} TravelMate. All rights reserved. Made
              with love for travelers worldwide.
            </p>

            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                link => (
                  <motion.a
                    key={link}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
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
