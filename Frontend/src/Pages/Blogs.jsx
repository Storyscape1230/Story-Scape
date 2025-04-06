import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DecorativeElements from "../components/DecorativeElements";

// Loading Skeleton Component
const BlogCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        {/* Image Skeleton */}
        <div className="relative h-80 overflow-hidden">
          <div className="w-full h-full bg-gray-100 animate-pulse relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent"></div>
        </div>

        {/* Content Skeleton */}
        <div className="relative -mt-12 mx-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          {/* Category Badge Skeleton */}
          <div className="absolute -top-4 left-6">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>

          {/* Title Skeleton */}
          <div className="mt-2 space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>

          {/* Bottom Section Skeleton */}
          <div className="flex items-center justify-between mt-6">
            <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Blogs() {
  const { blogs } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLoading, setShowLoading] = useState(true);

  // Set up a timer to show loading for 1.5 seconds
  useEffect(() => {
    // Always start with loading state
    setShowLoading(true);
    
    // Preload images in the background
    if (blogs && blogs.length > 0) {
      const imagePromises = blogs.map(blog => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = blog.blogImage.url;
          img.onload = resolve;
          img.onerror = resolve; // Resolve even on error to not block loading
        });
      });
      
      // Wait for all images to load or timeout after 1.5 seconds
      Promise.race([
        Promise.all(imagePromises),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]).then(() => {
        setShowLoading(false);
      });
    } else {
      // If no blogs, just wait 1.5 seconds
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [blogs]); // Re-run when blogs change

  // Use blogs directly without reversing
  const sortedBlogs = blogs ? [...blogs].reverse() : [];

  // Predefined categories matching CreateBlog.jsx
  const predefinedCategories = [
    "All",
    "Education",
    "News",
    "Olympics",
    "Business",
    "Devotion",
    "Travel"
  ];

  // Use only predefined categories
  const categories = predefinedCategories;

  // Filter blogs by selected category
  const filteredBlogs = selectedCategory === "All" 
    ? sortedBlogs 
    : sortedBlogs?.filter(blog => blog.category === selectedCategory);

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const words = text.split(' ').length;
    return Math.ceil(words / 200); // 200 words per minute
  };

  // Helper function to format category text
  const formatCategory = (category) => {
    if (!category) return '';
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 py-8 px-4">
      <DecorativeElements />
      <div className="max-w-[90%] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Our <span className="text-red-500">Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base text-gray-600 max-w-2xl mx-auto"
          >
            Discover stories that inspire and captivate
          </motion.p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div 
          className="mb-12 overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex space-x-2 pb-2 px-1">
            {categories?.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-rose-600 text-white shadow-md"
                    : "bg-white text-rose-700 hover:bg-rose-100"
                }`}
              >
                {formatCategory(category)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {showLoading ? (
            // Loading skeletons
            [...Array(8)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="relative group perspective-1000"
              >
                <Link to={`/blog/${blog._id}`}>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Mind-blowing Layout Container */}
                    <div className="relative">
                      {/* Image Section with Creative Effects */}
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={blog.blogImage.url}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
                        
                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/20 to-transparent rounded-full blur-xl transform -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-500/20 to-transparent rounded-full blur-xl transform translate-y-16 -translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Content Section with Creative Layout */}
                      <div className="relative -mt-12 mx-4 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                        {/* Category Badge with Enhanced Style */}
                        <div className="absolute -top-4 left-6">
                          <span className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-bold rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                            {formatCategory(blog.category)}
                          </span>
                        </div>

                        {/* Title with Enhanced Typography */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-rose-600 transition-colors mt-2">
                          {blog.title}
                        </h2>

                        {/* Bottom Section with Enhanced Layout */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-rose-500 text-sm bg-rose-50/50 px-4 py-2 rounded-full">
                            <svg className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {calculateReadingTime(blog.about)} min read
                          </div>
                          {index < 3 && (
                            <span className="px-4 py-2 bg-gradient-to-r from-rose-100 to-rose-50 text-rose-600 text-sm font-bold rounded-full shadow-sm">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-5xl text-rose-300 mb-4">📭</div>
              <p className="text-rose-600 text-lg">
                {selectedCategory === "All" 
                  ? "No stories available yet. Check back soon!"
                  : `No stories found in ${selectedCategory} category`}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;