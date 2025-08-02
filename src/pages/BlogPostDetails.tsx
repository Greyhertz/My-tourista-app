import { useParams, Link } from "react-router-dom";
// import { blogPosts } from "../data/blogData";
import { blogPosts } from "../data/DataBlog";// Adjust the import path as necessary
import { motion } from "framer-motion";
// import { Icon } from "lucide-react";
import * as Icon from '@phosphor-icons/react';

export default function BlogPostDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return <div className="text-center text-red-500 mt-10">Post not found.</div>;
  }

  const recentPosts = blogPosts
    .filter((p) => p.slug !== slug)
    // .slice(0, 3);

  return (
    <div
      className="flex flex-col lg:flex-row gap-10 p-10  py-16"
      style={{ backgroundColor: '#e7e1e1' }}
    >
      <div className="flex fixed left-0.5 h-screen bg-white top-0 w-">
        <div>
          <Icon.HouseIcon />
        </div>

        <div>
          <Icon.Sun />
        </div>
      </div>
      {/* MAIN CONTENT */}

      <motion.div
        className="flex-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-blue-500 dark:text-white mb-2">
          {post.title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{}</p>

        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg shadow-md mb-8"
        />

        <div className="prose dark:prose-invert prose-lg max-w-none text-black">
          <p className="text-lg text-black font-medium">{post.excerpt}</p>
        </div>

        {/* AUTHOR */}
        <div className="mt-10 flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <img
            src={`https://randomuser.me/api/portraits/women/${Math.floor(
              Math.random() * 100
            )}.jpg`}
            alt="Author"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-800 dark:text-gray-100 font-medium">
              {post.author}
            </p>
            <p className="text-gray-500 text-sm">
              Travel Blogger & Content Creator
            </p>
          </div>
        </div>

        {/* COMMENTS (optional placeholder) */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Comments
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Comments section coming soon...
          </p>
        </div>
      </motion.div>

      {/* SIDEBAR */}
      <div className="lg:w-1/3">
        <div className="sticky top-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Posts
          </h3>
          <ul className="space-y-4 overflow-y-auto min-h-4 max-h-96 scroollbar-thin w-4/5">
            {recentPosts.map(recent => (
              <li key={recent.slug}>
                <Link
                  to={`/blog/${recent.slug}`}
                  className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg hover:shadow transition"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {recent.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {recent.date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
