import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';
import { mockPosts } from '@/data/DataBlog';
import { fetchTravelBlogs } from '@/data/DataBlog';
// Types
export interface BlogPost {
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
}

export interface BlogState {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string;
  usingMockData: boolean;
  likedPosts: Record<number, boolean>;
  searchTerm: string;
  selectedCategory: string;
  selectedDestination: string;
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  visibleCount: number;
  newPostForm: boolean;
}

// Action types
export type BlogAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_BLOG_POSTS'; payload: BlogPost[] }
  | { type: 'SET_USING_MOCK_DATA'; payload: boolean }
  | { type: 'TOGGLE_LIKE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_DESTINATION'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'TOGGLE_FILTERS' }
  | { type: 'SET_VISIBLE_COUNT'; payload: number }
  | { type: 'TOGGLE_NEW_POST_FORM' }
  | { type: 'ADD_NEW_POST'; payload: BlogPost }
  | { type: 'CLEAR_FILTERS' };

// Initial state - this is the default condition of the blog state
const initialState: BlogState = {
  blogPosts: [],
  loading: true,
  error: '',
  usingMockData: false,
  likedPosts: {},
  searchTerm: '',
  selectedCategory: 'all',
  selectedDestination: 'all',
  viewMode: 'grid',
  showFilters: false,
  visibleCount: 6,
  newPostForm: false,
};

// Reducer function
export const blogReducer = (
  state: BlogState,
  action: BlogAction
): BlogState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SET_BLOG_POSTS':
      return { ...state, blogPosts: action.payload };

    case 'SET_USING_MOCK_DATA':
      return { ...state, usingMockData: action.payload };

    case 'TOGGLE_LIKE':
      return {
        ...state,
        likedPosts: {
          ...state.likedPosts,
          [action.payload]: !state.likedPosts[action.payload],
        },
      };

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    case 'SET_SELECTED_DESTINATION':
      return { ...state, selectedDestination: action.payload };

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    case 'TOGGLE_FILTERS':
      return { ...state, showFilters: !state.showFilters };

    case 'SET_VISIBLE_COUNT':
      return { ...state, visibleCount: action.payload };

    case 'TOGGLE_NEW_POST_FORM':
      return { ...state, newPostForm: !state.newPostForm };
    
    case 'ADD_NEW_POST':
      return {
        ...state,
        blogPosts: [action.payload, ...state.blogPosts],
        newPostForm: false,
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        searchTerm: '',
        selectedCategory: 'all',
        selectedDestination: 'all',
      };

    default:
      return state;
  }
};

// Context interface
interface BlogContextType {
  find(arg0: (p: any) => boolean): unknown;
  filter(arg0: (p: any) => boolean): unknown;
  state: BlogState;
  dispatch: React.Dispatch<BlogAction>;
  actions: {
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
    setBlogPosts: (posts: BlogPost[]) => void;
    setUsingMockData: (usingMock: boolean) => void;
    toggleLike: (postId: number) => void;
    setSearchTerm: (term: string) => void;
    setSelectedCategory: (category: string) => void;
    setSelectedDestination: (destination: string) => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    toggleFilters: () => void;
    setVisibleCount: (count: number) => void;
    toggleNewPostForm: () => void;
    addNewPost: (post: BlogPost) => void;
    clearFilters: () => void;
    loadBlogs: () => Promise<void>;
  };
}

