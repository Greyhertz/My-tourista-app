import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Footer()
{

  return (
    <div className="border-t border-border bg-card/50 text-card-foreground backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 animate-fade-in-up">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary text-2xl font-bold">T</span>
              </div>
              <span className="text-lg font-bold group-hover:text-primary transition-colors bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent ">
                TravelMate
              </span>
            </Link>
            <p className="text-foreground text-sm leading-relaxed font-sans">
              Creating unforgettable travel experiences since 2010. Your
              adventure starts here with AI-powered planning and world-class
              service. Discover amazing destinations and create unforgettable
              memories with our travel platform.
            </p>
            <div className="flex space-x-4">
              <div className="text-sm">
                <span className="font-semibold text-foreground">1000+</span>
                <p className="text-muted-foreground">Destinations</p>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">50K+</span>
                <p className="text-muted-foreground">Happy Travelers</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in-up animate-delay-100">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Blog', path: '/blog' },
                { name: 'Explore', path: '/explore-destination' },
              ].map((item, index) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 animate-fade-in-up animate-delay-200">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                'Contact Us',
                'Help Center',
                'Privacy Policy',
                'Terms of Service',
                'FAQ',
                'Travel Insurance',
              ].map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-primary transition-all duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-6 animate-fade-in-up animate-delay-300">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex space-x-3">
                {[
                  { name: 'Facebook', color: 'bg-blue-600' },
                  { name: 'Twitter', color: 'bg-sky-500' },
                  { name: 'Instagram', color: 'bg-pink-600' },
                  { name: 'YouTube', color: 'bg-red-600' },
                ].map((social, index) => (
                  <div
                    key={social.name}
                    className={`w-10 h-10 ${social.color} rounded-full flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
                    title={social.name}
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    Ico
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 mt-12 pt-8 animate-fade-in-up animate-delay-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} TravelApp. All rights reserved. Made
              with ❤️ for travelers.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}