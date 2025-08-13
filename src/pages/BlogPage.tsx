// import { blogPosts } from '../data/DataBlog';
// import { Link } from 'react-router-dom';
// const posts = [
//   {
//     title: '10 Hidden Gems You Must Visit',
//     date: 'April 18, 2024',
//     description:
//       'Discover lesser-known breathtaking spots around the globe that every traveler must explore.',
//     image:
//       'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80',
//   },
//   {
//     title: 'A Journey Through Tokyo',
//     date: 'April 16, 2024',
//     description:
//       'Experience the bustling streets, tranquil temples, and modern marvels of Tokyo.',
//     image:
//       'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     title: 'Solo Female Travel: Tips & Experiences',
//     date: 'April 18, 2024',
//     description:
//       'Empowering travel tips, safety advice, and inspiring solo adventures for women.',
//     image:
//       'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
//   },
//   {
//     title: 'How to Travel on a Budget: My Top Tips',
//     date: 'April 10, 2024',
//     description: 'Smart hacks to explore the world without breaking the bank.',
//     image:
//       'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
//   },
// ];

// export default function BlogPage() {
//   return (
//     <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
//       {/* Hero */}
//       <section className="relative h-[500px] bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80')]">
//         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
//           <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl">
//             Inspiring Travel Stories and Tips from Around the World
//           </h1>
//           <button className="mt-6 px-6 py-3 bg-blue-900 text-white font-semibold rounded hover:bg-blue-700 transition">
//             Read More
//           </button>
//         </div>
//       </section>

//       {/* Latest Posts */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {posts.map((post, id) => (
//             <div
//               key={id}
//               className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
//             >
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-48 object-cover rounded-lg shadow"
//               />
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 {post.date}
//               </p>
//               <h3 className="font-bold mt-1 text-lg">{post.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">
//                 {post.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* About / Tips / Subscribe */}
//       <section className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
//         {/* About Me */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">About Me</h2>
//           <img
//             src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"
//             alt="Jane"
//             className="w-28 h-28 rounded-full object-cover mb-4"
//           />
//           <p>
//             I'm Jane, a passionate traveler and storyteller. I started the blog
//             to share my adventures and help others explore the world. Join me as
//             we uncover new destinations, cultures, and tips to make your travels
//             unforgettable.
//           </p>
//         </div>

