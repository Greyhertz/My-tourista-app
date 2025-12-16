{/* <div className="mt-16 w-full max-w-6xl">
  <h2 className="text-3xl font-bold mb-6 text-white">🌟 Top Global Picks</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {featured.map((item, index) => (
      <div
        key={index}
        className="bg-white text-blue-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform duration-300"
      >
        <img
          src={item.image}
          alt={item.city}
          className="h-56 w-full object-cover"
        />
        <div className="p-5 space-y-2">
          <h3 className="text-xl font-bold">{item.city}</h3>
          <p className="text-sm text-gray-600">
            {item.location?.city}, {item.location?.state},{' '}
            {item.location?.country}
          </p>
          <div className="flex items-center gap-2 text-sm text-yellow-500">
            <span>⭐ {item.rating}</span>
            <span className="text-gray-500">({item.review}+ reviews)</span>
          </div>
          <button
            onClick={() => setQuery(item.city)}
            className="mt-3 inline-block text-blue-600 hover:underline text-sm"
          >
            🔍 Explore {item.city}
          </button>
        </div>
      </div>
    ))}
  </div>
</div>;

const [featured, setFeatured] = useState<any[]>([]);

useEffect(() => {
  const loadFeatured = async () => {
    const cities = ['Paris', 'New York', 'Tokyo', 'Rome', 'Sydney'];
    const results = await Promise.all(
      cities.map(async city => {
        const coords = await getGeoCoordinates(city);
        const [lat, lon] = coords;
        const location = await reverseGeocode(lat, lon);
        const images = await fetchMultipleImages(city);
        return {
          city,
          location,
          image: images[0],
          review: Math.floor(Math.random() * 900) + 100,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        };
      })
    );
    setFeatured(results);
  };

  loadFeatured();
}, []);

<h2 className="text-3xl font-bold mb-4">📰 Trending Travel Blogs</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-left">
  {[1, 2, 3].map(i => (
    <div
      key={i}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h4 className="font-bold mb-2">
        Top Places to Visit in {2024 + i}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Discover exciting travel destinations, tips, and guides for
        your next big adventure.
      </p>
      <a
        href="#"
        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        Read More →
      </a>
    </div>
  ))}
</div>

useEffect(() => {
  const loadFeatured = async () => {
    const cities = [
      'Paris',
      'New York',
      'Tokyo',
      'Rome',
      'Sydney',
      'Cape Town',
      'Bangkok',
      'Barcelona',
      'Lisbon',
      'Cairo',
    ];
    const results = await Promise.all(
      cities.map(async city => {
        const coords = await getGeoCoordinates(city);
        const [lat, lon] = coords;
        const location = await reverseGeocode(lat, lon);
        const images = await fetchMultipleImages(city);
        return {
          city,
          location,
          image: images[0],
          review: Math.floor(Math.random() * 900) + 100,
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        };
      })
    );
    setFeatured(results);
  };

  loadFeatured();
}, []);

// IntersectionObserver for scroll effect
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

  const sections = document.querySelectorAll('.scroll-section');
  sections.forEach(section => observer.observe(section));
  return () => sections.forEach(section => observer.unobserve(section));
}, []); */}




// import { useState, useEffect } from "react";
// import { data } from "react-router-dom";
// import { fetchImage } from "../api/Unsplash";
// import { fetchNearbyHotels, getGeoCoordinates } from "../api/Geoapify";

// type Destination = {

//   id: string;
//   title: string;
//   region: string;
//   flag: string;
//   location: string;
//   image: string;
//   dates: string;
//   mapLink: string;
//   name : String
// };

// export default function ExploreDestinations() {
//   const [ipAdress, setIpAddress] = useState<{ country?: string; name?: string;}>();
//   const [loading, setLoading] = useState(true);
//   type Hotel = { id: string; name: string; [key: string]: any };
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
//   const [destinations, setDestinations] = useState<Destination[]>([]);

//   async function getIpAdress() {
//     setLoading(true);
//     try {
//       const response = await fetch('https://get.geojs.io/v1/ip/country.json');
//       const data = await response.json();
//       setIpAddress(data);
//       console.log("IP Address:", data);
//     } catch (error) {
//       console.error('Error fetching IP address:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const getCoordinates = async () => {
//     try {
//       const coordinates = await getGeoCoordinates(ipAdress?.name ?? "");
//       console.log("Coordinates:", coordinates);
//       // Optionally, you can do something with the coordinates here
//       // For example, fetch hotels based on coordinates
//   // get hotels by coordinates
//     try {
//       if (
//         typeof coordinates?.[0] === "number" &&
//         typeof coordinates?.[1] === "number"
//       ) {
//         const hotels = await fetchNearbyHotels(coordinates[0], coordinates[1]);
//       console.log("Hotels:", hotels);

