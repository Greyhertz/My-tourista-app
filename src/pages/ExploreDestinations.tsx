import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchNearbyHotels,
  getGeoCoordinates,
  reverseGeocode,
} from '../api/Geoapify';
import { fetchMultipleImages } from '../api/Unsplash';
import {
  Search,
  MapPin,
  Star,
  TrendingUp,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogSection } from '@/components/core/BlogSection';
import { ScrollReveal } from './Homepage';

export default function ExploreDestinations() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [featured, setFeatured] = useState<any[]>([]);
  const [currentCitySet, setCurrentCitySet] = useState(0);

  const citySets = [
    ['Paris', 'Bali', 'New York', 'Tokyo', 'Rome', 'Sydney', 'Cape Town'],
    [
      'Bangkok',
      'Madrid',
      'Santorini',
      'Lisbon',
      'Allianz-arena',
      'Cairo',
      'Dubai',
      'Singapore',
    ],
    ['Barcelona', 'Amsterdam', 'Istanbul', 'Mumbai', 'Seoul', 'Prague'],
    ['London', 'Berlin', 'Vienna', 'Budapest', 'Stockholm', 'Copenhagen'],
    ['Miami', 'Las Vegas', 'San Francisco', 'Toronto', 'Vancouver', 'Montreal'],
  ];

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a valid city or location.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const coords = await getGeoCoordinates(query);
      if (!coords) throw new Error('Could not find coordinates.');
      const [lat, lon] = coords;
      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        throw new Error(`Invalid coordinates: lat ${lat}, lon ${lon}`);
      }

      const location = await reverseGeocode(lat, lon);
      if (!location) throw new Error('Could not fetch location details.');

      const [hotels, images] = await Promise.all([
        fetchNearbyHotels(lat, lon),
        fetchMultipleImages(query),
      ]);

      const hotelsWithImages = await Promise.all(
        (hotels || []).map(async (hotel: { properties: { name: string } }) => {
          const hotelName = hotel.properties?.name ?? 'hotel';
          const imgs = await fetchMultipleImages(hotelName + ' hotel');
          return { ...hotel, imageUrl: imgs[0] ?? null };
        })
      );

      navigate(`/destination/${encodeURIComponent(query)}`, {
        state: {
          hotels: hotelsWithImages,
          images: images ?? [],
          location,
        },
      });
    } catch (err: any) {
      console.error('🔥 Error during search:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const loadFeatured = async (cities: string[]) => {
    const results = await Promise.all(
      cities.map(async city => {
        const coords = await getGeoCoordinates(city);
        if (!coords) return null;
        const [lat, lon] = coords;
        if (lat < -90 || lat > 90) return null;

        const location = await reverseGeocode(lat, lon);
        const imgs = await fetchMultipleImages(city);

        if (imgs[0]) {
          const img = new Image();
          img.src = imgs[0];
        }

        return {
          city,
          location,
          image: imgs[0] ?? null,
          review: Math.floor(Math.random() * 900) + 100,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        };
      })
    );
    setFeatured(results.filter(Boolean) as any[]);
  };

  useEffect(() => {
    loadFeatured(citySets[currentCitySet]);
  }, [currentCitySet]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCitySet(prev => (prev + 1) % citySets.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.scroll-section')
      .forEach(el => observer.observe(el));
    return () =>
      document
        .querySelectorAll('.scroll-section')
        .forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 w-full max-w-5xl px-6 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore breathtaking destinations, luxury hotels, and
              unforgettable experiences around the globe
            </p>
          </motion.div>

          <Suspense
            fallback={<div className="text-muted-foreground">Loading...</div>}
          />

          {/* Enhanced Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSearch}
            className="relative max-w-3xl mx-auto mb-8"
          >
            <div className="relative flex items-center bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 ">
              <div className="absolute left-5 pointer-events-none">
                <Search className="text-muted-foreground" size={24} />
              </div>
              <input
                type="text"
                placeholder="Search cities, attractions, hotels..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 pl-14 pr-4 py-5 text-lg bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:text-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="m-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Explore
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-destructive/10 -destructive/30 text-destructive px-6 py-3 rounded-xl max-w-md mx-auto"
            >
              {error}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Cities Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-16 scroll-section">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground flex items-center gap-3 mb-2">
              <TrendingUp className="text-primary" size={36} />
              Top Global Destinations
            </h2>
            <p className="text-muted-foreground">
              Handpicked locations loved by travelers worldwide
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              Set {currentCitySet + 1} of {citySets.length}
            </span>
            <div className="flex gap-2">
              {citySets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentCitySet(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentCitySet
                      ? 'bg-primary w-8'
                      : 'bg-muted hover:bg-muted-foreground/30'
                  }`}
                  aria-label={`Go to set ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCitySet}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {featured.map((item, index) => (
              <motion.div
                key={`${currentCitySet}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.city}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        'https://via.placeholder.com/400?text=Image+Not+Available';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transform transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <MapPin size={20} className="text-accent" />
                      {item.city}
                    </h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-1">
                      {item.location.city}, {item.location.country}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 bg-amber-500 text-black text-sm font-semibold px-3 py-1 rounded-lg">
                        <Star size={14} fill="currentColor" />
                        {item.rating}
                      </div>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg">
                        {item.review}+ reviews
                      </span>
                    </div>

                    <button
                      onClick={() => setQuery(item.city)}
                      className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Search size={16} />
                      Explore {item.city}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() =>
              setCurrentCitySet(
                prev => (prev - 1 + citySets.length) % citySets.length
              )
            }
            className="group flex items-center gap-2 px-6 py-3 bg-card border-2 border-border text-foreground rounded-xl hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Previous</span>
          </button>
          <button
            onClick={() =>
              setCurrentCitySet(prev => (prev + 1) % citySets.length)
            }
            className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="font-medium">Next</span>
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Video Showcase - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground flex items-center justify-center gap-3">
            <Play className="text-accent" size={36} />
            Cinematic Travel Moments
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience destinations through the eyes of travelers
          </p>
        </div>
        {/* https://youtu.be/FuTvGzGaj7o https://youtu.be/KBNHqI4kono*/}
        {/* https://youtu.be/mOqV6HpQzAw https://youtu.be/WFuCDhDPLpM */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Scenic Europe', id: 'KBNHqI4kono' },
            { title: 'Island Getaway', id: 'FuTvGzGaj7o' },
          ].map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-card"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-card">
                <h3 className="text-xl font-semibold text-foreground">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hotels Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Premium Hotels & Luxury Resorts
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover world-class accommodations in stunning locations. From
                boutique hideaways to grand resorts, each property offers
                exceptional service, spa treatments, infinity pools, and
                world-class cuisine.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether planning a romantic honeymoon or a business retreat,
                experience the perfect blend of comfort and sophistication from
                Bali to Barcelona.
              </p>
              <button className="mt-4 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Browse Luxury Stays
              </button>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Luxury resort"
                className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Travel Moments - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1170&auto=format&fit=crop"
                alt="Travel moments"
                className="relative rounded-3xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-5xl font-bold text-primary leading-tight">
                Create Unforgettable Memories
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every journey is a collection of magical moments—from bustling
                city streets to tranquil beach sunsets. Immerse yourself in
                experiences that will stay with you forever.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Let your passport become a canvas painted with colorful
                adventures. Each stamp tells a story, each destination adds a
                chapter to your life's journey.
              </p>
              <button className="mt-4 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-semibold hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Journey
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Blog Section */}
      <div className="scroll-section">
        <BlogSection
          title="Travel Stories & Guides"
          limit={3}
          category="all"
          compact={true}
          featured={true}
        />
      </div>

      {/* Map Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-6 py-20 scroll-section">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground flex items-center justify-center gap-3">
            <MapPin className="text-primary" size={36} />
            Find Us Anywhere
          </h2>
          <p className="text-muted-foreground text-lg">
            We're here to help you plan your perfect adventure
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509373!2d144.9556513153178!3d-37.8173279797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f3aab3%3A0xf577d5e79a2393b1!2sTravel+Agency!5e0!3m2!1sen!2sau!4v1611816302287!5m2!1sen!2sau"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <style>{`
        .fadeInUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: opacity 1s ease, transform 1s ease;
        }
        .scroll-section {
          opacity: 0;
          transform: translateY(40px);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
