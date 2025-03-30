import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      className="min-h-screen md:ml-64 flex flex-col relative overflow-hidden"
    >
      {/* Galaxy Background */}
      <div className="absolute inset-0 bg-[#0A0F1C]/90">
        {/* Stars Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-white rounded-full top-[10%] left-[20%] animate-twinkle"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[30%] left-[40%] animate-twinkle animation-delay-200"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[50%] left-[60%] animate-twinkle animation-delay-400"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[70%] left-[80%] animate-twinkle animation-delay-600"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[20%] left-[70%] animate-twinkle animation-delay-800"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[40%] left-[30%] animate-twinkle animation-delay-1000"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[60%] left-[90%] animate-twinkle animation-delay-1200"></div>
          <div className="absolute w-1 h-1 bg-white rounded-full top-[80%] left-[10%] animate-twinkle animation-delay-1400"></div>
        </div>
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      </div>

      <div className="w-full p-4 md:p-8 space-y-8 relative z-10">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-[#E5E7EB]"
        >
          My Blogs
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Card Container */}
                <div className="relative bg-[#0D1425] rounded-[2.5rem] overflow-hidden">
                  {/* Border Effect */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-[1px] bg-[#0D1425] rounded-[2.4rem]" />
                  
                  <div className="relative p-6">
                    {/* Blog Image */}
                    <div className="relative rounded-[1.5rem] overflow-hidden mb-4">
                      {blog?.blogImage?.url ? (
                        <img
                          src={blog.blogImage.url}
                          alt="blogImg"
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-[#2A3B5C] flex items-center justify-center">
                          <p className="text-[#6B7280]">No image available</p>
                        </div>
                      )}
                    </div>

                    {/* Blog Info */}
                    <div className="space-y-4">
                      <span className="inline-block bg-[#2A3B5C] text-[#60A5FA] px-3 py-1 rounded-full text-sm font-medium">
                        {blog.category}
                      </span>
                      <h4 className="text-xl font-semibold text-[#E5E7EB] line-clamp-2">
                        {blog.title}
                      </h4>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Link
                            to={`/blog/update/${blog._id}`}
                            className="block w-full px-4 py-2 bg-[#2A3B5C] text-[#60A5FA] rounded-[1rem] text-center font-medium hover:bg-[#1E3A8A] transition duration-300 border border-[#2A3B5C]"
                          >
                            UPDATE
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="w-full px-4 py-2 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-[1rem] text-center font-medium hover:bg-[#FF6B6B]/30 transition duration-300 border border-[#FF6B6B]/30"
                          >
                            DELETE
                          </button>
                        </motion.div>
                      </div>
                    </div>
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
              <p className="text-[#6B7280] text-xl">
                You have not posted any blog to see!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MyBlogs;