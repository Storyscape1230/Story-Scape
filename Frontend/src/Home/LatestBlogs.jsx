import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

function LatestBlogs() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
  const latestBlogs = blogs ? [...blogs].reverse().slice(0, 4) : [];

  const handleBlogClick = (blogId) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="py-20 px-6 sm:px-8">
      <div className="w-[85%] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-between items-center mb-16"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-rose-800 mb-4 flex items-center gap-2">
              Latest Blogs
              <span className="text-2xl">✨</span>
            </h2>
            <p className="text-black-600 text-lg">
              Explore our latest articles and stories
            </p>
          </div>
          <Link
            to="/blogs"
            className="group relative inline-flex items-center px-6 py-3 font-medium overflow-hidden rounded-full"
          >
            <span className="relative z-10 text-rose-600 group-hover:text-white transition-colors duration-500">
              View All
              <svg
                className="w-5 h-5 ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <span className="absolute -left-32 top-0 h-full w-32 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 transform skew-x-[30deg] group-hover:left-full transition-all duration-1000 ease-out"></span>
            <span className="absolute inset-0 border-2 border-rose-600 rounded-full"></span>
            <span className="absolute inset-0 rounded-full bg-rose-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {latestBlogs?.length > 0 ? (
            latestBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                {/* Blog Card */}
                <div className="relative">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] mb-4">
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-all duration-300"
                    />
                    {/* Category Badge */}
                    <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-rose-600 text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Admin Info */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={
                            blog.adminPhoto || "https://via.placeholder.com/40"
                          }
                          alt={blog.adminName}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-rose-100"
                        />
                      </div>
                      <div className="flex items-center divide-x divide-gray-300 text-sm">
                        <span className="font-medium text-gray-900 pr-3">
                          {blog.adminName}
                        </span>
                        <div className="flex items-center text-gray-500 pl-3">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          5 min read
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-black-800 group-hover:text-rose-600 transition-colors line-clamp-2 h-14 leading-7">
                      {blog.title}
                    </h3>
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
