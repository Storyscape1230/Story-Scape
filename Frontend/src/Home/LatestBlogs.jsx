import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LatestBlogs() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
  const latestBlogs = blogs ? [...blogs].reverse().slice(0, 4) : [];

  const handleBlogClick = (blogId) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="bg-white py-20 px-6 sm:px-8">
      <div className="w-[85%] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4">Latest Blogs</h2>
          <p className="text-rose-600 max-w-2xl mx-auto text-lg">
            Explore our latest articles and stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {latestBlogs?.length > 0 ? (
            latestBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white overflow-hidden cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:rounded-2xl group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-2 min-h-[3.5rem]">
                    {blog.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {blog.adminName}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
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
              className="col-span-full text-center py-16"
            >
              <div className="text-5xl text-rose-300 mb-6">📝</div>
              <p className="text-rose-600 text-lg">No blogs available yet</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LatestBlogs;