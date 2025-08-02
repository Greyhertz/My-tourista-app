import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchNearbyHotels,
  getGeoCoordinates,
  reverseGeocode,
} from '../api/Geoapify';
import { fetchMultipleImages } from '../api/Unsplash';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Lazy load Map section and Video component
// const LazyMapSection = lazy(() => import('../components/LazyMapSection'));
// const SeasonalSlider = lazy(() => import('../components/SeasonalSlider'));

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

  // useEffect(() => {
  //   async function fetchPopularCities() {
  //     try {
  //       // Example: Geoapify "places" API for popular cities (replace with your API key)
  //       const res = await fetch(
  //         `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=countrycode:US|FR|IT|ES|JP|GB|DE|CA|AU|ZA&limit=36&apiKey=YOUR_GEOAPIFY_API_KEY`
  //       );
  //       const data = await res.json();
  //       // Group cities into sets of 6 for carousel
  //       const cities = (data.features || [])
  //         .map((f: any) => f.properties.city || f.properties.name)
  //         .filter(Boolean);
  //       const sets: string[][] = [];
  //       for (let i = 0; i < cities.length; i += 6) {
  //         sets.push(cities.slice(i, i + 6));
  //       }
  //       setCitySets(
  //         sets.length
  //           ? sets
  //           : [['Paris', 'Bali', 'New York', 'Tokyo', 'Rome', 'Sydney']]
  //       );
  //     } catch (err) {
  //       // fallback to hardcoded if API fails
  //       setCitySets([
  //         ['Paris', 'Bali', 'New York', 'Tokyo', 'Rome', 'Sydney'],
  //         ['Bangkok', 'Madrid', 'Santorini', 'Lisbon', 'Cairo', 'Dubai'],
  //       ]);
  //     }
  //   }
  //   fetchPopularCities();
  // }, []);

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
        (hotels || []).map(async (hotel:{properties:{name: string}}) => {
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

  // Load featured cities with sightseeing API and preload images
  const loadFeatured = async (cities: string[]) => {
    const results = await Promise.all(
      cities.map(async city => {
        const coords = await getGeoCoordinates(city);
        if (!coords) return null;
        const [lat, lon] = coords;
        if (lat < -90 || lat > 90) return null;

        const location = await reverseGeocode(lat, lon);
        const imgs = await fetchMultipleImages(city);

        // Preload image
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
    <div className=" bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center mb-8 text-blue-700 dark:text-blue-400"
        >
          ✈️ Discover Stunning Destinations
        </motion.h1>

        <Suspense fallback={<div>Loading deals...</div>}></Suspense>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
          <form className="relative w-full md:w-96 flex" onSubmit={handleSearch}>
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search cities, attractions, hotels..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 ml-2"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Explore'}
            </button>
          </form>
        </div>

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            🔍 Searching...
          </p>
        )}
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {/* Featured Cities */}
        <div className="mt-16 w-full max-w-6xl scroll-section mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              🌟 Top Global Picks
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Set {currentCitySet + 1} of {citySets.length}
              </span>
              <div className="flex gap-1">
                {citySets.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentCitySet ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <motion.div
            key={currentCitySet}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featured.map((item, index) => (
              <motion.div
                key={`${currentCitySet}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.city}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://via.placeholder.com/400?text=Image+Not+Available';
                  }}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold">{item.city}</h3>
                  {/* <div className="absolute top-16 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {item.city}
                  </div> */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.location.city}, {item.location.state},{' '}
                    {item.location.country}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-yellow-500">
                    <span>⭐ {item.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({item.review}+ reviews)
                    </span>
                  </div>
                  <button
                    onClick={() => setQuery(item.city)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    🔍 Explore {item.city}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() =>
            setCurrentCitySet(
              prev => (prev - 1 + citySets.length) % citySets.length
            )
          }
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            setCurrentCitySet(prev => (prev + 1) % citySets.length)
          }
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Video Showcase */}
      <div className="max-w-6xl mx-auto px-6 my-20 scroll-section">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          🎬 Travel Video Moments
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {['Scenic Europe', 'Island Getaway'].map((title, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${
                  idx === 0 ? 'kJQP7kiw5Fk' : '2g811Eo7K8U'
                }`}
                title={title}
                className="w-full h-64 md:h-80"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      {/* Hotels Section */}
      <div className="max-w-6xl mx-auto px-6 my-16 scroll-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Premium Hotel & Resort Packages
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
              Explore luxury accommodations in the world's top destinations. Our
              curated selection of premium resorts offers spa treatments,
              infinity pools, and world-class cuisine.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-300">
              Whether you're planning a honeymoon or a business trip, we bring
              you the most relaxing and stylish stays from Bali to Barcelona.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Luxury resort"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Travel Moments */}
      <div className="max-w-6xl mx-auto px-6 my-16 scroll-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68"
              alt="Airport travel"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-blue-900 dark:text-white mb-6">
              Unforgettable Travel Moments
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed dark:text-gray-300">
              From bustling airport terminals to serene beach sunsets, every
              moment of your journey tells a story. Discover experiences you'll
              never forget.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-300">
              Capture memories with every step you take. Your passport is a
              canvas of your travels—let it be colorful.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-6xl mx-auto px-6 my-20 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          📰 Trending Travel Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(id => (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Top 10 Things to Do in Dubai
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Explore desert safaris, luxury shopping, and unforgettable views
                from the Burj Khalifa in this traveler's guide to the UAE's
                crown jewel.
              </p>
              <a href="#" className="text-blue-500 hover:underline">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-6xl mx-auto px-6 my-20">
        <div className="rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509373!2d144.9556513153178!3d-37.8173279797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f3aab3%3A0xf577d5e79a2393b1!2sTravel+Agency!5e0!3m2!1sen!2sau!4v1611816302287!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 my-20">
        <Suspense fallback={<div>Loading map...</div>}></Suspense>
      </div>
      <style>{`
        .fadeInUp { opacity: 1 !important; transform: translateY(0) !important; transition: opacity 1s ease, transform 1s ease; }
        .scroll-section { opacity: 0; transform: translateY(40px); }
      `}</style>
    </div>
  );
}