//         {/* Search + Travel Tips */}
//         <div>
//           <div className="mb-6">
//             <label className="sr-only">Search</label>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//             />
//           </div>
//           <h2 className="text-xl font-semibold mb-4">Travel Tips</h2>
//           <div className="space-y-4">
//             <div>
//               <img
//                 src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80"
//                 alt="Packing"
//                 className="w-full h-50 object-cover rounded-lg"
//               />
//               <p className="font-medium mt-2">
//                 Packing Essentials for Every Traveler
//               </p>
//             </div>
//             <div>
//               <img
//                 src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
//                 alt="Navigation"
//                 className="w-full h-32 object-cover rounded-lg"
//               />
//               <p className="font-medium mt-2">Smart Travel Tools and Apps</p>
//             </div>
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">
//             Subscribe to Newsletter
//           </h2>
//           <p className="mb-4">
//             Get the latest updates and travel tips directly to your inbox.
//           </p>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
//           />
//           <button className="w-full px-4 py-2 bg-blue-900 text-white font-semibold rounded hover:bg-blue-700 transition">
//             Subscribe
//           </button>
//         </div>
//       </section>
//       <section className="max-w-6xl mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Smart Travel Tips
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {blogPosts.map(post => (
//             <div
//               key={post.slug}
//               className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md"
//             >
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-lg mb-2">{post.title}</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {post.excerpt}
//                 </p>
//                 <Link
//                   to={`/blog/${post.slug}`}
//                   className="inline-block mt-3 text-blue-500 hover:underline text-sm"
//                 >
//                   Read more →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// import { useState, useMemo, useEffect } from 'react';
// import {
//   Search,
//   MapPin,
//   Calendar,
//   Clock,
//   User,
//   ArrowRight,
//   Filter,
//   Grid,
//   List,
//   Share2,
//   Eye,
//   ChevronDown,
// } from 'lucide-react';
// import { fetchTravelBlogs } from '../api/Devto';
// import * as Icon from '@phosphor-icons/react';
// import { Link, useNavigate } from 'react-router-dom';

// const TravelBlogPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedDestination, setSelectedDestination] = useState('all');
//   const [viewMode, setViewMode] = useState('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [blogPosts, setBlogPosts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>('');
//   const navigate = useNavigate();

//   // Mock data - in real implementation, this would come from your API/database
//   const categories = [
//     { id: 'all', name: 'All Posts', count: 45 },
//     { id: 'destinations', name: 'Destination Guides', count: 12 },
//     { id: 'itineraries', name: 'Itineraries', count: 8 },
//     { id: 'tips', name: 'Travel Tips', count: 15 },
//     { id: 'food', name: 'Food & Culture', count: 7 },
//     { id: 'budget', name: 'Budget Travel', count: 10 },
//   ];

//   const destinations = [
//     { id: 'all', name: 'All Destinations' },
//     { id: 'europe', name: 'Europe' },
//     { id: 'asia', name: 'Asia' },
//     { id: 'africa', name: 'Africa' },
//     { id: 'americas', name: 'Americas' },
//     { id: 'oceania', name: 'Oceania' },
//   ];

//   const mockPosts = [
//     {
//       id: 1,
//       slug: 'the-ultimate-guide-to-backpacking-through-southeast-asia',
//       title: 'The Ultimate Guide to Backpacking Through Southeast Asia',
//       excerpt:
//         'Discover hidden gems, local cuisines, and budget-friendly accommodations across Thailand, Vietnam, Cambodia, and Laos in this comprehensive 3-week itinerary.',
//       image:
//         'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
//       category: 'itineraries',
//       categoryName: 'Itineraries',
//       destination: 'asia',
//       destinationName: 'Southeast Asia',
//       author: 'Sarah Chen',
//       publishedAt: '2024-07-15',
//       readTime: 12,
//       views: 2340,
//       likes: 89,
//       featured: true,
//     },
//     {
//       id: 2,
//       slug: '15-essential-travel-photography-tips-for-beginners',
//       title: '15 Essential Travel Photography Tips for Beginners',
//       excerpt:
//         'Master the art of travel photography with these practical tips covering composition, lighting, and storytelling techniques.',
//       image:
//         'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
//       category: 'tips',
//       categoryName: 'Travel Tips',
//       destination: 'all',
//       destinationName: 'Global',
//       author: 'Mike Rodriguez',
//       publishedAt: '2024-07-12',
//       readTime: 8,
//       views: 1890,
//       likes: 156,
//       featured: false,
//     },
//     {
//       id: 3,
//       slug: 'exploring-morocco-from-marrakech-to-the-sahara-desert',
//       title: 'Exploring Morocco: From Marrakech to the Sahara Desert',
//       excerpt:
//         "Journey through Morocco's imperial cities, bustling souks, and stunning desert landscapes in this detailed destination guide.",
//       image:
//         'https://images.unsplash.com/photo-1539650116575-75c0c6d73a0e?w=800&h=400&fit=crop',
//       category: 'destinations',
//       categoryName: 'Destination Guides',
//       destination: 'africa',
//       destinationName: 'Morocco',
//       author: 'Emma Thompson',
//       publishedAt: '2024-07-10',
//       readTime: 15,
//       views: 3120,
//       likes: 203,
//       featured: true,
//     },
//     {
//       id: 4,
//       slug: 'budget-travel-how-to-see-europe-for-under-50-a-day',
//       title: 'Budget Travel: How to See Europe for Under $50 a Day',
//       excerpt:
//         'Practical strategies for exploring Europe without breaking the bank, including accommodation hacks, transportation tips, and free activities.',
//       image:
//         'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop',
//       category: 'budget',
//       categoryName: 'Budget Travel',
//       destination: 'europe',
//       destinationName: 'Europe',
//       author: 'Alex Johnson',
//       publishedAt: '2024-07-08',
//       readTime: 10,
//       views: 4560,
//       likes: 287,
//       featured: false,
//     },
//     {
//       id: 5,
//       slug: 'street-food-adventures-in-bangkok-a-culinary-journey',
//       title: 'Street Food Adventures in Bangkok: A Culinary Journey',
//       excerpt:
//         "Dive into Bangkok's incredible street food scene with this guide to must-try dishes, best locations, and food safety tips.",
//       image:
//         'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
//       category: 'food',
//       categoryName: 'Food & Culture',
//       destination: 'asia',
//       destinationName: 'Thailand',
//       author: 'Lisa Park',
//       publishedAt: '2024-07-05',
//       readTime: 7,
//       views: 2890,
//       likes: 134,
//       featured: false,
//     },
//     {
//       id: 6,
//       slug: 'solo-female-travel-safety-tips-and-empowering-destinations',
//       title: 'Solo Female Travel: Safety Tips and Empowering Destinations',
//       excerpt:
//         'Comprehensive guide for women traveling alone, featuring safe destinations, practical safety tips, and inspiring solo travel stories.',
//       image:
//         'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
//       category: 'tips',
//       categoryName: 'Travel Tips',
//       destination: 'all',
//       destinationName: 'Global',
//       author: 'Rachel Green',
//       publishedAt: '2024-07-03',
//       readTime: 11,
//       views: 1760,
//       likes: 198,
//       featured: false,
//     },
//     {
//       id: 7,
//       slug: 'hiking-the-swiss-alps-a-journey-above-the-clouds',
//       title: 'Hiking the Swiss Alps: A Journey Above the Clouds',
//       excerpt:
//         'Lace up your boots and explore breathtaking trails, alpine lakes, and snow-capped peaks in this detailed Swiss hiking adventure.',
//       image:
//         'https://images.unsplash.com/photo-1549989473-4f0b6a877c59?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'destinations',
//       categoryName: 'Destination Guides',
//       destination: 'europe',
//       destinationName: 'Switzerland',
//       author: 'Lukas Meier',
//       publishedAt: '2024-07-01',
//       readTime: 14,
//       views: 3210,
//       likes: 215,
//       featured: false,
//     },
//     {
//       id: 8,
//       slug: 'how-to-travel-japan-on-a-shoestring-budget',
//       title: 'How to Travel Japan on a Shoestring Budget',
//       excerpt:
//         'Yes, Japan can be affordable! Learn the insider tricks to saving on food, transport, and accommodation while exploring Tokyo, Kyoto, and beyond.',
//       image:
//         'https://images.unsplash.com/photo-1533077167465-9d7b45ab0a55?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'budget',
//       categoryName: 'Budget Travel',
//       destination: 'asia',
//       destinationName: 'Japan',
//       author: 'Aiko Tanaka',
//       publishedAt: '2024-06-25',
//       readTime: 9,
//       views: 2780,
//       likes: 167,
//       featured: true,
//     },
//     {
//       id: 9,
//       slug: 'cape-towns-best-beaches-and-coastal-escapes',
//       title: 'Cape Town’s Best Beaches and Coastal Escapes',
//       excerpt:
//         'From surfing at Muizenberg to sunsets at Camps Bay, explore the most scenic and relaxing coastal spots around Cape Town.',
//       image:
//         'https://images.unsplash.com/photo-1609166215706-677a0fbeb445?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'destinations',
//       categoryName: 'Destination Guides',
//       destination: 'africa',
//       destinationName: 'South Africa',
//       author: 'Nomsa Dlamini',
//       publishedAt: '2024-06-22',
//       readTime: 10,
//       views: 3420,
//       likes: 190,
//       featured: false,
//     },
//     {
//       id: 10,
//       slug: 'the-art-of-packing-light-for-long-term-travel',
//       title: 'The Art of Packing Light for Long-Term Travel',
//       excerpt:
//         'Traveling for months with just a carry-on? This guide covers minimalist packing strategies, essentials, and smart gear picks.',
//       image:
//         'https://images.unsplash.com/photo-1530319067432-f2a729c03dbb?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'tips',
//       categoryName: 'Travel Tips',
//       destination: 'all',
//       destinationName: 'Global',
//       author: 'Daniel Reyes',
//       publishedAt: '2024-06-18',
//       readTime: 7,
//       views: 1590,
//       likes: 102,
//       featured: false,
//     },
//     {
//       id: 11,
//       slug: 'foodies-guide-to-rome-eat-like-a-local',
//       title: 'Foodie’s Guide to Rome: Eat Like a Local',
//       excerpt:
//         'Indulge in Rome’s tastiest dishes — from carbonara to suppli — and discover local trattorias, markets, and gelaterias off the beaten path.',
//       image:
//         'https://images.unsplash.com/photo-1600275668994-868c1c00d0a4?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'food',
//       categoryName: 'Food & Culture',
//       destination: 'europe',
//       destinationName: 'Italy',
//       author: 'Giulia Romano',
//       publishedAt: '2024-06-14',
//       readTime: 6,
//       views: 2675,
//       likes: 143,
//       featured: false,
//     },
//     {
//       id: 12,
//       slug: 'the-magic-of-new-zealand-nature-culture-and-adventure',
//       title: 'The Magic of New Zealand: Nature, Culture, and Adventure',
//       excerpt:
//         'Explore the diverse beauty of Aotearoa, from Maori heritage and geothermal wonders to epic hikes and Lord of the Rings landscapes.',
//       image:
//         'https://images.unsplash.com/photo-1578496481383-7b0c36dd254b?auto=format&fit=crop&w=800&h=400&q=80',
//       category: 'destinations',
//       categoryName: 'Destination Guides',
//       destination: 'oceania',
//       destinationName: 'New Zealand',
//       author: 'Thomas Blake',
//       publishedAt: '2024-06-10',
//       readTime: 13,
//       views: 2950,
//       likes: 170,
//       featured: true,
//     },
//   ];

//   useEffect(() => {
//     async function loadBlogs() {
//       try {
//         setLoading(true);
//         const posts = await fetchTravelBlogs(20);
//         const mapped = posts.map(post => ({
//           id: post.id,
//           title: post.title,
//           excerpt: post.description,
//           image:
//             post.cover_image ||
//             'https://via.placeholder.com/800x400?text=No+Image',
//           category: 'travel',
//           categoryName: 'Travel',
//           destination: 'global',
//           destinationName: 'Various',
//           author: post.user.name,
//           publishedAt: post.readable_publish_date,
//           readTime: post.reading_time_minutes,
//           views: post.public_reactions_count * 100, // Fake
//           likes: post.public_reactions_count,
//           featured: post.public_reactions_count > 10,
//         }));
//         setBlogPosts(mapped);
//       } catch (err) {
//         console.error(err);
//         setError('Could not load blog posts.');
//       }
//       setBlogPosts(mockPosts);
//       setLoading(false);
//     }

//     // ✅ You must call the function
//     loadBlogs();
//   }, []);

//   const filteredPosts = useMemo(() => {
//     return blogPosts.filter(post => {
//       const matchesSearch =
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory === 'all' || post.category === selectedCategory;
//       const matchesDestination =
//         selectedDestination === 'all' ||
//         post.destination === selectedDestination;

//       return matchesSearch && matchesCategory && matchesDestination;
//     });
//   }, [searchTerm, selectedCategory, selectedDestination]);

//   const featuredPosts = blogPosts.filter(post => post.featured);

//   const formatDate = (dateString: String | number | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   // const loadButton = () => {
//   //   filteredPosts.length > visibleCount
//   //     ? setVisibleCount(prev => prev + 6)
//   //     : setVisibleCount(visibleCount);
//   // };

//   const handleLike = (postId: number) => {
//     setLikedPosts(prev => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   type BlogPost = {
//     id: number;
//     slug: string;
//     title: string;
//     excerpt: string;
//     image: string;
//     category: string;
//     categoryName: string;
//     destination: string;
//     destinationName: string;
//     author: string;
//     publishedAt: string;
//     readTime: number;
//     views: number;
//     likes: number;
//     featured: boolean;
//   };

//   interface PostCardProps {
//     post: BlogPost;
//     featured?: boolean;
//   }

//   const PostCard = ({ post, featured = false }: PostCardProps) => (
//     <article
//       className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
//         featured ? 'md:col-span-2' : ''
//       }`}
//     >
//       <div className="relative">
//         <img
//           src={post.image}
//           alt={post.title}
//           className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
//         />
//         <div className="absolute top-4 left-4">
//           <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//             {post.categoryName}
//           </span>
//         </div>
//         <button
//           onClick={() => handleLike(post.id)}
//           className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
//         >
//           {likedPosts[post.id] ? (
//             <Icon.HeartIcon weight="fill" fill="purple" className="w-4 h-4" />
//           ) : (
//             <Icon.HeartIcon
//               weight="fill"
//               fill="lightgray"
//               className="w-4 h-4"
//             />
//           )}
//         </button>
//         {/* Show likes count, increased if liked, decreased if unliked */}

//         {/* <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform-translate-y-1/2 text-gray-700 hover:text-gray-400 transition-colors duration-200"
//               >
//                 {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
//               </button> */}
//       </div>
//       <div className="p-6">
//         <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//           <div className="flex items-center gap-1">
//             <MapPin className="w-4 h-4" />
//             <span>{post.destinationName}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Calendar className="w-4 h-4" />
//             <span>{formatDate(post.publishedAt)}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Clock className="w-4 h-4" />
//             <span>{post.readTime} min read</span>
//           </div>
//         </div>

//         <h2
//           className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors ${
//             featured ? 'text-xl' : 'text-lg'
//           }`}
//         >
//           <Link to={`/blog/${post.slug}`}>{post.title}</Link>
//         </h2>

//         <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <User className="w-4 h-4 text-gray-400" />
//             <span className="text-sm text-gray-600">{post.author}</span>
//           </div>

//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <div className="flex items-center gap-1">
//               <Eye className="w-4 h-4" />
//               <span>{post.views.toLocaleString()}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Icon.Heart className="w-4 h-4" />
//               {likedPosts[post.id] ? post.likes + 1 : post.likes}
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 pt-4 border-t border-gray-100">
//           <Link
//             to={`/blog/${post.slug}`}
//             className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
//           >
//             Read More <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Travel Stories & Guides
//             </h1>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Discover amazing destinations, practical travel tips, and
//               inspiring stories from fellow adventurers
//             </p>

//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto relative">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search destinations, tips, guides..."
//                   className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
//                   value={searchTerm}
//                   onChange={e => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Filters Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div className="flex flex-wrap gap-2">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                     selectedCategory === category.id
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-white text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {category.name} ({category.count})
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors text-black"
//               >
//                 <Filter className="w-4 h-4" />
//                 Filters
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform ${
//                     showFilters ? 'rotate-180' : ''
//                   }`}
//                 />
//               </button>

//               <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded transition-colors ${
//                     viewMode === 'grid'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded transition-colors ${
//                     viewMode === 'list'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Filters */}
//           <div className={`lg:hidden mt-4 ${showFilters ? 'block' : 'hidden'}`}>
//             <div className="bg-white rounded-lg border p-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Destination
//                 </label>
//                 <select
//                   value={selectedDestination}
//                   onChange={e => setSelectedDestination(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 >
//                   {destinations.map(dest => (
//                     <option key={dest.id} value={dest.id}>
//                       {dest.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Desktop Destination Filter */}
//           <div className="hidden lg:block mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Destination
//             </label>
//             <select
//               value={selectedDestination}
//               onChange={e => setSelectedDestination(e.target.value)}
//               className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
//             >
//               {destinations.map(dest => (
//                 <option key={dest.id} value={dest.id}>
//                   {dest.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {loading && (
//           <div className="text-center py-12 text-gray-500">
//             Loading travel blogs...
//           </div>
//         )}

//         {error && <div className="text-center py-12 text-red-500">{error}</div>}

//         {/* Featured Posts Section */}
//         {featuredPosts.length > 0 &&
//           selectedCategory === 'all' &&
//           !searchTerm && (
//             <div className="mb-12">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Featured Stories
//               </h2>
//               <div className="grid md:grid-cols-2 gap-8">
//                 {featuredPosts.slice(0, 3).map(post => (
//                   <PostCard key={post.id} post={post} featured={true} />
//                 ))}
//               </div>
//             </div>
//           )}
//         {/* Results Count */}
//         <div className="mb-6">
//           <p className="text-gray-600">
//             Showing {filteredPosts.length}{' '}
//             {filteredPosts.length === 1 ? 'post' : 'posts'}
//             {searchTerm && ` for "${searchTerm}"`}
//           </p>
//         </div>
//         {/* Blog Posts Grid */}
//         <div
//           className={`grid gap-8 ${
//             viewMode === 'grid'
//               ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
//               : 'grid-cols-1'
//           }`}
//         >
//           {filteredPosts.slice(0, visibleCount).map(post => (
//             <PostCard key={post.id} post={post} />
//           ))}
//         </div>
//         {/* No Results */}
//         {filteredPosts.length === 0 && (
//           <div className="text-center py-12">
//             <div className="max-w-md mx-auto">
//               <div className="text-gray-400 mb-4">
//                 <Search className="w-16 h-16 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No posts found
//               </h3>
//               <p className="text-gray-600 mb-4">
//                 Try adjusting your search or filter criteria
//               </p>
//               <button
//                 onClick={() => {
//                   setSearchTerm('');
//                   setSelectedCategory('all');
//                   setSelectedDestination('all');
//                 }}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Clear All Filters
//               </button>
//             </div>
//           </div>
//         )}
//         {/* Load More Button */}

//         {filteredPosts.length > visibleCount ? (
//           <div className="mt-12 text-center">
//             <button
//               className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               onClick={() => setVisibleCount(prev => prev + 1)}
//             >
//               Load More Posts
//             </button>
//           </div>
//         ) : (
//           <div className="mt-12 text-center">
//             <button
//               disabled
//               className="px-8 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed"
//             >
//               No More Posts
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Newsletter Subscription */}
//       <div className="bg-gray-900 text-white py-16 mt-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">Never Miss a Travel Story</h2>
//           <p className="text-gray-300 mb-8 text-lg">
//             Get our latest travel guides, tips, and destination inspiration
//             delivered to your inbox
//           </p>
//           <div className="max-w-md mx-auto flex gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TravelBlogPage;

import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Filter,
  Grid,
  List,
  Eye,
  ChevronDown,
  Heart,
  Plus,
  Send,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import { number } from 'framer-motion';

// API function to fetch travel blogs from dev.to
const fetchTravelBlogs = async (limit = 20) => {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?tag=travel&per_page=${limit}`
    );
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const TravelBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [post, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(6);
  const [blogPosts, setBlogPosts] = useState<
    Array<{
      id: number;
      slug: string;
      title: string;
      excerpt: string;
      image: string;
      category: string;
      categoryName: string;
      destination: string;
      destinationName: string;
      author: string;
      publishedAt: string;
      readTime: number;
      views: number;
      likes: number;
      featured: boolean;
      url?: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);
  const [newPostForm, setNewPostForm] = useState(false);
  // Mock data as fallback
  const mockPosts = {
    posts: [
      {
        id: 1,
        slug: 'the-ultimate-guide-to-backpacking-through-southeast-asia',
        title: 'The Ultimate Guide to Backpacking Through Southeast Asia',
        excerpt:
          'Embark on a transformative journey across Thailand, Vietnam, Cambodia, and Laos. This guide reveals hidden temples, vibrant street markets, and lush landscapes, while offering practical advice on budget stays, local transportation, and authentic food experiences. Whether you’re a first-time backpacker or a seasoned traveler, discover how to make the most of three weeks in Southeast Asia.',
        image:
          'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
        category: 'itineraries',
        categoryName: 'Itineraries',
        destination: 'asia',
        destinationName: 'Southeast Asia',
        author: 'Sarah Chen',
        publishedAt: '2024-07-15',
        readTime: 12,
        views: 2340,
        likes: 89,
        featured: true,
      },
      {
        id: 2,
        slug: '15-essential-travel-photography-tips-for-beginners',
        title: '15 Essential Travel Photography Tips for Beginners',
        excerpt:
          'Unlock the secrets to capturing stunning travel photos, from mastering composition and natural lighting to telling compelling stories through your lens. Learn how to choose the right gear, approach locals respectfully, and edit your shots for maximum impact, making every journey memorable through photography.',
        image:
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
        category: 'tips',
        categoryName: 'Travel Tips',
        destination: 'all',
        destinationName: 'Global',
        author: 'Mike Rodriguez',
        publishedAt: '2024-07-12',
        readTime: 8,
        views: 1890,
        likes: 156,
        featured: false,
      },
      {
        id: 3,
        slug: 'exploring-morocco-from-marrakech-to-the-sahara-desert',
        title: 'Exploring Morocco: From Marrakech to the Sahara Desert',
        excerpt:
          "Traverse Morocco's enchanting cities, bustling souks, and majestic desert dunes. This guide takes you from the vibrant streets of Marrakech to the tranquil sands of the Sahara, highlighting cultural encounters, must-see landmarks, and tips for safe, immersive travel in North Africa.",
        image:
          'https://images.unsplash.com/photo-1539650116575-75c0c6d73a0e?w=800&h=400&fit=crop',
        category: 'destinations',
        categoryName: 'Destination Guides',
        destination: 'africa',
        destinationName: 'Morocco',
        author: 'Emma Thompson',
        publishedAt: '2024-07-10',
        readTime: 15,
        views: 3120,
        likes: 203,
        featured: true,
      },
      {
        id: 4,
        slug: 'budget-travel-how-to-see-europe-for-under-50-a-day',
        title: 'Budget Travel: How to See Europe for Under $50 a Day',
        excerpt:
          'Discover how to explore Europe’s iconic cities and hidden villages without overspending. This article shares proven strategies for finding affordable accommodation, using budget-friendly transport, and enjoying free or low-cost attractions, so you can experience the continent’s culture and history on a shoestring.',
        image:
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop',
        category: 'budget',
        categoryName: 'Budget Travel',
        destination: 'europe',
        destinationName: 'Europe',
        author: 'Alex Johnson',
        publishedAt: '2024-07-08',
        readTime: 10,
        views: 4560,
        likes: 287,
        featured: false,
      },
      {
        id: 5,
        slug: 'street-food-adventures-in-bangkok-a-culinary-journey',
        title: 'Street Food Adventures in Bangkok: A Culinary Journey',
        excerpt:
          'Experience the vibrant flavors of Bangkok’s street food scene. From spicy pad thai to sweet mango sticky rice, this guide introduces you to the city’s best food stalls, local favorites, and essential safety tips for enjoying authentic Thai cuisine while navigating bustling night markets.',
        image:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
        category: 'food',
        categoryName: 'Food & Culture',
        destination: 'asia',
        destinationName: 'Thailand',
        author: 'Lisa Park',
        publishedAt: '2024-07-05',
        readTime: 7,
        views: 2890,
        likes: 134,
        featured: false,
      },
      {
        id: 6,
        slug: 'solo-female-travel-safety-tips-and-empowering-destinations',
        title: 'Solo Female Travel: Safety Tips and Empowering Destinations',
        excerpt:
          'Empower your solo adventures with practical safety advice and inspiring stories from women who’ve traveled the world alone. Explore recommended destinations known for their welcoming atmosphere, learn how to stay safe on the road, and gain confidence to embrace the freedom of solo travel.',
        image:
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
        category: 'tips',
        categoryName: 'Travel Tips',
        destination: 'all',
        destinationName: 'Global',
        author: 'Rachel Green',
        publishedAt: '2024-07-03',
        readTime: 11,
        views: 1760,
        likes: 198,
        featured: false,
      },
      {
        id: 7,
        slug: 'hiking-the-swiss-alps-a-journey-above-the-clouds',
        title: 'Hiking the Swiss Alps: A Journey Above the Clouds',
        excerpt:
          'Set out on a breathtaking adventure through Switzerland’s alpine trails, crystal-clear lakes, and snow-capped peaks. This guide covers the best hiking routes, essential gear, and tips for enjoying panoramic views and local hospitality in the heart of the Alps.',
        image:
          'https://images.unsplash.com/photo-1467269204594-4f0b6a877c59?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'destinations',
        categoryName: 'Destination Guides',
        destination: 'europe',
        destinationName: 'Switzerland',
        author: 'Lukas Meier',
        publishedAt: '2024-07-01',
        readTime: 14,
        src: '',
        views: 3210,
        likes: 215,
        featured: false,
      },
      {
        id: 8,
        slug: 'how-to-travel-japan-on-a-shoestring-budget',
        title: 'How to Travel Japan on a Shoestring Budget',
        excerpt:
          'Unlock the secrets to affordable travel in Japan. Learn how to save on accommodation, food, and transportation while exploring Tokyo’s neon streets, Kyoto’s ancient temples, and rural villages. This guide proves that Japan’s wonders are accessible to every traveler, no matter the budget.',
        image:
          'https://images.unsplash.com/photo-1533077167465-9d7b45ab0a55?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'budget',
        categoryName: 'Budget Travel',
        destination: 'asia',
        destinationName: 'Japan',
        author: 'Aiko Tanaka',
        publishedAt: '2024-06-25',
        readTime: 9,
        views: 2780,
        likes: 167,
        featured: true,
      },
      {
        id: 9,
        slug: 'cape-towns-best-beaches-and-coastal-escapes',
        title: 'Cape Town’s Best Beaches and Coastal Escapes',
        excerpt:
          'Discover Cape Town’s most scenic beaches, from the surfer’s paradise of Muizenberg to the tranquil shores of Clifton and the dramatic cliffs of Chapman’s Peak. This guide highlights the best spots for relaxation, water sports, and sunset views along South Africa’s stunning coastline.',
        image:
          'https://images.unsplash.com/photo-1609166215706-677a0fbeb445?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'destinations',
        categoryName: 'Destination Guides',
        destination: 'africa',
        destinationName: 'South Africa',
        author: 'Nomsa Dlamini',
        publishedAt: '2024-06-22',
        readTime: 10,
        views: 3420,
        likes: 190,
        featured: false,
      },
      {
        id: 10,
        slug: 'the-art-of-packing-light-for-long-term-travel',
        title: 'The Art of Packing Light for Long-Term Travel',
        excerpt:
          'Master minimalist packing for extended adventures. This article shares expert tips on choosing versatile clothing, essential gear, and smart packing techniques, so you can travel for months with just a carry-on and enjoy the freedom of light, stress-free journeys.',
        image:
          'https://images.unsplash.com/photo-1530319067432-f2a729c03dbb?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'tips',
        categoryName: 'Travel Tips',
        destination: 'all',
        destinationName: 'Global',
        author: 'Daniel Reyes',
        publishedAt: '2024-06-18',
        readTime: 7,
        views: 1590,
        likes: 102,
        featured: false,
      },
      {
        id: 11,
        slug: 'foodies-guide-to-rome-eat-like-a-local',
        title: 'Foodie’s Guide to Rome: Eat Like a Local',
        excerpt:
          'Savor Rome’s culinary delights with this insider’s guide to authentic dishes, bustling markets, and cozy trattorias. From creamy carbonara to crispy suppli, discover where locals eat and how to experience the city’s food culture beyond the tourist trail.',
        image:
          'https://images.unsplash.com/photo-1600275668994-868c1c00d0a4?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'food',
        categoryName: 'Food & Culture',
        destination: 'europe',
        destinationName: 'Italy',
        author: 'Giulia Romano',
        publishedAt: '2024-06-14',
        readTime: 6,
        views: 2675,
        likes: 143,
        featured: false,
      },
      {
        id: 12,
        slug: 'the-magic-of-new-zealand-nature-culture-and-adventure',
        title: 'The Magic of New Zealand: Nature, Culture, and Adventure',
        excerpt:
          'Experience the wonders of New Zealand, from Maori traditions and geothermal marvels to epic hiking trails and cinematic landscapes. This guide offers tips for exploring the country’s natural beauty, engaging with local culture, and finding adventure at every turn.',
        image:
          'https://images.unsplash.com/photo-1578496481383-7b0c36dd254b?auto=format&fit=crop&w=800&h=400&q=80',
        category: 'destinations',
        categoryName: 'Destination Guides',
        destination: 'oceania',
        destinationName: 'New Zealand',
        author: 'Thomas Blake',
        publishedAt: '2024-06-10',
        readTime: 13,
        views: 2950,
        likes: 170,
        featured: true,
      },
    ],
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts', count: 0 },
    { id: 'travel', name: 'Travel', count: 0 },
    { id: 'destinations', name: 'Destination Guides', count: 0 },
    { id: 'tips', name: 'Travel Tips', count: 0 },
    { id: 'food', name: 'Food & Culture', count: 0 },
    { id: 'budget', name: 'Budget Travel', count: 0 },
  ];

  const destinations = [
    { id: 'all', name: 'All Destinations' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'africa', name: 'Africa' },
    { id: 'americas', name: 'Americas' },
    { id: 'oceania', name: 'Oceania' },
  ];

  // type MockData = {};

  type ApiData = {
    id: number;
    slug: any;
    title: any;
    description: any;
    cover_image: string;
    social_image: any;
    user: { name: string };
    published_at: any;
    created_at: any;
    reading_time_minutes: any;
    public_reactions_count: any;
    url: any;
  };

  // Function to map API data to our format
  const mapApiDataToPost = (post: ApiData) => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.description || post.title,
      image:
        post.cover_image ||
        post.social_image ||
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
      category: 'travel',
      categoryName: 'Travel',
      destination: 'all',
      destinationName: 'Various',
      author: post.user?.name || 'Anonymous',
      publishedAt: post.published_at || post.created_at,
      readTime: post.reading_time_minutes || 5,
      views: (post.public_reactions_count || 0) * 50, // Estimate views
      likes: post.public_reactions_count || 0,
      featured: (post.public_reactions_count || 0) > 10,
      url: post.url, // Keep the original URL for reading
    };
  };

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError('');

      try {
        // Try to fetch from API first
        const apiPosts = await fetchTravelBlogs(20);
        const mappedPosts = apiPosts.map(mapApiDataToPost);
        setBlogPosts([...mockPosts.posts, ...mappedPosts]);
        setUsingMockData(false);
        console.log(
          'Successfully loaded API data:',
          mappedPosts.length,
          'posts'
        );
      } catch (err) {
        console.error('Failed to lo: numberad API data, using mock data:', err);
        // Fall back to mock data if API fails
        setBlogPosts(mockPosts.posts);
        setUsingMockData(true);
        setError('Unable to load live data. Showing sample posts.');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Update categories with actual counts
  const categoriesWithCounts = useMemo(() => {
    const counts = blogPosts.reduce((acc: Record<string, number>, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      acc.all = (acc.all || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return categories.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0,
    }));
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      const matchesDestination =
        selectedDestination === 'all' ||
        post.destination === selectedDestination;

      return matchesSearch && matchesCategory && matchesDestination;
    });
  }, [blogPosts, searchTerm, selectedCategory, selectedDestination]);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleLike = (postId: number) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const navigate = useNavigate();
  const handleReadMore = (post: {
    url: string | URL | undefined;
    slug: any;
  }) => {
    if (post.url) {
      // If it's from API, open the original dev.to article
      window.open(post.url, '_blank');
    } else {
      // For mock data, you could navigate to a local route
      // console.log('Navigate to:', `/blog/${ post.slug }`);
      navigate(`/blog/${post.slug}`);
    }
  };
  // function to map mockData to Post
  type BlogPosts = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    image: string | undefined;
    category: string;
    categoryName: string;
    destination: string;
    destinationName: string;
    author: string;
    publishedAt: string;
    readTime: number;
    views: number;
    likes: number;
    featured: boolean;
  };

  interface PostCardProps {
    post: BlogPosts;
    featured?: Boolean;
  }

  const PostCard = ({ post, featured = false }: PostCardProps) => (
    <article
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover ${featured ? 'h-64' : 'h-48'}`}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.categoryName}
          </span>
        </div>
        <button
          onClick={() => handleLike(post.id)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              likedPosts[post.id]
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{post.destinationName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h2
          className={`font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer ${
            featured ? 'text-xl' : 'text-lg'
          }`}
        >
          {/* <Link to={`/blog/${post.slug}`}>{post.title}</Link>  */}
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleReadMore(post)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <p> Read More</p> <ArrowRight className="w-4 h-4" />
            </Link>
          </button>
        </div>
      </div>
    </article>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading travel blogs...</p>
        </div>
      </div>
    );
  }

    const addNewPost = postData => {
      const newPost = {
        id: Date.now(),
        ...postData,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLive: true,
      };

      setBlogPosts(currentPosts => [newPost, ...currentPosts]);
      setNewPostForm(false);
    };

  const NewPostForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      excerpt: '',
      location: '',
      author: '',
      image: '',
    });

    const handleSubmit = () => {
      if (formData.title && formData.excerpt && formData.author) {
        addNewPost({
          ...formData,
          image:
            formData.image ||
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
        });
        setFormData({
          title: '',
          excerpt: '',
          location: '',
          author: '',
          image: '',
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <h3 className="text-xl font-bold mb-4 text-black">
            Share Your Travel Moment
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post title"
              value={formData.title}
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            <textarea
              placeholder="What's happening on your journey?"
              value={formData.excerpt}
              onChange={e =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 text-black"
              required
            />
            <input
              type="text"
              placeholder="Your name"
              value={formData.author}
              onChange={e =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={e =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Share Live
              </button>
              <button
                onClick={() => setNewPostForm(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Stories & Guides
            </h1>
            <p className="text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
              Discover amazing destinations, practical travel tips, and
              inspiring stories from fellow adventurers
            </p>
            {usingMockData && (
              <p className="text-yellow-200 text-sm mb-6">
                ⚠️ Currently showing sample data. Live feed temporarily
                unavailable.
              </p>
            )}
            {error && <p className="text-yellow-200 text-sm mb-6">{error}</p>}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations, tips, guides..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categoriesWithCounts.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors text-black"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              <div>
                <button
                  onClick={() => setNewPostForm(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Share Live
                </button>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className={`lg:hidden mt-4 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg border p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={selectedDestination}
                  onChange={e => setSelectedDestination(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Destination Filter */}
          <div className="hidden lg:block mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <select
              value={selectedDestination}
              onChange={e => setSelectedDestination(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 &&
          selectedCategory === 'all' &&
          !searchTerm && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map(post => (
                  <PostCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>
          )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.slice(0, visibleCount).length} of{' '}
            {filteredPosts.length}{' '}
            {filteredPosts.length === 1 ? 'post' : 'posts'}
            {searchTerm && ` for "${searchTerm}"`}
            {usingMockData && (
              <span className="text-orange-600"> (sample data)</span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredPosts.slice(0, visibleCount).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDestination('all');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              Load More Posts ({filteredPosts.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Retry API Button */}
        {usingMockData && (
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Try Loading Live Data Again
            </button>
          </div>
        )}
      </div>
      {/* New Post Form Modal */}
      {newPostForm && <NewPostForm />}
      {/* Newsletter Subscription */}
      <div className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Travel Story</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Get our latest travel guides, tips, and destination inspiration
            delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBlogPage;


function addNewPost(_arg0: { image: string; title: string; excerpt: string; location: string; author: string; })
{
  throw new Error('Function not implemented.');
}
// import { useState, useEffect, useCallback } from 'react';
// import {
//   Search,
//   MapPin,
//   Calendar,
//   Clock,
//   User,
//   ArrowRight,
//   Eye,
//   Heart,
//   Wifi,
//   WifiOff,
//   Plus,
//   Send,
// } from 'lucide-react';
// import { motion } from 'framer-motion';

// const RealTimeTravelBlog = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [connected, setConnected] = useState(false);
//   const [newPostForm, setNewPostForm] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [likedPosts, setLikedPosts] = useState({});

//   // Simulate real-time database with mock data that updates
//   const mockDatabase = {
//     posts: [
//       {
//         id: 1,
//         title: "Live: Exploring Tokyo's Hidden Temples",
//         excerpt:
//           'Currently wandering through Senso-ji Temple area. The morning light is incredible!',
//         author: 'Sarah Chen',
//         location: 'Tokyo, Japan',
//         image:
//           'https://images.unsplash.com/photo-1533077167465-9d7b45ab0a55?w=800&h=400&fit=crop',
//         createdAt: new Date().toISOString(),
//         likes: 23,
//         isLive: true,
//       },
//       {
//         id: 2,
//         title: 'Just landed in Bali - First impressions',
//         excerpt:
//           'The humidity hits you like a wall, but the smiles are infectious. Heading to Ubud next!',
//         author: 'Mike Rodriguez',
//         location: 'Bali, Indonesia',
//         image:
//           'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop',
//         createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
//         likes: 18,
//         isLive: false,
//       },
//       {
//         id: 3,
//         title: 'Alpine sunrise from Mont Blanc',
//         excerpt:
//           '4:30 AM start was worth it. The golden hour up here is unmatched. My legs are jelly though!',
//         author: 'Emma Thompson',
//         location: 'Chamonix, France',
//         image:
//           'https://images.unsplash.com/photo-1549989473-4f0b6a877c59?w=800&h=400&fit=crop',
//         createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
//         likes: 45,
//         isLive: false,
//       },
//     ],
//   };

//   // Simulate real-time connection
//  const connectToRealTime = useCallback(() => {
//     setConnected(true);
//     setLoading(false);
//     setPosts(mockDatabase.posts);

//     // Simulate real-time updates
//     const interval = setInterval(() => {
//       // Randomly update likes or add new posts
//       setPosts(currentPosts => {
//         const updated = currentPosts.map((post) => ({
//           ...post,
//           likes: post.likes + Math.floor(Math.random() * 3), // Random like increases
//         }));

//         // Occasionally add a new post
//         if (Math.random() > 0.7) {
//           const newPost = {
//             id: Date.now(),
//             title: `Real-time update: ${new Date().toLocaleTimeString()}`,
//             excerpt:
//               'This is a live update from our real-time database simulation!',
//             author: 'Live Blogger',
//             location: 'Somewhere Amazing',
//             image:
//               'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
//             createdAt: new Date().toISOString(),
//             likes: Math.floor(Math.random() * 10),
//             isLive: true,
//           };
//           return [newPost, ...updated];
//         }

//         return updated;
//       });
//     }, 50000);// Update every 5 seconds

//     return () => {
//       clearInterval(interval);
//       setConnected(false);
//     };
//   }, []);

//   // Simulate adding a new post
//   const addNewPost = postData => {
//     const newPost = {
//       id: Date.now(),
//       ...postData,
//       createdAt: new Date().toISOString(),
//       likes: 0,
//       isLive: true,
//     };

//     setPosts(currentPosts => [newPost, ...currentPosts]);
//     setNewPostForm(false);
//   };

//   useEffect(() => {
//     const cleanup = connectToRealTime();
//     return cleanup;
//   }, [connectToRealTime]);

//   const filteredPosts = posts.filter(
//     post =>
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatTimeAgo = timestamp => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInSeconds = Math.floor((now - time) / 1000);

//     if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400)
//       return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     return `${Math.floor(diffInSeconds / 86400)}d ago`;
//   };

//   const PostCard = ({ post }) => (
//     <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//       <div className="relative">
//         <img
//           src={post.image}
//           alt={post.title}
//           className="w-full h-48 object-cover"
//         />
//         {post.isLive && (
//           <div className="absolute top-4 left-4">
//             <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse">
//               <div className="w-2 h  -2 bg-white rounded-full"></div>
//               LIVE
//             </span>
//           </div>
//         )}
//         <button
//           onClick={() =>
//             setLikedPosts(prev => ({
//               ...prev,
//               [post.id]: !prev[post.id],
//             }))
//           }
//           className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
//         >
//           <Heart
//             className={`w-4 h-4 ${
//               likedPosts[post.id]
//                 ? 'fill-red-500 text-red-500'
//                 : 'text-gray-400'
//             }`}
//           />
//         </button>
//       </div>

//       <div className="p-6">
//         <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//           <div className="flex items-center gap-1">
//             <MapPin className="w-4 h-4" />
//             <span>{post.location}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Clock className="w-4 h-4" />
//             <span>{formatTimeAgo(post.createdAt)}</span>
//           </div>
//         </div>

//         <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
//           {post.title}
//         </h2>

//         <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <User className="w-4 h-4 text-gray-400" />
//             <span className="text-sm text-gray-600">{post.author}</span>
//           </div>

//           <div className="flex items-center gap-1 text-sm text-gray-500">
//             <Heart className="w-4 h-4" />
//             <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
//           </div>
//         </div>

//         <div className="mt-4 pt-4 border-t border-gray-100">
//           <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
//             Read More <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </article>
//   );

//   const NewPostForm = () => {
//     const [formData, setFormData] = useState({
//       title: '',
//       excerpt: '',
//       location: '',
//       author: '',
//       image: '',
//     });

//     const handleSubmit = () => {
//       if (formData.title && formData.excerpt && formData.author) {
//         addNewPost({
//           ...formData,
//           image:
//             formData.image ||
//             'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
//         });
//         setFormData({
//           title: '',
//           excerpt: '',
//           location: '',
//           author: '',
//           image: '',
//         });
//       }
//     };

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

//         <div className="bg-white rounded-xl max-w-md w-full p-6">
//           <h3 className="text-xl font-bold mb-4">Share Your Travel Moment</h3>
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Post title"
//               value={formData.title}
//               onChange={e =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <textarea
//               placeholder="What's happening on your journey?"
//               value={formData.excerpt}
//               onChange={e =>
//                 setFormData({ ...formData, excerpt: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Your name"
//               value={formData.author}
//               onChange={e =>
//                 setFormData({ ...formData, author: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Location"
//               value={formData.location}
//               onChange={e =>
//                 setFormData({ ...formData, location: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="url"
//               placeholder="Image URL (optional)"
//               value={formData.image}
//               onChange={e =>
//                 setFormData({ ...formData, image: e.target.value })
//               }
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="flex gap-3">
//               <button
//                 onClick={handleSubmit}
//                 className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Send className="w-4 h-4" />
//                 Share Live
//               </button>
//               <button
//                 onClick={() => setNewPostForm(false)}
//                 className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-500">Connecting to real-time database...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}

//       <div className="relative bottom-80">
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6">
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-5xl md:text-6xl font-extrabold mb-4 top-0 md:top-0"
//           >
//             Explore the World with{' '}
//             <span className="text-blue-500">TravelMate</span>
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.2 }}
//             className="text-xl md:text-2xl mb-4 max-w-2xl"
//           >
//             Find breathtaking destinations and plan your next escape
//             effortlessly.
//           </motion.p>
//           <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-lg text-black dark:text-white">
//             <select className="border p-2 rounded w-full md:w-auto">
//               <option>Where to</option>
//             </select>
//             <select className="border p-2 rounded w-full md:w-auto">
//               <option>When</option>
//             </select>
//             <select className="border p-2 rounded w-full md:w-auto">
//               <option>Select type</option>
//             </select>
//             <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-4">
//               <h1 className="text-4xl md:text-5xl font-bold">
//                 Live Travel Stories
//               </h1>
//               {connected ? (
//                 <Wifi className="w-8 h-8 text-green-300" />
//               ) : (
//                 <WifiOff className="w-8 h-8 text-red-300" />
//               )}
//             </div>
//             <p className="text-xl text-blue-100 mb-2 max-w-2xl mx-auto">
//               Real-time travel experiences from around the world
//             </p>
//             <div className="flex items-center justify-center gap-2 text-sm">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-green-200">
//                 {connected
//                   ? `${posts.length} live stories • Updates every 5s`
//                   : 'Disconnected'}
//               </span>
//             </div>

//             {/* Search Bar */}
//             <div className="max-w-2xl mx-auto relative mt-8">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search live stories, locations..."
//                 className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Stats Bar */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-blue-600">
//                   {filteredPosts.length}
//                 </div>
//                 <div className="text-sm text-gray-500">Stories</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-green-600">
//                   {filteredPosts.filter(p => p.isLive).length}
//                 </div>
//                 <div className="text-sm text-gray-500">Live Now</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-purple-600">
//                   {filteredPosts.reduce((sum, post) => sum + post.likes, 0)}
//                 </div>
//                 <div className="text-sm text-gray-500">Total Likes</div>
//               </div>
//             </div>

//             <button
//               onClick={() => setNewPostForm(true)}
//               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               Share Live
//             </button>
//           </div>
//         </div>

//         {/* Posts Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredPosts.map(post => (
//             <PostCard key={post.id} post={post} />
//           ))}
//         </div>

//         {filteredPosts.length === 0 && (
//           <div className="text-center py-12">
//             <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No stories found
//             </h3>
//             <p className="text-gray-600">Try adjusting your search terms</p>
//           </div>
//         )}
//       </div>

//       {/* New Post Form Modal */}
//       {newPostForm && <NewPostForm />}

//       {/* Footer */}
//       <div className="bg-gray-900 text-white py-8 mt-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-bold mb-2">
//             Real-time Travel Community
//           </h2>
//           <p className="text-gray-300">
//             Connected travelers sharing live moments • Powered by real-time
//             database
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeTravelBlog;
