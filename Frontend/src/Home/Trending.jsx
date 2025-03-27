import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom"; // Replace Link with useNavigate
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 768, min: 0 },
      items: 1
    }
  };

  const sortedBlogs = blogs 
    ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
    : [];

  // Function to handle blog click
  const handleBlogClick = (blogId) => {
    window.scrollTo(0, 0); // Scroll to top before navigation
    navigate(`/blog/${blogId}`); // Navigate to blog
  };

  return (
    <div className="bg-gradient-to-red from-purple-50 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl text-rose-800 md:text-4xl font-bold text-center mb-8">Trending</h1>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog) => (
              <div 
                key={blog._id} 
                className="p-2 h-full cursor-pointer" // Add cursor-pointer
                onClick={() => handleBlogClick(blog._id)} // Handle click
              >
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-[60vh] relative group">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={blog.blogImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-2xl font-semibold text-white">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-300 mt-2">
                      {blog.category}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 text-lg">Loading...</div>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;