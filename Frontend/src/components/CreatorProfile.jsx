import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreatorProfile() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const fetchCreatorAndBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/blogs/creator/${creatorId}`,
          { withCredentials: true }
        );

        if (response.data?.creator && response.data?.blogs) {
          setCreator(response.data.creator);
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching creator profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorAndBlogs();
  }, [creatorId]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const togglePhone = () => {
    setShowPhone(!showPhone);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full"
        />
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-rose-700 mb-4">Creator Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-rose-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Creator Header - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-rose-200 rounded-full opacity-30 blur-lg" />
            <img
              src={creator.photo.url}
              alt={creator.name}
              className="relative w-32 h-32 rounded-full border-4 border-white object-cover z-10"
            />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-rose-800">{creator.name}</h1>
            <p className="text-rose-600 max-w-2xl mx-auto">
              {creator.bio || "Content creator sharing stories and ideas."}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-1.5 bg-white text-rose-700 rounded-full text-sm font-medium shadow-sm">
                {creator.role}
              </span>
              <button
                onClick={togglePhone}
                className="px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-sm font-medium hover:bg-rose-200 transition-colors"
              >
                {showPhone ? (creator.phone || "No phone provided") : "Contact"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section - Simplified */}
        {blogs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center min-w-[150px]">
                <p className="text-sm text-rose-500 mb-1">Total Stories</p>
                <p className="text-3xl font-bold text-rose-700">{blogs.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center min-w-[150px]">
                <p className="text-sm text-rose-500 mb-1">Categories</p>
                <p className="text-3xl font-bold text-rose-700">
                  {new Set(blogs.map(blog => blog.category)).size}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-rose-800 mb-8">
            {blogs.length > 0 ? 'Latest Stories' : 'No Stories Yet'}
          </h2>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleBlogClick(blog._id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 bg-white text-rose-700 px-3 py-1 rounded-full text-xs font-medium shadow">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-rose-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div
                      className="text-rose-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.about }}
                    />
                    <div className="flex items-center justify-end text-xs text-rose-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {Math.ceil(blog.about.split(' ').length / 200)} min read
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl text-rose-300 mb-4">📝</div>
              <p className="text-rose-600">
                {creator.name} hasn t published any stories yet.
              </p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

export default CreatorProfile;