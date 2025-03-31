import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Blogs() {
  const { blogs } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reverse the order of blogs (first blog last, last blog first)
  const sortedBlogs = blogs ? [...blogs].reverse() : [];

  // Get all unique categories
  const categories = ["All", ...new Set(blogs?.map(blog => blog.category))];

  // Filter blogs by selected category
  const filteredBlogs = selectedCategory === "All" 
    ? sortedBlogs 
    : sortedBlogs?.filter(blog => blog.category === selectedCategory);

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const words = text.split(' ').length;
    return Math.ceil(words / 200); // 200 words per minute
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogs && filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <Link to={`/blog/${blog._id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.blogImage.url}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {index < 3 && (
                        <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="p-5 flex-grow">
                      <h2 className="text-xl font-semibold text-rose-800 mb-2 line-clamp-2">
                        {blog.title}
                      </h2>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium px-3 py-1 bg-rose-100 text-rose-700 rounded-full">
                          {blog.category}
                        </span>
                        <span className="flex items-center text-xs text-rose-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {calculateReadingTime(blog.about)} min read
                        </span>
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