import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Save() {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/users/saved-blogs",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setSavedBlogs(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching saved blogs:", error);
        setLoading(false);
      }
    };
    fetchSavedBlogs();
  }, [token]);

  const handleRemove = async (id, e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.delete(
        `http://localhost:8001/api/users/remove-saved/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSavedBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing blog");
      console.log("Error removing saved blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-pink-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Your Saved <span className="text-red-500">Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base text-gray-600 max-w-2xl mx-auto"
          >
            All the stories you've saved for later reading in one place
          </motion.p>
        </div>

        {/* Saved Blogs Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-pulse text-gray-500">
              Loading your saved stories...
            </div>
          </div>
        ) : savedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-red-400 cursor-pointer"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                {blog.blogImage?.url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                        {blog.category}
                      </h3>
                      <h2 className="text-xl font-bold text-gray-800 mt-1 line-clamp-2">
                        {blog.title}
                      </h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleRemove(blog._id, e)}
                      className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
                      aria-label="Remove from saved"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      {blog.adminPhoto ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={blog.adminPhoto}
                          alt={blog.adminName}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                          {blog.adminName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        {blog.adminName}
                      </p>
                      <p className="text-xs font-extralight text-gray-700">
                        Auther
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white p-8 rounded-2xl shadow-sm max-w-md mx-auto"
          >
            <div className="text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No saved stories yet
            </h3>
            <p className="text-gray-500">
              When you save stories, they ll appear here for easy access.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Explore Stories
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Save;
