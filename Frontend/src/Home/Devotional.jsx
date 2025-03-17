import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Devotional</h1>
        <p className="text-center text-gray-600 mb-8">
          The concept of gods varies widely across different cultures, religions, and belief systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={blog.blogImage.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                  <p className="text-gray-600 text-sm">{blog.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-600">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devotional;