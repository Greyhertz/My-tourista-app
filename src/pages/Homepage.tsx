//   TravelLandingPage.tsx
//   A complete responsive landing page using shadcn/ui where
//   - Desktop: top navbar with full links
//   - Mobile: navbar collapses to a Sheet (not a sidebar component)
//   - Includes sections with matching IDs for smooth in-page navigation
//   Requirements: shadcn/ui Button + Sheet installed, lucide-react icons, Tailwind

//  import React from 'react';
//  import {
//    Sheet,
//    SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from '@/components/ui/sheet';
// import { Button } from '@/components/ui/button';
// import {
//   Menu,
//   Compass,
//   BookOpen,
//   Calendar,
//   Hotel,
//   Camera,
//   MapPin,
//   Info,
//   UserPlus,
// } from 'lucide-react';

// // --- Data: keep labels, ids, and icons in one place ---
// const NAV_LINKS: { id: string; label: string; icon: React.ReactNode }[] = [
//   { id: 'explore', label: 'Explore', icon: <Compass className="w-4 h-4" /> },
//   { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
//   { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
//   { id: 'hotels', label: 'Hotels', icon: <Hotel className="w-4 h-4" /> },
//   {
//     id: 'attractions',
//     label: 'Attractions',
//     icon: <Camera className="w-4 h-4" />,
//   },
//   { id: 'map', label: 'Map', icon: <MapPin className="w-4 h-4" /> },
//   { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
// ];

// // --- Mobile sheet menu ---
// function TravelMenuSheet() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="md:hidden">
//           <Menu className="w-5 h-5" />
//           <span className="sr-only">Open menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-[320px] sm:w-[360px]">
//         <SheetHeader>
//           <SheetTitle className="text-xl font-semibold">
//             🌍 TravelMate
//           </SheetTitle>
//         </SheetHeader>

//         <nav className="mt-6 flex flex-col gap-4 text-lg">
//           {NAV_LINKS.map(item => (
//             <SheetClose asChild key={item.id}>
//               <a
//                 href={`#${item.id}`}
//                 className="flex items-center gap-3 hover:text-blue-600 transition"
//               >
//                 {item.icon}
//                 {item.label}
//               </a>
//             </SheetClose>
//           ))}

//           <SheetClose asChild>
//             <a href="#signup" className="mt-4">
//               <Button className="w-full rounded-xl">
//                 <UserPlus className="mr-2 h-4 w-4" /> Sign Up
//               </Button>
//             </a>
//           </SheetClose>
//         </nav>
//       </SheetContent>
//     </Sheet>
//   );
// }

// // --- Top navbar (desktop shows full links, mobile shows the sheet trigger) ---
// function NavBar() {
//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-black/30">
//       <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <a href="#hero" className="flex items-center gap-2 font-bold text-xl">
//             <span>🌍</span>
//             <span>TravelMate</span>
//           </a>

//           {/* Desktop menu */}
//           <div className="hidden md:flex items-center gap-6 text-sm font-medium">
//             {NAV_LINKS.map(item => (
//               <a
//                 key={item.id}
//                 href={`#${item.id}`}
//                 className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
//               >
//                 {item.icon}
//                 {item.label}
//               </a>
//             ))}
//             <a href="#signup">
//               <Button className="rounded-xl">
//                 <UserPlus className="mr-2 h-4 w-4" /> Sign Up
//               </Button>
//             </a>
//           </div>

//           {/* Mobile trigger */}
//           <div className="md:hidden">
//             <TravelMenuSheet />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // --- Helper: section with scroll margin so content isn't hidden behind sticky nav ---
// function Section({
//   id,
//   title,
//   children,
// }: {
//   id: string;
//   title: string;
//   children?: React.ReactNode;
// }) {
//   return (
//     <section id={id} className="scroll-mt-24 py-16 md:py-24">
//       <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
//         <h2 className="mb-6 text-2xl md:text-3xl font-semibold">{title}</h2>
//         {children}
//       </div>
//     </section>
//   );
// }

