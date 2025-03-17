import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  if (!blogs || blogs.length < 5) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Blog (80% width on large screens) */}
        <Link
          to={`/blog/${blogs[0]._id}`}
          className="lg:w-4/5 relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <img
            src={blogs[0].blogImage.url}
            alt={blogs[0].title}
            className="w-full h-[500px] object-cover"
          />
          {/* Author overlay at the top */}
          <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 p-2 rounded-full">
            <img
              src={blogs[0].adminPhoto}
              alt={blogs[0].adminName}
              className="w-10 h-10 rounded-full border-2 border-yellow-400"
            />
            <span className="ml-2 text-white font-semibold">
              {blogs[0].adminName}
            </span>
          </div>
          {/* Blog title overlay at the bottom */}
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-4xl font-bold hover:text-yellow-400 transition duration-300">
              {blogs[0].title}
            </h1>
          </div>
        </Link>

        {/* Vertical list of blogs (20% width on large screens) */}
        <div className="lg:w-1/5 flex flex-col gap-6">
          {blogs.slice(1, 5).map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={blog.blogImage.url}
                alt={blog.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 hover:text-yellow-500 transition duration-300">
                  {blog.title}
                </h2>
                <div className="flex items-center mt-2">
                  <img
                    src={blog.adminPhoto}
                    alt={blog.adminName}
                    className="w-8 h-8 rounded-full border-2 border-yellow-400"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {blog.adminName}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