// Create context
const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Mock data
// const mockPosts: BlogPost[] = [
//   {
//     id: 1,
//     slug: 'the-ultimate-guide-to-backpacking-through-southeast-asia',
//     title: 'The Ultimate Guide to Backpacking Through Southeast Asia',
//     excerpt:
//       "Embark on a transformative journey across Thailand, Vietnam, Cambodia, and Laos. This guide reveals hidden temples, vibrant street markets, and lush landscapes, while offering practical advice on budget stays, local transportation, and authentic food experiences. Whether you're a first-time backpacker or a seasoned traveler, discover how to make the most of three weeks in Southeast Asia",
//     image:
//       'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=400&fit=crop',
//     category: 'itineraries',
//     categoryName: 'Itineraries',
//     destination: 'asia',
//     destinationName: 'Southeast Asia',
//     author: 'Sarah Chen',
//     publishedAt: '2024-07-15',
//     readTime: 12,
//     views: 2340,
//     likes: 89,
//     featured: true,
//   },
//   {
//     id: 2,
//     slug: '15-essential-travel-photography-tips-for-beginners',
//     title: '15 Essential Travel Photography Tips for Beginners',
//     excerpt:
//       'Unlock the secrets to capturing stunning travel photos, from mastering composition and natural lighting to telling compelling stories through your lens. Learn how to choose the right gear, approach locals respectfully, and edit your shots for maximum impact, making every journey memorable through photography.',
//     image:
//       'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
//     category: 'tips',
//     categoryName: 'Travel Tips',
//     destination: 'all',
//     destinationName: 'Global',
//     author: 'Mike Rodriguez',
//     publishedAt: '2024-07-12',
//     readTime: 8,
//     views: 1890,
//     likes: 156,
//     featured: false,
//   },
//   {
//     id: 11,
//     slug: 'foodies-guide-to-rome-eat-like-a-local',
//     title: "Foodie's Guide to Rome: Eat Like a Local",
//     excerpt:
//       "Savor Rome's culinary delights with this insider's guide to authentic dishes, bustling markets, and cozy trattorias. From creamy carbonara to crispy suppli, discover where locals eat and how to experience the city's food culture beyond the tourist trail.",
//     image:
//       'https://images.unsplash.com/photo-1600275668994-868c1c00d0a4?auto=format&fit=crop&w=800&h=400&q=80',
//     category: 'food',
//     categoryName: 'Food & Culture',
//     destination: 'europe',
//     destinationName: 'Italy',
//     author: 'Giulia Romano',
//     publishedAt: '2024-06-14',
//     readTime: 6,
//     views: 2675,
//     likes: 143,
//     featured: false,
//   },
//   {
//     id: 12,
//     slug: 'the-magic-of-new-zealand-nature-culture-and-adventure',
//     title: 'The Magic of New Zealand: Nature, Culture, and Adventure',
//     excerpt:
//       'Experience the wonders of New Zealand, from Maori traditions and geothermal marvels to epic hiking trails and cinematic landscapes. This guide offers tips for exploring the country’s natural beauty, engaging with local culture, and finding adventure at every turn.',
//     image:
//       'https://images.unsplash.com/photo-1578496481383-7b0c36dd254b?auto=format&fit=crop&w=800&h=400&q=80',
//     category: 'destinations',
//     categoryName: 'Destination Guides',
//     destination: 'oceania',
//     destinationName: 'New Zealand',
//     author: 'Thomas Blake',
//     publishedAt: '2024-06-10',
//     readTime: 13,
//     views: 2950,
//     likes: 170,
//     featured: true,
//   },

//   {
//     id: 13,
//     slug: '10-hidden-gems-in-southeast-asia',
//     title: '10 Hidden Gems in Southeast Asia',
//     excerpt:
//       'Beyond the bustling cities and popular beaches, Southeast Asia hides countless treasures waiting to be discovered. From secret waterfalls tucked away in lush jungles to remote island villages where time seems to stand still, this guide unveils destinations few tourists ever reach. Whether you’re seeking untouched cultural traditions, serene natural wonders, or simply a quieter escape from the crowds, these hidden gems reveal an authentic side of the region that will surprise even seasoned travelers.',
//     image:
//       'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2070&auto=format&fit=crop',
//     category: 'adventure',
//     categoryName: 'Adventure Guide',
//     destination: 'asia',
//     destinationName: 'Southeast Asia',
//     author: 'Sarah Chen',
//     publishedAt: '2024-05-20',
//     readTime: 8,
//     views: 1757,
//     likes: 42,
//     featured: false,
//   },