//       } else {
//         console.warn("Coordinates are not valid numbers:", coordinates);
//       }
//     } catch (error) {
//       console.error('Error fetching hotels:', error);
//       return null;
//     }
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//       return null;
//     }
//   };

//    // async function fetchDestinations() {
//   //   try {
//   //     const res = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flags,name,region,cca3,maps");
//   //     const data = await res.json();
//   //     // Map the API data to match the Destination type
//   //     setDestinations(
//   //       data.map((item: any, id: number) => ({
//   //         id: item.cca3 || String(id),
//   //         title: item.name?.common || "Unknown",
//   //         region: item.region || "Unknown",
//   //         flag: item.flags?.png || "",
//   //         location: item.capital?.[0] || "",
//   //         image:fetchImage(item.name.common) || "",
//   //         dates: "",
//   //         mapLink: item.maps?.googleMaps || "",
//   //         name: item.name?.common || "Unknown"
//   //       }))
//   //     );
//   //   } catch (err) {
//   //     console.error("Error fetching destinations:", err)
//   //   }
//   //   finally {
//   //     setLoading(false);

//   //   }

//   // }

// useEffect(() => {
//   getIpAdress();
// }, []);

// useEffect(() => {
//   if (ipAdress?.name) {
//     getCoordinates(ipAdress.name);
//   }
// }, [ipAdress]);

//   return (
//     <div className="p-6 grid grid-cols-1 text-red-500 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {loading
//         ? Array.from({ length: 12 }).map((_, i) => (
//             <div
//               key={i}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
//             >
//               <div className="h-48 bg-gray-300 dark:bg-gray-700" />
//               <div className="p-4 space-y-3">
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
//                 <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-full w-10"></div>
//                 <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
//               </div>
//             </div>
//           ))
//         : destinations.length === 0 ? (
//             <div className="col-span-full text-center text-gray-500">
//               {ipAdress ? ` ${ipAdress}` : "Loading destinations..."}
//               {hotels.length > 0 && (
//                 <div>
//                   <h3 className="text-lg font-semibold">Nearby Hotels:</h3>
//                   <ul className="list-disc list-inside">
//                     {hotels.map((hotel) => (
//                       <li key={hotel.id}>{hotel.name}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : destinations.map((d) => (
//             <div
//               key={d.id}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//             >
//               <img
//                 src={d.image}
//                 alt={d.title}
//                 loading="lazy"
//                 className="w-full h-48 object-cover "
//               />
//               <div className="p-4 space-y-2">
//                 <h2 className="text-xl font-bold">{d.name}</h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {d.location} – {d.region}
//                 </p>
//                 <img src={d.flag} alt={`${d.title} flag`} className="w-10 h-10 rounded-full shadow" />
//                 <p className="text-sm flex items-center gap-1 text-gray-600 dark:text-gray-400">{d.dates}</p>
//                 <a
//                   href={d.mapLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View on Map
//                 </a>
//               </div>
//             </div>
//           ))}
//     </div>
//   );
// }
// src/pages/ExploreDestinations.tsx



// @layer base {
//   :root {
//     /* Light Theme – Sunset Glow 🌅 */
//     --background: 35 100% 97%;
//     --foreground: 340 20% 12%;

//     --card: 0 0% 100%;
//     --card-foreground: 340 20% 12%;

//     --popover: 0 0% 100%;
//     --popover-foreground: 340 20% 12%;

//     --primary: 340 85% 55%; /* fuchsia */
//     --primary-foreground: 0 0% 100%;

//     --secondary: 35 95% 85%; /* soft amber-pink */
//     --secondary-foreground: 340 20% 12%;

//     --muted: 20 40% 92%;
//     --muted-foreground: 340 15% 40%;

//     --accent: 20 90% 60%; /* amber */
//     --accent-foreground: 0 0% 100%;

//     --destructive: 0 64% 52%;
//     --destructive-foreground: 0 0% 100%;

//     --border: 20 30% 85%;
//     --input: 20 30% 85%;
//     --ring: 340 85% 55%;

//     /* 🌈 Sidebar */
//     --sidebar: 35 40% 94%;
//     --sidebar-foreground: 340 20% 12%;
//     --sidebar-primary: 340 85% 55%;
//     --sidebar-primary-foreground: 0 0% 100%;
//     --sidebar-accent: 20 90% 60%;
//     --sidebar-accent-foreground: 0 0% 100%;
//     --sidebar-border: 20 30% 85%;
//     --sidebar-ring: 340 85% 55%;