// // --- The full landing page ---
// export default function TravelLandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-purple-800 to-black text-white">
//       <NavBar />

//       {/* Hero */}
//       <section id="hero" className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-24">
//             <div>
//               <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//                 Discover Your Next{' '}
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                   Adventure
//                 </span>
//               </h1>
//               <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
//                 Explore destinations, book hotels, and plan unforgettable trips
//                 — all in one place.
//               </p>
//               <div className="mt-6 flex flex-wrap gap-3">
//                 <a href="#explore">
//                   <Button className="rounded-xl">Start Exploring</Button>
//                 </a>
//                 <a href="#signup">
//                   <Button variant="outline" className="rounded-xl">
//                     Create Account
//                   </Button>
//                 </a>
//               </div>
//             </div>
//             <div className="aspect-video rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
//               <img
//                 src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop"
//                 alt="Mountain lake"
//                 className="h-full w-full object-cover"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Explore */}
//       <Section id="explore" title="Explore Destinations">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               name: 'Paris, France',
//               img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1600&auto=format&fit=crop',
//             },
//             {
//               name: 'Kyoto, Japan',
//               img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop',
//             },
//             {
//               name: 'Cape Town, South Africa',
//               img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop',
//             },
//           ].map(d => (
//             <div
//               key={d.name}
//               className="group relative overflow-hidden rounded-2xl shadow hover:shadow-lg transition"
//             >
//               <img
//                 src={d.img}
//                 alt={d.name}
//                 className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className="absolute bottom-3 left-4 text-white text-lg font-medium">
//                 {d.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </Section>

//       {/* Blog */}
//       <Section id="blog" title="Travel Blog">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[1, 2, 3].map(i => (
//             <article
//               key={i}
//               className="rounded-2xl border bg-white/60 dark:bg-white/5 p-5 backdrop-blur"
//             >
//               <h3 className="text-xl font-semibold">Top Tips #{i}</h3>
//               <p className="mt-2 text-slate-600 dark:text-slate-300">
//                 Learn how to plan, pack, and save money while exploring the
//                 world.
//               </p>
//               <a
//                 href="#"
//                 className="mt-4 inline-block text-blue-600 hover:underline"
//               >
//                 Read more
//               </a>
//             </article>
//           ))}
//         </div>
//       </Section>

//       {/* Bookings */}
//       <Section id="bookings" title="Your Bookings">
//         <div className="rounded-2xl border bg-white/60 dark:bg-white/5 p-5 backdrop-blur">
//           <p className="text-slate-600 dark:text-slate-300">
//             Sign in to view and manage your upcoming trips.
//           </p>
//           <div className="mt-4 flex gap-3">
//             <Button className="rounded-xl">Sign In</Button>
//             <a href="#signup">
//               <Button variant="outline" className="rounded-xl">
//                 Create an account
//               </Button>
//             </a>
//           </div>
//         </div>
//       </Section>

//       {/* Hotels */}
//       <Section id="hotels" title="Hotels & Stays">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             'Urban Boutique',
//             'Seaside Resort',
//             'Mountain Lodge',
//             'City Apartments',
//           ].map((name, idx) => (
//             <div
//               key={idx}
//               className="rounded-2xl border bg-white/60 dark:bg-white/5 p-5 backdrop-blur flex items-center gap-4"
//             >
//               <div className="h-16 w-24 overflow-hidden rounded-xl">
//                 <img
//                   src={`https://picsum.photos/seed/hotel${idx}/300/200`}
//                   alt={name}
//                   className="h-full w-full object-cover"
//                   loading="lazy"
//                 />
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-semibold">{name}</h4>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   From $120/night
//                 </p>
//               </div>
//               <Button variant="outline" className="rounded-xl">
//                 View
//               </Button>
//             </div>
//           ))}
//         </div>
//       </Section>