//   {
//     id: 14,
//     slug: 'the-ultimate-european-food-tour',
//     title: 'The Ultimate European Food Tour',
//     excerpt:
//       'Europe is a paradise for food lovers, where every country offers a unique culinary story. From savoring rich pastas in Italy and buttery croissants in Paris to indulging in hearty sausages in Germany and tapas in Spain, this journey celebrates Europe’s extraordinary flavors. Along the way, you’ll uncover regional specialties, meet local artisans, and explore bustling markets that reflect centuries of culture and tradition. This food tour is more than a feast—it’s a cultural adventure that connects history, people, and palate.',
//     image:
//       'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
//     category: 'food',
//     categoryName: 'Food & Culture',
//     destination: 'europe',
//     destinationName: 'Europe',
//     author: 'Marco Rossi',
//     publishedAt: '2024-12-12',
//     readTime: 12,
//     views: 0,
//     likes: 0,
//     featured: false,
//   },

//   {
//     id: 15,
//     slug: 'solo-female-travel-safety-and-empowerment',
//     title: 'Solo Female Travel: Safety & Empowerment',
//     excerpt:
//       'Traveling solo as a woman can be both liberating and challenging. This guide combines practical advice with inspiring stories from women who have journeyed across the globe. From navigating cultural norms and staying safe on the road to building confidence and embracing independence, it highlights strategies that empower female travelers. More than just a safety manual, it’s a celebration of courage, self-discovery, and the transformative power of exploring the world on your own terms.',
//     image:
//       'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
//     category: 'travel-tips',
//     categoryName: 'Travel Tips',
//     destination: 'global',
//     destinationName: 'Worldwide',
//     author: 'Emma Thompson',
//     publishedAt: '2024-12-10',
//     readTime: 6,
//     views: 0,
//     likes: 0,
//     featured: false,
//   },

//   {
//     id: 16,
//     slug: 'photography-guide-capturing-aurora',
//     title: 'Photography Guide: Capturing Aurora',
//     excerpt:
//       'Few sights on Earth are as breathtaking as the northern lights dancing across the night sky. Yet capturing them on camera requires patience, the right equipment, and technical know-how. This photography guide explains how to master exposure settings, find ideal shooting locations, and anticipate natural conditions that create the best displays. Beyond technique, it encourages travelers to embrace the wonder of the aurora as both an artistic challenge and a once-in-a-lifetime experience under the stars.',
//     image:
//       'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070&auto=format&fit=crop',
//     category: 'photography',
//     categoryName: 'Photography',
//     destination: 'nordic',
//     destinationName: 'Nordic Countries',
//     author: 'Lars Andersen',
//     publishedAt: '2024-12-08',
//     readTime: 10,
//     views: 0,
//     likes: 0,
//     featured: false,
//   },

//   {
//     id: 17,
//     slug: 'budget-backpacking-through-africa',
//     title: 'Budget Backpacking Through Africa',
//     excerpt:
//       'Africa is a continent of incredible diversity, from vast deserts and savannas to vibrant cities and ancient cultures. For backpackers, it offers unforgettable adventures at surprisingly affordable costs—if you know where to look. This guide explores budget-friendly routes, tips for traveling safely, and advice on connecting with local communities. Whether you dream of trekking through national parks, riding public transport with locals, or discovering hidden gems off the beaten path, Africa promises a backpacking journey rich in culture and adventure.',
//     image:
//       'https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=2070&auto=format&fit=crop',
//     category: 'budget',
//     categoryName: 'Budget Travel',
//     destination: 'africa',
//     destinationName: 'Africa',
//     author: 'David Okonkwo',
//     publishedAt: '2024-12-05',
//     readTime: 15,
//     views: 0,
//     likes: 0,
//     featured: false,
//   },

