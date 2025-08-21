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
import { Label } from '@radix-ui/react-dropdown-menu';

const Homepage = () => {
  const [setActiveDestination] = useState(0);
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

  // Hero images for background rotation
  const heroImages = [
    'https://images.unsplash.com/photo-1488646953014-85cb25828?q=80&w=2070',
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070',
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?q=80&w=2070',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070',
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
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-violet-50/40 dark:from-background dark:via-blue-950/30 dark:to-violet-950/40">
      {/* Floating Background Elements - Theme Responsive */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-green-400/10 to-blue-500/10 blur-3xl" />
      </div>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden bg-secondary"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${heroImages[0]})` }}
        />

        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-700 to-black bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-700 to-black bg-clip-text text-transparent">
                Your Next
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-700 to-black bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground leading-relaxed font-medium"
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
            <Card className="bg-card/90 backdrop-blur-xl border border-border shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Destination */}
                    <div className="relative">
                      <Label
                        htmlFor="destination"
                        className="block text-sm font-medium text-muted-foreground mb-2"
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
                        className="block text-sm font-medium text-muted-foreground mb-2"
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
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        Check-out
                      </Label>
                      <Input id="checkout" type="date" className="pl-10" />
                      <Calendar className="absolute left-3 top-10 h-5 w-5 text-primary" />
                    </div>

                    {/* Travelers */}
                    <div className="relative">
                      <Label className="block text-sm font-medium text-muted-foreground mb-2">
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
                          className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-primary-foreground shadow-lg"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Search Trips
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Popular Searches */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <span className="text-sm text-muted-foreground">
                      Popular:
                    </span>
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
                  <Card className="text-center bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                        {stat.prefix}
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
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
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Icon className="h-8 w-8 text-muted-foreground" />
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
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
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
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
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
                          onClick={() => setActiveDestination(index)}
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
                        <f.icon className="h-6 w-6 text-primary" />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6, scale: 1.01 }}>
                  <Card className="bg-card shadow-xl border-border/50 hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-border"
                        />
                        <div>
                          <div className="font-semibold text-foreground">
                            {t.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {t.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        "{t.text}"
                      </p>
                      <Badge variant="outline" className="text-xs">
                        <Plane className="w-3 h-3 mr-1" />
                        Trip: {t.trip}
                      </Badge>
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
        
            <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm border-purple-600 shadow-purple-400 dark:shadow-purple-800 ">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Mail className="h-8 w-8 text-muted" />
                </div>
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Get travel inspiration in your inbox
                </h3>
                <p className="text-muted-foreground mb-8">
                  Exclusive deals, new itineraries, and smart tips — no spam,
                  just wanderlust.
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

      {/* Enhanced Footer */}
    </div>
  );
};

export default Homepage;