//       {/* Attractions */}
//       <Section id="attractions" title="Attractions">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {['Museums', 'Beaches', 'Hiking', 'Nightlife'].map((name, idx) => (
//             <a
//               key={idx}
//               href="#"
//               className="rounded-2xl border bg-white/60 dark:bg-white/5 p-5 backdrop-blur text-center hover:shadow-md transition"
//             >
//               <span className="text-lg font-medium">{name}</span>
//             </a>
//           ))}
//         </div>
//       </Section>

//       {/* Map */}
//       <Section id="map" title="Interactive Map">
//         <div className="aspect-video rounded-2xl border bg-white/60 dark:bg-white/5 p-2 backdrop-blur">
//           <iframe
//             title="Map"
//             className="h-full w-full rounded-xl"
//             loading="lazy"
//             src="https://www.openstreetmap.org/export/embed.html?bbox=3.24%2C6.28%2C7.80%2C9.10&layer=mapnik"
//           />
//         </div>
//       </Section>

//       {/* About */}
//       <Section id="about" title="About Us">
//         <div className="rounded-2xl border bg-white/60 dark:bg-white/5 p-5 backdrop-blur">
//           <p className="text-slate-600 dark:text-slate-300">
//             TravelMate helps you plan trips with real destinations, hotels, and
//             guides. Built with performance and simplicity in mind.
//           </p>
//         </div>
//       </Section>

//       {/* Sign Up */}
//       <Section id="signup" title="Create Your Account">
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
//           <input
//             className="rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10"
//             placeholder="Full name"
//           />
//           <input
//             className="rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10"
//             placeholder="Email address"
//             type="email"
//           />
//           <input
//             className="rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10 md:col-span-2"
//             placeholder="Password"
//             type="password"
//           />
//           <Button className="rounded-xl md:col-span-2">Sign Up</Button>
//         </form>
//       </Section>

//       {/* Footer */}
//       <footer className="border-t py-10 text-center text-sm text-slate-500 dark:text-slate-400">
//         © {new Date().getFullYear()} TravelMate. All rights reserved.
//       </footer>
//     </div>
//   );
// }







// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { Menu } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function TravelLandingPage() {
//   const navItems = [
//     { label: 'Explore', href: '#explore' },
//     { label: 'Blog', href: '#blog' },
//     { label: 'Bookings', href: '#bookings' },
//     { label: 'Hotels', href: '#hotels' },
//     { label: 'Attractions', href: '#attractions' },
//     { label: 'Map', href: '#map' },
//     { label: 'About', href: '#about' },
//     { label: 'Sign Up', href: '#signup' },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600 via-purple-800 to-black text-white">
//       {/* Navbar */}
//       <header className="sticky top-0 z-50 w-full backdrop-blur bg-black/40">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-2xl font-bold"
//           >
//             TravelMate
//           </motion.h1>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex space-x-6">
//             {navItems.map(item => (
//               <motion.a
//                 key={item.href}
//                 href={item.href}
//                 whileHover={{ scale: 1.1, color: '#a78bfa' }}
//                 className="hover:text-purple-300 transition-colors"
//               >
//                 {item.label}
//               </motion.a>
//             ))}
//           </nav>

//           {/* Mobile nav */}
//           <div className="md:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left" className="bg-purple-950/90 text-white">
//                 <nav className="flex flex-col space-y-4 mt-10">
//                   {navItems.map(item => (
//                     <a
//                       key={item.href}
//                       href={item.href}
//                       className="hover:text-purple-300 transition-colors"
//                     >
//                       {item.label}
//                     </a>
//                   ))}
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <motion.section
//         id="hero"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24"
//       >
//         <motion.h2
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-6xl font-extrabold mb-6"
//         >
//           Explore the World with Us
//         </motion.h2>
//         <motion.p
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="text-lg md:text-xl text-purple-200 max-w-2xl"
//         >
//           Discover amazing destinations, book your dream hotels, and create
//           memories that last forever.
//         </motion.p>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="mt-8"
//         >
//           <Button size="lg" className="bg-purple-500 hover:bg-purple-400">
//             Get Started
//           </Button>
//         </motion.div>
//       </motion.section>

