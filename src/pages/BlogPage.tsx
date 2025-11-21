import React, { useState, useMemo, useEffect } from 'react';
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
  Sparkles,
  BookOpen,
  Book,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBlog, type BlogPost } from '@/context/BlogContex';
import NewsLetterBox from '@/components/core/LetterBox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
// import { interval } from 'date-fns';

const TravelBlogPage = () => {
  const { state, actions } = useBlog();
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

  const headerTexts = [
    'Travel Stories & Guides',
    'Explore the World',
    'Adventure Awaits',
    'Journey of a Lifetime',
    'Discover New Horizons',
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentHeaderIndex(prev => (prev + 1) % headerTexts.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  const categories = [
    { id: 'all', name: 'All Posts', count: 0 },
    { id: 'travel', name: 'Travel', count: 0 },
    { id: 'destinations', name: 'Destination Guides', count: 0 },
    { id: 'tips', name: 'Travel Tips', count: 0 },
    { id: 'food', name: 'Food & Culture', count: 0 },
    { id: 'budget', name: 'Budget Travel', count: 0 },
    { id: 'itineraries', name: 'itineraries', displayName: 'Itineraries' },
    { id: 'photography', name: 'photography', displayName: 'Photography' },
  ];

  const destinations = [ 
    { id: 'all', name: 'All Destinations' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'africa', name: 'Africa' },
    { id: 'americas', name: 'Americas' },
    { id: 'oceania', name: 'Oceania' },
  ];

  useEffect(() => {
    actions.loadBlogs();
  }, []);

  const categoriesWithCounts = useMemo(() => {
    const counts = state.blogPosts.reduce(
      (acc: Record<string, number>, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        acc.all = (acc.all || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return categories.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0,
    }));
  }, [state.blogPosts]);

  const filteredPosts = useMemo(() => {
    return state.blogPosts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchesCategory =
        state.selectedCategory === 'all' ||
        post.category === state.selectedCategory;
      const matchesDestination =
        state.selectedDestination === 'all' ||
        post.destination === state.selectedDestination;

      return matchesSearch && matchesCategory && matchesDestination;
    });
  }, [
    state.blogPosts,
    state.searchTerm,
    state.selectedCategory,
    state.selectedDestination,
  ]);

  const featuredPosts = state.blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const navigate = useNavigate();
  const handleReadMore = (post: BlogPost) => {
    if (post.url) {
      window.open(post.url, '_blank');
    } else {
      navigate(`/blog/${post.slug}`);
    }
  };

  const NewPostForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      category: '',
      excerpt: '',
      destination: '',
      author: '',
      image: '',
      readTime: 5,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }

      if (!formData.excerpt.trim()) {
        newErrors.excerpt = 'Description is required';
      }

      if (!formData.author.trim()) {
        newErrors.author = 'Author name is required';
      }

      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }

      if (!formData.destination) {
        newErrors.destination = 'Please select a destination';
      }

      if (formData.image && !isValidUrl(formData.image)) {
        newErrors.image = 'Please enter a valid image URL';
      }

      if (formData.readTime < 1 || formData.readTime > 60) {
        newErrors.readTime = 'Read time must be between 1 and 60 minutes';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string: string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    const handleSubmit = () => {
      if (!validateForm()) {
        return;
      }

      const selectedCategory = categories.find(
        cat => cat.id === formData.category
      );
      const selectedDestination = destinations.find(
        dest => dest.id === formData.destination
      );

      const newPost: BlogPost = {
        id: Date.now(),
        slug: formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        title: formData.title,
        excerpt: formData.excerpt,
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
        category: formData.category,
        categoryName: selectedCategory?.name || 'Travel',
        destination: formData.destination,
        destinationName: selectedDestination?.name || 'Global',
        author: formData.author,
        publishedAt: new Date().toISOString(),
        readTime: formData.readTime,
        views: 0,
        likes: 0,
        featured: false,
      };

      actions.addNewPost(newPost);

      setFormData({
        title: '',
        category: '',
        excerpt: '',
        destination: '',
        author: '',
        image: '',
        readTime: 5,
      });
      setErrors({});
    };

    const handleInputChange = (field: string, value: string | number) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="text-foreground rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg border">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Share Your Travel Story
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Tell us about your adventure
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={actions.toggleNewPostForm}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4" />
                Post Title *
              </Label>
              <div className="flex items-center bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                <Input
                  type="text"
                  placeholder="e.g., My Amazing Journey Through Tokyo"
                  value={formData.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  className={`bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                    errors.title
                      ? 'border-red-500 bg-red-50'
                      : 'border-input bg-background'
                  }`}
                />
              </div>
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Filter className="h-4 w-4" />
                  Category *
                </Label>
                <div className="flex items-center bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                  <Select
                    value={formData.category}
                    onValueChange={val => handleInputChange('category', val)}
                  >
                    <SelectTrigger
                      className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                        errors.category ? 'border-red-500 bg-red-50' : ''
                      }`}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4" />
                  Destination *
                </Label>
                <div className="flex items-center bg-card border border-border rounded-xl shadow-sm overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                  <Select
                    value={formData.destination}
                    onValueChange={val => handleInputChange('destination', val)}
                  >
                    <SelectTrigger
                      className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                        errors.destination
                          ? 'border-red-500 bg-red-500'
                          : 'border-input bg-background'
                      }`}
                    >
                      <SelectValue
                        placeholder="Select destination"
                        className="placeholder:text-muted-foreground"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {destinations.map(destination => (
                        <SelectItem key={destination.id} value={destination.id}>
                          {destination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.destination && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.destination}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="h-4 w-4" />
                Story Description *
              </Label>
              <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                <Textarea
                  placeholder="Share the highlights of your travel experience, what made it special, and any tips for fellow travelers..."
                  value={formData.excerpt}
                  onChange={e => handleInputChange('excerpt', e.target.value)}
                  className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                    errors.excerpt
                      ? 'border-red-500 bg-red-50'
                      : 'border-input bg-background'
                  }`}
                  rows={4}
                />
              </div>
              {errors.excerpt && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.excerpt}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {formData.excerpt.length}/500 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4" />
                  Your Name *
                </Label>
                <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                  <Input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={formData.author}
                    onChange={e => handleInputChange('author', e.target.value)}
                    className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                      errors.author
                        ? 'border-red-500 bg-red-50'
                        : 'border-input bg-background'
                    }`}
                  />
                </div>
                {errors.author && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.author}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4" />
                  Read Time (minutes)
                </Label>
                <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    placeholder="5"
                    value={formData.readTime}
                    onChange={e =>
                      handleInputChange(
                        'readTime',
                        parseInt(e.target.value) || 5
                      )
                    }
                    className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                      errors.readTime
                        ? 'border-red-500 bg-red-50'
                        : 'border-input bg-background'
                    }`}
                  />
                </div>
                {errors.readTime && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.readTime}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Eye className="h-4 w-4" />
                Cover Image URL (optional)
              </Label>
              <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
                <Input
                  type="url"
                  placeholder="https://example.com/your-image.jpg"
                  value={formData.image}
                  onChange={e => handleInputChange('image', e.target.value)}
                  className={`border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground ${
                    errors.image
                      ? 'border-red-500 bg-red-50'
                      : 'border-input bg-background'
                  }`}
                />
              </div>
              {errors.image && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.image}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Leave empty to use a default travel image
              </p>
            </div>

            {formData.title && formData.excerpt && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Preview:
                  </p>
                </div>
                <h4 className="font-semibold text-base mb-2">
                  {formData.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {formData.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  {formData.category && (
                    <span className="flex items-center gap-1">
                      <Filter className="h-3 w-3" />
                      {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  )}
                  {formData.destination && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {
                        destinations.find(d => d.id === formData.destination)
                          ?.name
                      }
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formData.readTime} min read
                  </span>
                  {formData.author && (
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {formData.author}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.title ||
                  !formData.excerpt ||
                  !formData.author ||
                  !formData.category ||
                  !formData.destination
                }
                className="flex-1 inline-flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Share Story
              </Button>

              <Button
                variant="outline"
                onClick={actions.toggleNewPostForm}
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  interface PostCardProps {
    post: BlogPost;
    featured?: boolean;
  }

  const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => (
    <article className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <Card className="bg-card border h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className={`w-full object-cover ${featured ? 'h-80' : 'h-56'}`}
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.src =
                'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm"
            >
              {post.categoryName}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 border-b border-border pb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{post.destinationName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <h2
            className={`font-serif font-bold mb-3 text-foreground group-hover:text-primary transition-colors ${
              featured ? 'text-2xl' : 'text-xl'
            }`}
          >
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-foreground font-medium">
                {post.author}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()}</span>
              </div>
              <button
                onClick={() => actions.toggleLike(post.id)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Heart
                  className={`h-4 w-4 ${
                    state.likedPosts[post.id] ? 'fill-primary text-primary' : ''
                  }`}
                />
                <span>
                  {state.likedPosts[post.id] ? post.likes + 1 : post.likes}
                </span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Classic Header */}

      <section className="relative bg-card border-b border-border inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium mb-6 hover:bg-card">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Travel Blogs
              </Badge>
            </motion.div>
            <div className="relative overflow-hidden h-16 md:h-20 mb-4">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentHeaderIndex}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                >
                  {headerTexts[currentHeaderIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Discover amazing destinations, practical travel tips, and
              inspiring stories from fellow adventurers
            </motion.p>

            {state.usingMockData && (
              <Alert className="max-w-2xl mx-auto mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Currently showing sample data. Live feed temporarily
                  unavailable.
                </AlertDescription>
              </Alert>
            )}

            {state.error && (
              <Alert className="max-w-2xl mx-auto mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {/*    <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
              >
                <Input
                  placeholder="Full Name"
                  required
                  className="bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div> */}
            <div className="max-w-2xl mx-auto">
              <div
                className="relative flex items-center bg-card border border-border rounded-xl shadow-md overflow-hidden 
                transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations, tips, guides..."
                  className="pl-12 pr-4 py-6 text-base  focus:border-primary   border-0 outline-none text-foreground placeholder:text-muted-foreground"
                  value={state.searchTerm}
                  onChange={e => actions.setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="flex flex-wrap gap-2">
              {categoriesWithCounts.map(category => (
                <Button
                  key={category.id}
                  onClick={() => actions.setSelectedCategory(category.id)}
                  variant={
                    state.selectedCategory === category.id
                      ? 'default'
                      : 'outline'
                  }
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={actions.toggleNewPostForm} className="gap-2">
                <Plus className="h-4 w-4" />
                Share Story
              </Button>

              <div className="flex border rounded-md">
                <Button
                  onClick={() => actions.setViewMode('grid')}
                  variant={state.viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => actions.setViewMode('list')}
                  variant={state.viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-xs">
            <Label className="text-sm font-medium mb-2 block">
              Filter by Destination
            </Label>
            <Select
              value={state.selectedDestination}
              onValueChange={val => actions.setSelectedDestination(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Destinations" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                {destinations.map(dest => (
                  <SelectItem key={dest.id} value={dest.id}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 &&
          state.selectedCategory === 'all' &&
          !state.searchTerm && (
            <div className=" mb-12">
              <div className="text-center">
                <Badge className="mb-4 px-4 py-2 text-center" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2 inline" />
                  Featured Stories
                </Badge>
              </div>

              <div className="flex items-center text-center gap-3 mb-6">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Featured Stories
                </h2>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map(post => (
                  <PostCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>
          )}

        {/* Results Count */}
        <div className="mb-6">
          <div className="text-center">
            <Badge className="mb-4 px-4 py-2 text-center" variant="outline">
              <Book className="w-4 h-4 mr-2 inline" />
              Blog Posts
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Showing {filteredPosts.slice(0, state.visibleCount).length} of{' '}
            {filteredPosts.length}{' '}
            {filteredPosts.length === 1 ? 'post' : 'posts'}
            {state.searchTerm && ` for "${state.searchTerm}"`}
            {state.usingMockData && (
              <span className="text-orange-600"> (sample data)</span>
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div
          className={`grid gap-6 ${
            state.viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredPosts.slice(0, state.visibleCount).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && !state.loading && (
          <div className="text-center py-16 border-2  border-none rounded-lg">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              No posts found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                actions.setSearchTerm('');
                actions.setSelectedCategory('all');
                actions.setSelectedDestination('all');
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > state.visibleCount && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => actions.setVisibleCount(state.visibleCount + 6)}
              variant="outline"
              size="lg"
            >
              Load More Posts ({filteredPosts.length - state.visibleCount}{' '}
              remaining)
            </Button>
          </div>
        )}

        {/* Retry API */}
        {state.usingMockData && (
          <div className="mt-8 text-center">
            <Button
              onClick={actions.loadBlogs}
              variant="outline"
              className="gap-2"
              disabled={state.loading}
            >
              <RefreshCw
                className={`h-4 w-4 ${state.loading ? 'animate-spin' : ''}`}
              />
              {state.loading ? 'Loading...' : 'Try Loading Live Data Again'}
            </Button>
          </div>
        )}
      </div>

      {/* New Post Form Modal */}
      {state.newPostForm && <NewPostForm />}

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  );
};

export default TravelBlogPage;
