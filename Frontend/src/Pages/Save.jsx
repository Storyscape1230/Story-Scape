import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Save() {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    setSavedBlogs(blogs);
  }, []);

  const handleRemove = (id) => {
    const updatedBlogs = savedBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem("savedBlogs", JSON.stringify(updatedBlogs));
    setSavedBlogs(updatedBlogs);
  };

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-roboto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Saved Blogs</h1>
      {savedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-blue-100 transition flex flex-col items-center transform duration-300"
              onClick={() => handleBlogClick(blog.id)}
            >
              {blog.blogImage?.url && (
                <motion.img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-40 h-40 object-cover rounded-lg shadow-sm"
                  whileHover={{ scale: 1.1 }}
                />
              )}
              <h2 className="text-md font-semibold text-gray-900 mt-2 text-center">{blog.title}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(blog.id);
                }}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-md">No saved blogs found</p>
      )}
    </div>
  );
}

export default Save;