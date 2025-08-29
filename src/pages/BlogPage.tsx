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
  AlertCircle,
  RefreshCw,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(false);
  const [newPostForm, setNewPostForm] = useState(false);
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
    }>>([]);
  // Mock data as fallback
  const mockPosts = {
    posts: [
      {
        id: 1,
        slug: 'the-ultimate-guide-to-backpacking-through-southeast-asia',
        title: 'The Ultimate Guide to Backpacking Through Southeast Asia',
        excerpt:
          "Embark on a transformative journey across Thailand, Vietnam, Cambodia, and Laos. This guide reveals hidden temples, vibrant street markets, and lush landscapes, while offering practical advice on budget stays, local transportation, and authentic food experiences. Whether you're a first-time backpacker or a seasoned traveler, discover how to make the most of three weeks in Southeast Asia",
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
        id: 11,
        slug: 'foodies-guide-to-rome-eat-like-a-local',
        title: "Foodie's Guide to Rome: Eat Like a Local",
        excerpt:
          "Savor Rome's culinary delights with this insider's guide to authentic dishes, bustling markets, and cozy trattorias. From creamy carbonara to crispy suppli, discover where locals eat and how to experience the city's food culture beyond the tourist trail.",
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
          "Experience the wonders of New Zealand, from Maori traditions and geothermal marvels to epic hiking trails and cinematic landscapes. This guide offers tips for exploring the country's natural beauty, engaging with local culture, and finding adventure at every turn.",
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
        setBlogPosts({...mockPosts.posts, ...mappedPosts});
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
  const handleReadMore =
    (post: { url: string | URL | undefined; slug: any; }) =>
  {
    if (post.url)
    {
  // If it's from API, open the original dev.to article
      window.open(post.url, '_blank');
    }
    else
    { // For mock data, you could navigate to a local route
     // console.log('Navigate to:', /blog/${ post.slug });
    //  navigate(/blog/${post.slug});
    }
  };

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

  interface PostCardProps
  {
    post: BlogPosts;
    featured?: Boolean;
  }

  

  const PostCard = ({ post, featured = false }:PostCardProps) => (
    <article
      className={`group bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            featured ? 'h-64' : 'h-48'
          }`}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {post.categoryName}
          </span>
        </div>
        <button
          onClick={() => handleLike(post.id)}
          className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-background/90 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 ${
              likedPosts[post.id]
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{post.destinationName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h2
          className={`font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer ${
            featured ? 'text-xl' : 'text-lg'
          }`}
        >
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{likedPosts[post.id] ? post.likes + 1 : post.likes}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <button
            onClick={() => handleReadMore(post as any)}
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
            >
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </button>
        </div>
      </div>
    </article>
  );



  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading travel blogs...</p>
        </div>
      </div>
    );
  }

  const addNewPost = (postData: { image?: string; title?: string; catergory: any; excerpt?: string; location: any; author?: string; })  => {
    const newPost = {
      id: Date.now(),
      ...postData,
      category: postData.catergory,
      categoryName: 'Travel',
      destination: 'all',
      destinationName: postData.location || 'Various',
      publishedAt: new Date().toISOString(),
      readTime: 5,
      views: 0,
      likes: 0,
      featured: false,
    };

    setBlogPost: [(currentPosts : {})  => [newPost, {...currentPosts}]]
    setNewPostForm(false);
  };

  const NewPostForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      catergory: '',
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
          catergory: '',
          excerpt: '',
          location: '',
          author: '',
          image: '',
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">
              Share Your Travel Moment
            </h3>
            <button
              onClick={() => setNewPostForm(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post title"
              value={formData.title}
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <textarea
              placeholder="What's happening on your journey?"
              value={formData.excerpt}
              onChange={e =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <input
              type="text"
              placeholder="Your name"
              value={formData.author}
              onChange={e =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={e =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
              >
                <Send className="h-4 w-4" />
                Share Live
              </button>
              <button
                onClick={() => setNewPostForm(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
    <div className="min-h-screen bg-background">
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
              <Alert className="max-w-2xl mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  ⚠️ Currently showing sample data. Live feed temporarily
                  unavailable.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert className="max-w-2xl mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div>
                <button
                  onClick={() => setNewPostForm(true)}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Share Live
                </button>
              </div>

              <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className={`lg:hidden mt-4 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-card rounded-lg border p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Destination
                </label>
                <select
                  value={selectedDestination}
                  onChange={e => setSelectedDestination(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            <label className="block text-sm font-medium text-foreground mb-2">
              Destination
            </label>
            <select
              value={selectedDestination}
              onChange={e => setSelectedDestination(e.target.value)}
              className="flex h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              <h2 className="text-2xl font-bold text-foreground mb-6">
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
          <p className="text-muted-foreground">
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
              <div className="text-muted-foreground mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDestination('all');
                }}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Loading Live Data Again
            </button>
          </div>
        )}
      </div>
      {/* New Post Form Modal */}
      {newPostForm && <NewPostForm />}
      {/* Newsletter Subscription */}
      <div className="border-t bg-muted/30 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Never Miss a Travel Story
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get our latest travel guides, tips, and destination inspiration
            delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBlogPage;
