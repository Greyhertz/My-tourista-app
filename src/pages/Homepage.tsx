import * as Icon from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function Homepage()

{
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <div className="relative bottom-80">
      
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 top-0 md:top-0"
          >
            Explore the World with{' '}
            <span className="text-blue-500">TravelMate</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-xl md:text-2xl mb-4 max-w-2xl"
          >
            Find breathtaking destinations and plan your next escape
            effortlessly.
          </motion.p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-lg text-black dark:text-white">
            <select className="border p-2 rounded w-full md:w-auto">
              <option>Where to</option>
            </select>
            <select className="border p-2 rounded w-full md:w-auto">
              <option>When</option>
            </select>
            <select className="border p-2 rounded w-full md:w-auto">
              <option>Select type</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          ✈️ Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {['Beaches', 'Mountains', 'Cities', 'Adventure'].map((cat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-3xl">🌟</p>
              <h4 className="text-lg font-semibold mt-3">{cat}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          🌍 Popular Destinations
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            {
              name: 'Bali',
              img: {
                src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'Bali',
              },
            },
            {
              name: 'Paris',
              img: {
                src: 'https://media.istockphoto.com/id/2119799972/photo/spring-evening-view-of-the-eiffel-tower-in-paris.webp?a=1&b=1&s=612x612&w=0&k=20&c=0a1gxJfUcshqSRkHW_sQ-9NPDh9o3c8ExpB0YG67RVk=',
                alt: 'Eifflel tower',
              },
            },
            {
              name: 'Hawaii',
              img: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                alt: 'Hawaii',
              },
            },

            {
              name: 'Iceland',
              img: {
                src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
                alt: '',
              },
            },
            {
              name: 'Greece',
              img: {
                src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                alt: '',
              },
            },
            {
              name: 'Peru',
              img: {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                alt: '',
              },
            },
            {
              name: 'Norway',
              img: {
                src: 'https://images.unsplash.com/photo-1661345441183-d3d10b1f4e97?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: '',
              },
            },
            {
              name: 'Rome',
              img: {
                src: 'https://media.istockphoto.com/id/1973069325/photo/colosseum-is-one-of-main-travel-attraction-of-rome-in-italy.webp?a=1&b=1&s=612x612&w=0&k=20&c=lXw1lhLZ8dUsIMVZ4CwV64KuzwS5G77Nt5bx0pgS-wg=',
                alt: 'colleseum Rome',
              },
            },
          ].map((cities, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={cities.img.src}
                alt={cities.img.alt}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://via.placeholder.com/400?text=Image+Not+Available';
                }}
                className="h-56 w-full object-cover"
              />

              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold">{cities.name}</h3>
                {/* <div className="absolute top-16 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {item.city}
              </div> */}
                {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.location.city}, {item.location.state},{' '}
                  {item.location.country}
                </p> */}
                {/* <div className="flex items-center gap-2 text-sm text-yellow-500">
                  <span>⭐ {item.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({item.review}+ reviews)
                  </span>
                </div> */}
                <button
                  onClick={() =>
                    navigate(`/destination/${cities.name.toLocaleLowerCase()}`, {
                      state: {
                        city: cities.name,
                        location: {
                          city: cities.name,
                          country: 'country',
                          state: 'DefaultState',
                        },
                        hotels: [], // Add hotel data if available
                        images: [cities.img.src], // Provide image array
                      },
                    })
                  }
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  🔍 Explore {cities.name}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 py-20 px-6 dark:from-gray-700">
        <h2 className="text-4xl font-bold text-center mb-12">
          💎 Why Choose TravelMate?
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {[
            {
              icon: (
                <Icon.ThumbsUp
                  size={48}
                  weight="fill"
                  className="text-purple-600"
                />
              ),
              title: 'Best Price Guarantee',
              desc: 'Unbeatable rates and no hidden fees — ever.',
            },
            {
              icon: (
                <Icon.Clock
                  size={48}
                  weight="fill"
                  className="text-purple-600"
                />
              ),
              title: '24/7 Customer Support',
              desc: 'Assistance anytime, anywhere, no matter the timezone.',
            },
            {
              icon: (
                <Icon.ShieldCheck
                  size={48}
                  weight="fill"
                  className="text-purple-600"
                />
              ),
              title: 'Secure Booking',
              desc: 'Your data and transactions are encrypted and safe.',
            },
            {
              icon: (
                <Icon.Globe
                  size={48}
                  weight="fill"
                  className="text-purple-600"
                />
              ),
              title: 'Global Destinations',
              desc: 'From exotic escapes to hidden gems around the globe.',
            },
          ].map((feature, idx) => (
            <div key={idx}>
              <div className="text-5xl mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          🌟 What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "TravelMate made my honeymoon unforgettable! I’ll never book
                with anyone else again."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={`https://randomuser.me/api/portraits/women/${i}0.jpg`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-gray-500">Globetrotter</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
     

      {/* Footer */}
      <Footer />
    </div>
  );
}
