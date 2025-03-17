import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Trending</h1>
        <Carousel responsive={responsive}>
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 6).map((blog) => (
              <div key={blog._id} className="p-3">
                <Link to={`/blog/${blog._id}`}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{blog.title}</h2>
                      <p className="text-gray-600 text-sm">{blog.category}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">Loading...</div>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;