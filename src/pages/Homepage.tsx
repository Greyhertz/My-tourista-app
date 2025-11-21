import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Calendar,
  Users,
  Star,
  ArrowRight,
  MapPin,
  Heart,
  Sparkles,
  Check,
  Shield,
  ChevronUp,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsLetterBox from '@/components/core/LetterBox';
import { BlogSection } from '@/components/core/BlogSection';
import { useBlog } from '@/context/BlogContex';
import { fetchMultipleImages } from '../api/Unsplash';

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

  const rotatingDestinations = [
    { name: 'Bali', country: 'Indonesia', rating: 4.9 },
    { name: 'Tokyo', country: 'Japan', rating: 4.8 },
    { name: 'Fuji', country: 'Japan', rating: 4.9 },
    { name: 'London', country: 'United Kingdom', rating: 4.7 },
    { name: 'Barcelona', country: 'Spain', rating: 4.8 },
    { name: 'Paris', country: 'France', rating: 4.9 },
    { name: 'Dubai', country: 'UAE', rating: 4.8 },
    { name: 'Santorini', country: 'Greece', rating: 4.9 },
  ];

  const inspiringExperiences = [
    {
      title: 'Cultural Immersion',
      subtitle: 'Live Like a Local',
      image:
        'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070',
      description:
        'Immerse yourself in authentic traditions, local cuisines, and timeless customs that define each destination',
      features: [
        'Home-cooked Meals',
        'Traditional Ceremonies',
        'Local Markets',
        'Artisan Workshops',
      ],
      icon: '🎭',
    },
    {
      title: 'Adventure & Thrills',
      subtitle: 'Push Your Limits',
      image:
        'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
      description:
        'From mountain peaks to ocean depths, embark on adrenaline-pumping activities that test your courage',
      features: [
        'Mountain Climbing',
        'Scuba Diving',
        'Skydiving',
        'Safari Tours',
      ],
      icon: '⛰️',
    },
    {
      title: 'Wellness Retreats',
      subtitle: 'Rejuvenate Your Soul',
      image:
        'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2064',
      description:
        'Find inner peace through yoga, meditation, spa treatments, and holistic healing in serene sanctuaries',
      features: [
        'Yoga Sessions',
        'Spa Treatments',
        'Meditation',
        'Healthy Cuisine',
      ],
      icon: '🧘',
    },
    {
      title: 'Culinary Journeys',
      subtitle: 'Taste the World',
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
      description:
        'Savor exquisite flavors through cooking classes, wine tastings, and Michelin-starred dining experiences',
      features: ['Cooking Classes', 'Wine Tours', 'Street Food', 'Fine Dining'],
      icon: '🍷',
    },
    {
      title: 'Photography Expeditions',
      subtitle: 'Capture the Magic',
      image:
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2074',
      description:
        'Chase golden hours, capture wildlife, and document stunning landscapes with expert photography guides',
      features: [
        'Wildlife Photography',
        'Landscape Tours',
        'Sunrise Shoots',
        'Photo Workshops',
      ],
      icon: '📸',
    },
    {
      title: 'Romantic Getaways',
      subtitle: 'Love in Paradise',
      image:
        'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=2065',
      description:
        "Create unforgettable memories with your loved one in the world's most romantic destinations",
      features: [
        'Private Dinners',
        'Couples Spa',
        'Sunset Cruises',
        'Beach Picnics',
      ],
      icon: '💑',
    },
  ];

  // Fetch images for all destinations
  useEffect(() => {
    const fetchAllImages = async () => {
      const imagePromises = rotatingDestinations.map(async dest => {
        const images = await fetchMultipleImages(
          `${dest.name} ${dest.country} travel`
        );
        return { name: dest.name, images };
      });

      const results = await Promise.all(imagePromises);
      const imagesMap: { [key: string]: string[] } = {};
      results.forEach(result => {
        imagesMap[result.name] = result.images;
      });
      setDestinationImages(imagesMap);
    };

    fetchAllImages();
  }, []);

  // Rotate destinations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex(
        prev => (prev + 1) % rotatingDestinations.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentDestination = rotatingDestinations[currentDestinationIndex];
  const currentImages = destinationImages[currentDestination.name] || [];

  return (
    <div className="min-h-screen bg-background ">
      <BackToTop />

      {/* HERO SECTION - Enhanced Aesthetic Version */}
      <section className="relative min-h-screen overflow-hidden bg-opacity-0 ">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDestination.name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.6 }}
              className="absolute inset-0"
              style={{
                backgroundImage: currentImages[0]
                  ? `url(${currentImages[0]})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.65) saturate(1.15)',
              }}
            />
          </AnimatePresence>

          {/* Dark Glass Overlay */}
          {/* <div
            className="absolute inset-0 bg-gradient-to-b 
      from-black/70 via-black/40 to-black/80"
          /> */}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-14 items-center w-full">
            {/* LEFT TEXT BLOCK */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className=" space-y-8"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentDestination.name}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                  transition={{ duration: 1 }}
                  className="text-6xl md:text-8xl text-primary font-extrabold tracking-tight uppercase
              drop-shadow-[0_5px_25px_rgba(0,0,0,0.9)]"
                >
                  {currentDestination.name}
                </motion.h1>
              </AnimatePresence>

              {/* BEAUTIFUL NEW SUB-WRITEUP */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text- max-w-xl leading-relaxed
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
              >
                Escape to{' '}
                <span className="font-semibold text-primary">
                  {currentDestination.name}
                </span>
                , where breathtaking scenery meets rich culture. Discover hidden
                gems, unforgettable experiences, and moments crafted to inspire
                your next adventure.
              </motion.p>

              {/* NEW MINI FEATURE TAGS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex gap-3 flex-wrap">
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text- border border-white/20"
                  >
                    <Star className="inline w-4 h-4 mr-1 text-yellow-300" />
                    Top Destination
                  </span>
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text- border border-white/20"
                  >
                    🌍 Trending Worldwide
                  </span>
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text border border-white/20"
                  >
                    ✈️ Perfect for Getaways
                  </span>
                  <br />
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text border border-white/20"
                  >
                    💥 AI-powered recommendations
                  </span>
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text- border border-white/20"
                  >
                    🥙 Exotic Cuisines
                  </span>
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text border border-white/20"
                  >
                    ✈️ Perfect for Getaways
                  </span>
                  <span
                    className="px-4 py-2 text-sm bg-white/10 backdrop-blur-md 
              rounded-full text- border border-white/20"
                  >
                    ✈️ Perfect for Getaways
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 
              text-lg rounded-full shadow-xl shadow-black/40"
                >
                  Explore
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              {/* Progress Indicators */}
              <div className="flex items-center gap-3 pt-8">
                {rotatingDestinations.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      width: index === currentDestinationIndex ? 30 : 12,
                      opacity: index === currentDestinationIndex ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-2 bg-white/90 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE IMAGES */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="grid gap-4 sm:grid-cols-4 grid-cols-2 grid-rows-2 lg:grid-cols-2 xl:grid-cols-2"
            >
              <AnimatePresence mode="wait">
                {currentImages.map((image, index) => (
                  <motion.div
                    key={`${currentDestination.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="overflow-hidden shadow-2xl rounded-xl border-none">
                      <div className="relative h-30 sm:h-40 md:h-60">
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover transition-all
                      duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INSPIRING EXPERIENCES Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Curated Experiences
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Travel Your Way
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our handcrafted travel experiences designed to match
                your unique style and interests
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspiringExperiences.map((experience, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-3xl h-[550px] cursor-pointer shadow-lg hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 bg-card"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover scale-[1.02] brightness-[0.85] saturate-[1.15] transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Soft Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg">
                        {experience.icon}
                      </div>
                    </div>

                    {/* Heart */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <Heart className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-primary font-semibold mb-1">
                        {experience.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {experience.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {experience.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {experience.features.slice(0, 4).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="w-3 h-3 text-primary flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between group/btn hover:bg-primary/10"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Premium Hover Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-3xl transition-all duration-500" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8 border-2">
                Explore All Experiences
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Split Images */}
      <section className="py-24">
        <div className="grid md:grid-cols-2 gap-0">
          <ScrollReveal>
            <div className="relative h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021"
                alt="Adventure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-12 text-white">
                  <Sparkles className="w-12 h-12 mb-4" />
                  <h3 className="text-4xl font-bold mb-4">Adventure Awaits</h3>
                  <p className="text-xl text-white/90 mb-6">
                    Experience thrilling activities and create memories that
                    last a lifetime
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Discover More
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070"
                alt="Luxury"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end">
                <div className="p-12 text-white text-right">
                  <Heart className="w-12 h-12 mb-4 ml-auto" />
                  <h3 className="text-4xl font-bold mb-4">Luxury Escapes</h3>
                  <p className="text-xl text-white/90 mb-6">
                    Indulge in world-class accommodations and exceptional
                    service
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Explore Luxury
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2.5M+', label: 'Travelers' },
              { number: '150+', label: 'Countries' },
              { number: '50K+', label: 'Reviews' },
              { number: '15+', label: 'Years' },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
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

      {/* CTA */}
      <section className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Start planning your next adventure with personalized
              recommendations
            </p>
            <Button size="lg" className="text-lg px-12 py-6">
              <MapPin className="w-5 h-5 mr-2" />
              Start Planning
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export { ScrollReveal };
export default Homepage;
