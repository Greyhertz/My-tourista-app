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
import { motion } from 'framer-motion';

const TravelBlogPage = () => {
  const { state, actions } = useBlog();

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts', count: 0 },
    { id: 'travel', name: 'Travel', count: 0 },
    { id: 'destinations', name: 'Destination Guides', count: 0 },
    { id: 'tips', name: 'Travel Tips', count: 0 },
    { id: 'food', name: 'Food & Culture', count: 0 },
    { id: 'budget', name: 'Budget Travel', count: 0 },
     { id: 'itineraries', name: 'itineraries', displayName: 'Itineraries' },
    { id: 'photography', name: 'photography', displayName: 'Photography' }
  ];

  const destinations = [
    { id: 'all', name: 'All Destinations' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'africa', name: 'Africa' },
    { id: 'americas', name: 'Americas' },
    { id: 'oceania', name: 'Oceania' },
  ];

  // Load blogs on component mount
  useEffect(() => {
    actions.loadBlogs();
  }, []);

  // Update categories with actual counts
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

  // Filtered posts based on search and filters
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
  const navigate = useNavigate()
  const handleReadMore = (post: BlogPost) => {
    if (post.url) {
      // If it's from API, open the original dev.to article
      window.open(post.url, '_blank');
    }
  else {
    navigate(`/blog/${post.slug}`);
  }
  };

  // Categories and destinations for the form
  // const formCategories = [
  //   { id: 'travel', name: 'Travel', displayName: 'Travel' },
  //   {
  //     id: 'destinations',
  //     name: 'destinations',
  //     displayName: 'Destination Guides',
  //   },
  //   { id: 'tips', name: 'tips', displayName: 'Travel Tips' },
  //   { id: 'food', name: 'food', displayName: 'Food & Culture' },
  //   { id: 'budget', name: 'budget', displayName: 'Budget Travel' },
  //   { id: 'itineraries', name: 'itineraries', displayName: 'Itineraries' },
  //   { id: 'photography', name: 'photography', displayName: 'Photography' },
  // ];

  // const formDestinations = [
  //   { id: 'all', name: 'Global', displayName: 'Global' },
  //   { id: 'europe', name: 'Europe', displayName: 'Europe' },
  //   { id: 'asia', name: 'Asia', displayName: 'Asia' },
  //   { id: 'africa', name: 'Africa', displayName: 'Africa' },
  //   { id: 'americas', name: 'Americas', displayName: 'Americas' },
  //   { id: 'oceania', name: 'Oceania', displayName: 'Oceania' },
  //   { id: 'middle-east', name: 'Middle East', displayName: 'Middle East' },
  // ];

  // New Post Form Component
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

      // Reset form
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
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="bg-card text-foreground rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg border">
          {/* Header */}
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
            {/* Title */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="h-4 w-4" />
                Post Title *
              </Label>
              <Input
                type="text"
                placeholder="e.g., My Amazing Journey Through Tokyo"
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  errors.title
                    ? 'border-red-500 bg-red-50'
                    : 'border-input bg-background'
                }`}
              />
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category and Destination Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Filter className="h-4 w-4" />
                  Category *
                </Label>

                <Select
                  value={formData.category}
                  onValueChange={val => handleInputChange('category', val)}
                >
                  <SelectTrigger
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      errors.category
                        ? 'border-red-500 bg-red-50'
                        : 'border-input bg-background'
                    }`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4" />
                  Destination *
                </Label>

                <Select
                  value={formData.destination}
                  onValueChange={val => handleInputChange('destination', val)}
                >
                  <SelectTrigger
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      errors.destination
                        ? 'border-red-500 bg-red-500'
                        : 'border-input bg-background'
                    }`}
                  >
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map(destination => (
                      <SelectItem key={destination.id} value={destination.id}>
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.destination && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.destination}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="h-4 w-4" />
                Story Description *
              </Label>
              <Textarea
                placeholder="Share the highlights of your travel experience, what made it special, and any tips for fellow travelers..."
                value={formData.excerpt}
                onChange={e => handleInputChange('excerpt', e.target.value)}
                className={`flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  errors.excerpt
                    ? 'border-red-500 bg-red-50'
                    : 'border-input bg-background'
                }`}
                rows={4}
              />
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

            {/* Author and Read Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Author */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4" />
                  Your Name *
                </Label>
                <Input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={formData.author}
                  onChange={e => handleInputChange('author', e.target.value)}
                  className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    errors.author
                      ? 'border-red-500 bg-red-50'
                      : 'border-input bg-background'
                  }`}
                />
                {errors.author && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.author}
                  </p>
                )}
              </div>

              {/* Read Time */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4" />
                  Read Time (minutes)
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={60}
                  placeholder="5"
                  value={formData.readTime}
                  onChange={e =>
                    handleInputChange('readTime', parseInt(e.target.value) || 5)
                  }
                  className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    errors.readTime
                      ? 'border-red-500 bg-red-50'
                      : 'border-input bg-background'
                  }`}
                />
                {errors.readTime && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.readTime}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Eye className="h-4 w-4" />
                Cover Image URL (optional)
              </Label>
              <Input
                type="url"
                placeholder="https://example.com/your-image.jpg"
                value={formData.image}
                onChange={e => handleInputChange('image', e.target.value)}
                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  errors.image
                    ? 'border-red-500 bg-red-50'
                    : 'border-input bg-background'
                }`}
              />
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

            {/* Form Preview */}
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
                      {
                        categories.find(c => c.id === formData.category)
                          ?.name
                      }
                    </span>
                  )}
                  {formData.destination && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {
                        destinations.find(
                          d => d.id === formData.destination
                        )?.name
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

            {/* Action Buttons */}
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

  // Post Card Component
  interface PostCardProps {
    post: BlogPost;
    featured?: boolean;
  }

  const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => (
    <article
      className={`group overflow-hidden bg-card shadow-lg border-border/50 group cursor-pointer hover:shadow-xl transition-all duration-30 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Card className=" bg-card shadow-lg border-border/50 group cursor-pointer hover:shadow-xl transition-all duration-30">
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
            <Badge className="px-3 py-1 text-xs font-bold">
              {post.categoryName}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.toggleLike(post.id)}
            className="absolute top-4 right-4 rounded-full bg-background/90 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            <Heart
              className={`h-4 w-4 ${
                state.likedPosts[post.id]
                  ? 'fill-red-500 text-red-500'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
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
            className={`text-lg font-bold mb-3 group-hover:text text-foreground transition-colors ${
              featured ? 'text-xl' : 'text-lg'
            }`}
          >
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {post.author}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>
                  {state.likedPosts[post.id] ? post.likes + 1 : post.likes}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 ">
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              onClick={() => handleReadMore(post)}
            >
              Read More <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );

  // Loading state
  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading travel blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Header Section */}
    
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-6">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-6"
            >
              Travel Stories & Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg max-w-2xl"
            >
              Discover amazing destinations, practical travel tips, and
              inspiring stories from fellow adventurers
            </motion.p>
            {state.usingMockData && (
              <Alert className="max-w-2xl mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  ⚠️ Currently showing sample data. Live feed temporarily
                  unavailable.
                </AlertDescription>
              </Alert>
            )}
            {state.error && (
              <Alert className="max-w-2xl mx-auto mb-6 border-yellow-200 bg-yellow-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-yellow-800">
                  {state.error}
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
                  className="w-full bg-white pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={state.searchTerm}
                  onChange={e => actions.setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categoriesWithCounts.map(category => (
                <Button
                  key={category.id}
                  onClick={() => actions.setSelectedCategory(category.id)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    state.selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={actions.toggleFilters}
                className="lg:hidden inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    state.showFilters ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              <div>
                <Button
                  onClick={actions.toggleNewPostForm}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Share Live
                </Button>
              </div>

              <div className="inline-flex items-center rounded-md border border-input bg-background p-1">
                <Button
                  onClick={() => actions.setViewMode('grid')}
                  className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    state.viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => actions.setViewMode('list')}
                  className={`inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    state.viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div
            className={`lg:hidden mt-4 ${
              state.showFilters ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-card rounded-lg border p-4 space-y-4">
              <div>
                <Label className="block text-sm font-medium text-foreground mb-2">
                  Destination
                </Label>

                <Select
                  value={state.selectedDestination}
                  onValueChange={val => actions.setSelectedDestination(val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select destination" />
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
          </div>

          {/* Desktop Destination Filter */}
          <div className="hidden lg:block mt-4">
            <Label className="block text-sm font-medium text-foreground mb-2">
              Destination
            </Label>

            <Select
              value={state.selectedDestination}
              onValueChange={val => actions.setSelectedDestination(val)}
            >
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select destination" />
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
          state.selectedCategory === 'all' &&
          !state.searchTerm && (
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
          className={`grid gap-8 ${
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
              <Button
                onClick={actions.clearFilters}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > state.visibleCount && (
          <div className="mt-12 text-center">
            <Button
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => actions.setVisibleCount(state.visibleCount + 6)}
            >
              Load More Posts ({filteredPosts.length - state.visibleCount}{' '}
              remaining)
            </Button>
          </div>
        )}

        {/* Retry API Button */}
        {state.usingMockData && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Loading Live Data Again
            </Button>
          </div>
        )}
      </div>

      {/* New Post Form Modal */}
      {state.newPostForm && <NewPostForm />}

      {/* Newsletter Subscription */}
      <NewsLetterBox />
    </div>
  );
};

export default TravelBlogPage;
