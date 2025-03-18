// blogs.jsx
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();

  // Sort blogs by upload date in descending order (newest first)
  const sortedBlogs = blogs?.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  // Reverse the sorted array to make the first blog last and the last blog first
  const reversedBlogs = sortedBlogs?.reverse();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          All Blogs
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          The concept of gods varies widely across different cultures, religions, and belief systems.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {reversedBlogs && reversedBlogs.length > 0 ? (
            reversedBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-xl font-bold">{blog?.title}</h2>
                  <p className="text-sm font-medium text-gray-300">{blog?.category}</p>
                </div>
                {/* Show "New" badge only for the first 5 blogs */}
                {index < 5 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      New
                    </span>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-600">No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;