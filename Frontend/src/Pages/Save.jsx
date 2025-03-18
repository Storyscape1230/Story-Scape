import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Save() {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth(); // Get auth token

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:8001/api/users/saved-blogs", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setSavedBlogs(data);
      } catch (error) {
        console.log("Error fetching saved blogs:", error);
      }
    };
    fetchSavedBlogs();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8001/api/users/remove-saved/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setSavedBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error removing saved blog:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-roboto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Saved Blogs</h1>
      {savedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              {blog.blogImage?.url && (
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="text-center">
                <h1 className="text-sm font-semibold text-gray-600">{blog.adminName}</h1>
                <h2 className="text-lg font-bold text-gray-900 mt-2">{blog.title}</h2>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(blog._id);
                }}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">No saved blogs found</p>
      )}
    </div>
  );
}

export default Save;