import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Hero() {
  const { blogs } = useAuth();

  if (!blogs || blogs.length < 4) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 h-screen flex items-center justify-center">
      {/* Main Blog Slider (70% width, 80vh height, 50px below navbar, and 60px margin-bottom) */}
      <div className="w-[70%] h-[80vh] mt-[50px] mb-[60px] relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true} // Enable looping
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full rounded-lg"
        >
          {blogs.slice(0, 4).map((blog) => (
            <SwiperSlide key={blog._id}>
              <Link to={`/blog/${blog._id}`}>
                <img
                  alt="Main blog image"
                  className="w-full h-full object-cover rounded-lg"
                  src={blog.blogImage.url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center mb-4">
                    <img
                      alt="Author's profile picture"
                      className="w-12 h-12 rounded-full mr-3"
                      src={blog.adminPhoto}
                    />
                    <div>
                      <p className="text-sm font-semibold">{blog.adminName}</p>
                      <p className="text-sm text-gray-300">Author</p>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
                  <div className="flex items-center text-sm text-gray-300 mb-4">
                    <span className="text-red-500">{blog.category}</span>
                    <span className="mx-2">|</span>
                    <span>6 minute read</span>
                  </div>
                  <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Read More
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* Simple Navigation Arrows */}
          <div className="swiper-button-next !text-white !text-2xl">
            &#10095;
          </div>
          <div className="swiper-button-prev !text-white !text-2xl">
            &#10094;
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;