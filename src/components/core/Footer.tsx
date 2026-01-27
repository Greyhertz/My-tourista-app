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
  Linkedin,
  Mail,
  MapPinIcon,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">Wanderlust</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Your trusted travel companion for discovering the world's most
              extraordinary destinations. Experience travel reimagined with our
              curated tours and personalized service.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Team', 'Careers', 'Press', 'Partnerships'].map(
                item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-4">
              {[
                'Help Center',
                'Safety Info',
                'Cancellation',
                'Contact Us',
                'Trust & Safety',
              ].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>hello@wanderlust.travel</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPinIcon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>
                  123 Travel Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2026 Wanderlust Travel. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
