import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
  const devotionalBlogs = blogs?.filter(blog => blog.category === "Devotion").reverse().slice(0, 4);

  const handleBlogClick = (blogId) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="bg-gradient-to-red to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-rose-800 mb-3">Spiritual Nourishment</h2>
          <p className="text-rose-600 max-w-2xl mx-auto">
            Uplifting devotionals to nourish your soul
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {devotionalBlogs?.length > 0 ? (
            devotionalBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 text-rose-700 px-3 py-1 rounded-full text-xs font-medium">
                    Devotional
                  </div>
                </div>
                <div className="p-5 bg-white"> {/* Added bg-white here for clarity */}
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2"> {/* Changed to text-black */}
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500"> {/* Changed to text-gray-500 */}
                    <span>{blog.adminName}</span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      5 min read
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-5xl text-rose-300 mb-4">🙏</div>
              <p className="text-rose-600">No devotionals available yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;