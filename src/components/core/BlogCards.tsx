import React from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Eye,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { BlogPost } from '@/context/BlogContex';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BlogCardProps {
  post: BlogPost;
  onLike?: (postId: number) => void;
  isLiked?: boolean;
  compact?: boolean;
  showFullContent?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onLike,
  isLiked = false,
  compact = false,
  showFullContent = true,
}) => { const navigate = useNavigate()
  const handleReadMore = () => {
    if (post.url) {
      window.open(post.url, '_blank');
    }
    else
    {
     navigate(`/blog/${post.slug}: ${post.id}`);
    }
  };

  return (
    <Card
      className={`group bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        compact ? 'h-fit' : ''
      }`}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            compact ? 'h-32' : 'h-48'
          }`}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge className="px-2 py-1 text-xs font-bold">
            {post.categoryName}
          </Badge>
        </div>
        {onLike && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onLike(post.id)}
            className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-background/90 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background"
          >
            <Heart
              className={`h-3 w-3 ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </Button>
        )}
      </div>

      <CardContent className={`p-4 ${compact ? 'space-y-2' : 'p-6 space-y-3'}`}>
        {showFullContent && (
          <div
            className={`flex items-center gap-3 text-xs text-muted-foreground ${
              compact ? 'gap-2' : 'gap-4'
            }`}
          >
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{post.destinationName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min</span>
            </div>
          </div>
        )}

        <h3
          className={`font-bold text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer ${
            compact ? 'text-sm' : 'text-lg'
          }`}
        >
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p
          className={`text-muted-foreground line-clamp-2 ${
            compact ? 'text-xs' : 'text-sm'
          }`}
        >
          {post.excerpt}
        </p>

        {showFullContent && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {post.author}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  <span>{isLiked ? post.likes + 1 : post.likes}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="link"
                onClick={handleReadMore}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Read More <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
