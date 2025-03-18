import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import Join from "../Home/Join";

function Detail() {
  const { id } = useParams();
  const { profile } = useAuth();
  const [blogs, setBlogs] = useState({});
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setBlogs(data);
        setLikeCount(data.likes.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  // ✅ Use useEffect to update 'saved' state when profile is loaded
  useEffect(() => {
    if (profile && profile.saved) {
      setSaved(profile.saved.includes(id));
    }
  }, [profile, id, blogs]);


  useEffect(() => {
    if (blogs?.likes && profile?._id) {
      setLiked(blogs.likes.includes(profile._id));
    }
  }, [blogs, profile]);

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8001/api/users/save-blog/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSaved(!saved);
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8001/api/blogs/like/${id}`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setBlogs(data.blog); // Update the blog state first
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  return (
    <div className="font-roboto relative">
      

      <div className="max-w-4xl mx-auto p-4 relative">
        <div className="absolute top-16 right-4 text-2xl flex items-center space-x-4 mt-[52px]">
          <button
            className={`text-black-500 transition-all duration-300 ${liked ? "text-red-600" : "text-gray-600"}`}
            onClick={handleLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span className="text-black-700">{likeCount}</span>
          <button
            className="text-gray-600 transition-all duration-300"
            onClick={handleSave}
          >
            {saved ? <FaBookmark className="text-grey-600" /> : <FaRegBookmark />}
          </button>
        </div>

        <p className="text-gray-700 text-sm uppercase">{blogs?.category}</p>
        <h1 className="text-4xl font-bold mt-2">{blogs?.title}</h1>

        <div className="flex items-start mt-4">
          <img
            src={blogs?.adminPhoto}
            alt="author_avatar"
            className="w-12 h-12 rounded-lg mr-4"
          />
          <div>
            <p className="text-xs text-gray-500">Author</p>
            <p className="text-sm font-semibold mt-1">{blogs?.adminName}</p>
          </div>
        </div>

        {blogs?.blogImage?.url ? (
          <img
            src={blogs.blogImage.url}
            alt="mainblogsImg"
            className="w-full mt-4 rounded-lg shadow-lg"
            height="400"
          />
        ) : (
          <p className="text-gray-500 mt-4">No image available</p>
        )}

        <div
          className="text-gray-700 mt-6"
          dangerouslySetInnerHTML={{ __html: blogs?.about }}
        ></div>
        
      </div>
      <div>
        <Join />
        </div>
    </div>
  );
}

export default Detail;
