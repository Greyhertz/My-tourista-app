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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

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
          "Embark on a transformative journey across Thailand, Vietnam, Cambodia, and Laos. This guide reveals hidden temples, vibrant street markets, and lush landscapes, while offering practical advice on budget stays, local transportation, and authentic food experiences. Whether you're a first-time backpacker or a seasoned traveler, discover how to make the most of three weeks in Southeast Asia.",
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
      views: (post.public_reactions_count || 0) * 50,
      likes: post.public_reactions_count || 0,
      featured: (post.public_reactions_count || 0) > 10,
      url: post.url,
    };
  };

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError('');

      try {
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
        console.error('Failed to load API data, using mock data:', err);
        setBlogPosts(mockPosts.posts);
        setUsingMockData(true);
        setError('Unable to load live data. Showing sample posts.');
      } finally {``
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

  const handleReadMore = (post: {
    url: string | URL | undefined;
    slug: any;
  }) => {
    if (post.url) {
      window.open(post.url, '_blank');
    } else {
      console.log('Navigate to:', `/blog/${post.slug}`);
    }
  };

  const addNewPost = (postData: any) => {
    const newPost = {
      id: Date.now(),
      slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
      category: 'travel',
      categoryName: 'Travel',
      destination: 'all',
      destinationName: postData.location || 'Various',
      publishedAt: new Date().toISOString(),
      readTime: 5,
      views: 0,
      featured: false,
      ...postData,
    };

    setBlogPosts(currentPosts => [newPost, ...currentPosts]);
    setNewPostForm(false);
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

  interface PostCardProps {
    post: BlogPosts;
    featured?: boolean;
  }

  const PostCard = ({ post, featured = false }: PostCardProps) => (
    <Card
      className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/50 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover transition-transform group-hover:scale-105 ${
            featured ? 'h-64' : 'h-48'
          }`}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            {post.categoryName}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleLike(post.id)}
          className="absolute top-4 right-4 bg-background/90 hover:bg-background backdrop-blur-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              likedPosts[post.id]
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground'
            }`}
          />
        </Button>
      </div>

      <CardHeader>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
          className={`font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors cursor-pointer ${
            featured ? 'text-xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h2>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.author}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
      </CardContent>

      <CardFooter className="pt-0">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          onClick={() => handleReadMore(post)}
          className="w-full justify-start p-0 h-auto text-primary hover:text-primary/80"
        >
          Read More <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );

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
      <Dialog open={newPostForm} onOpenChange={setNewPostForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Share Your Travel Moment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Post title"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Description</Label>
              <Textarea
                id="excerpt"
                placeholder="What's happening on your journey?"
                value={formData.excerpt}
                onChange={e =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="h-20"
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Your Name</Label>
              <Input
                id="author"
                placeholder="Your name"
                value={formData.author}
                onChange={e =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Location"
                value={formData.location}
                onChange={e =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={e =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80"
              >
                <Send className="w-4 h-4 mr-2" />
                Share Live
              </Button>
              <Button variant="outline" onClick={() => setNewPostForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading travel blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-background to-background/80 bg-clip-text text-transparent">
              Travel Stories & Guides
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-2 max-w-2xl mx-auto">
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, tips, guides..."
                  className="pl-12 py-4 text-lg bg-background/90 backdrop-blur-sm"
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
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-primary/80'
                      : ''
                  }
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary/80">
                    <Plus className="w-4 h-4 mr-2" />
                    Share Live
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      Share Your Travel Moment
                    </DialogTitle>
                  </DialogHeader>
                  <NewPostForm />
                </DialogContent>
              </Dialog>

              <div className="flex items-center border rounded-lg p-1 bg-background">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <Card className="lg:hidden mt-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block text-slate-700">
                      Destination
                    </Label>
                    <Select
                      value={selectedDestination}
                      onValueChange={setSelectedDestination}
                    >
                      <SelectTrigger className="bg-white/50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {destinations.map(dest => (
                          <SelectItem key={dest.id} value={dest.id}>
                            {dest.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Desktop Destination Filter */}
          <div className="hidden lg:block mt-6">
            <Label className="text-sm font-medium mb-3 block text-slate-700">
              Filter by Destination
            </Label>
            <Select
              value={selectedDestination}
              onValueChange={setSelectedDestination}
            >
              <SelectTrigger className="w-64 bg-white/50 backdrop-blur-sm border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {destinations.map(dest => (
                  <SelectItem key={dest.id} value={dest.id}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 &&
          selectedCategory === 'all' &&
          !searchTerm && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Featured Stories
                </h2>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  ⭐ Trending
                </Badge>
              </div>
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
          <Card className="text-center py-12 bg-gradient-to-br from-background to-muted/50">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="text-muted-foreground mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedDestination('all');
                  }}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {filteredPosts.length > visibleCount && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => setVisibleCount(prev => prev + 6)}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              Load More Posts ({filteredPosts.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {/* Retry API Button */}
        {usingMockData && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Try Loading Live Data Again
            </Button>
          </div>
        )}
      </div>

      {/* New Post Form Modal */}
      <NewPostForm />

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Never Miss a Travel Story
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Get our latest travel guides, tips, and destination inspiration
            delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 backdrop-blur-sm"
            />
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelBlogPage;
