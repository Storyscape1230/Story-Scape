import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

function BlogLikes() {
  const { blogId } = useParams();
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/likes/${blogId}`,
          {
            withCredentials: true,
          }
        );
        setLikes(data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
        toast.error("Failed to load likes information");
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F43F5E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E293B]/70 backdrop-blur-lg rounded-2xl border border-[#334155] shadow-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FaHeart className="text-[#F43F5E] text-2xl" />
            <h1 className="text-2xl font-bold text-[#E2E8F0]">
              Blog Likes ({likes.length})
            </h1>
          </div>

          {likes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#94A3B8] text-lg">No likes yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {likes.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-[#1E293B] p-4 rounded-xl border border-[#334155]"
                >
                  <img
                    src={user.photo.url}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-[#E2E8F0] font-medium">{user.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default BlogLikes; 