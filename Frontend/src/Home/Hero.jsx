import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function NewsPage() {
  const { blogs } = useAuth();

  if (!blogs || blogs.length < 4) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  // Reverse the blogs array to show the newest blog first
  const sortedBlogs = [...blogs].reverse();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-12">
      <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left big blog post */}
          <div className="md:col-span-1">
            <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50">
              <Link to={`/blog/${sortedBlogs[0]._id}`}>
                <img
                  alt="Main blog image"
                  className="w-full h-96 object-cover"
                  src={sortedBlogs[0].blogImage.url}
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    alt="Author's profile picture"
                    className="w-10 h-10 rounded-full mr-3"
                    src={sortedBlogs[0].adminPhoto}
                  />
                  <div>
                    <p className="text-sm font-semibold">{sortedBlogs[0].adminName}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                  <Link to={`/blog/${sortedBlogs[0]._id}`}>{sortedBlogs[0].title}</Link>
                </h1>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="text-red-500">{sortedBlogs[0].category}</span>
                  <span className="mx-2">|</span>
                  <span>6 minute read</span>
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {stripHtmlTags(sortedBlogs[0].about)} {/* Render plain text */}
                </p>
              </div>
            </div>
          </div>

          {/* Right-side smaller blog cards */}
          <div className="md:col-span-1 space-y-6">
            {sortedBlogs.slice(1, 4).map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Content on the left (65% width) */}
                  <div className="p-6 md:w-[65%]">
                    <div className="flex items-center mb-2">
                      <span className="text-red-500 text-sm">{blog.category}</span>
                      <span className="mx-2 text-gray-500 text-sm">|</span>
                      <span className="text-gray-500 text-sm">6 min read</span>
                    </div>
                    <Link to={`/blog/${blog._id}`}>
                      <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-4">
                      {stripHtmlTags(blog.about)} {/* Render plain text */}
                    </p>
                  </div>

                  {/* Image on the right (35% width) */}
                  <Link to={`/blog/${blog._id}`} className="md:w-[35%]">
                    <img
                      alt="Blog image"
                      className="w-full h-48 md:h-full object-cover"
                      src={blog.blogImage.url}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;