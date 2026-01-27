// import { Button } from '@/components/ui/button';

// export default function Test() {
//   return (
//     <div className="bg-background text-foreground">
//       <p className="text-med">Test</p>
//       <Button variant="secondary" className='bg-green-500'>Action</Button>
//     </div>
//   );
// }

// import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
// import { AppSidebar } from '@/components/core/AppSidebar';


// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider
//       style={{
//         ['--sidebar-width' as any]: '15rem',
//         ['--sidebar-width-mobile' as any]: '20rem',
//       }}
//       defaultOpen={false}
//     >
//       <AppSidebar />
//       <main>
//         {/* <SheetTrigger asChild>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               variant="outline"
//               size="icon"
//               className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               <motion.div
//                 animate={{ rotate: open() ? 90 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {open() ? (
//                   <X className="h-4 w-4" />
//                 ) : (
//                   <Menu className="h-4 w-4" />
//                 )}
//               </motion.div>
//               <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
//             </Button>
//           </motion.div>
//         </SheetTrigger> */}
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }

// import Navbar from "@/components/core/Navbar";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to TravelMate</h1>
      {/* <Navbar /> */}
    </div>
  );
}

// {
//   id: 3,
//   slug: 'exploring-morocco-from-marrakech-to-the-sahara-desert',
//   title: 'Exploring Morocco: From Marrakech to the Sahara Desert',
//   excerpt:
//     "Traverse Morocco's enchanting cities, bustling souks, and majestic desert dunes. This guide takes you from the vibrant streets of Marrakech to the tranquil sands of the Sahara, highlighting cultural encounters, must-see landmarks, and tips for safe, immersive travel in North Africa.",
//   image:
//     'https://images.unsplash.com/photo-1539650116575-75c0c6d73a0e?w=800&h=400&fit=crop',
//   category: 'destinations',
//   categoryName: 'Destination Guides',
//   destination: 'africa',
//   destinationName: 'Morocco',
//   author: 'Emma Thompson',
//   publishedAt: '2024-07-10',
//   readTime: 15,
//   views: 3120,
//   likes: 203,
//   featured: true,
// },
// {
//   id: 4,
//   slug: 'budget-travel-how-to-see-europe-for-under-50-a-day',
//   title: 'Budget Travel: How to See Europe for Under $50 a Day',
//   excerpt:
//     'Discover how to explore Europe’s iconic cities and hidden villages without overspending. This article shares proven strategies for finding affordable accommodation, using budget-friendly transport, and enjoying free or low-cost attractions, so you can experience the continent’s culture and history on a shoestring.',
//   image:
//     'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop',
//   category: 'budget',
//   categoryName: 'Budget Travel',
//   destination: 'europe',
//   destinationName: 'Europe',
//   author: 'Alex Johnson',
//   publishedAt: '2024-07-08',
//   readTime: 10,
//   views: 4560,
//   likes: 287,
//   featured: false,
// },
// {
//   id: 5,
//   slug: 'street-food-adventures-in-bangkok-a-culinary-journey',
//   title: 'Street Food Adventures in Bangkok: A Culinary Journey',
//   excerpt:
//     'Experience the vibrant flavors of Bangkok’s street food scene. From spicy pad thai to sweet mango sticky rice, this guide introduces you to the city’s best food stalls, local favorites, and essential safety tips for enjoying authentic Thai cuisine while navigating bustling night markets.',
//   image:
//     'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
//   category: 'food',
//   categoryName: 'Food & Culture',
//   destination: 'asia',
//   destinationName: 'Thailand',
//   author: 'Lisa Park',
//   publishedAt: '2024-07-05',
//   readTime: 7,
//   views: 2890,
//   likes: 134,
//   featured: false,
// },
// {
//   id: 6,
//   slug: 'solo-female-travel-safety-tips-and-empowering-destinations',
//   title: 'Solo Female Travel: Safety Tips and Empowering Destinations',
//   excerpt:
//     'Empower your solo adventures with practical safety advice and inspiring stories from women who’ve traveled the world alone. Explore recommended destinations known for their welcoming atmosphere, learn how to stay safe on the road, and gain confidence to embrace the freedom of solo travel.',
//   image:
//     'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
//   category: 'tips',
//   categoryName: 'Travel Tips',
//   destination: 'all',
//   destinationName: 'Global',
//   author: 'Rachel Green',
//   publishedAt: '2024-07-03',
//   readTime: 11,
//   views: 1760,
//   likes: 198,
//   featured: false,
// },
// {
//   id: 7,
//   slug: 'hiking-the-swiss-alps-a-journey-above-the-clouds',
//   title: 'Hiking the Swiss Alps: A Journey Above the Clouds',
//   excerpt:
//     'Set out on a breathtaking adventure through Switzerland’s alpine trails, crystal-clear lakes, and snow-capped peaks. This guide covers the best hiking routes, essential gear, and tips for enjoying panoramic views and local hospitality in the heart of the Alps.',
//   image:
//     'https://images.unsplash.com/photo-1467269204594-4f0b6a877c59?auto=format&fit=crop&w=800&h=400&q=80',
//   category: 'destinations',
//   categoryName: 'Destination Guides',
//   destination: 'europe',
//   destinationName: 'Switzerland',
//   author: 'Lukas Meier',
//   publishedAt: '2024-07-01',
//   readTime: 14,
//   src: '',
//   views: 3210,
//   likes: 215,
//   featured: false,
// },
// {
//   id: 8,
//   slug: 'how-to-travel-japan-on-a-shoestring-budget',
//   title: 'How to Travel Japan on a Shoestring Budget',
//   excerpt:
//     'Unlock the secrets to affordable travel in Japan. Learn how to save on accommodation, food, and transportation while exploring Tokyo’s neon streets, Kyoto’s ancient temples, and rural villages. This guide proves that Japan’s wonders are accessible to every traveler, no matter the budget.',
//   image:
//     'https://images.unsplash.com/photo-1533077167465-9d7b45ab0a55?auto=format&fit=crop&w=800&h=400&q=80',
//   category: 'budget',
//   categoryName: 'Budget Travel',
//   destination: 'asia',
//   destinationName: 'Japan',
//   author: 'Aiko Tanaka',
//   publishedAt: '2024-06-25',
//   readTime: 9,
//   views: 2780,
//   likes: 167,
//   featured: true,
// },
// {
//   id: 9,
//   slug: 'cape-towns-best-beaches-and-coastal-escapes',
//   title: 'Cape Town’s Best Beaches and Coastal Escapes',
//   excerpt:
//     'Discover Cape Town’s most scenic beaches, from the surfer’s paradise of Muizenberg to the tranquil shores of Clifton and the dramatic cliffs of Chapman’s Peak. This guide highlights the best spots for relaxation, water sports, and sunset views along South Africa’s stunning coastline.',
//   image:
//     'https://images.unsplash.com/photo-1609166215706-677a0fbeb445?auto=format&fit=crop&w=800&h=400&q=80',
//   category: 'destinations',
//   categoryName: 'Destination Guides',
//   destination: 'africa',
//   destinationName: 'South Africa',
//   author: 'Nomsa Dlamini',
//   publishedAt: '2024-06-22',
//   readTime: 10,
//   views: 3420,
//   likes: 190,
//   featured: false,
// },
// {
//   id: 10,
//   slug: 'the-art-of-packing-light-for-long-term-travel',
//   title: 'The Art of Packing Light for Long-Term Travel',
//   excerpt:
//     'Master minimalist packing for extended adventures. This article shares expert tips on choosing versatile clothing, essential gear, and smart packing techniques, so you can travel for months with just a carry-on and enjoy the freedom of light, stress-free journeys.',
//   image:
//     'https://images.unsplash.com/photo-1530319067432-f2a729c03dbb?auto=format&fit=crop&w=800&h=400&q=80',
//   category: 'tips',
//   categoryName: 'Travel Tips',
//   destination: 'all',
//   destinationName: 'Global',
//   author: 'Daniel Reyes',
//   publishedAt: '2024-06-18',
//   readTime: 7,
//   views: 1590,
//   likes: 102,
//   featured: false,
// },

 

// - packages/*

// ignoredBuiltDependencies:
//   - '@medusajs/telemetry'
//   - msgpackr-extract
//   - protobufjs
//   - sharp
//   - unrs-resolver

// onlyBuiltDependencies:
//   - esbuild