//       {/* Example sections */}
//       <section id="explore" className="py-20 text-center">
//         <motion.h3
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-bold mb-6"
//         >
//           Explore Destinations
//         </motion.h3>
//         <p className="text-purple-200 max-w-xl mx-auto">
//           Find exciting places across continents, curated just for you.
//         </p>
//       </section>

//       <section id="blog" className="py-20 text-center bg-black/40">
//         <motion.h3
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl font-bold mb-6"
//         >
//           Travel Blog
//         </motion.h3>
//         <p className="text-purple-200 max-w-xl mx-auto">
//           Read stories and tips from travelers around the world.
//         </p>
//       </section>

//       <footer className="py-6 text-center text-sm text-purple-300 bg-black/40">
//         © {new Date().getFullYear()} TravelMate. All rights reserved.
//       </footer>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from 'framer-motion';
import Navbar from '@/components/core/Navbar';
import { Section } from 'lucide-react';
import { Button } from '@/components/ui/button';







const Homepage = () => {
  const [activeDestination, setActiveDestination] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubscription, setEmailSubscription] = useState('');
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  // Hero images for background rotation (keeping this as it's a slideshow)
  const heroImages = [
    'https://images.unsplash.com/photo-1488646953014-85cb25828?q=80&w=2070',
    'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070',
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb6?q=80&w=2070',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070',
  ];

  // Remove auto-rotating hero images - only change on user interaction or mount
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
  //   }, 8000);
  //   return () => clearInterval(interval);
  // }, []);

  // Header hide/show on scroll
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        // Always show header at the top
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide header
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
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
      color: 'from-blue-500 to-cyan-400',
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
      color: 'from-pink-500 to-rose-400',
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
      color: 'from-green-500 to-emerald-400',
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
      color: 'from-orange-500 to-amber-400',
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
      color: 'from-teal-500 to-blue-400',
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
      color: 'from-purple-500 to-indigo-400',
      activities: ['Northern Lights', 'Hot Springs', 'Glacier Tours'],
    },
  ];

  const features = [
    {
      title: 'AI-Powered Trip Planning',
      description:
        'Our advanced AI creates personalized itineraries based on your preferences, budget, and travel style',
      icon: '🤖',
      color: 'from-purple-500 to-violet-400',
      stats: '95% satisfaction rate',
    },
    {
      title: '24/7 Concierge Service',
      description:
        'Premium concierge support available around the clock in 40+ languages worldwide',
      icon: '🌍',
      color: 'from-blue-500 to-sky-400',
      stats: '2-minute response time',
    },
    {
      title: 'Price Match Plus',
      description:
        "We'll match any lower price and give you an extra 10% off, guaranteed",
      icon: '💎',
      color: 'from-green-500 to-teal-400',
      stats: 'Save up to 30%',
    },
    {
      title: 'Carbon Neutral Travel',
      description:
        'All bookings include carbon offset at no extra cost, protecting our planet',
      icon: '🌱',
      color: 'from-emerald-500 to-green-400',
      stats: '100% carbon neutral',
    },
    {
      title: 'Instant Rebooking',
      description:
        "Flight cancelled? Weather issues? We'll rebook you instantly with no extra fees",
      icon: '⚡',
      color: 'from-yellow-500 to-orange-400',
      stats: '99.9% success rate',
    },
    {
      title: 'VIP Access',
      description:
        'Skip the lines with exclusive access to attractions, restaurants, and experiences',
      icon: '👑',
      color: 'from-pink-500 to-rose-400',
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
      icon: '🏔️',
      count: '2,500+ trips',
      color: 'from-orange-400 to-red-500',
    },
    {
      type: 'Romance',
      icon: '💕',
      count: '1,800+ couples',
      color: 'from-pink-400 to-rose-500',
    },
    {
      type: 'Family',
      icon: '👨‍👩‍👧‍👦',
      count: '3,200+ families',
      color: 'from-blue-400 to-purple-500',
    },
    {
      type: 'Solo',
      icon: '🎒',
      count: '1,500+ explorers',
      color: 'from-green-400 to-teal-500',
    },
    {
      type: 'Luxury',
      icon: '✨',
      count: '900+ experiences',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      type: 'Cultural',
      icon: '🏛️',
      count: '2,100+ journeys',
      color: 'from-purple-400 to-indigo-500',
    },
  ];

  const stats = [
    { number: '2.5M', label: 'Happy Travelers', prefix: '+', icon: '😊' },
    { number: '150', label: 'Countries', prefix: '', icon: '🌍' },
    { number: '50K', label: '5-Star Reviews', prefix: '+', icon: '⭐' },
    { number: '15', label: 'Years Experience', prefix: '', icon: '🏆' },
  ];

  // Enhanced scroll-triggered animations with better performance
  const ScrollReveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true, // Changed to true so animations only happen once
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
    <div className="min-h-screen  bg-gradient-to-br from-purple-600 via-purple-800 to-black text-gray-900 overflow-hidden">
      {/* Enhanced Navigation with smart hide/show animation */}
      <Navbar isVisible={isHeaderVisible} />

      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        {/* Static Background Image - no more slideshow */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroImages[0]})` }}
        />

        <motion.div
          style={{ y: y1, opacity: opacity1, scale: scale1 }}
          className="absolute inset-0 bg-gradient-to-br from-orange-100/80 via-rose-100/60 to-teal-100/80"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Fixed: Removed repeating background animation */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-gray-800">Your Next</span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed font-medium"
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
            <form
              onSubmit={handleSearch}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none bg-white/70 transition-all duration-300"
                  />
                  <span className="absolute right-3 top-10 text-orange-400">
                    🌍
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none bg-white/70 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none bg-white/70 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Travelers
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none bg-white/70 transition-all duration-300">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>Family (4+)</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r  from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 h-12"
                  >
                    🔍 Search Trips
                  </motion.button>
                </div>
              </div>

              {/* Popular Searches */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <span className="text-sm text-gray-500">Popular:</span>
                {['Paris', 'Tokyo', 'Bali', 'Maldives', 'Iceland'].map(city => (
                  <motion.button
                    key={city}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-full text-sm text-gray-700 hover:text-orange-600 transition-all duration-300"
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
            </form>
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
                  className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                    {stat.prefix}
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Static floating elements - no continuous animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <span>
                {
                  ['✈️', '🏝️', '🗺️', '📸', '🎒', '🌴', '🏔️', '🏛️'][
                    Math.floor(Math.random() * 8)
                  ]
                }
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Types Section */}
      <section
        id="experiences"
        className="py-32 px-6 bg-gradient-to-r from-blue-50/80 to-purple-50/80"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Travel Your Way
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Whether you're seeking adventure, romance, or relaxation, we
                have the perfect journey for you
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {travelTypes.map((type, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg group cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                    {type.type}
                  </h3>
                  <p className="text-sm text-gray-500">{type.count}</p>
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
        className="py-32 px-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-pink-50/30"></div>
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-500 via-pink-500 to-teal-500 bg-clip-text text-transparent">
                Featured Destinations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${destination.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <span className="text-yellow-300 mr-1">⭐</span>{' '}
                        {destination.rating}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {destination.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                      {destination.name}
                    </h3>

                    <p className="text-white/90 mb-3 text-sm leading-relaxed">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.activities.map((activity, idx) => (
                        <span
                          key={idx}
                          className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg text-xs"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        From {destination.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveDestination(index)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm"
                      >
                        Explore →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel and Bookings */}

      <ScrollReveal delay={0.2}>
        <section id="hotels" title="Hotels & Stays" className="py-32 px-6">
          <h2>Hotels and Resorts Bokings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Urban Boutique',
              'Seaside Resort',
              'Mountain Lodge',
              'City Apartments',
            ].map((name, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-purple-600 bg-white/60 dark:bg-white/5 p-5 backdrop-blur flex items-center gap-4"
              >
                <div className="h-16 w-24 overflow-hidden rounded-xl">
                  <img
                    src={`https://picsum.photos/seed/hotel${idx}/300/200`}
                    alt={name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    From $120/night
                  </p>
                </div>
                <Button variant="outline" className="rounded-xl">
                  View
                </Button>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <section id="about" ref={featuresRef} className="py-28 px-6">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Why TravelMate
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Premium service, smart planning, and planet-friendly travel —
                all in one place.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`rounded-2xl p-6 bg-white shadow-lg border border-white/50`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl mb-4 bg-gradient-to-r ${f.color} flex items-center justify-center text-2xl`}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{f.description}</p>
                  <div className="text-xs font-semibold text-gray-500">
                    {f.stats}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="blog"
        ref={testimonialsRef}
        className="py-28 px-6 bg-gradient-to-br from-rose-50 to-teal-50"
      >
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Loved by Travelers
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Real stories from real adventures.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-2xl p-6 bg-white shadow-xl border border-white/50"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.location}</div>
                    </div>
                  </div>
                  <div className="text-yellow-400 mb-2">
                    {'⭐'.repeat(t.rating)}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">"{t.text}"</p>
                  <div className="text-xs text-gray-500">Trip: {t.trip}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Get travel inspo in your inbox
              </h3>
              <p className="text-gray-600 mb-8">
                Exclusive deals, new itineraries, and smart tips — no spam.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={emailSubscription}
                  onChange={e => setEmailSubscription(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none bg-white/80 w-full sm:w-2/3"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold shadow"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                Your Adventure Awaits
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
                Start planning your dream vacation today with personalized
                recommendations, exclusive deals, and 24/7 expert support
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 px-12 py-5 rounded-full text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300"
                >
                  🚀 Plan My Trip
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-12 py-5 rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  💬 Talk to Expert
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm text-white/90">
                    AI-Powered Planning
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-sm text-white/90">
                    Best Price Guarantee
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="text-sm text-white/90">
                    24/7 Global Support
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Fixed: Static floating travel icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          {['✈️', '🏖️', '🗽', '🗼', '🏔️', '🏛️', '🎒', '📸', '🌴', '🗺️'].map(
            (icon, i) => (
              <div
                key={i}
                className="absolute text-4xl text-white"
                style={{
                  left: `${5 + i * 9}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
              >
                {icon}
              </div>
            )
          )}
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">T</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-Purplee-400 to-pink-400 bg-clip-text text-transparent">
                  TravelMate
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Creating unforgettable travel experiences since 2010. Your
                adventure starts here with AI-powered planning and world-class
                service.
              </p>

              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(social => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <span className="text-sm">📱</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Destinations',
                items: [
                  'Europe',
                  'Asia',
                  'Americas',
                  'Africa',
                  'Oceania',
                  'Popular Cities',
                ],
              },
              {
                title: 'Services',
                items: [
                  'Flight Booking',
                  'Hotels',
                  'Car Rental',
                  'Tours',
                  'Travel Insurance',
                  'Visa Assistance',
                ],
              },
              {
                title: 'Support',
                items: [
                  'Help Center',
                  'Contact Us',
                  'Travel Guide',
                  'Blog',
                  'Reviews',
                  'Mobile App',
                ],
              },
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold mb-6 text-white text-lg">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.items.map(item => (
                    <li key={item}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5, color: '#f97316' }}
                        className="text-gray-400 hover:text-orange-400 transition-all duration-300"
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2025 TravelMate. All rights reserved. Made with ❤️ for
                travelers worldwide.
              </p>

              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                  link => (
                    <motion.a
                      key={link}
                      href="#"
                      whileHover={{ color: '#f97316' }}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                    >
                      {link}
                    </motion.a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;