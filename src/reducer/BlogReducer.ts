export type BlogPost = {
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
};

export type BlogState = {
  posts: BlogPost[];
  liked: Record<number, boolean>;
  loading: boolean;
  error: string | null;
  usingMock: boolean;
};

export type BlogAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: BlogPost[] }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'USE_MOCK'; payload: BlogPost[] }
  | { type: 'ADD_POST'; payload: BlogPost }
  | { type: 'TOGGLE_LIKE'; payload: number };

export function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'USE_MOCK':
      return {
        ...state,
        posts: action.payload,
        usingMock: true,
        loading: false,
      };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        liked: {
          ...state.liked,
          [action.payload]: !state.liked[action.payload],
        },
      };
    default:
      return state;
  }
}
