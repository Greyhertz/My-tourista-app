// export const blogPosts = [
//   {
//     slug: 'sunrise-journey',
//     title: 'Sunrise Journey in Maldives',
//     date: 'July 16, 2025',
//     image:
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
//     excerpt:
//       'Experience a magical sunrise on a solo trip through the Maldives...',
//     fullText:
//       'A breathtaking moment by the sea as I watched the sun rise over crystal clear waters. The peace, the silence, and the golden hue — unforgettable!',
//   },
//   {
//     slug: 'river-soul',
//     title: 'The Soul at the Riverbank',
//     date: 'July 10, 2025',
//     image:
//       'https://images.unsplash.com/photo-1504198266285-165a3e8f27e9?auto=format&fit=crop&w=1000&q=80',
//     excerpt: 'The river teaches silence, stillness, and reflection...',
//     fullText:
//       'I sat by the river for hours, just observing the calm water flow past rocks and under fallen branches. Nature has a voice, and I finally heard it.',
//   },
//   {
//     slug: 'hidden-gems',
//     title: 'Finding Hidden Gems in Istanbul',
//     date: 'June 30, 2025',
//     image:
//       'https://images.unsplash.com/photo-1576866209830-cd196d0ec9c4?auto=format&fit=crop&w=1000&q=80',
//     excerpt:
//       'Take a detour from the busy streets and find treasures unknown...',
//     fullText:
//       'Wandering through tiny alleyways and speaking with local artisans led me to spots untouched by tourists. Istanbul still holds magic.',
//   },
//   {
//     slug: 'smart-traveling',
//     title: 'Smart Traveling in a Digital World',
//     date: 'June 22, 2025',
//     image:
//       'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1000&q=80',
//     excerpt: 'Maximize your journey using mobile apps and digital guides...',
//     fullText:
//       'From Google Translate to offline maps and AI-based guides, here’s how I planned an efficient trip entirely from my phone. Travel smart, not hard.',
//   },
// ];
export const fetchTravelBlogs = async (limit = 20) => {
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


export const mockPosts = [
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
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
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
      'https://images.unsplash.com/photo-1549989473-4f0b6a877c59?auto=format&fit=crop&w=800&h=400&q=80',
    category: 'destinations',
    categoryName: 'Destination Guides',
    destination: 'europe',
    destinationName: 'Switzerland',
    author: 'Lukas Meier',
    publishedAt: '2024-07-01',
    readTime: 14,
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

  {
    id: 13,
    slug: '10-hidden-gems-in-southeast-asia',
    title: '10 Hidden Gems in Southeast Asia',
    excerpt:
      'Beyond the bustling cities and popular beaches, Southeast Asia hides countless treasures waiting to be discovered. From secret waterfalls tucked away in lush jungles to remote island villages where time seems to stand still, this guide unveils destinations few tourists ever reach. Whether you’re seeking untouched cultural traditions, serene natural wonders, or simply a quieter escape from the crowds, these hidden gems reveal an authentic side of the region that will surprise even seasoned travelers.',
    image:
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop',
    category: 'adventure',
    categoryName: 'Adventure Guide',
    destination: 'asia',
    destinationName: 'Southeast Asia',
    author: 'Sarah Chen',
    publishedAt: '2024-05-20',
    readTime: 8,
    views: 1757,
    likes: 42,
    featured: false,
  },

  {
    id: 14,
    slug: 'the-ultimate-european-food-tour',
    title: 'The Ultimate European Food Tour',
    excerpt:
      'Europe is a paradise for food lovers, where every country offers a unique culinary story. From savoring rich pastas in Italy and buttery croissants in Paris to indulging in hearty sausages in Germany and tapas in Spain, this journey celebrates Europe’s extraordinary flavors. Along the way, you’ll uncover regional specialties, meet local artisans, and explore bustling markets that reflect centuries of culture and tradition. This food tour is more than a feast—it’s a cultural adventure that connects history, people, and palate.',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
    category: 'food',
    categoryName: 'Food & Culture',
    destination: 'europe',
    destinationName: 'Europe',
    author: 'Marco Rossi',
    publishedAt: '2024-12-12',
    readTime: 12,
    views: 0,
    likes: 0,
    featured: false,
  },

  {
    id: 15,
    slug: 'solo-female-travel-safety-and-empowerment',
    title: 'Solo Female Travel: Safety & Empowerment',
    excerpt:
      'Traveling solo as a woman can be both liberating and challenging. This guide combines practical advice with inspiring stories from women who have journeyed across the globe. From navigating cultural norms and staying safe on the road to building confidence and embracing independence, it highlights strategies that empower female travelers. More than just a safety manual, it’s a celebration of courage, self-discovery, and the transformative power of exploring the world on your own terms.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
    category: 'travel-tips',
    categoryName: 'Travel Tips',
    destination: 'global',
    destinationName: 'Worldwide',
    author: 'Emma Thompson',
    publishedAt: '2024-12-10',
    readTime: 6,
    views: 0,
    likes: 0,
    featured: false,
  },

  {
    id: 16,
    slug: 'photography-guide-capturing-aurora',
    title: 'Photography Guide: Capturing Aurora',
    excerpt:
      'Few sights on Earth are as breathtaking as the northern lights dancing across the night sky. Yet capturing them on camera requires patience, the right equipment, and technical know-how. This photography guide explains how to master exposure settings, find ideal shooting locations, and anticipate natural conditions that create the best displays. Beyond technique, it encourages travelers to embrace the wonder of the aurora as both an artistic challenge and a once-in-a-lifetime experience under the stars.',
    image:
      'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070&auto=format&fit=crop',
    category: 'photography',
    categoryName: 'Photography',
    destination: 'europe',
    destinationName: 'Nordic Countries',
    author: 'Lars Andersen',
    publishedAt: '2024-12-08',
    readTime: 10,
    views: 0,
    likes: 0,
    featured: false,
  },

  {
    id: 17,
    slug: 'budget-backpacking-through-africa',
    title: 'Budget Backpacking Through Africa',
    excerpt:
      'Africa is a continent of incredible diversity, from vast deserts and savannas to vibrant cities and ancient cultures. For backpackers, it offers unforgettable adventures at surprisingly affordable costs—if you know where to look. This guide explores budget-friendly routes, tips for traveling safely, and advice on connecting with local communities. Whether you dream of trekking through national parks, riding public transport with locals, or discovering hidden gems off the beaten path, Africa promises a backpacking journey rich in culture and adventure.',
    image:
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2070&auto=format&fit=crop',
    category: 'budget',
    categoryName: 'Budget Travel',
    destination: 'africa',
    destinationName: 'Africa',
    author: 'David Okonkwo',
    publishedAt: '2024-12-05',
    readTime: 15,
    views: 0,
    likes: 0,
    featured: false,
  },

  {
    id: 18,
    slug: 'digital-nomad-hotspots-2025',
    title: 'Digital Nomad Hotspots 2025',
    excerpt:
      'Remote work is transforming how people travel, live, and connect across the globe. This guide highlights the best cities and towns in 2025 where digital nomads can find reliable WiFi, welcoming communities, and inspiring surroundings. From buzzing co-working hubs in Asia to laid-back coastal escapes in South America, each destination combines work-life balance with cultural richness. Whether you’re seeking affordability, adventure, or a thriving creative network, these hotspots represent the future of location-independent living.',
    image:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop',
    category: 'remote-work',
    categoryName: 'Remote Work',
    destination: 'global',
    destinationName: 'Worldwide',
    author: 'Alex Kim',
    publishedAt: '2024-12-02',
    readTime: 9,
    views: 0,
    likes: 0,
    featured: false,
  },
];

[
]