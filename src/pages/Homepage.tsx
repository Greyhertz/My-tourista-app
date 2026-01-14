import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  MapPin,
  Star,
  Clock,
  Users,
  Camera,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPinIcon,
  Search,
  Menu,
  Globe,
  Award,
  Shield,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/core/ThemeToggle';

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [String((entry.target as HTMLElement).dataset.observeId)]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRefs.current.forEach(ref => {
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
      image:
        'https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Discover Your Next Adventure',
      subtitle: 'Explore breathtaking destinations around the world',
    },
    {
      image:
        'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Journey beyond boundaries',
      subtitle: 'Create unforgettable memories with curated experiences',
    },
    {
      image:
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Experience The Extraordinary',
      subtitle: 'From hidden gems to iconic landmarks',
    },
  ];

  const valueProps = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Destinations',
      description: 'Access to 500+ destinations across 6 continents',
      color: 'from-blue-50 to-indigo-50',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Expert Guides',
      description: 'Professional local guides with 10+ years experience',
      color: 'from-amber-50 to-orange-50',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Booking',
      description: 'Safe and hassle-free reservation process',
      color: 'from-emerald-50 to-teal-50',
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'Tailored Experiences',
      description: 'Customized tours to match your preferences',
      color: 'from-purple-50 to-pink-50',
    },
  ];

  const destinations = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop&q=80',
      title: 'Paris Highlights Tour',
      location: 'Paris, France',
      duration: '6 hours',
      groupSize: '15 people',
      price: 129,
      rating: 4.9,
      reviews: 342,
      badge: 'Popular',
      category: 'City Tours',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=600&h=800&fit=crop&q=80',
      title: 'Tokyo Cultural Experience',
      location: 'Tokyo, Japan',
      duration: '8 hours',
      groupSize: '12 people',
      price: 149,
      rating: 5.0,
      reviews: 287,
      badge: 'Best Seller',
      category: 'Cultural',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&q=80',
      title: 'Santorini Sailing Adventure',
      location: 'Santorini, Greece',
      duration: '5 hours',
      groupSize: '10 people',
      price: 179,
      rating: 4.8,
      reviews: 198,
      badge: null,
      category: 'Adventure',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=600&h=800&fit=crop&q=80',
      title: 'Bali Temple & Terrace Trek',
      location: 'Bali, Indonesia',
      duration: '7 hours',
      groupSize: '8 people',
      price: 95,
      rating: 4.9,
      reviews: 421,
      badge: null,
      category: 'Nature',
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=800&fit=crop&q=80',
      title: 'Dubai Desert Safari',
      location: 'Dubai, UAE',
      duration: '6 hours',
      groupSize: '20 people',
      price: 115,
      rating: 4.7,
      reviews: 256,
      badge: null,
      category: 'Adventure',
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=800&fit=crop&q=80',
      title: 'Maldives Island Hopping',
      location: 'Maldives',
      duration: '4 hours',
      groupSize: '6 people',
      price: 199,
      rating: 5.0,
      reviews: 178,
      badge: 'Luxury',
      category: 'Beach',
    },
    {
      id: 7,
      image:
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&h=800&fit=crop&q=80',
      title: 'Canadian Rockies Expedition',
      location: 'Alberta, Canada',
      duration: '10 hours',
      groupSize: '12 people',
      price: 165,
      rating: 4.9,
      reviews: 203,
      badge: null,
      category: 'Nature',
    },
    {
      id: 8,
      image:
        'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600&h=800&fit=crop&q=80',
      title: 'Machu Picchu Adventure',
      location: 'Cusco, Peru',
      duration: '12 hours',
      groupSize: '10 people',
      price: 185,
      rating: 5.0,
      reviews: 312,
      badge: 'Adventure',
      category: 'Historical',
    },
  ];

  const blogPosts = [
    {
      image:
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80',
      category: 'Travel Tips',
      title: 'Top Destinations for 2026',
      excerpt: 'Discover the must-visit locations that are trending this year',
      date: 'Jan 5, 2026',
      readTime: '7 min read',
    },
    {
      image:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80',
      category: 'Travel Guide',
      title: 'Essential Packing Guide',
      excerpt: 'Expert tips for packing smart and traveling light',
      date: 'Jan 3, 2026',
      readTime: '5 min read',
    },
    {
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&q=80',
      category: 'Adventure',
      title: 'Best Beach Destinations',
      excerpt: 'Paradise beaches you need to visit in your lifetime',
      date: 'Dec 28, 2025',
      readTime: '6 min read',
    },
  ];

  const stats = [
    { number: '500+', label: 'Destinations' },
    { number: '50K+', label: 'Happy Travelers' },
    { number: '1,200+', label: 'Tour Packages' },
    { number: '4.9', label: 'Average Rating' },
  ];

  const categories = [
    'All',
    'Beach',
    'City Tours',
    'Adventure',
    'Cultural',
    'Nature',
    'Historical',
  ];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations =
    activeCategory === 'All'
      ? destinations
      : destinations.filter(dest => dest.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      {/* <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
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
      </nav> */}

      {/* Hero Section */}
      <section className="relative pt-10 bg-gray-50">
        <div className="max-w-full mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl">
            <div className="relative h-[500px] lg:h-[800px]">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    activeSlide === idx
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
                </div>
              ))}

              {/* Hero Content */}
              <div className="relative h-full flex flex-col justify-between p-8 lg:p-16">
                <div className="max-w-3xl">
                  <div
                    className={`transition-all duration-700 ${
                      isVisible['hero'] || scrollY < 100
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                  >
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
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                      >
                        Explore Tours
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20 rounded-full px-10 py-6 text-lg font-semibold"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex gap-3 items-center">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        activeSlide === idx
                          ? 'w-12 bg-white shadow-lg'
                          : 'w-2 bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 lg:py-24 bg-white">
        <div
          ref={el => setObserverRef(el, 'intro')}
          className={`max-w-4xl mx-auto px-6 lg:px-8 transition-all duration-1000 ${
            isVisible['intro']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 text-base mb-6">
              🌍 Your Journey Starts Here
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Travel Made Simple, Memorable, and Extraordinary
            </h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              Welcome to Wanderlust, your gateway to unforgettable adventures
              around the globe. We specialize in creating personalized travel
              experiences that go beyond the ordinary, connecting you with the
              world's most captivating destinations.
            </p>
            <p>
              From cultural immersions to thrilling adventures, relaxing beach
              getaways to historical explorations – we've curated thousands of
              experiences to match every traveler's dream. Our platform combines
              cutting-edge technology with local expertise to bring you seamless
              booking and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div
            ref={el => setObserverRef(el, 'values-title')}
            className={`text-center mb-16 transition-all duration-1000 delay-100 ${
              isVisible['values-title']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Wanderlust
            </h3>
            <p className="text-lg text-gray-600">
              Experience travel like never before with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {valueProps.map((prop, idx) => (
              <div
                key={idx}
                ref={el => setObserverRef(el, `value-${idx}`)}
                className={`transition-all duration-700 ${
                  isVisible[`value-${idx}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                  <CardContent className="p-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${prop.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-blue-600">{prop.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {prop.title}
                    </h4>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {prop.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experience */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              ref={el => setObserverRef(el, 'featured-image')}
              className={`order-2 lg:order-1 transition-all duration-1000 ${
                isVisible['featured-image']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&h=1000&fit=crop&q=90"
                  alt="Tropical Paradise"
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 text-base mb-6">
                    🌴 FEATURED DESTINATION
                  </Badge>
                  <h4 className="text-4xl font-bold text-white mb-2">
                    Tropical Paradise
                  </h4>
                  <p className="text-white/90 text-lg">
                    Escape to pristine beaches and crystal waters
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={el => setObserverRef(el, 'featured-content')}
              className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ${
                isVisible['featured-content']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 text-base mb-6">
                ⚡ Limited Time Offer
              </Badge>
              <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Dream
                <br />
                Vacation Awaits
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Immerse yourself in extraordinary experiences tailored to your
                interests. From adventure seekers to relaxation enthusiasts, we
                have the perfect getaway waiting for you. Book now and save up
                to 30% on select destinations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r bg-secondary hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-full px-8 transition-all"
                >
                  View Packages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="tours" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div
            ref={el => setObserverRef(el, 'destinations-header')}
            className={`mb-12 transition-all duration-1000 ${
              isVisible['destinations-header']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="text-center mb-8">
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Popular Destinations
              </h3>
              <p className="text-lg text-gray-600">
                Handpicked experiences from around the world
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? 'default' : 'outline'}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.slice(0, 8).map((dest, idx) => (
              <div
                key={dest.id}
                ref={el => setObserverRef(el, `dest-${idx}`)}
                className={`transition-all duration-700 ${
                  isVisible[`dest-${idx}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-white h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
                    />
                    {dest.badge && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                        {dest.badge}
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">
                        {dest.rating}
                      </span>
                    </div>
                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-white hover:bg-blue-600 rounded-full flex items-center justify-center transition-all shadow-lg opacity-0 group-hover:opacity-100">
                      <Heart className="w-5 h-5 text-gray-700 hover:text-white" />
                    </button>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{dest.location}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {dest.title}
                    </h4>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-2xl font-bold text-gray-900">
                        {/* ${dest.price} */}
                      </div>
                      <button className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full flex items-center justify-center transition-all shadow-md">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-12 py-6 text-base font-semibold border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div
            ref={el => setObserverRef(el, 'cta-banner')}
            className={`relative rounded-[32px] overflow-hidden shadow-2xl h-[500px] transition-all duration-1000 ${
              isVisible['cta-banner']
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=800&fit=crop&q=90"
              alt="Adventure awaits"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-purple-900/70"></div>

            <div className="absolute inset-0 flex items-center">
              <div className="px-12 lg:px-20 max-w-2xl">
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Adventure
                  <br />
                  Starts Today
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Join thousands of travelers who have discovered their dream
                  destinations with us. Limited time offers available!
                </p>

                <div className="inline-block p-1 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          Special Package
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Save up to 30% on premium tours
                        </p>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-5 text-sm shadow-md"
                        >
                          Book Now →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div
            ref={el => setObserverRef(el, 'blog-header')}
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible['blog-header']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Travel Inspiration
            </h3>
            <p className="text-lg text-gray-600">
              Tips, guides, and stories from around the world
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                ref={el => setObserverRef(el, `blog-${idx}`)}
                className={`transition-all duration-700 ${
                  isVisible[`blog-${idx}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group bg-white h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Culinary Stories Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Large Featured Culinary Blog */}
            <div
              ref={el => setObserverRef(el, 'blog-featured')}
              className={`transition-all duration-1000 ${
                isVisible['blog-featured']
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl h-[600px] group rounded-3xl">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-10 text-white">
                  <Badge className="bg-emerald-500 text-white mb-4">
                    Culinary Experience
                  </Badge>
                  <h3 className="text-4xl font-bold mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-lg text-white/90 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80 mb-6">
                    <span>{blogPosts[0].date}</span>
                    <span>•</span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8">
                    Read Story
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* CTA Card (unchanged shape, softer tone) */}
              <div
                ref={el => setObserverRef(el, 'cta-card')}
                className={`transition-all duration-1000 delay-200 ${
                  isVisible['cta-card']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white overflow-hidden relative rounded-3xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                  <CardContent className="p-10 relative">
                    <h4 className="text-3xl font-bold mb-4">
                      Taste the Azores, one story at a time
                    </h4>
                    <p className="text-lg text-white/90 mb-6">
                      Local food, island culture, and unforgettable coastal
                      moments.
                    </p>
                    <Button className="bg-white text-emerald-600 hover:bg-gray-50 rounded-full shadow-lg px-8">
                      Explore Experiences
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Blog Mini Grid (replaces stats) */}
              <div
                ref={el => setObserverRef(el, 'blog-mini')}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${
                  isVisible['blog-mini']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {[blogPosts[1], blogPosts[2]].map((post, idx) => (
                  <Card
                    key={idx}
                    className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl"
                  >
                    <div className="relative h-44">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="bg-orange-100 text-orange-700 mb-3">
                        {post.category}
                      </Badge>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {post.date} • {post.readTime}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div
            ref={el => setObserverRef(el, 'stats')}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible['stats']
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* from-blue-600 via-indigo-600 to-purple-600 */}
      <section>
        <div className="m-0 py-16 lg:py-24 bg-gradient-to-br from-secondary via-orange-400 to-purple-600 rounded-none">
          <div
            ref={el => setObserverRef(el, 'newsletter')}
            className={`max-w-4xl mx-auto px-6 lg:px-8 text-center transition-all duration-1000 ${
              isVisible['newsletter']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your Journey Today
            </h3>
            <p className="text-xl text-white/90 mb-10">
              Subscribe to get exclusive deals, travel tips, and destination
              guides
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors"
              />
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-10 font-semibold whitespace-nowrap shadow-xl"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Join 50,000+ travelers. Unsubscribe anytime.
            </p>
            <div className="absolute top-0 right-0 w-64 h-64 bg-black rounded-full -translate-y-32 translate-x-32" />
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Homepage;
