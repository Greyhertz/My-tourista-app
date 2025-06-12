import * as Icon from "@phosphor-icons/react";

export default function Homepage() {

  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
           
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Santorini"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the World</h1>
            <p className="text-lg md:text-xl mb-6">Discover new destinations and unique experiences</p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-lg text-black ">
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

        {/* Popular Destinations */}
        <div className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
             
            { name: "Bali", img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Paris", img: "https://media.istockphoto.com/id/2119799972/photo/spring-evening-view-of-the-eiffel-tower-in-paris.webp?a=1&b=1&s=612x612&w=0&k=20&c=0a1gxJfUcshqSRkHW_sQ-9NPDh9o3c8ExpB0YG67RVk=" },
              { name: "Hawaii", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
              { name: "Iceland", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
              { name: "Greece", img: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
              { name: "Peru", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" },
              { name: 'Norway', img: "https://images.unsplash.com/photo-1661345441183-d3d10b1f4e97?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              {name: 'Rome', img: "https://media.istockphoto.com/id/1973069325/photo/colosseum-is-one-of-main-travel-attraction-of-rome-in-italy.webp?a=1&b=1&s=612x612&w=0&k=20&c=lXw1lhLZ8dUsIMVZ4CwV64KuzwS5G77Nt5bx0pgS-wg="}
            ].map((place) => (
              <div key={place.name} className="text-center">
                <img
                  src={place.img}
                  alt={place.name}
                  className=" hm-img rounded-lg w-full h-80 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{place.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-300 dark:bg-gray-800 py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4 flex justify-center"><Icon.ThumbsUp size={32} color="#110939" weight="fill" /></div>
              <h3 className="font-bold text-lg mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer the best prices for your travel adventures
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4 flex justify-center"><Icon.Clock size={32} color="#110939" weight="fill" /></div>
              <h3 className="font-bold text-lg mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is here to help you at any time
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4 flex justify-center"><Icon.ShieldCheck size={32} color="#110939" weight="fill" /></div>
              <h3 className="font-bold text-lg mb-2">Secure Booking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your booking is safe with our secure system
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
