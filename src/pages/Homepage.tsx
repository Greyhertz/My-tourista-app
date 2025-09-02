import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Search,
  Globe,
  Calendar,
  Users,
  Star,
  ArrowRight,
  MapPin,
  Heart,
  Mountain,
  Backpack,
  Sparkles,
  Building2,
  Bot,
  Headphones,
  Diamond,
  Leaf,
  Zap,
  Crown,
  Plane,
  Ship,
  Camera,
  Map,
  TreePine,
  Compass,
  Mail,
  Clock,
  Shield,
  Award,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const destinationsRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Dark hero background images
  const heroImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
  ];

  // Header hide/show on scroll
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const destinations = [
    {
      name: 'Santorini, Greece',
      description:
        'Whitewashed buildings perched on volcanic cliffs overlooking the azure Aegean Sea',
      image:
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069',
      price: '$1,299',
      duration: '7 days',
      rating: 4.9,
      activities: ['Island Hopping', 'Wine Tasting', 'Sunset Views'],
    },
    {
      name: 'Kyoto, Japan',
      description:
        'Ancient temples, traditional gardens, and the mesmerizing bamboo forest',
      image:
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
      price: '$1,899',
      duration: '10 days',
      rating: 4.8,
      activities: ['Temple Visits', 'Tea Ceremony', 'Cherry Blossoms'],
    },
    {
      name: 'Bali, Indonesia',
      description:
        'Tropical paradise with pristine beaches, lush rice terraces, and vibrant culture',
      image:
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070',
      price: '$999',
      duration: '8 days',
      rating: 4.7,
      activities: ['Beach Relaxation', 'Rice Terraces', 'Cultural Tours'],
    },
    {
      name: 'Machu Picchu, Peru',
      description:
        'Ancient Incan citadel high in the Andes Mountains, a true wonder of the world',
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
      price: '$1,599',
      duration: '9 days',
      rating: 4.9,
      activities: ['Inca Trail', 'Mountain Climbing', 'Ancient History'],
    },
    {
      name: 'Maldives',
      description:
        'Crystal clear waters, overwater bungalows, and pristine coral reefs',
      image:
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
      price: '$2,299',
      duration: '6 days',
      rating: 4.9,
      activities: ['Snorkeling', 'Spa Treatments', 'Water Sports'],
    },
    {
      name: 'Iceland',
      description:
        'Land of fire and ice with stunning waterfalls, geysers, and northern lights',
      image:
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?q=80&w=2070',
      price: '$1,799',
      duration: '8 days',
      rating: 4.8,
      activities: ['Northern Lights', 'Hot Springs', 'Glacier Tours'],
    },
  ];

  const features = [
    {
      title: 'AI-Powered Trip Planning',
      description:
        'Our advanced AI creates personalized itineraries based on your preferences, budget, and travel style',
      icon: Bot,
      stats: '95% satisfaction rate',
    },
    {
      title: '24/7 Concierge Service',
      description:
        'Premium concierge support available around the clock in 40+ languages worldwide',
      icon: Headphones,
      stats: '2-minute response time',
    },
    {
      title: 'Price Match Plus',
      description:
        "We'll match any lower price and give you an extra 10% off, guaranteed",
      icon: Diamond,
      stats: 'Save up to 30%',
    },
    {
      title: 'Carbon Neutral Travel',
      description:
        'All bookings include carbon offset at no extra cost, protecting our planet',
      icon: Leaf,
      stats: '100% carbon neutral',
    },
    {
      title: 'Instant Rebooking',
      description:
        "Flight cancelled? Weather issues? We'll rebook you instantly with no extra fees",
      icon: Zap,
      stats: '99.9% success rate',
    },
    {
      title: 'VIP Access',
      description:
        'Skip the lines with exclusive access to attractions, restaurants, and experiences',
      icon: Crown,
      stats: '500+ VIP partners',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b9f3c0ec?q=80&w=100',
      rating: 5,
      text: 'TravelMate planned our honeymoon to Bali perfectly! Every detail was taken care of, from airport transfers to restaurant reservations. The AI recommendations were spot-on!',
      trip: 'Bali Honeymoon Package',
    },
    {
      name: 'Miguel Rodriguez',
      location: 'Barcelona, Spain',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
      rating: 5,
      text: 'The 24/7 support saved our vacation when our flight got cancelled. They had us rebooked and upgraded within minutes. Absolutely incredible service!',
      trip: 'European Adventure Tour',
    },
    {
      name: 'Priya Patel',
      location: 'Mumbai, India',
      image:
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=100',
      rating: 5,
      text: 'As a solo female traveler, I felt completely safe and supported. The local guides were amazing and the VIP access made everything so seamless.',
      trip: 'Solo Japan Discovery',
    },
    {
      name: 'David Chen',
      location: 'Sydney, Australia',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
      rating: 5,
      text: "We've used TravelMate for 5 family vacations now. The kids love the personalized activities they suggest, and we love the stress-free planning!",
      trip: 'Family Safari Adventure',
    },
  ];

  const travelTypes = [
    {
      type: 'Adventure',
      icon: Mountain,
      count: '2,500+ trips',
    },
    {
      type: 'Romance',
      icon: Heart,
      count: '1,800+ couples',
    },
    {
      type: 'Family',
      icon: Users,
      count: '3,200+ families',
    },
    {
      type: 'Solo',
      icon: Backpack,
      count: '1,500+ explorers',
    },
    {
      type: 'Luxury',
      icon: Sparkles,
      count: '900+ experiences',
    },
    {
      type: 'Cultural',
      icon: Building2,
      count: '2,100+ journeys',
    },
  ];

  const stats = [
    { number: '2.5M', label: 'Happy Travelers', prefix: '+', icon: TrendingUp },
    { number: '150', label: 'Countries', prefix: '', icon: Globe },
    { number: '50K', label: '5-Star Reviews', prefix: '+', icon: Star },
    { number: '15', label: 'Years Experience', prefix: '', icon: Award },
  ];

  // Enhanced scroll-triggered animations
  const ScrollReveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: '-100px',
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0.1, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSubscribe = e => {
    e.preventDefault();
    console.log('Subscribing:', emailSubscription);
    setEmailSubscription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-background dark:from-background dark:via-blue-950/30 dark:to-violet-950/40">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-green-400/10 to-blue-500/10 blur-3xl" />
      </div>

      {/* Hero Section with Dark Background Image */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        {/* Dark Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          }}
        />

        {/* Dark overlays for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
          className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed font-medium"
          >
            From hidden gems to iconic landmarks, create unforgettable memories
            with AI-powered travel experiences crafted just for you.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <Card className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Destination */}
                    <div className="relative">
                      <Label
                        htmlFor="destination"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Destination
                      </Label>
                      <Input
                        id="destination"
                        type="text"
                        placeholder="Where to?"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Globe className="absolute left-3 top-10 h-5 w-5 text-primary" />
                    </div>

                    {/* Check-in */}
                    <div className="relative">
                      <Label
                        htmlFor="checkin"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Check-in
                      </Label>
                      <Input id="checkin" type="date" className="pl-10" />
                      <Calendar className="absolute left-3 top-10 h-5 w-5 text-primary" />
                    </div>

                    {/* Check-out */}
                    <div className="relative">
                      <Label
                        htmlFor="checkout"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Check-out
                      </Label>
                      <Input id="checkout" type="date" className="pl-10" />
                      <Calendar className="absolute left-3 top-10 h-5 w-5 text-primary" />
                    </div>

                    {/* Travelers */}
                    <div className="relative">
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Travelers
                      </Label>
                      <Select>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="1 Adult" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">Family (4+)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Users className="absolute left-3 top-10 h-5 w-5 text-primary" />
                    </div>

                    {/* Search Button */}
                    <div className="flex flex-col justify-end">
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Search Trips
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Popular Searches */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <span className="text-sm text-gray-600">Popular:</span>
                    {['Paris', 'Tokyo', 'Bali', 'Maldives', 'Iceland'].map(
                      city => (
                        <motion.div key={city} whileHover={{ scale: 1.05 }}>
                          <Badge
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                            {city}
                          </Badge>
                        </motion.div>
                      )
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="text-center bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {stat.prefix}
                        {stat.number}
                      </div>
                      <div className="text-white/80 text-sm font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Static floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[
            Plane,
            Ship,
            Camera,
            Map,
            TreePine,
            Building2,
            Mountain,
            Compass,
            MapPin,
            Globe,
            Heart,
            Star,
          ].map((Icon, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>
          ))}
        </div>
      </section>

      {/* Travel Types Section */}
      <section
        id="experiences"
        className="py-32 px-6 bg-gradient-to-br from-muted/50 to-background"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2
                className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-700 via-purple-600 to-red-300
               dark:from-blue-700 dark:via-purple-500 dark:to-pink-600 bg-clip-text text-transparent"
              >
                Travel Your Way
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're seeking adventure, romance, or relaxation, we
                have the perfect journey for you
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {travelTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.05, y: -10 }}>
                  <Card className="text-center bg-card/70 backdrop-blur-sm border-border/50 shadow-lg group cursor-pointer hover:bg-card/90 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <type.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-all duration-300">
                        {type.type}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {type.count}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Destinations */}
      <section
        id="destinations"
        ref={destinationsRef}
        className="py-32 px-6 bg-background"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2
                className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600
               dark:from-blue-800 dark:via-purple-600 dark:to-pink-700 bg-clip-text text-transparent"
              >
                Featured Destinations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hand-picked destinations that promise extraordinary experiences
                and lifelong memories
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {destinations.map((destination, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -15 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer h-96"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                        <Star className="w-3 h-3 text-yellow-300 mr-1" />
                        {destination.rating}
                      </Badge>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                        <Clock className="w-3 h-3 mr-1" />
                        {destination.duration}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                      {destination.name}
                    </h3>

                    <p className="text-white/90 mb-3 text-sm leading-relaxed">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities.map((activity, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs hover:bg-white/30"
                        >
                          {activity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        From {destination.price}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-sm"
                        >
                          Explore
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="about"
        ref={featuresRef}
        className="py-28 px-6 bg-gradient-to-br from-muted/30 to-background"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Why TravelMate
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Premium service, smart planning, and planet-friendly travel —
                all in one place.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.02, y: -5 }}>
                  <Card className="bg-card shadow-lg border-border/50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl mb-4 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <f.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-foreground">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {f.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {f.stats}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels and Bookings */}
      <section className="py-32 px-6 bg-muted/30">
        <div className="container mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
                Hotels & Stays
              </h2>
              <p className="text-xl text-muted-foreground">
                Comfort and luxury await at our partner accommodations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  name: 'Urban Boutique',
                  type: 'Boutique Hotel',
                  icon: Building2,
                },
                { name: 'Seaside Resort', type: 'Luxury Resort', icon: Ship },
                {
                  name: 'Mountain Lodge',
                  type: 'Adventure Lodge',
                  icon: Mountain,
                },
                {
                  name: 'City Apartments',
                  type: 'Modern Suites',
                  icon: MapPin,
                },
              ].map((hotel, idx) => (
                <Card
                  key={idx}
                  className="bg-card backdrop-blur border-border hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <hotel.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {hotel.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        {hotel.type}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        From $120/night
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="blog"
        ref={testimonialsRef}
        className="py-28 px-6 bg-gradient-to-br from-background to-muted/50"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Loved by Travelers
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Real stories from real adventures.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: '10 Hidden Gems in Southeast Asia',
                category: 'Adventure Guide',
                readTime: '8 min read',
                author: 'Sarah Chen',
                date: 'Dec 15, 2024',
                image:
                  'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  'Discover secret beaches, hidden temples, and untouched villages that most tourists never find...',
                tags: ['Southeast Asia', 'Hidden Gems', 'Adventure'],
              },
              {
                title: 'The Ultimate European Food Tour',
                category: 'Food & Culture',
                readTime: '12 min read',
                author: 'Marco Rossi',
                date: 'Dec 12, 2024',
                image:
                  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  "From pasta in Italy to croissants in France, explore Europe's culinary treasures city by city...",
                tags: ['Europe', 'Food', 'Culture'],
              },
              {
                title: 'Solo Female Travel: Safety & Empowerment',
                category: 'Travel Tips',
                readTime: '6 min read',
                author: 'Emma Thompson',
                date: 'Dec 10, 2024',
                image:
                  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  'Essential tips and inspiring stories for women traveling alone around the world...',
                tags: ['Solo Travel', 'Safety', 'Women'],
              },
              {
                title: 'Photography Guide: Capturing Aurora',
                category: 'Photography',
                readTime: '10 min read',
                author: 'Lars Andersen',
                date: 'Dec 8, 2024',
                image:
                  'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  'Master the art of northern lights photography with these professional techniques...',
                tags: ['Photography', 'Northern Lights', 'Nordic'],
              },
              {
                title: 'Budget Backpacking Through Africa',
                category: 'Budget Travel',
                readTime: '15 min read',
                author: 'David Okonkwo',
                date: 'Dec 5, 2024',
                image:
                  'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  "How to explore Africa's wonders on a shoestring budget without compromising on experience...",
                tags: ['Africa', 'Budget', 'Backpacking'],
              },
              {
                title: 'Digital Nomad Hotspots 2025',
                category: 'Remote Work',
                readTime: '9 min read',
                author: 'Alex Kim',
                date: 'Dec 2, 2024',
                image:
                  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop',
                excerpt:
                  'The best destinations for remote workers seeking perfect WiFi, coffee, and community...',
                tags: ['Digital Nomad', 'Remote Work', 'WiFi'],
              },
            ].map((article, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div whileHover={{ scale: 1.03, y: -10 }}>
                  <Card className="overflow-hidden bg-card shadow-lg border-border/50 group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      >
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

 

      {/* Newsletter */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-purple-600 shadow-purple-400 dark:shadow-purple-800">
            <CardContent className="p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Get travel inspiration in your inbox
              </h3>
              <p className="text-muted-foreground mb-8">
                Exclusive deals, new itineraries, and smart tips — no spam, just
                wanderlust.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <div className="relative flex-1 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={emailSubscription}
                    onChange={e => setEmailSubscription(e.target.value)}
                    className="px-4 py-3 pl-10 rounded-lg border-2 border-input focus:border-ring focus:outline-none bg-background w-full"
                  />
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground">
                Your Adventure Awaits
              </h2>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
                Start planning your dream vacation today with personalized
                recommendations, exclusive deals, and 24/7 expert support
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-background text-foreground px-12 py-5 text-lg font-semibold shadow-2xl hover:bg-muted"
                  >
                    <Compass className="w-5 h-5 mr-2" />
                    Plan My Trip
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary-foreground text-primary-foreground px-12 py-5 text-lg font-semibold backdrop-blur-sm hover:bg-primary-foreground/10"
                  >
                    <Headphones className="w-5 h-5 mr-2" />
                    Talk to Expert
                  </Button>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                  <CardContent className="p-4 text-center">
                    <Bot className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
                    <div className="text-sm text-primary-foreground/90 font-medium">
                      AI-Powered Planning
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
                    <div className="text-sm text-primary-foreground/90 font-medium">
                      Best Price Guarantee
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
                    <div className="text-sm text-primary-foreground/90 font-medium">
                      24/7 Global Support
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Static floating travel icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {[
            Plane,
            Ship,
            Camera,
            Map,
            TreePine,
            Building2,
            Mountain,
            Compass,
            Heart,
            Globe,
          ].map((Icon, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${5 + i * 9}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
            >
              <Icon className="h-10 w-10 text-primary-foreground" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;


// import { useState, useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
// import {
//   Search,
//   Globe,
//   Calendar,
//   Users,
//   Star,
//   ArrowRight,
//   MapPin,
//   Heart,
//   Mountain,
//   Backpack,
//   Sparkles,
//   Building2,
//   Bot,
//   Headphones,
//   Diamond,
//   Leaf,
//   Zap,
//   Crown,
//   Plane,
//   Ship,
//   Camera,
//   Map,
//   TreePine,
//   Compass,
//   Mail,
//   Clock,
//   Shield,
//   Award,
//   TrendingUp,
//   CheckCircle2,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// const Homepage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [emailSubscription, setEmailSubscription] = useState('');
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);

//   const { scrollYProgress } = useScroll();
//   const heroRef = useRef(null);
//   const destinationsRef = useRef(null);
//   const featuresRef = useRef(null);
//   const testimonialsRef = useRef(null);

//   // Parallax transforms
//   const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
//   const opacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
//   const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

//   // Dark hero background images
//   const heroImages = [
//     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
//     'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
//     'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
//   ];

//   // Animated text phrases
//   const animatedTexts = [
//     'Discover Your Next Adventure',
//     'Plan New Travels',
//     'Explore Hidden Gems',
//     'Create Lasting Memories',
//     'Chase New Horizons',
//     'Find Your Paradise',
//     'Begin Your Journey'
//   ];

//   // Header hide/show on scroll
//   useEffect(() => {
//     const controlHeader = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY < 100) {
//         setIsHeaderVisible(true);
//       } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsHeaderVisible(false);
//       } else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', controlHeader);
//     return () => window.removeEventListener('scroll', controlHeader);
//   }, [lastScrollY]);

//   // Animated text cycling effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
//     }, 3000); // Change text every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const destinations = [
//     {
//       name: 'Santorini, Greece',
//       description:
//         'Whitewashed buildings perched on volcanic cliffs overlooking the azure Aegean Sea',
//       image:
//         'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069',
//       price: '$1,299',
//       duration: '7 days',
//       rating: 4.9,
//       activities: ['Island Hopping', 'Wine Tasting', 'Sunset Views'],
//     },
//     {
//       name: 'Kyoto, Japan',
//       description:
//         'Ancient temples, traditional gardens, and the mesmerizing bamboo forest',
//       image:
//         'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
//       price: '$1,899',
//       duration: '10 days',
//       rating: 4.8,
//       activities: ['Temple Visits', 'Tea Ceremony', 'Cherry Blossoms'],
//     },
//     {
//       name: 'Bali, Indonesia',
//       description:
//         'Tropical paradise with pristine beaches, lush rice terraces, and vibrant culture',
//       image:
//         'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070',
//       price: '$999',
//       duration: '8 days',
//       rating: 4.7,
//       activities: ['Beach Relaxation', 'Rice Terraces', 'Cultural Tours'],
//     },
//     {
//       name: 'Machu Picchu, Peru',
//       description:
//         'Ancient Incan citadel high in the Andes Mountains, a true wonder of the world',
//       image:
//         'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
//       price: '$1,599',
//       duration: '9 days',
//       rating: 4.9,
//       activities: ['Inca Trail', 'Mountain Climbing', 'Ancient History'],
//     },
//     {
//       name: 'Maldives',
//       description:
//         'Crystal clear waters, overwater bungalows, and pristine coral reefs',
//       image:
//         'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
//       price: '$2,299',
//       duration: '6 days',
//       rating: 4.9,
//       activities: ['Snorkeling', 'Spa Treatments', 'Water Sports'],
//     },
//     {
//       name: 'Iceland',
//       description:
//         'Land of fire and ice with stunning waterfalls, geysers, and northern lights',
//       image:
//         'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?q=80&w=2070',
//       price: '$1,799',
//       duration: '8 days',
//       rating: 4.8,
//       activities: ['Northern Lights', 'Hot Springs', 'Glacier Tours'],
//     },
//   ];

//   const features = [
//     {
//       title: 'AI-Powered Trip Planning',
//       description:
//         'Our advanced AI creates personalized itineraries based on your preferences, budget, and travel style',
//       icon: Bot,
//       stats: '95% satisfaction rate',
//     },
//     {
//       title: '24/7 Concierge Service',
//       description:
//         'Premium concierge support available around the clock in 40+ languages worldwide',
//       icon: Headphones,
//       stats: '2-minute response time',
//     },
//     {
//       title: 'Price Match Plus',
//       description:
//         "We'll match any lower price and give you an extra 10% off, guaranteed",
//       icon: Diamond,
//       stats: 'Save up to 30%',
//     },
//     {
//       title: 'Carbon Neutral Travel',
//       description:
//         'All bookings include carbon offset at no extra cost, protecting our planet',
//       icon: Leaf,
//       stats: '100% carbon neutral',
//     },
//     {
//       title: 'Instant Rebooking',
//       description:
//         "Flight cancelled? Weather issues? We'll rebook you instantly with no extra fees",
//       icon: Zap,
//       stats: '99.9% success rate',
//     },
//     {
//       title: 'VIP Access',
//       description:
//         'Skip the lines with exclusive access to attractions, restaurants, and experiences',
//       icon: Crown,
//       stats: '500+ VIP partners',
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Johnson',
//       location: 'New York, USA',
//       image:
//         'https://images.unsplash.com/photo-1494790108755-2616b9f3c0ec?q=80&w=100',
//       rating: 5,
//       text: 'TravelMate planned our honeymoon to Bali perfectly! Every detail was taken care of, from airport transfers to restaurant reservations. The AI recommendations were spot-on!',
//       trip: 'Bali Honeymoon Package',
//     },
//     {
//       name: 'Miguel Rodriguez',
//       location: 'Barcelona, Spain',
//       image:
//         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
//       rating: 5,
//       text: 'The 24/7 support saved our vacation when our flight got cancelled. They had us rebooked and upgraded within minutes. Absolutely incredible service!',
//       trip: 'European Adventure Tour',
//     },
//     {
//       name: 'Priya Patel',
//       location: 'Mumbai, India',
//       image:
//         'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=100',
//       rating: 5,
//       text: 'As a solo female traveler, I felt completely safe and supported. The local guides were amazing and the VIP access made everything so seamless.',
//       trip: 'Solo Japan Discovery',
//     },
//     {
//       name: 'David Chen',
//       location: 'Sydney, Australia',
//       image:
//         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
//       rating: 5,
//       text: "We've used TravelMate for 5 family vacations now. The kids love the personalized activities they suggest, and we love the stress-free planning!",
//       trip: 'Family Safari Adventure',
//     },
//   ];

//   const travelTypes = [
//     {
//       type: 'Adventure',
//       icon: Mountain,
//       count: '2,500+ trips',
//     },
//     {
//       type: 'Romance',
//       icon: Heart,
//       count: '1,800+ couples',
//     },
//     {
//       type: 'Family',
//       icon: Users,
//       count: '3,200+ families',
//     },
//     {
//       type: 'Solo',
//       icon: Backpack,
//       count: '1,500+ explorers',
//     },
//     {
//       type: 'Luxury',
//       icon: Sparkles,
//       count: '900+ experiences',
//     },
//     {
//       type: 'Cultural',
//       icon: Building2,
//       count: '2,100+ journeys',
//     },
//   ];

//   const stats = [
//     { number: '2.5M', label: 'Happy Travelers', prefix: '+', icon: TrendingUp },
//     { number: '150', label: 'Countries', prefix: '', icon: Globe },
//     { number: '50K', label: '5-Star Reviews', prefix: '+', icon: Star },
//     { number: '15', label: 'Years Experience', prefix: '', icon: Award },
//   ];

//   // Enhanced scroll-triggered animations
//   const ScrollReveal = ({ children, delay = 0 }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, {
//       once: true,
//       margin: '-100px',
//     });

//     return (
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0.1, y: 50 }}
//         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//         transition={{ duration: 0.6, delay }}
//       >
//         {children}
//       </motion.div>
//     );
//   };

//   const handleSearch = e => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   const handleSubscribe = e => {
//     e.preventDefault();
//     console.log('Subscribing:', emailSubscription);
//     setEmailSubscription('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-300 to-background dark:from-background dark:via-blue-950/30 dark:to-violet-950/40">
//       {/* Floating Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 blur-3xl animate-pulse" />
//         <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-3xl" />
//         <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-green-400/10 to-blue-500/10 blur-3xl" />
//       </div>

//       {/* Hero Section with Dark Background Image */}
//       <section
//         ref={heroRef}
//         className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
//       >
//         {/* Dark Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ 
//             backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
//           }}
//         />
        
//         {/* Dark overlays for better text contrast */}
//         <div className="absolute inset-0 bg-black/60" />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

//         <motion.div
//           style={{ y: y1, opacity: opacity1, scale: scale1 }}
//           className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
//         />

//         <div className="container mx-auto text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
//               <AnimatePresence mode="wait">
//                 <motion.span
//                   key={currentTextIndex}
//                   initial={{ opacity: 0, y: 50, scale: 0.8 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: -50, scale: 0.8 }}
//                   transition={{ duration: 0.8, ease: "easeInOut" }}
//                   className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
//                 >
//                   {animatedTexts[currentTextIndex]}
//                 </motion.span>
//               </AnimatePresence>
//             </h1>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed font-medium"
//           >
//             From hidden gems to iconic landmarks, create unforgettable memories
//             with AI-powered travel experiences crafted just for you.
//           </motion.p>

//           {/* Enhanced Search Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.8 }}
//             className="max-w-5xl mx-auto mb-16"
//           >
//             <Card className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
//               <CardContent className="p-8">
//                 <form onSubmit={handleSearch}>
//                   <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//                     {/* Destination */}
//                     <div className="relative">
//                       <Label
//                         htmlFor="destination"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Destination
//                       </Label>
//                       <Input
//                         id="destination"
//                         type="text"
//                         placeholder="Where to?"
//                         value={searchQuery}
//                         onChange={e => setSearchQuery(e.target.value)}
//                         className="pl-10"
//                       />
//                       <Globe className="absolute left-3 top-10 h-5 w-5 text-primary" />
//                     </div>

//                     {/* Check-in */}
//                     <div className="relative">
//                       <Label
//                         htmlFor="checkin"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Check-in
//                       </Label>
//                       <Input id="checkin" type="date" className="pl-10" />
//                       <Calendar className="absolute left-3 top-10 h-5 w-5 text-primary" />
//                     </div>

//                     {/* Check-out */}
//                     <div className="relative">
//                       <Label
//                         htmlFor="checkout"
//                         className="block text-sm font-medium text-gray-700 mb-2"
//                       >
//                         Check-out
//                       </Label>
//                       <Input id="checkout" type="date" className="pl-10" />
//                       <Calendar className="absolute left-3 top-10 h-5 w-5 text-primary" />
//                     </div>

//                     {/* Travelers */}
//                     <div className="relative">
//                       <Label className="block text-sm font-medium text-gray-700 mb-2">
//                         Travelers
//                       </Label>
//                       <Select>
//                         <SelectTrigger className="pl-10">
//                           <SelectValue placeholder="1 Adult" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="1">1 Adult</SelectItem>
//                           <SelectItem value="2">2 Adults</SelectItem>
//                           <SelectItem value="3">3 Adults</SelectItem>
//                           <SelectItem value="4">Family (4+)</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <Users className="absolute left-3 top-10 h-5 w-5 text-primary" />
//                     </div>

//                     {/* Search Button */}
//                     <div className="flex flex-col justify-end">
//                       <motion.div
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button
//                           type="submit"
//                           className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
//                         >
//                           <Search className="w-4 h-4 mr-2" />
//                           Search Trips
//                         </Button>
//                       </motion.div>
//                     </div>
//                   </div>

//                   {/* Popular Searches */}
//                   <div className="mt-6 flex flex-wrap gap-3 justify-center">
//                     <span className="text-sm text-gray-600">
//                       Popular:
//                     </span>
//                     {['Paris', 'Tokyo', 'Bali', 'Maldives', 'Iceland'].map(
//                       city => (
//                         <motion.div key={city} whileHover={{ scale: 1.05 }}>
//                           <Badge
//                             variant="secondary"
//                             className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//                           >
//                             {city}
//                           </Badge>
//                         </motion.div>
//                       )
//                     )}
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Enhanced Stats */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.5, delay: 1.2 }}
//             className="mt-20"
//           >
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                 >
//                   <Card className="text-center bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
//                     <CardContent className="p-6">
//                       <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
//                         <stat.icon className="h-6 w-6 text-white" />
//                       </div>
//                       <div className="text-3xl md:text-4xl font-bold text-white mb-2">
//                         {stat.prefix}
//                         {stat.number}
//                       </div>
//                       <div className="text-white/80 text-sm font-medium">
//                         {stat.label}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Static floating elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           {[
//             Plane,
//             Ship,
//             Camera,
//             Map,
//             TreePine,
//             Building2,
//             Mountain,
//             Compass,
//             MapPin,
//             Globe,
//             Heart,
//             Star,
//           ].map((Icon, i) => (
//             <div
//               key={i}
//               className="absolute animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//             >
//               <Icon className="h-8 w-8 text-white" />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Travel Types Section */}
//       <section
//         id="experiences"
//         className="py-32 px-6 bg-gradient-to-br from-muted/50 to-background"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-20">
//               <h2
//                 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-700 via-purple-600 to-red-300
//                dark:from-blue-700 dark:via-purple-500 dark:to-pink-600 bg-clip-text text-transparent"
//               >
//                 Travel Your Way
//               </h2>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Whether you're seeking adventure, romance, or relaxation, we
//                 have the perfect journey for you
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {travelTypes.map((type, index) => (
//               <ScrollReveal key={index} delay={index * 0.1}>
//                 <motion.div whileHover={{ scale: 1.05, y: -10 }}>
//                   <Card className="text-center bg-card/70 backdrop-blur-sm border-border/50 shadow-lg group cursor-pointer hover:bg-card/90 transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                         <type.icon className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-all duration-300">
//                         {type.type}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         {type.count}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Featured Destinations */}
//       <section
//         id="destinations"
//         ref={destinationsRef}
//         className="py-32 px-6 bg-background"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-20">
//               <h2
//                 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600
//                dark:from-blue-800 dark:via-purple-600 dark:to-pink-700 bg-clip-text text-transparent"
//               >
//                 Featured Destinations
//               </h2>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Hand-picked destinations that promise extraordinary experiences
//                 and lifelong memories
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//             {destinations.map((destination, index) => (
//               <ScrollReveal key={index} delay={index * 0.15}>
//                 <motion.div
//                   whileHover={{ scale: 1.03, y: -15 }}
//                   className="relative overflow-hidden rounded-3xl shadow-2xl group cursor-pointer h-96"
//                 >
//                   <img
//                     src={destination.image}
//                     alt={destination.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>

//                   <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
//                     <div className="flex items-center justify-between mb-3">
//                       <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
//                         <Star className="w-3 h-3 text-yellow-300 mr-1" />
//                         {destination.rating}
//                       </Badge>
//                       <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
//                         <Clock className="w-3 h-3 mr-1" />
//                         {destination.duration}
//                       </Badge>
//                     </div>

//                     <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
//                       {destination.name}
//                     </h3>

//                     <p className="text-white/90 mb-3 text-sm leading-relaxed">
//                       {destination.description}
//                     </p>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {destination.activities.map((activity, idx) => (
//                         <Badge
//                           key={idx}
//                           variant="secondary"
//                           className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs hover:bg-white/30"
//                         >
//                           {activity}
//                         </Badge>
//                       ))}
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-bold">
//                         From {destination.price}
//                       </span>
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button
//                           variant="ghost"
//                           className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 text-sm"
//                         >
//                           Explore
//                           <ArrowRight className="w-4 h-4 ml-2" />
//                         </Button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section
//         id="about"
//         ref={featuresRef}
//         className="py-28 px-6 bg-gradient-to-br from-muted/30 to-background"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
//                 Why TravelMate
//               </h2>
//               <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
//                 Premium service, smart planning, and planet-friendly travel —
//                 all in one place.
//               </p>
//             </div>
//           </ScrollReveal>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {features.map((f, i) => (
//               <ScrollReveal key={f.title} delay={i * 0.08}>
//                 <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//                   <Card className="bg-card shadow-lg border-border/50 hover:shadow-xl transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="w-12 h-12 rounded-xl mb-4 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
//                         <f.icon className="h-6 w-6 text-white" />
//                       </div>
//                       <h3 className="font-bold text-lg mb-2 text-foreground">
//                         {f.title}
//                       </h3>
//                       <p className="text-muted-foreground text-sm mb-3">
//                         {f.description}
//                       </p>
//                       <Badge
//                         variant="secondary"
//                         className="text-xs font-semibold"
//                       >
//                         <CheckCircle2 className="w-3 h-3 mr-1" />
//                         {f.stats}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Travel Packages Section */}
//       <section className="py-32 px-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-20">
//               <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Curated Travel Packages
//               </h2>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Hand-crafted experiences combining flights, hotels, and unique activities
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
//             {[
//               {
//                 title: "European Grand Tour",
//                 duration: "14 Days",
//                 price: "$3,499",
//                 originalPrice: "$4,200",
//                 image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["France", "Italy", "Switzerland", "Austria"],
//                 highlights: ["Eiffel Tower", "Colosseum", "Alps", "Vienna Palace"],
//                 rating: 4.9,
//                 reviews: 847
//               },
//               {
//                 title: "Asian Adventure",
//                 duration: "12 Days", 
//                 price: "$2,799",
//                 originalPrice: "$3,400",
//                 image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["Japan", "Thailand", "Vietnam"],
//                 highlights: ["Tokyo Temples", "Bangkok Markets", "Ha Long Bay"],
//                 rating: 4.8,
//                 reviews: 623
//               },
//               {
//                 title: "African Safari",
//                 duration: "10 Days",
//                 price: "$4,299",
//                 originalPrice: "$5,100", 
//                 image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["Kenya", "Tanzania"],
//                 highlights: ["Serengeti", "Masai Mara", "Kilimanjaro", "Ngorongoro"],
//                 rating: 4.9,
//                 reviews: 412
//               },
//               {
//                 title: "South American Discovery",
//                 duration: "16 Days",
//                 price: "$3,899", 
//                 originalPrice: "$4,600",
//                 image: "https://images.unsplash.com/photo-1531065208531-4036c0dba3d5?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["Peru", "Chile", "Argentina"],
//                 highlights: ["Machu Picchu", "Atacama Desert", "Patagonia", "Buenos Aires"],
//                 rating: 4.8,
//                 reviews: 356
//               },
//               {
//                 title: "Mediterranean Cruise",
//                 duration: "8 Days",
//                 price: "$2,199",
//                 originalPrice: "$2,800",
//                 image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["Spain", "Italy", "Greece", "Turkey"],
//                 highlights: ["Barcelona", "Rome", "Santorini", "Istanbul"],
//                 rating: 4.7,
//                 reviews: 934
//               },
//               {
//                 title: "Nordic Northern Lights",
//                 duration: "7 Days",
//                 price: "$2,999",
//                 originalPrice: "$3,500",
//                 image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
//                 countries: ["Norway", "Iceland", "Finland"],
//                 highlights: ["Aurora Borealis", "Fjords", "Ice Hotels", "Reindeer"],
//                 rating: 4.9,
//                 reviews: 289
//               }
//             ].map((pkg, index) => (
//               <ScrollReveal key={index} delay={index * 0.1}>
//                 <motion.div whileHover={{ scale: 1.02, y: -8 }}>
//                   <Card className="overflow-hidden bg-card shadow-xl border-0 group cursor-pointer h-[500px]">
//                     <div className="relative h-64 overflow-hidden">
//                       <img
//                         src={pkg.image}
//                         alt={pkg.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                       <div className="absolute top-4 left-4 flex gap-2">
//                         <Badge className="bg-red-500 text-white">
//                           Save ${parseInt(pkg.originalPrice.replace('
//         <div className="container mx-auto">
//           <ScrollReveal delay={0.2}>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
//                 Hotels & Stays
//               </h2>
//               <p className="text-xl text-muted-foreground">
//                 Comfort and luxury await at our partner accommodations
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {[
//                 {
//                   name: 'Urban Boutique',
//                   type: 'Boutique Hotel',
//                   icon: Building2,
//                 },
//                 { name: 'Seaside Resort', type: 'Luxury Resort', icon: Ship },
//                 {
//                   name: 'Mountain Lodge',
//                   type: 'Adventure Lodge',
//                   icon: Mountain,
//                 },
//                 {
//                   name: 'City Apartments',
//                   type: 'Modern Suites',
//                   icon: MapPin,
//                 },
//               ].map((hotel, idx) => (
//                 <Card
//                   key={idx}
//                   className="bg-card backdrop-blur border-border hover:shadow-lg transition-all duration-300"
//                 >
//                   <CardContent className="p-5 flex items-center gap-4">
//                     <div className="h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//                       <hotel.icon className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-foreground">
//                         {hotel.name}
//                       </h4>
//                       <p className="text-sm text-muted-foreground mb-1">
//                         {hotel.type}
//                       </p>
//                       <p className="text-sm font-medium text-primary">
//                         From $120/night
//                       </p>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       <ArrowRight className="w-4 h-4" />
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         id="blog"
//         ref={testimonialsRef}
//         className="py-28 px-6 bg-gradient-to-br from-background to-muted/50"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
//                 Loved by Travelers
//               </h2>
//               <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
//                 Real stories from real adventures.
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {testimonials.map((t, i) => (
//               <ScrollReveal key={t.name} delay={i * 0.08}>
//                 <motion.div whileHover={{ y: -6, scale: 1.01 }}>
//                   <Card className="bg-card shadow-xl border-border/50 hover:shadow-2xl transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-center space-x-3 mb-4">
//                         <img
//                           src={t.image}
//                           alt={t.name}
//                           className="w-12 h-12 rounded-full object-cover border-2 border-border"
//                         />
//                         <div>
//                           <div className="font-semibold text-foreground">
//                             {t.name}
//                           </div>
//                           <div className="text-xs text-muted-foreground flex items-center">
//                             <MapPin className="w-3 h-3 mr-1" />
//                             {t.location}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center mb-2">
//                         {Array.from({ length: t.rating }).map((_, idx) => (
//                           <Star
//                             key={idx}
//                             className="w-4 h-4 text-yellow-400 fill-current"
//                           />
//                         ))}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
//                         "{t.text}"
//                       </p>
//                       <Badge variant="outline" className="text-xs">
//                         <Plane className="w-3 h-3 mr-1" />
//                         Trip: {t.trip}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="py-24 px-6 bg-background">
//         <div className="container mx-auto">
//           <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-purple-600 shadow-purple-400 dark:shadow-purple-800">
//             <CardContent className="p-10 text-center">
//               <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
//                 <Mail className="h-8 w-8 text-white" />
//               </div>
//               <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 Get travel inspiration in your inbox
//               </h3>
//               <p className="text-muted-foreground mb-8">
//                 Exclusive deals, new itineraries, and smart tips — no spam, just
//                 wanderlust.
//               </p>
//               <form
//                 onSubmit={handleSubscribe}
//                 className="flex flex-col sm:flex-row gap-3 justify-center"
//               >
//                 <div className="relative flex-1 max-w-md">
//                   <input
//                     type="email"
//                     required
//                     placeholder="you@example.com"
//                     value={emailSubscription}
//                     onChange={e => setEmailSubscription(e.target.value)}
//                     className="px-4 py-3 pl-10 rounded-lg border-2 border-input focus:border-ring focus:outline-none bg-background w-full"
//                   />
//                   <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <Button
//                     type="submit"
//                     className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
//                   >
//                     <ArrowRight className="w-4 h-4 mr-2" />
//                     Subscribe
//                   </Button>
//                 </motion.div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-32 px-6 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
//         <div className="container mx-auto text-center relative z-10">
//           <ScrollReveal>
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground">
//                 Your Adventure Awaits
//               </h2>
//               <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
//                 Start planning your dream vacation today with personalized
//                 recommendations, exclusive deals, and 24/7 expert support
//               </p>

//               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="lg"
//                     className="bg-background text-foreground px-12 py-5 text-lg font-semibold shadow-2xl hover:bg-muted"
//                   >
//                     <Compass className="w-5 h-5 mr-2" />
//                     Plan My Trip
//                   </Button>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="border-2 border-primary-foreground text-primary-foreground px-12 py-5 text-lg font-semibold backdrop-blur-sm hover:bg-primary-foreground/10"
//                   >
//                     <Headphones className="w-5 h-5 mr-2" />
//                     Talk to Expert
//                   </Button>
//                 </motion.div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Bot className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       AI-Powered Planning
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       Best Price Guarantee
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Globe className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       24/7 Global Support
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </ScrollReveal>
//         </div>

//         {/* Static floating travel icons */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           {[
//             Plane,
//             Ship,
//             Camera,
//             Map,
//             TreePine,
//             Building2,
//             Mountain,
//             Compass,
//             Heart,
//             Globe,
//           ].map((Icon, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 left: `${5 + i * 9}%`,
//                 top: `${15 + (i % 3) * 25}%`,
//               }}
//             >
//               <Icon className="h-10 w-10 text-primary-foreground" />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

//  , '').replace(',', '')) - parseInt(pkg.price.replace('
//         <div className="container mx-auto">
//           <ScrollReveal delay={0.2}>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
//                 Hotels & Stays
//               </h2>
//               <p className="text-xl text-muted-foreground">
//                 Comfort and luxury await at our partner accommodations
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {[
//                 {
//                   name: 'Urban Boutique',
//                   type: 'Boutique Hotel',
//                   icon: Building2,
//                 },
//                 { name: 'Seaside Resort', type: 'Luxury Resort', icon: Ship },
//                 {
//                   name: 'Mountain Lodge',
//                   type: 'Adventure Lodge',
//                   icon: Mountain,
//                 },
//                 {
//                   name: 'City Apartments',
//                   type: 'Modern Suites',
//                   icon: MapPin,
//                 },
//               ].map((hotel, idx) => (
//                 <Card
//                   key={idx}
//                   className="bg-card backdrop-blur border-border hover:shadow-lg transition-all duration-300"
//                 >
//                   <CardContent className="p-5 flex items-center gap-4">
//                     <div className="h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//                       <hotel.icon className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-foreground">
//                         {hotel.name}
//                       </h4>
//                       <p className="text-sm text-muted-foreground mb-1">
//                         {hotel.type}
//                       </p>
//                       <p className="text-sm font-medium text-primary">
//                         From $120/night
//                       </p>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       <ArrowRight className="w-4 h-4" />
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         id="blog"
//         ref={testimonialsRef}
//         className="py-28 px-6 bg-gradient-to-br from-background to-muted/50"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
//                 Loved by Travelers
//               </h2>
//               <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
//                 Real stories from real adventures.
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {testimonials.map((t, i) => (
//               <ScrollReveal key={t.name} delay={i * 0.08}>
//                 <motion.div whileHover={{ y: -6, scale: 1.01 }}>
//                   <Card className="bg-card shadow-xl border-border/50 hover:shadow-2xl transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-center space-x-3 mb-4">
//                         <img
//                           src={t.image}
//                           alt={t.name}
//                           className="w-12 h-12 rounded-full object-cover border-2 border-border"
//                         />
//                         <div>
//                           <div className="font-semibold text-foreground">
//                             {t.name}
//                           </div>
//                           <div className="text-xs text-muted-foreground flex items-center">
//                             <MapPin className="w-3 h-3 mr-1" />
//                             {t.location}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center mb-2">
//                         {Array.from({ length: t.rating }).map((_, idx) => (
//                           <Star
//                             key={idx}
//                             className="w-4 h-4 text-yellow-400 fill-current"
//                           />
//                         ))}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
//                         "{t.text}"
//                       </p>
//                       <Badge variant="outline" className="text-xs">
//                         <Plane className="w-3 h-3 mr-1" />
//                         Trip: {t.trip}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="py-24 px-6 bg-background">
//         <div className="container mx-auto">
//           <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-purple-600 shadow-purple-400 dark:shadow-purple-800">
//             <CardContent className="p-10 text-center">
//               <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
//                 <Mail className="h-8 w-8 text-white" />
//               </div>
//               <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 Get travel inspiration in your inbox
//               </h3>
//               <p className="text-muted-foreground mb-8">
//                 Exclusive deals, new itineraries, and smart tips — no spam, just
//                 wanderlust.
//               </p>
//               <form
//                 onSubmit={handleSubscribe}
//                 className="flex flex-col sm:flex-row gap-3 justify-center"
//               >
//                 <div className="relative flex-1 max-w-md">
//                   <input
//                     type="email"
//                     required
//                     placeholder="you@example.com"
//                     value={emailSubscription}
//                     onChange={e => setEmailSubscription(e.target.value)}
//                     className="px-4 py-3 pl-10 rounded-lg border-2 border-input focus:border-ring focus:outline-none bg-background w-full"
//                   />
//                   <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <Button
//                     type="submit"
//                     className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
//                   >
//                     <ArrowRight className="w-4 h-4 mr-2" />
//                     Subscribe
//                   </Button>
//                 </motion.div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-32 px-6 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
//         <div className="container mx-auto text-center relative z-10">
//           <ScrollReveal>
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground">
//                 Your Adventure Awaits
//               </h2>
//               <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
//                 Start planning your dream vacation today with personalized
//                 recommendations, exclusive deals, and 24/7 expert support
//               </p>

//               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="lg"
//                     className="bg-background text-foreground px-12 py-5 text-lg font-semibold shadow-2xl hover:bg-muted"
//                   >
//                     <Compass className="w-5 h-5 mr-2" />
//                     Plan My Trip
//                   </Button>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="border-2 border-primary-foreground text-primary-foreground px-12 py-5 text-lg font-semibold backdrop-blur-sm hover:bg-primary-foreground/10"
//                   >
//                     <Headphones className="w-5 h-5 mr-2" />
//                     Talk to Expert
//                   </Button>
//                 </motion.div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Bot className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       AI-Powered Planning
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       Best Price Guarantee
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Globe className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       24/7 Global Support
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </ScrollReveal>
//         </div>

//         {/* Static floating travel icons */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           {[
//             Plane,
//             Ship,
//             Camera,
//             Map,
//             TreePine,
//             Building2,
//             Mountain,
//             Compass,
//             Heart,
//             Globe,
//           ].map((Icon, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 left: `${5 + i * 9}%`,
//                 top: `${15 + (i % 3) * 25}%`,
//               }}
//             >
//               <Icon className="h-10 w-10 text-primary-foreground" />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Homepage; , '').replace(',', ''))}
//                         </Badge>
//                         <Badge className="bg-green-500 text-white">
//                           {pkg.duration}
//                         </Badge>
//                       </div>
//                       <div className="absolute top-4 right-4">
//                         <Badge className="bg-white/90 text-gray-800">
//                           <Star className="w-3 h-3 text-yellow-500 mr-1" />
//                           {pkg.rating} ({pkg.reviews})
//                         </Badge>
//                       </div>
//                     </div>
                    
//                     <CardContent className="p-6">
//                       <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
//                         {pkg.title}
//                       </h3>
                      
//                       <div className="flex flex-wrap gap-1 mb-3">
//                         {pkg.countries.map((country, idx) => (
//                           <Badge key={idx} variant="outline" className="text-xs">
//                             {country}
//                           </Badge>
//                         ))}
//                       </div>

//                       <div className="text-sm text-muted-foreground mb-4">
//                         <div className="font-medium mb-1">Highlights:</div>
//                         <div className="flex flex-wrap gap-1">
//                           {pkg.highlights.slice(0, 3).map((highlight, idx) => (
//                             <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
//                               {highlight}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="text-2xl font-bold text-primary">{pkg.price}</span>
//                           <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
//                         </div>
//                         <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
//                           Book Now
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Travel Blog/Inspiration Section */}
//       <section className="py-32 px-6 bg-background">
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-20">
//               <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//                 Travel Inspiration
//               </h2>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//                 Stories, guides, and insider tips from fellow travelers and local experts
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//             {[
//               {
//                 title: "10 Hidden Gems in Southeast Asia",
//                 category: "Adventure Guide",
//                 readTime: "8 min read",
//                 author: "Sarah Chen",
//                 date: "Dec 15, 2024",
//                 image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop",
//                 excerpt: "Discover secret beaches, hidden temples, and untouched villages that most tourists never find...",
//                 tags: ["Southeast Asia", "Hidden Gems", "Adventure"]
//               },
//               {
//                 title: "The Ultimate European Food Tour",
//                 category: "Food & Culture", 
//                 readTime: "12 min read",
//                 author: "Marco Rossi",
//                 date: "Dec 12, 2024",
//                 image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop",
//                 excerpt: "From pasta in Italy to croissants in France, explore Europe's culinary treasures city by city...",
//                 tags: ["Europe", "Food", "Culture"]
//               },
//               {
//                 title: "Solo Female Travel: Safety & Empowerment",
//                 category: "Travel Tips",
//                 readTime: "6 min read", 
//                 author: "Emma Thompson",
//                 date: "Dec 10, 2024",
//                 image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop",
//                 excerpt: "Essential tips and inspiring stories for women traveling alone around the world...",
//                 tags: ["Solo Travel", "Safety", "Women"]
//               },
//               {
//                 title: "Photography Guide: Capturing Aurora",
//                 category: "Photography",
//                 readTime: "10 min read",
//                 author: "Lars Andersen", 
//                 date: "Dec 8, 2024",
//                 image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070&auto=format&fit=crop",
//                 excerpt: "Master the art of northern lights photography with these professional techniques...",
//                 tags: ["Photography", "Northern Lights", "Nordic"]
//               },
//               {
//                 title: "Budget Backpacking Through Africa",
//                 category: "Budget Travel",
//                 readTime: "15 min read",
//                 author: "David Okonkwo",
//                 date: "Dec 5, 2024", 
//                 image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2070&auto=format&fit=crop",
//                 excerpt: "How to explore Africa's wonders on a shoestring budget without compromising on experience...",
//                 tags: ["Africa", "Budget", "Backpacking"]
//               },
//               {
//                 title: "Digital Nomad Hotspots 2025",
//                 category: "Remote Work",
//                 readTime: "9 min read",
//                 author: "Alex Kim",
//                 date: "Dec 2, 2024",
//                 image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop", 
//                 excerpt: "The best destinations for remote workers seeking perfect WiFi, coffee, and community...",
//                 tags: ["Digital Nomad", "Remote Work", "WiFi"]
//               }
//             ].map((article, index) => (
//               <ScrollReveal key={index} delay={index * 0.1}>
//                 <motion.div whileHover={{ scale: 1.03, y: -10 }}>
//                   <Card className="overflow-hidden bg-card shadow-lg border-border/50 group cursor-pointer hover:shadow-xl transition-all duration-300">
//                     <div className="relative h-48 overflow-hidden">
//                       <img
//                         src={article.image}
//                         alt={article.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                       <div className="absolute top-4 left-4">
//                         <Badge className="bg-primary text-primary-foreground">
//                           {article.category}
//                         </Badge>
//                       </div>
//                     </div>
                    
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
//                         <span>{article.author}</span>
//                         <span>•</span>
//                         <span>{article.date}</span>
//                         <span>•</span>
//                         <span>{article.readTime}</span>
//                       </div>
                      
//                       <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
//                         {article.title}
//                       </h3>
                      
//                       <p className="text-sm text-muted-foreground mb-4">
//                         {article.excerpt}
//                       </p>

//                       <div className="flex flex-wrap gap-1 mb-4">
//                         {article.tags.map((tag, idx) => (
//                           <Badge key={idx} variant="secondary" className="text-xs">
//                             {tag}
//                           </Badge>
//                         ))}
//                       </div>

//                       <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
//                         Read More <ArrowRight className="w-3 h-3 ml-1" />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>

//           <div className="text-center mt-16">
//             <Button size="lg" variant="outline" className="px-8 py-3">
//               View All Articles <ArrowRight className="w-4 h-4 ml-2" />
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Hotels and Bookings */}
//       <section className="py-32 px-6 bg-muted/30">
//         <div className="container mx-auto">
//           <ScrollReveal delay={0.2}>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
//                 Hotels & Stays
//               </h2>
//               <p className="text-xl text-muted-foreground">
//                 Comfort and luxury await at our partner accommodations
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//               {[
//                 {
//                   name: 'Urban Boutique',
//                   type: 'Boutique Hotel',
//                   icon: Building2,
//                 },
//                 { name: 'Seaside Resort', type: 'Luxury Resort', icon: Ship },
//                 {
//                   name: 'Mountain Lodge',
//                   type: 'Adventure Lodge',
//                   icon: Mountain,
//                 },
//                 {
//                   name: 'City Apartments',
//                   type: 'Modern Suites',
//                   icon: MapPin,
//                 },
//               ].map((hotel, idx) => (
//                 <Card
//                   key={idx}
//                   className="bg-card backdrop-blur border-border hover:shadow-lg transition-all duration-300"
//                 >
//                   <CardContent className="p-5 flex items-center gap-4">
//                     <div className="h-16 w-24 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
//                       <hotel.icon className="h-8 w-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-foreground">
//                         {hotel.name}
//                       </h4>
//                       <p className="text-sm text-muted-foreground mb-1">
//                         {hotel.type}
//                       </p>
//                       <p className="text-sm font-medium text-primary">
//                         From $120/night
//                       </p>
//                     </div>
//                     <Button variant="outline" size="sm">
//                       <ArrowRight className="w-4 h-4" />
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </ScrollReveal>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         id="blog"
//         ref={testimonialsRef}
//         className="py-28 px-6 bg-gradient-to-br from-background to-muted/50"
//       >
//         <div className="container mx-auto">
//           <ScrollReveal>
//             <div className="text-center mb-16">
//               <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
//                 Loved by Travelers
//               </h2>
//               <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
//                 Real stories from real adventures.
//               </p>
//             </div>
//           </ScrollReveal>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {testimonials.map((t, i) => (
//               <ScrollReveal key={t.name} delay={i * 0.08}>
//                 <motion.div whileHover={{ y: -6, scale: 1.01 }}>
//                   <Card className="bg-card shadow-xl border-border/50 hover:shadow-2xl transition-all duration-300">
//                     <CardContent className="p-6">
//                       <div className="flex items-center space-x-3 mb-4">
//                         <img
//                           src={t.image}
//                           alt={t.name}
//                           className="w-12 h-12 rounded-full object-cover border-2 border-border"
//                         />
//                         <div>
//                           <div className="font-semibold text-foreground">
//                             {t.name}
//                           </div>
//                           <div className="text-xs text-muted-foreground flex items-center">
//                             <MapPin className="w-3 h-3 mr-1" />
//                             {t.location}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center mb-2">
//                         {Array.from({ length: t.rating }).map((_, idx) => (
//                           <Star
//                             key={idx}
//                             className="w-4 h-4 text-yellow-400 fill-current"
//                           />
//                         ))}
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
//                         "{t.text}"
//                       </p>
//                       <Badge variant="outline" className="text-xs">
//                         <Plane className="w-3 h-3 mr-1" />
//                         Trip: {t.trip}
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="py-24 px-6 bg-background">
//         <div className="container mx-auto">
//           <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-purple-600 shadow-purple-400 dark:shadow-purple-800">
//             <CardContent className="p-10 text-center">
//               <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
//                 <Mail className="h-8 w-8 text-white" />
//               </div>
//               <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
//                 Get travel inspiration in your inbox
//               </h3>
//               <p className="text-muted-foreground mb-8">
//                 Exclusive deals, new itineraries, and smart tips — no spam, just
//                 wanderlust.
//               </p>
//               <form
//                 onSubmit={handleSubscribe}
//                 className="flex flex-col sm:flex-row gap-3 justify-center"
//               >
//                 <div className="relative flex-1 max-w-md">
//                   <input
//                     type="email"
//                     required
//                     placeholder="you@example.com"
//                     value={emailSubscription}
//                     onChange={e => setEmailSubscription(e.target.value)}
//                     className="px-4 py-3 pl-10 rounded-lg border-2 border-input focus:border-ring focus:outline-none bg-background w-full"
//                   />
//                   <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                 >
//                   <Button
//                     type="submit"
//                     className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
//                   >
//                     <ArrowRight className="w-4 h-4 mr-2" />
//                     Subscribe
//                   </Button>
//                 </motion.div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-32 px-6 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
//         <div className="container mx-auto text-center relative z-10">
//           <ScrollReveal>
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-5xl md:text-7xl font-bold mb-8 text-primary-foreground">
//                 Your Adventure Awaits
//               </h2>
//               <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
//                 Start planning your dream vacation today with personalized
//                 recommendations, exclusive deals, and 24/7 expert support
//               </p>

//               <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="lg"
//                     className="bg-background text-foreground px-12 py-5 text-lg font-semibold shadow-2xl hover:bg-muted"
//                   >
//                     <Compass className="w-5 h-5 mr-2" />
//                     Plan My Trip
//                   </Button>
//                 </motion.div>

//                 <motion.div
//                   whileHover={{ scale: 1.05, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     className="border-2 border-primary-foreground text-primary-foreground px-12 py-5 text-lg font-semibold backdrop-blur-sm hover:bg-primary-foreground/10"
//                   >
//                     <Headphones className="w-5 h-5 mr-2" />
//                     Talk to Expert
//                   </Button>
//                 </motion.div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Bot className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       AI-Powered Planning
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Shield className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       Best Price Guarantee
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20">
//                   <CardContent className="p-4 text-center">
//                     <Globe className="w-8 h-8 mx-auto mb-2 text-primary-foreground" />
//                     <div className="text-sm text-primary-foreground/90 font-medium">
//                       24/7 Global Support
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </ScrollReveal>
//         </div>

//         {/* Static floating travel icons */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
//           {[
//             Plane,
//             Ship,
//             Camera,
//             Map,
//             TreePine,
//             Building2,
//             Mountain,
//             Compass,
//             Heart,
//             Globe,
//           ].map((Icon, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 left: `${5 + i * 9}%`,
//                 top: `${15 + (i % 3) * 25}%`,
//               }}
//             >
//               <Icon className="h-10 w-10 text-primary-foreground" />
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Homepage;