import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe, Award, Shield, Compass, ChevronRight, MapPin, Star,
  Heart, Camera, ArrowRight, Sparkles, Play, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
};

const ScrollReveal = ({ children, delay = 0 }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [String((entry.target as HTMLElement).dataset.observeId || '')]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setObserverRef = (el: HTMLDivElement | null, id: string) => {
    if (el && !observerRefs.current.includes(el)) {
      el.dataset.observeId = id;
      observerRefs.current.push(el);
    }
  };

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop&q=90',
      title: 'Discover Your Next Adventure',
      subtitle: 'Explore breathtaking destinations around the world'
    },
    {
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=90',
      title: 'Journey Beyond Boundaries',
      subtitle: 'Create unforgettable memories with curated experiences'
    },
    {
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop&q=90',
      title: 'Experience The Extraordinary',
      subtitle: 'From hidden gems to iconic landmarks'
    }
  ];

  const valueProps = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Destinations',
      description: 'Access to 500+ destinations across 6 continents',
      color: 'from-blue-50 to-indigo-50'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Expert Guides',
      description: 'Professional local guides with 10+ years experience',
      color: 'from-amber-50 to-orange-50'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Booking',
      description: 'Safe and hassle-free reservation process',
      color: 'from-emerald-50 to-teal-50'
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'Tailored Experiences',
      description: 'Customized tours to match your preferences',
      color: 'from-purple-50 to-pink-50'
    }
  ];

  const destinations = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop&q=80',
      title: 'Paris Highlights Tour',
      location: 'Paris, France',
      price: 129,
      rating: 4.9,
      badge: 'Popular',
      category: 'City Tours'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=600&h=800&fit=crop&q=80',
      title: 'Tokyo Cultural Experience',
      location: 'Tokyo, Japan',
      price: 149,
      rating: 5.0,
      badge: 'Best Seller',
      category: 'Cultural'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80',
      title: 'Santorini Sailing Adventure',
      location: 'Santorini, Greece',
      price: 179,
      rating: 4.8,
      badge: null,
      category: 'Adventure'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=600&h=800&fit=crop&q=80',
      title: 'Bali Temple & Terrace Trek',
      location: 'Bali, Indonesia',
      price: 95,
      rating: 4.9,
      badge: null,
      category: 'Nature'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=800&fit=crop&q=80',
      title: 'Dubai Desert Safari',
      location: 'Dubai, UAE',
      price: 115,
      rating: 4.7,
      badge: null,
      category: 'Adventure'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=800&fit=crop&q=80',
      title: 'Maldives Island Hopping',
      location: 'Maldives',
      price: 199,
      rating: 5.0,
      badge: 'Luxury',
      category: 'Beach'
    }
  ];

  const stats = [
    { number: '500+', label: 'Destinations' },
    { number: '50K+', label: 'Happy Travelers' },
    { number: '1,200+', label: 'Tour Packages' },
    { number: '4.9', label: 'Average Rating' }
  ];

  const categories = ['All', 'Beach', 'City Tours', 'Adventure', 'Cultural', 'Nature'];
  const filteredDestinations = activeCategory === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <BackToTop />

      {/* Hero Section */}
      <section className="relative pt-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl">
            <div className="relative h-[500px] lg:h-[700px]">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
                </div>
              ))}

              <div className="relative h-full flex flex-col justify-between p-8 lg:p-16">
                <div className="max-w-3xl">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-6 px-4 py-2">
                    ✨ Explore the World with Us
                  </Badge>
                  <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    {heroSlides[activeSlide].title}
                  </h1>
                  <p className="text-xl lg:text-2xl text-white/90 mb-10 font-light max-w-2xl">
                    {heroSlides[activeSlide].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                      Explore Tours <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20 rounded-full px-10 py-6 text-lg font-semibold">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        activeSlide === idx ? 'w-12 bg-white shadow-lg' : 'w-2 bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose Wanderlust</h3>
            <p className="text-lg text-gray-600">Experience travel like never before</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {valueProps.map((prop, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${prop.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-blue-600">{prop.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">{prop.title}</h4>
                    <p className="text-gray-600 text-center leading-relaxed">{prop.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Popular Destinations</h3>
            <p className="text-lg text-gray-600">Handpicked experiences from around the world</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'border-2 border-gray-200 hover:border-blue-600 text-gray-700'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest, idx) => (
              <ScrollReveal key={dest.id} delay={idx * 0.1}>
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-white h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {dest.badge && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                        {dest.badge}
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{dest.rating}</span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{dest.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{dest.title}</h4>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">${dest.price}</div>
                      <button className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full flex items-center justify-center transition-all shadow-md">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">Start Your Journey Today</h3>
          <p className="text-xl text-white/90 mb-10">Subscribe to get exclusive deals and travel tips</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
            />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 font-semibold whitespace-nowrap shadow-xl">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
export { ScrollReveal };