//   {
//     id: 18,
//     slug: 'digital-nomad-hotspots-2025',
//     title: 'Digital Nomad Hotspots 2025',
//     excerpt:
//       'Remote work is transforming how people travel, live, and connect across the globe. This guide highlights the best cities and towns in 2025 where digital nomads can find reliable WiFi, welcoming communities, and inspiring surroundings. From buzzing co-working hubs in Asia to laid-back coastal escapes in South America, each destination combines work-life balance with cultural richness. Whether you’re seeking affordability, adventure, or a thriving creative network, these hotspots represent the future of location-independent living.',
//     image:
//       'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2070&auto=format&fit=crop',
//     category: 'remote-work',
//     categoryName: 'Remote Work',
//     destination: 'global',
//     destinationName: 'Worldwide',
//     author: 'Alex Kim',
//     publishedAt: '2024-12-02',
//     readTime: 9,
//     views: 0,
//     likes: 0,
//     featured: false,
//   },
// ];

// API function to fetch travel blogs from dev.to

// Function to map API data to our format
const mapApiDataToPost = (post: any): BlogPost => {
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
    views: (post.public_reactions_count || 0) * 50,
    likes: post.public_reactions_count || 0,
    featured: (post.public_reactions_count || 0) > 10,
    url: post.url,
  };
};

// Provider component
interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (loading: boolean) =>
      dispatch({ type: 'SET_LOADING', payload: loading }),

    setError: (error: string) =>
      dispatch({ type: 'SET_ERROR', payload: error }),

    setBlogPosts: (posts: BlogPost[]) =>
      dispatch({ type: 'SET_BLOG_POSTS', payload: posts }),

    setUsingMockData: (usingMock: boolean) =>
      dispatch({ type: 'SET_USING_MOCK_DATA', payload: usingMock }),

    toggleLike: (postId: number) =>
      dispatch({ type: 'TOGGLE_LIKE', payload: postId }),

    setSearchTerm: (term: string) =>
      dispatch({ type: 'SET_SEARCH_TERM', payload: term }),

    setSelectedCategory: (category: string) =>
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category }),

    setSelectedDestination: (destination: string) =>
      dispatch({ type: 'SET_SELECTED_DESTINATION', payload: destination }),

    setViewMode: (mode: 'grid' | 'list') =>
      dispatch({ type: 'SET_VIEW_MODE', payload: mode }),

    toggleFilters: () => dispatch({ type: 'TOGGLE_FILTERS' }),

    setVisibleCount: (count: number) =>
      dispatch({ type: 'SET_VISIBLE_COUNT', payload: count }),

    toggleNewPostForm: () => dispatch({ type: 'TOGGLE_NEW_POST_FORM' }),

    addNewPost: (post: BlogPost) =>
      dispatch({ type: 'ADD_NEW_POST', payload: post }),

    clearFilters: () => dispatch({ type: 'CLEAR_FILTERS' }),

    // Load blogs function
    loadBlogs: async () => {
      actions.setLoading(true);
      actions.setError('');

      try {
        // Try to fetch from API first
        const apiPosts = await fetchTravelBlogs(20);
        const mappedPosts = apiPosts.map(mapApiDataToPost);
        const allPosts = [...mockPosts, ...mappedPosts];
        actions.setBlogPosts(allPosts);
        actions.setUsingMockData(false);
        console.log( 
          'Successfully loaded API data:',
          mappedPosts.length,
          'posts'
        );
      } catch (err) {
        console.error('Failed to load API data, using mock data:', err);
        // Fall back to mock data if API fails
        actions.setBlogPosts(mockPosts);
        actions.setUsingMockData(true);
        actions.setError('Unable to load live data. Showing sample posts.');
      } finally {
        
        actions.setLoading(false)
      }
    },
  };

  const contextValue: BlogContextType = {
    state,
    dispatch,
    actions,
    find: function (_arg0: (p: any) => boolean): unknown
    {
      throw new Error('Function not implemented.');
    },
    filter: function (_arg0: (p: any) => boolean): unknown
    {
      throw new Error('Function not implemented.');
    }
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

// Custom hook to use the blog context
export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
