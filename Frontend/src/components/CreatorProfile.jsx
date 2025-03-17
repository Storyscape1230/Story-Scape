import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CreatorProfile() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreatorAndBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/blogs/creator/${creatorId}`,
          { withCredentials: true }
        );

        if (!response.data || !response.data.creator || !response.data.blogs) {
          setError("Invalid data received");
          setCreator(null);
          setBlogs([]);
          return;
        }

        setCreator(response.data.creator);
        setBlogs(response.data.blogs);
        setError(null); // Clear any previous errors
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Creator not found or has not created any blogs yet.");
        } else {
          setError("Error fetching creator profile and blogs. Please try again later.");
        }
        setCreator(null);
        setBlogs([]);
      }
    };

    fetchCreatorAndBlogs();
  }, [creatorId]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`); // Redirect to the single blog page
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800">Creator blog not created</h1>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <img
            src={creator.photo.url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-700"
          />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{creator.name}</h1>
          <p className="text-gray-600">{creator.email}</p>
          <p className="text-gray-600">{creator.phone}</p>
          <p className="text-gray-600">{creator.role}</p>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Blogs by {creator.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleBlogClick(blog._id)} // Add click handler
            >
              <img
                src={blog.blogImage.url}
                alt="blog"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2">{blog.category}</p>
                <div
                  className="text-gray-600 mt-2 line-clamp-4" // Add line-clamp-4 for truncation
                  dangerouslySetInnerHTML={{ __html: blog.about }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;