import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  Calendar,
  Users,
  Star,
  ArrowRight,
  MapPin,
  Heart,
  Sparkles,
  Loader2,
  Check,
  Shield,
  CreditCard,
  ChevronUp,
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
import NewsLetterBox from '@/components/core/LetterBox';
import { BlogSection } from '@/components/core/BlogSection';
import { useBlog } from '@/context/BlogContex';

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

// const BackToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//           className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
//         >
//           <ChevronUp className="h-6 w-6" />
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

interface FormErrors {
  destination?: string;
  checkin?: string;
  checkout?: string;
}

const Homepage = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, actions } = useBlog();

  useEffect(() => {
    if (state.blogPosts.length === 0) actions.loadBlogs();
  }, [state.blogPosts.length]);

  const destinations = [
    {
      name: 'Santorini',
      country: 'Greece',
      image:
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2069',
      rating: 4.9,
      description:
        'Whitewashed villages perched on dramatic cliffs overlooking the deep blue Aegean Sea',
      highlights: [
        'Iconic Blue Domes',
        'Volcanic Beaches',
        'World-Class Sunsets',
      ],
      season: 'Best: Apr - Oct',
    },
    {
      name: 'Kyoto',
      country: 'Japan',
      image:
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070',
      rating: 4.8,
      description:
        'Ancient capital where thousands of temples meet serene bamboo groves and gardens',
      highlights: ['Golden Pavilion', 'Geisha District', 'Cherry Blossoms'],
      season: 'Best: Mar - May',
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      image:
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070',
      rating: 4.7,
      description:
        'Lush rice terraces, pristine beaches, and vibrant spiritual culture create island magic',
      highlights: ['Rice Terraces', 'Beach Clubs', 'Sacred Temples'],
      season: 'Best: Apr - Oct',
    },
    {
      name: 'Maldives',
      country: 'Indian Ocean',
      image:
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
      rating: 4.9,
      description:
        'Turquoise lagoons and overwater villas define this tropical paradise of 1,000 islands',
      highlights: ['Overwater Bungalows', 'Coral Reefs', 'Private Islands'],
      season: 'Best: Nov - Apr',
    },
    {
      name: 'Iceland',
      country: 'Nordic Island',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1470',
      rating: 4.8,
      description:
        'Where fire meets ice in a land of glaciers, geysers, and dancing northern lights',
      highlights: ['Northern Lights', 'Blue Lagoon', 'Waterfalls'],
      season: 'Best: Jun - Aug',
    },
    {
      name: 'Machu Picchu',
      country: 'Peru',
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070',
      rating: 4.9,
      description:
        'Mystical Incan citadel hidden in the clouds atop the sacred Andean mountains',
      highlights: ['Ancient Ruins', 'Inca Trail', 'Mountain Vistas'],
      season: 'Best: May - Sep',
    },
  ];

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      destination: formData.get('destination') as string,
      checkin: formData.get('checkin') as string,
      checkout: formData.get('checkout') as string,
      travelers: formData.get('travelers') as string,
    };

    const newErrors: FormErrors = {};
    if (!data.destination?.trim()) newErrors.destination = 'Required';
    if (!data.checkin) newErrors.checkin = 'Required';
    if (!data.checkout) newErrors.checkout = 'Required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Searching:', data);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* <BackToTop /> */}

      {/* HERO SECTION - Large Image with Search */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Explore the World
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
              Discover extraordinary places and create unforgettable memories
            </p>
          </motion.div>

          {/* Featured Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {/* Live Travelers */}
            <Card className="group bg-card/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-border hover:border-primary/50">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  2,547
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Travelers Online Now
                </p>
              </CardContent>
            </Card>

            {/* Today's Bookings */}
            <Card className="group bg-card/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-border hover:border-primary/50">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full" />
                  <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  1,234
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Trips Booked Today
                </p>
              </CardContent>
            </Card>

            {/* Average Savings */}
            <Card className="group bg-card/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-border hover:border-primary/50">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full" />
                  <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  $420
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Average Savings
                </p>
              </CardContent>
            </Card>

            {/* Destinations */}
            <Card className="group bg-card/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-border hover:border-primary/50">
              <CardContent className="p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                  <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  150+
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Countries Available
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESTINATIONS - Enhanced Beautiful Grid */}
      <section className="py-24 px-6 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2" variant="outline">
                <Sparkles className="w-4 h-4 mr-2" />
                Trending Now
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Featured Destinations
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked places that promise extraordinary experiences and
                memories that last forever
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-3xl h-[600px] cursor-pointer shadow-xl hover:shadow-2xl"
                >
                  {/* Image */}
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                    {/* Top - Rating & Heart */}
                    <div className="flex items-center justify-between">
                      <Badge className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30">
                        <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
                        {destination.rating}
                      </Badge>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Bottom - Detailed Info */}
                    <div className="space-y-5">
                      {/* Location */}
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-white/80 text-sm">
                          <MapPin className="w-4 h-4" />
                          {destination.country}
                        </div>
                        <h3 className="text-4xl font-bold mb-3 group-hover:text-white/95 transition-colors">
                          {destination.name}
                        </h3>
                        <p className="text-white/90 text-base leading-relaxed mb-4">
                          {destination.description}
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            className="bg-white/15 backdrop-blur-sm border-white/20 text-white text-xs hover:bg-white/25 transition-colors"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      {/* Season & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/20">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <Calendar className="w-4 h-4" />
                          {destination.season}
                        </div>
                        <Button
                          size="sm"
                          className="bg-white text-foreground hover:bg-white/90 group-hover:scale-105 transition-all shadow-lg"
                        >
                          Discover
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-500 pointer-events-none" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* View All Button */}
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8 border-2">
                View All Destinations
                <Globe className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* EXPERIENCE SECTION - Split Image */}
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

      {/* STATS - Simple and Clean */}
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

      {/* CTA - Full Width Image */}
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
