

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
import { Button } from '@/components/ui/button';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
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

  const NewPostForm = () =>
  {
    const [formData, setFormData] = useState({
      title: '',
      excerpt: '',
      location: '',
      author: '',
      image: '',
    });

    const handleSubmit = () =>
    {
      if (formData.title && formData.excerpt && formData.author)
      {
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
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Travel Blog
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Post title"
                value={ formData.title }
                onChange={ e =>
                  setFormData({ ...formData, title: e.target.value })
                } placeholder="Title" className="bg-gray-800 border-gray-700" />
              <Input placeholder="Category" className="bg-gray-800 border-gray-700" />
              <Input placeholder="Location" className="bg-gray-800 border-gray-700" />
              <Input value={ formData.excerpt }
                onChange={ e =>
                  setFormData({ ...formData, excerpt: e.target.value })
                } placeholder="Excerpt" className="bg-gray-800 border-gray-700" />
            </div>
            <DialogFooter>
              <Button onClick={ () => setNewPostForm(false) }
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                addNewPost({
                  title: "New Adventure",
                  category: "Destinations",
                  location: "Unknown",
                  date: new Date().toISOString().split("T")[0],
                  excerpt: "A newly added post!",
                });
                setNewPostForm(false)}
              }
            >
              Add Post
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

    );
  }
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



