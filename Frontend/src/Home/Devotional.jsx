import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function Devotional() {
  const { blogs } = useAuth();
  const [devotionalBlogs, setDevotionalBlogs] = useState([]);

  // Filter and sort devotional blogs by their order in the array (newest last)
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const filteredBlogs = blogs.filter((blog) => blog.category === "Devotion");
      // Assume the last blog in the array is the newest
      const sortedBlogs = [...filteredBlogs].reverse(); // Reverse to show newest first
      setDevotionalBlogs(sortedBlogs.slice(0, 4)); // Show only the first 4 blogs
    }
  }, [blogs]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Devotional</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the divine and spiritual insights through our collection of devotional blogs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <Link to={`/blog/${blog._id}`} className="block">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {stripHtmlTags(blog.about)} {/* Render plain text */}
                    </p>
                    <div className="flex items-center mt-4">
                      <img
                        src={blog.adminPhoto}
                        alt={blog.adminName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-700">{blog.adminName}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 col-span-full">No devotional blogs found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;