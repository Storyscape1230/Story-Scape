import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { CardPropTypes } from '../hooks/PropTypes.jsx';

// Add custom styles for 3D effects
const styles = `
  .cards-grid {
    perspective: 1000px;
  }
  
  .card-container {
    position: relative;
    background: #ffffff;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
    will-change: transform;
  }
  
  .image-wrapper {
    position: relative;
    height: 320px;
    overflow: hidden;
    border-radius: 30px 30px 0 0;
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 30px 30px 0 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  
  .category-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #FF0000;
    color: white;
    padding: 6px 12px;
    border-radius: 15px;
    font-weight: 600;
    font-size: 12px;
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
    transform: translateY(0) translateZ(20px);
    z-index: 10;
  }
  
  .content-wrapper {
    padding: 25px;
    background: white;
    border-radius: 0 0 30px 30px;
    transform-style: preserve-3d;
  }
  
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 15px;
    line-height: 1.4;
    transform-style: preserve-3d;
  }
  
  .meta-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #EDF2F7;
    transform-style: preserve-3d;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #718096;
    font-size: 14px;
    transform-style: preserve-3d;
  }
  
  .meta-icon {
    color: #FF6B6B;
  }
`;

function Devotional() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
  
  const devotionalBlogs = blogs?.filter(blog => blog.category === "Devotion")
    .reverse()
    .slice(0, 4);

  const handleBlogClick = (blogId) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/blog/${blogId}`);
  };

  const Card = ({ blog, index }) => {
    const cardRef = useRef(null);
    
    return (
      <motion.div
        ref={cardRef}
        key={blog._id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring" }}
        className="card-container"
        onClick={() => handleBlogClick(blog._id)}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <div className="image-wrapper">
          <img
            src={blog.blogImage.url}
            alt={blog.title}
            loading="eager"
          />
          <div className="category-tag">
            Devotional
          </div>
        </div>
        <div className="content-wrapper">
          <h3 className="title line-clamp-2">
            {blog.title}
          </h3>
          <div className="meta-info">
            <span className="meta-item">
              <svg className="meta-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {blog.adminName}
            </span>
            <span className="meta-item">
              <svg className="meta-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              5 min read
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  Card.propTypes = CardPropTypes;

  return (
    <>
      <style>{styles}</style>
      <div className="py-24 px-6 sm:px-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-rose-100 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="max-w-[80%] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-center mb-20"
          >
            <motion.div 
              className="inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-rose-500 text-lg font-medium tracking-wider uppercase">Daily Inspiration</span>
            </motion.div>
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Spiritual <span className="text-red-500">Nourishment</span>
            </h2>
            <motion.p 
              className="text-black-600 max-w-2xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover uplifting devotionals to nourish your soul and strengthen your faith journey
            </motion.p>
          </motion.div>

          <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {devotionalBlogs?.length > 0 ? (
              devotionalBlogs.map((blog, index) => (
                <Card key={blog._id} blog={blog} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-white rounded-2xl shadow-lg"
              >
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🙏
                </motion.div>
                <h3 className="text-2xl font-bold text-rose-800 mb-3">No Devotionals Yet</h3>
                <p className="text-rose-600 text-lg">Check back soon for inspiring spiritual content</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Devotional;