import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from "react-icons/fa";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBlogs(data);
        setLikeCount(data.likes || 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    setSaved(savedBlogs.some((blog) => blog.id === id));

    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    setLiked(likedBlogs.includes(id));
  }, [id]);

  const handleSave = () => {
    let savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];

    if (saved) {
      savedBlogs = savedBlogs.filter((blog) => blog.id !== id);
      setMessage("Blog Removed!");
    } else {
      savedBlogs.push({ id, title: blogs.title, blogImage: blogs.blogImage });
      setMessage("Blog Saved!");
    }

    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
    setSaved(!saved);

    setTimeout(() => setMessage(""), 2000);
  };

  const handleLike = () => {
    let likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];

    if (!liked) {
      setLikeCount((prev) => prev + 1);
      likedBlogs.push(id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
      setLiked(true);
    } else {
      setLikeCount((prev) => Math.max(prev - 1, 0));
      likedBlogs = likedBlogs.filter((blogId) => blogId !== id);
      localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
      setLiked(false);
    }
  };

  return (
    <div className="font-roboto relative">
      {message && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out animate-fade">
          {message}
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 relative">
        <div className="absolute top-16 right-4 text-2xl flex items-center space-x-4 mt-[52px]">
          <button
            className={`text-black-500 transition-all duration-300 ${liked ? "text-red-600" : "text-gray-600"}`}
            onClick={handleLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span className="text-black-700 "  >{likeCount}</span>
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
    </div>
  );
}

export default Detail;