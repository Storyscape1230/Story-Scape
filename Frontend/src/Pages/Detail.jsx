import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaEye, FaShareAlt, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Join from "../Home/Join";

function Detail() {
  const { id } = useParams();
  const { profile } = useAuth();
  const [blog, setBlog] = useState({});
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [views, setViews] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Unique decorative elements
  const decorativeIcons = ["✍️", "📖", "✨", "🖋️", "🌟"];
  const randomIcon = decorativeIcons[Math.floor(Math.random() * decorativeIcons.length)];

  // Function to check saved status with useCallback to prevent unnecessary recreations
  const checkSavedStatus = useCallback(async () => {
    if (!profile?._id) {
      setSaved(false);
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:8001/api/users/check-saved/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSaved(data.isSaved);
    } catch (error) {
      console.error("Error checking saved status:", error);
      setSaved(false);
    }
  }, [id, profile?._id]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setBlog(data);
        setLikeCount(data.likes?.length || 0);
        setViews(data.views || Math.floor(Math.random() * 1000) + 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  // Check saved status when component mounts and when profile changes
  useEffect(() => {
    checkSavedStatus();
  }, [checkSavedStatus]);

  useEffect(() => {
    if (blog?.likes && profile?._id) {
      setLiked(blog.likes.includes(profile._id));
    } else {
      setLiked(false);
    }
  }, [blog, profile]);

  const handleSave = async () => {
    try {
      if (saved) {
        // Unsave the blog
        await axios.delete(
          `http://localhost:8001/api/users/remove-saved/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setSaved(false);
        toast.success("Blog removed from saved");
      } else {
        // Save the blog
        await axios.put(
          `http://localhost:8001/api/users/save-blog/${id}`,
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setSaved(true);
        toast.success("Blog saved successfully");
      }
    } catch (error) {
      // If error occurs, re-check the actual saved status
      await checkSavedStatus();
      toast.error(error.response?.data?.message || "Error saving blog");
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(
        `http://localhost:8001/api/blogs/like/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
      toast.success(liked ? "Removed like" : "Liked blog");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking blog");
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const shareOnPlatform = (platform) => {
    const url = window.location.href;
    let shareUrl = "";
    const title = blog.title || "Check out this blog post";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
    closeShareModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-amber-50">
      {/* Floating Decorative Elements */}
      <div className="fixed top-20 left-10 text-4xl opacity-10 -z-10">{randomIcon}</div>
      <div className="fixed bottom-1/4 right-16 text-6xl opacity-10 -z-10 rotate-12">✒️</div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto pt-16 pb-24 px-4 relative"
      >
        {/* Creative Header */}
        <div className="relative mb-12">
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          
          <div className="relative">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-red-600 bg-red-100 rounded-full">
              {blog?.category}
            </span>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              {blog?.title}
            </motion.h1>
            
            {/* Unique Reading Stats */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center text-gray-600">
                <FaEye className="mr-2 text-pink-400" />
                <span>{views.toLocaleString()} reads</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center text-gray-600">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span>Active now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Author Card with Creative Touch */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`p-4 mb-10 rounded-xl backdrop-blur-sm bg-white/70 shadow-sm border border-pink-100 relative overflow-hidden ${saved ? 'ring-2 ring-red-300' : ''}`}
        >
          <div className="absolute top-0 right-0 px-3 py-1 bg-red-100 text-red-600 text-xs font-medium">
            {saved ? "Saved Story" : "New Story"}
          </div>
          <div className="flex items-center">
            {blog?.adminPhoto ? (
              <img
                src={blog.adminPhoto}
                alt="author"
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-200 to-pink-300 flex items-center justify-center text-white text-xl font-bold">
                {blog?.adminName?.charAt(0)}
              </div>
            )}
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">{blog?.adminName}</h3>
              <p className="text-sm text-gray-500">Storyteller & Explorer</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image with Creative Frame */}
        {blog?.blogImage?.url && (
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-10 relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-red-100 to-pink-200 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
            <img
              src={blog.blogImage.url}
              alt={blog.title}
              className="relative w-full h-auto rounded-lg object-cover shadow-lg border-4 border-white"
            />
          </motion.div>
        )}

        {/* Content with Creative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="prose prose-lg max-w-none bg-white/80 p-8 rounded-xl shadow-sm backdrop-blur-sm relative"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-200 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-200 rounded-tr-xl"></div>
          
          <div dangerouslySetInnerHTML={{ __html: blog?.about }}></div>
          
          {/* Decorative bottom elements */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-200 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-200 rounded-br-xl"></div>
        </motion.div>

        {/* Interactive Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-between items-center gap-4"
        >
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"}`}
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{likeCount}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${saved ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"}`}
            >
              {saved ? <FaBookmark className="text-red-500" /> : <FaRegBookmark />}
              <span>{saved ? "Saved" : "Save"}</span>
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700"
          >
            <FaShareAlt />
            <span>Share</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full relative"
          >
            <button 
              onClick={closeShareModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            
            <h3 className="text-xl font-bold mb-6 text-center">Share this post</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(66, 103, 178, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => shareOnPlatform("facebook")}
                className="flex items-center justify-start p-3 bg-[#1877F2] rounded-lg text-white transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </div>
                <span className="font-medium">Facebook</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(29, 161, 242, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => shareOnPlatform("twitter")}
                className="flex items-center justify-start p-3 bg-[#1DA1F2] rounded-lg text-white transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </div>
                <span className="font-medium">Twitter</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(37, 211, 102, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => shareOnPlatform("whatsapp")}
                className="flex items-center justify-start p-3 bg-[#25D366] rounded-lg text-white transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="font-medium">WhatsApp</span>
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(10, 102, 194, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => shareOnPlatform("linkedin")}
                className="flex items-center justify-start p-3 bg-[#0A66C2] rounded-lg text-white transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="font-medium">LinkedIn</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Join Section */}
      <div className="mt-16">
        <Join />
      </div>
    </div>
  );
}

export default Detail;