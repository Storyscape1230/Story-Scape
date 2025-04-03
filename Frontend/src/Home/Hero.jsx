import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton';

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Loading Skeleton Component
const BlogCardSkeleton = ({ isMain = false }) => {
  if (isMain) {
    return (
      <div className="bg-gradient-to-gray-150 overflow-hidden transition-all duration-300 group hover:bg-gradient-to-r hover:from-gray-100 h-full rounded-lg">
        <div className="h-[400px] overflow-hidden rounded-lg relative group bg-gray-150 animate-pulse"></div>
        <div className="p-6 bg-gradient-to-gray-150">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-150 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-150 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-150 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-150 rounded animate-pulse"></div>
            <div className="h-4 w-1/4 bg-gray-150 rounded animate-pulse"></div>
            <div className="h-6 w-full bg-gray-150 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-gray-150 overflow-hidden transition-all duration-300 group hover:bg-gradient-to-r hover:from-gray-100 flex-1 rounded-lg">
      <div className="flex flex-col md:flex-row h-full">
        <div className="p-4 md:w-[63%] flex flex-col justify-between bg-gradient-to-gray-150">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-16 bg-gray-150 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-150 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-150 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-3/4 bg-gray-150 rounded animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-150 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-150 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-150 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="md:w-[37%] h-[200px] bg-gray-150 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

BlogCardSkeleton.propTypes = {
  isMain: PropTypes.bool
};

BlogCardSkeleton.defaultProps = {
  isMain: false
};

function Hero() {
  const { blogs } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  
  // Set up a timer to show loading for 2 seconds
  useEffect(() => {
    // Always start with loading state
    setShowLoading(true);
    
    // Set a timer to hide loading after 2 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    
    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount
  
  // Reverse the blogs array to show the newest blog first
  const sortedBlogs = [...(blogs || [])].reverse();

  if (showLoading) {
    return (
      <div className="py-16 px-4">
        <div className="mx-auto w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-1">
              <LoadingSkeleton isMain={true} />
            </div>
            <div className="md:col-span-1 flex flex-col gap-6">
              {[1, 2, 3].map((index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left big blog post */}
          {sortedBlogs.length > 0 && (
            <div className="md:col-span-1">
              <div className="rounded-xl overflow-hidden transition-all h-full group">
                <div className="h-[400px] overflow-hidden rounded-lg relative">
                  <Link to={`/blog/${sortedBlogs[0]._id}`}>
                    <img
                      alt="Main blog image"
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                      src={sortedBlogs[0].blogImage.url}
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      alt="Author's profile picture"
                      className="w-10 h-10 rounded-full mr-3"
                      src={sortedBlogs[0].adminPhoto}
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {sortedBlogs[0].adminName}
                      </p>
                      <p className="text-sm text-gray-500">Author</p>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold mb-2 text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 min-h-[4rem]">
                    <Link to={`/blog/${sortedBlogs[0]._id}`}>
                      {sortedBlogs[0].title}
                    </Link>
                  </h1>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="text-rose-600">
                      {sortedBlogs[0].category}
                    </span>
                    <span className="mx-2">|</span>
                    <span>6 minute read</span>
                  </div>
                  <p className="text-xl text-gray-600 line-clamp-2">
                    {stripHtmlTags(sortedBlogs[0].about)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right-side smaller blog cards */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {sortedBlogs.slice(1, 4).map((blog) => (
              <div
                key={blog._id}
                className="rounded-xl overflow-hidden transition-all flex-1 group"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="p-4 md:w-[63%] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-rose-600 text-sm">
                          {blog.category}
                        </span>
                        <span className="mx-2 text-gray-500 text-sm">|</span>
                        <span className="text-gray-500 text-sm">
                          6 min read
                        </span>
                      </div>
                      <Link to={`/blog/${blog._id}`}>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-rose-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 text-sm line-clamp-4">
                        {stripHtmlTags(blog.about)}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="md:w-[37%] h-[210px] overflow-hidden rounded-lg relative group"
                  >
                    <img
                      alt="Blog image"
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                      src={blog.blogImage.url}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;