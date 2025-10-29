import { motion } from 'framer-motion';
import { useBlog } from '@/context/BlogContex';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Heart,
  Share2,
  BookmarkPlus,
  MessageCircle,
  Eye,
  Clock,
  Calendar,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Card, CardContent } from '@/components/ui/card';

export default function BlogPostDetail() {
  const { state, actions } = useBlog();
  const { slug } = useParams();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [comments, setComments] = useState<
    Array<{ id: number; name: string; text: string; date: string }>
  >([]);

  useEffect(() => {
    if (state.blogPosts.length === 0) {
      actions.loadBlogs();
    }
  }, []);

  const post = state.blogPosts.find(p => p.slug === slug);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleAddComment = () => {
    if (commentText.trim() && commentName.trim()) {
      const newComment = {
        id: Date.now(),
        name: commentName,
        text: commentText,
        date: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      setCommentText('');
      setCommentName('');
    }
  };

  // if (state.loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-background">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading post...</p>
  //       </div>
  //     </div>
  //   );
  // }7

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const recentPosts = state.blogPosts.filter(p => p.slug !== slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] bg-card overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-70"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition"
            >
              ← Back to Blog
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4"
            >
              {post.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{post.destinationName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-card rounded-2xl shadow-lg p-8 md:p-12 border"
          >
            {/* Author Info */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                  alt={post.author}
                  className="w-14 h-14 rounded-full border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-foreground text-lg">
                    {post.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Travel Blogger & Content Creator
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => actions.toggleLike(post.id)}
                  className="hover:bg-primary/10"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      state.likedPosts[post.id]
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {state.likedPosts[post.id] ? post.likes + 1 : post.likes}
                </span>

                {/* <div className="relative"> */}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="hover:bg-primary/10"
                    >
                      <Share2 className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {showShareMenu && (
                      <Card className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-xl border  p-2">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition text-foreground"
                        >
                          <Facebook className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition text-foreground"
                        >
                          <Twitter className="h-4 w-4 text-sky-500" />
                          <span className="text-sm">Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition text-foreground"
                        >
                          <Linkedin className="h-4 w-4 text-blue-700" />
                          <span className=" `text-sm">LinkedIn</span>
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg transition text-foreground"
                      > 
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">
                            {copied ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                      </Card>
                    )}
                  </PopoverContent>
                  {/* 
                   // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant={'outline'}
    //       className={cn(
    //         'w-[240px] justify-start text-left font-normal',
    //         !date && 'text-muted-foreground'
    //       )}
    //     >
    //       <CalendarIcon />
    //       {date ? format(date, 'PPP') : <span>Pick a date</span>}
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-auto p-0  rounded-2xl" align="start">
    //     <Calendar
    //       mode="single"
    //       selected={date}
    //       onSelect={setDate}
    //       
    //       className='bg-secondary/50 rounded-2xl'
    //     />
    //   </PopoverContent>
    // </Popover> */}
                </Popover>
                {/* </div> */}

                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed text-lg mb-6">
                {post.excerpt}
              </p>

              {/* You can add more content sections here */}
              <div className="bg-primary/10 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                <p className="text-foreground italic">
                  "Travel is the only thing you buy that makes you richer. This
                  journey was a testament to that truth."
                </p>
              </div>

              <p className="text-foreground leading-relaxed mb-4">
                Every destination tells a unique story, and this adventure was
                no exception. From the bustling streets to the serene
                landscapes, every moment was filled with wonder and discovery.
              </p>
            </div>

            {/* Comments Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                Comments ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <div className="bg-muted/50 rounded-xl p-6 mb-8 border">
                <h4 className="font-semibold text-foreground mb-4">
                  Leave a Comment
                </h4>
                <div className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={commentName}
                    onChange={e => setCommentName(e.target.value)}
                    className="bg-background"
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    rows={4}
                    className="bg-background"
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || !commentName.trim()}
                    className="w-full sm:w-auto"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map(comment => (
                    <div
                      key={comment.id}
                      className="bg-card border rounded-xl p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`}
                          alt={comment.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-foreground">
                              {comment.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          <p className="text-foreground">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Recent Posts */}
              <div className="bg-card rounded-2xl shadow-lg p-6 border">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Recent Posts
                </h3>
                {recentPosts.length > 0 ? (
                  <div className="space-y-4">
                    {recentPosts.map(recent => (
                      <Link
                        key={recent.slug}
                        to={`/blog/${recent.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-accent transition">
                          <img
                            src={recent.image}
                            alt={recent.title}
                            className="w-20 h-20 rounded-lg object-cover"
                            onError={e => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition line-clamp-2 mb-1">
                              {recent.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(recent.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No other posts available
                  </p>
                )}
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-6 text-primary-foreground border">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Get the latest travel stories delivered to your inbox.
                </p>
                <Input
                  placeholder="Enter your email"
                  className="mb-3 bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/70"
                />
                <Button className="w-full bg-background text-foreground hover:bg-background/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
