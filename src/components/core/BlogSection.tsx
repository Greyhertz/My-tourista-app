import { useBlog } from "@/context/BlogContex";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCards";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../../pages/AboutUs";
import { Button } from "../ui/button";

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  category?: string;
  destination?: string;
  featured?: boolean;
  showViewAll?: boolean;
  viewAllLink?: string;
  compact?: boolean;
  className?: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  title ,
  subtitle,
  limit,
  category,
  destination,
  featured,
  showViewAll = true,
  viewAllLink = "/blog",
  compact = false,
  className = ""
}) => {
  const { state, actions } = useBlog();

  // Filter posts based on props
  const filteredPosts = React.useMemo(() => {
   let posts = state.blogPosts;

    if (category && category !== 'all') {
      posts = posts.filter(post => post.category === category);
    }

    if (destination && destination !== 'all') {
      posts = posts.filter(post => post.destination === destination);
    }

    if (featured !== undefined) {
      posts = posts.filter(post => post.featured === featured);
    }
    return posts.slice(0, limit);
  }, [state.blogPosts, category, destination, featured, limit]);

  // Load blogs if not already loaded
  React.useEffect(() => {
    if (state.blogPosts.length === 0 && !state.loading) {
      actions.loadBlogs();
    }
  }, [state.blogPosts.length, state.loading, actions]);

  if (state.loading) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading travel stories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return null; // Don't show section if no posts 
  }

  return (
    //   <ScrollReveal>
    //   <div className="text-center mb-16">
    // <Badge className="mb-4 px-4 py-2" variant="outline">
    //   <Sparkles className="w-4 h-4 mr-2" />
    //   Trending Now
    // </Badge>
    //     <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
    //       Featured Destinations
    //     </h2>
    //     <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    //       Handpicked places that promise extraordinary experiences and
    //       memories that last forever
    //     </p>
    //   </div>
    // </ScrollReveal>
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            {' '}
            <Badge className="mb-4 px-4 py-2" variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Trending Stories{' '}
            </Badge>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>
        {/* Posts Grid */}
        <div
          className={`grid gap-6 ${
            compact
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredPosts.map(post => (
            <ScrollReveal>
              <BlogCard
                key={post.id}
                post={post}
                onLike={actions.toggleLike}
                isLiked={state.likedPosts[post.id]}
                compact={compact}
                showFullContent={!compact}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-12">
          
             <Link
              to={viewAllLink}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              
            >
              View All Stories <ArrowRight className="h-4 w-4" />
            </Link> 
          </div>
        )}
      </div>
    </section>
  );
};
