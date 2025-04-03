import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CreateBlog from "./CreateBlog";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateBlog, setShowCreateBlog] = useState(false);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/blogs/my-blog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8001/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete blog");
      });
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex justify-center items-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#2A3B5C] border-t-transparent rounded-full mx-auto"
          />
          <p className="text-lg mt-4 text-[#6B7280]">Loading blogs...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen md:pl-72 flex flex-col relative bg-[#0B1120] overflow-hidden"
    >
      {/* Futuristic Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3B82F6]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3B82F6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {showCreateBlog ? (
        <div className="relative w-full">
          <button 
            onClick={() => setShowCreateBlog(false)}
            className="absolute top-4 left-4 px-4 py-2 bg-black/60 rounded-lg text-white hover:bg-black/80 transition-colors z-20"
          >
            Back
          </button>
          <CreateBlog />
        </div>
      ) : (
        <div className="w-full p-4 md:p-8 relative z-10">
          {/* Header */}
          <div className="relative mb-8">
            <div className="flex items-center gap-8 p-6">
              <div className="relative">
                <h1 className="text-5xl font-bold text-white tracking-tight">My Blogs</h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="h-1 bg-blue-500 mt-3"
                />
              </div>

              <div className="flex items-center gap-3 px-5 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <span className="text-3xl font-bold text-blue-400">{myBlogs.length}</span>
                <span className="text-gray-400 text-lg">Posts</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myBlogs && myBlogs.length > 0 ? (
              myBlogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative"
                >
                  {/* Main Card */}
                  <div className="bg-[#0c0c0c] rounded-2xl overflow-hidden 
                    group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)] transition-shadow duration-500"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      {blog?.blogImage?.url ? (
                        <div className="h-full w-full">
                          <img
                            src={blog.blogImage.url}
                            alt="Blog"
                            className="w-full h-full object-cover transform duration-700 ease-in-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ) : (
                        <div className="h-full bg-[#111827] flex items-center justify-center">
                          <motion.span 
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-5xl opacity-30"
                          >
                            ✍️
                          </motion.span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-4 py-1.5 bg-blue-500/10 backdrop-blur-sm rounded-lg border border-blue-500/20">
                          <span className="text-sm font-medium text-blue-400">{blog.category}</span>
                        </div>
                      </div>

                      {/* Bottom gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 line-clamp-2 min-h-[3.5rem]">
                        {blog.title}
                      </h3>

                      {/* Blog Actions */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Link
                              to={`/dashboard/blog-likes/${blog._id}`}
                              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              <span>{blog.likes?.length || 0}</span>
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/blog/update/${blog._id}`}
                              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="p-2 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">✍️</div>
                  <p className="text-xl text-blue-400">Start your blogging journey</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MyBlogs;