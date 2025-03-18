import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

function Trending() {
  const { blogs } = useAuth();
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      // Sort blogs by creation date to show the latest first
      const sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTrendingBlogs(sortedBlogs.slice(0, 6));
    }
  }, [blogs]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2, // Show 2 blogs
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2, // Show 2 blogs
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // Show 2 blogs
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Show 1 blog on mobile
    },
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Trending</h1>
        <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
          {trendingBlogs.length > 0 ? (
            trendingBlogs.map((blog) => (
              <div key={blog._id} className="p-2">
                <Link to={`/blog/${blog._id}`}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 overflow-hidden h-[60vh] relative">
                    {/* Image covering the full card */}
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 hover:scale-105"
                    />

                    {/* Text container at the bottom-left */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h2 className="text-2xl font-semibold text-white">
                        <span className="inline-block transition-all duration-300 hover:translate-x-1">
                          {blog.title}
                        </span>
                      </h2>
                      <p className="text-sm text-gray-300 mt-2">
                        <span className="inline-block transition-all duration-300 hover:translate-x-1">
                          {blog.category}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg">Loading...</div>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;