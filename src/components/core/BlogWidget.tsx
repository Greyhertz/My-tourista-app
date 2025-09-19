// MenuSheetBlogWidget.tsx - BlogWidget adapted for menu sheet
import React from 'react';
import { useBlog } from '@/context/BlogContex';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, MapPin, Clock, User } from 'lucide-react';

interface MenuSheetBlogWidgetProps {
  title?: string;
  limit?: number;
  category?: string;
  onLinkClick?: () => void; // To close menu sheet when link is clicked
  className?: string;
}

export const MenuSheetBlogWidget: React.FC<MenuSheetBlogWidgetProps> = ({
  title = 'Recent Stories',
  limit = 3,
  category,
  onLinkClick,
  className = '',
}) => {
  const { state, actions } = useBlog();

  // Load blogs if not already loaded
  React.useEffect(() => {
    if (state.blogPosts.length === 0 && !state.loading) {
      actions.loadBlogs();
    }
  }, [state.blogPosts.length, state.loading, actions]);

  const posts = React.useMemo(() => {
    let filtered = state.blogPosts;
    if (category && category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }
    return filtered.slice(0, limit);
  }, [state.blogPosts, category, limit]);

  if (state.loading) {
    return (
      <div className={`py-4 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-muted rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className={`py-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-4 w-4 text-primary" />
        <h3 className="font-medium text-sm text-foreground">{title}</h3>
      </div>

      <div className="space-y-3">
        {posts.map(post => (
          <article key={post.id} className="group">
            <Link
              to={`/blog/${post.slug}`}
              onClick={onLinkClick}
              className="block"
            >
              <h4 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}m</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>

      <Link
        to="/blog"
        onClick={onLinkClick}
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 mt-4 pt-3 border-t"
      >
        View All Stories <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
};

// Example implementation in your menu sheet component
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const MenuSheetExample = () => {
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = () => {
    setOpen(false); // Close menu when link is clicked
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              Home
            </Link>
            <Link
              to="/blog"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              Blog
            </Link>
            <Link
              to="/destinations"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              Destinations
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
            >
              About
            </Link>
          </nav>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Blog Widgets */}
          <MenuSheetBlogWidget
            title="Latest Stories"
            limit={3}
            onLinkClick={handleLinkClick}
          />

          <MenuSheetBlogWidget
            title="Travel Tips"
            category="tips"
            limit={2}
            onLinkClick={handleLinkClick}
            className="border-t pt-4"
          />

          <MenuSheetBlogWidget
            title="Destinations"
            category="destinations"
            limit={2}
            onLinkClick={handleLinkClick}
            className="border-t pt-4"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Alternative: Compact version for smaller menu sheets
export const CompactMenuBlogWidget: React.FC<MenuSheetBlogWidgetProps> = ({
  title = 'Recent Stories',
  limit = 3,
  category,
  onLinkClick,
  className = '',
}) => {
  const { state } = useBlog();

  const posts = React.useMemo(() => {
    let filtered = state.blogPosts;
    if (category && category !== 'all') {
      filtered = filtered.filter(post => post.category === category);
    }
    return filtered.slice(0, limit);
  }, [state.blogPosts, category, limit]);

  if (posts.length === 0) return null;

  return (
    <div className={`py-3 ${className}`}>
      <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </h4>

      <div className="space-y-2">
        {posts.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            onClick={onLinkClick}
            className="block group"
          >
            <div className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {post.title}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {post.author} • {post.readTime}m read
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/blog"
        onClick={onLinkClick}
        className="text-xs text-primary hover:text-primary/80 mt-3 block"
      >
        View all →
      </Link>
    </div>
  );
};

export default MenuSheetExample;