//     --radius: 0.75rem;
//   }

//   /* ✨ Twilight Mode – Dimmed Sunset 🌇 */
//   .dark {
//     --background: 214 89% 4%; /* deep navy black */
//     --foreground: 0 0% 98%;

//     --card: 214 89% 6%;
//     --card-foreground: 0 0% 98%;

//     --popover: 214 89% 6%;
//     --popover-foreground: 0 0% 98%;

//     --primary: 340 70% 60%; /* fuchsia */
//     --primary-foreground: 0 0% 100%;

//     --secondary: 220 10% 20%; /* neutral dark gray */
//     --secondary-foreground: 0 0% 98%;

//     --muted: 220 10% 15%;
//     --muted-foreground: 220 5% 60%;

//     --accent: 30 90% 55%; /* amber glow */
//     --accent-foreground: 0 0% 100%;

//     --destructive: 10 95% 57%;
//     --destructive-foreground: 0 0% 100%;

//     --border: 214 89% 10%;
//     --input: 220 10% 18%;
//     --ring: 340 70% 60%; /* fuchsia ring */

//     /* 🌑 Sidebar – Twilight */
//     --sidebar: 214 89% 3%;
//     --sidebar-foreground: 0 0% 98%;
//     --sidebar-primary: 340 70% 60%;
//     --sidebar-primary-foreground: 0 0% 100%;
//     --sidebar-accent: 30 90% 55%; /* amber */
//     --sidebar-accent-foreground: 0 0% 100%;
//     --sidebar-border: 220 10% 20%;
//     --sidebar-ring: 340 70% 60%;

//     --radius: 0.75rem;
//   }
  
 
  
//   /* ✨ BONUS: Custom utility classes for travel-specific needs */
//   .travel-gradient-sunset {
//     background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
//   }
  
//   .travel-gradient-ocean {
//     background: linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(195 85% 40%) 100%);
//   }
  
//   .travel-card-hover {
//     transition: all 0.3s ease;
//   }
  
//   .travel-card-hover:hover {
//     transform: translateY(-4px);
//     box-shadow: var(--shadow-lg);
//   }
  
//   .travel-shimmer {
//     background: linear-gradient(
//       90deg,
//       transparent 0%,
//       hsl(var(--primary) / 0.1) 50%,
//       transparent 100%
//     );
//     animation: shimmer 2s infinite;
//   }
  
//   @keyframes shimmer {
//     0% { transform: translateX(-100%); }
//     100% { transform: translateX(100%); }
//   }

//   /* Tailwind plugin or global CSS */
// .rdp {
//   @apply bg-white rounded-xl shadow-md p-4;
// }

// .rdp-day {
//   @apply w-10 h-10 text-center rounded-lg hover:bg-emerald-100;
// }

// .rdp-day_selected {
//   @apply bg-emerald-400 text-white font-bold;
// }

// .rdp-day_today {
//   @apply border border-emerald-500 font-semibold;
// }

  
  
  
  

//   /* Custom Ocean Theme */
//   .theme-ocean {
//     --background: 210 100% 97%;
//     --foreground: 210 100% 6%;
//     --card: 210 50% 95%;
//     --card-foreground: 210 100% 6%;
//     --primary: 210 100% 50%;
//     --primary-foreground: 0 0% 100%;
//     --secondary: 210 60% 90%;
//     --secondary-foreground: 210 100% 15%;
//     --muted: 210 40% 92%;
//     --muted-foreground: 210 50% 35%;
//     --accent: 210 80% 85%;
//     --accent-foreground: 210 100% 15%;
//     --border: 210 40% 85%;
//     --input: 210 40% 85%;
//     --ring: 210 100% 50%;
//   }

//   /* Custom Sunset Theme */
//   .theme-sunset {
//     --background: 20 100% 97%;
//     --foreground: 20 100% 6%;
//     --card: 20 50% 95%;
//     --card-foreground: 20 100% 6%;
//     --primary: 15 100% 60%;
//     --primary-foreground: 0 0% 100%;
//     --secondary: 25 60% 90%;
//     --secondary-foreground: 20 100% 15%;
//     --muted: 20 40% 92%;
//     --muted-foreground: 20 50% 35%;
//     --accent: 30 80% 85%;
//     --accent-foreground: 20 100% 15%;
//     --border: 20 40% 85%;
//     --input: 20 40% 85%;
//     --ring: 15 100% 60%;
//   }
// }