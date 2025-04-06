import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

function Trending() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
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

  const sortedBlogs = blogs 
    ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
    : [];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 0
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 0
    },
    tablet: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      partialVisibilityGutter: 0
    }
  };

  const handleBlogClick = (blogId) => {
    window.scrollTo(0, 0);
    navigate(`/blog/${blogId}`);
  };

  if (showLoading) {
    return (
      <div className="py-20 px-6 sm:px-8">
        <div className="max-w-[90%] mx-auto">
          <div className="w-full">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={false}
              keyBoardControl={true}
              transitionDuration={500}
              removeArrowOnDeviceType={[]}
              className="pb-8"
              containerClass="carousel-container"
              itemClass="carousel-item"
              partialVisible={false}
            >
              {[1, 2, 3, 4, 5].map((index) => (
                <motion.div 
                  key={index} 
                  className="h-full px-2"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden h-[60vh] relative">
                    <div className="absolute inset-0 overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="h-6 w-24 bg-gray-300 rounded-full animate-pulse relative mb-4">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                      <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse relative mb-4">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                      <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse relative">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                </motion.div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 sm:px-8">
      <div className="max-w-[90%] mx-auto">
        <div className="w-full">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            transitionDuration={500}
            removeArrowOnDeviceType={[]}
            className="pb-8"
            containerClass="carousel-container"
            itemClass="carousel-item"
            partialVisible={false}
          >
            {sortedBlogs.length > 0 ? (
              sortedBlogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="h-full cursor-pointer px-2"
                  onClick={() => handleBlogClick(blog._id)}
                >
                  <div className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-[60vh] relative group">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={blog.blogImage.url}
                        alt={blog.title}
                        className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md inline-block mb-4">
                        {blog.category}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 line-clamp-2">
                        {blog.title}
                      </h2>
                      <div className="flex items-center text-white text-sm">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {blog.adminName}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl text-rose-300 mb-6">📊</div>
                <p className="text-rose-600 text-lg">No trending posts available yet</p>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Trending;