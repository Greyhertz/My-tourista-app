import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Users,
  Star,
  ArrowRight,
  MapPin,
  Heart,
  Sparkles,
  Check,
  ChevronUp,
  Play,
  Compass,
  Award,
  TrendingUp,
  Utensils,
  Camera,
  Mountain,
  Plane,
  Sun,
  Map,
  Navigation,
  Hotel,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Wifi,
  Battery,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, badgeVariants } from '@/components/ui/badge';
import NewsLetterBox from '@/components/core/LetterBox';
import { BlogSection } from '@/components/core/BlogSection';
import { useBlog } from '@/context/BlogContex';
import { fetchMultipleImages } from '../api/Unsplash';
import { Link } from 'react-router-dom';

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
  const { state, actions } = useBlog();
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [destinationImages, setDestinationImages] = useState<{
    [key: string]: string[];
  }>({});
  
  useEffect(() => {
    if (state.blogPosts.length === 0) actions.loadBlogs();
  }, [state.blogPosts.length, actions]);

  const destinations = [
    {
      name: 'Paris',
      country: 'France',
      image:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000',
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      image:
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000',
    },
    {
      name: 'Santorini',
      country: 'Greece',
      image:
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2000',
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      image:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex(prev => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: 'Discover Destinations',
      description:
        'Explore curated travel destinations with detailed guides, local insights, and personalized recommendations.',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      title: 'Easy Trip Planning',
      description:
        'Plan your entire journey with our smart itinerary builder. Book flights, hotels, and experiences all in one place.',
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-600',
    },
    {
      icon: Users,
      title: 'Connect with Travelers',
      description:
        'Join a community of explorers. Share experiences, get recommendations, and find travel companions.',
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconColor: 'text-green-600',
    },
  ];

  const culinaryExperiences = [
    {
      title: 'Street Food Tours',
      location: 'Bangkok, Thailand',
      image:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000',
      description: 'Explore authentic flavors at bustling night markets',
      icon: Utensils,
    },
    {
      title: 'Wine Tasting',
      location: 'Tuscany, Italy',
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2000',
      description: 'Sample world-class wines in historic vineyards',
      icon: Sun,
    },
    {
      title: 'Cooking Classes',
      location: 'Paris, France',
      image:
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000',
      description: 'Learn to create French cuisine with local chefs',
      icon: Users,
    },
    {
      title: 'Sushi Experience',
      location: 'Tokyo, Japan',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2000',
      description: 'Master the art of sushi making in authentic settings',
      icon: Camera,
    },
    {
      title: 'Tapas & Culture',
      location: 'Barcelona, Spain',
      image:
        'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000',
      description: 'Discover Spanish culinary traditions and culture',
      icon: Heart,
    },
    {
      title: 'Seafood Markets',
      location: 'Sydney, Australia',
      image:
        'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2000',
      description: 'Fresh catches and harbor-side dining experiences',
      icon: Compass,
    },
  ];

  const travelExperiences = [
    {
      title: 'Adventure Tours',
      image:
        'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2000',
      description: 'Thrilling experiences from mountains to oceans',
    },
    {
      title: 'Cultural Immersion',
      image:
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000',
      description: 'Connect with local traditions and communities',
    },
    {
      title: 'Luxury Escapes',
      image:
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000',
      description: 'Premium accommodations and exclusive services',
    },
    {
      title: 'Nature & Wildlife',
      image:
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000',
      description: 'Safari tours and eco-friendly adventures',
    },
  ];

  const stats = [
    { number: '500K+', label: 'Happy Travelers', icon: Users },
    { number: '200+', label: 'Destinations', icon: Globe },
    { number: '50K+', label: '5-Star Reviews', icon: Star },
    { number: '10+', label: 'Years Experience', icon: Award },
  ];

  const currentDestination = destinations[currentDestinationIndex];

  return (
    <div className="min-h-screen bg-background">
      <BackToTop />

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* LEFT - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Your Ultimate Travel Companion
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Explore the World
                  <span className="text-primary block mt-2">Your Way</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Discover unforgettable destinations, book authentic
                  experiences, and connect with local cultures. Your next
                  adventure is just a tap away.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
             
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-full shadow-lg"
                >
               Start Exploring

                  <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
               
                {/* <Link to=""  className={badgeVariants({ variant: "outline"})} >Badge</Link> */}
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Video
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Verified Guides
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Best Price Guarantee
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    24/7 Support
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-background blur-3xl rounded-full scale-150" />

                {/* Phone Frame */}
                <div className="relative w-[380px] h-[700px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-4 shadow-2xl">
                  <div className="w-full h-full bg-background rounded-[2.4rem] overflow-hidden relative">
                    {/* ===== STATUS BAR ===== */}
                    <div className="flex justify-between items-center px-6 py-3 bg-background">
                      <span className="text-sm  font-semibold">9:41</span>

                      <div className="flex items-center gap-2">
                        {/* Signal */}
                        <div className="w-4 h-4 border border-gray-800 rounded-[3px]"></div>

                        {/* WiFi */}
                        <Wifi className="w-4 h-4 " />

                        {/* Battery */}
                        {/* <div className="flex items-center gap-1">
                          <div className="w-5 h-3 border border-gray-800 rounded-sm relative">
                            <div className="absolute inset-0  rounded-sm scale-x-[0.7]" />
                          </div>
                          <div className="w-1 h-2 bg-gray-800 rounded-sm" />
                        </div> */}
                        <Battery />
                      </div>
                    </div>

                    {/* ===== DESTINATION HEADER ===== */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDestination.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="relative h-[300px]"
                      >
                        <img
                          src={currentDestination.image}
                          alt={currentDestination.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-3xl font-bold">
                            {currentDestination.name}
                          </h3>
                          <p className="text-sm opacity-90">
                            {currentDestination.country}
                          </p>
                        </div>

                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                      </motion.div>
                    </AnimatePresence>

                    {/* ===== QUICK ACTIONS ===== */}
                    <div className="px-6 py-6 space-y-5 bg-background">
                      <div className="flex gap-3">
                        <div className="flex-1 bg-primary/10 rounded-2xl p-4 text-center">
                          <Plane className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-xs text-primary font-semibold">
                            Flights
                          </p>
                        </div>

                        <div className="flex-1 bg-primary/10 rounded-2xl p-4 text-center">
                          <Hotel className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-xs text-primary font-semibold">
                            Hotels
                          </p>
                        </div>

                        <div className="flex-1 bg-primary/10 rounded-2xl p-4 text-center">
                          <Camera className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-xs text-primary font-semibold">
                            Tours
                          </p>
                        </div>
                      </div>

                      <Card className="p-4 bg-card border-none shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Utensils className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Food Tour</p>
                            <p className="text-xs text-muted-foreground">
                              Starting at $49
                            </p>
                          </div>
                          <Button size="sm" className="rounded-full">
                            Book
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* ===== BOTTOM NAV ===== */}
                    <div className="absolute left-0 right-0 bottom-0 bg-background backdrop-blur-xl py-4 border-t">
                      <div className="flex justify-around">
                        <div className="flex flex-col items-center gap-1">
                          <Compass className="w-5 h-5 text-primary" />
                          <span className="text-xs text-primary">Explore</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <Map className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-500">Trips</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <MessageCircle className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-500">Chat</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span className="text-xs text-gray-500">Profile</span>
                        </div>
                      </div>
                    </div>

                    {/* iPhone Speaker Area */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Travel Made Simple
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to plan, book, and enjoy your perfect trip
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
                    />
                    <CardContent className="relative p-8 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-background flex items-center justify-center shadow-lg">
                        <IconComponent
                          className={`w-7 h-7 ${feature.iconColor}`}
                        />
                      </div>
                      <h3 className="text-2xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CULINARY EXPERIENCES SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2" variant="outline">
                <Utensils className="w-4 h-4 mr-2" />
                Culinary Adventures
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Taste the World
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover authentic flavors and culinary traditions from around
                the globe
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culinaryExperiences.map((experience, index) => {
              const IconComponent = experience.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-80">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all">
                        <Heart className="w-5 h-5 text-white" />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-5 h-5" />
                          <span className="text-sm opacity-90">
                            {experience.location}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-sm opacity-90">
                          {experience.description}
                        </p>

                        <Button
                          size="sm"
                          className="mt-4 rounded-full"
                          variant="secondary"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRAVEL EXPERIENCES GRID */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2" variant="outline">
                <Mountain className="w-4 h-4 mr-2" />
                Featured Experiences
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Unforgettable Adventures
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {travelExperiences.map((experience, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
                >
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">
                      {experience.title}
                    </h3>
                    <p className="text-lg opacity-90 mb-4">
                      {experience.description}
                    </p>
                    <Button variant="secondary" className="rounded-full">
                      Explore More
                      <Navigation className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const IconComponent = stat.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="text-center space-y-3">
                    <IconComponent className="w-8 h-8 mx-auto opacity-90" />
                    <div className="text-5xl font-bold">{stat.number}</div>
                    <div className="text-primary-foreground/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <ScrollReveal>
        <BlogSection
          title="Travel Inspiration"
          subtitle="Stories and guides from around the world"
          limit={3}
          category="all"
          compact={true}
          featured={true}
        />
      </ScrollReveal>

      {/* Newsletter */}
      <NewsLetterBox />

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="space-y-8">
              <Compass className="w-16 h-16 text-primary mx-auto" />
              <h2 className="text-4xl md:text-6xl font-bold">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of travelers discovering the world with
                confidence. Start planning your dream trip today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="px-8 py-6 text-lg rounded-full">
                  <Globe className="w-5 h-5 mr-2" />
                  Start Exploring
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export { ScrollReveal };
export default Homepage;
