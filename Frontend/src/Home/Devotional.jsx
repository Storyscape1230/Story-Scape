import { useAuth } from "../context/AuthProvider";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FloatingCrossPropTypes, CardPropTypes } from './PropTypes';

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
    transition: all 0.5s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
    will-change: transform;
  }
  
  .card-container:hover {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  .card-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 2;
  }
  
  .card-container:hover::before {
    opacity: 1;
  }
  
  .image-wrapper {
    position: relative;
    height: 320px;
    overflow: hidden;
    border-radius: 30px 30px 0 0;
    transform-style: preserve-3d;
  }
  
  .image-wrapper::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .card-container:hover .image-wrapper::after {
    opacity: 1;
  }
  
  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1s ease;
    border-radius: 30px 30px 0 0;
    transform-style: preserve-3d;
  }
  
  .card-container:hover .image-wrapper img {
    transform: scale(1.1);
  }
  
  .category-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
    transform: translateY(0) translateZ(20px);
    transition: all 0.5s ease;
    z-index: 10;
  }
  
  .card-container:hover .category-tag {
    transform: translateY(-5px) translateZ(30px);
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
    transition: color 0.3s ease;
    transform-style: preserve-3d;
  }
  
  .card-container:hover .title {
    color: #FF6B6B;
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
  
  .floating-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 1;
  }
  
  .floating-icon {
    position: absolute;
    opacity: 0.1;
    transition: all 1s ease;
  }
  
  .card-container:hover .floating-icon {
    opacity: 0.3;
    transform: translateY(-10px);
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateZ(10px);
    }
    50% {
      transform: translateY(-20px) translateZ(20px);
    }
  }
  
  .floating-cross {
    position: absolute;
    color: rgba(255, 107, 107, 0.15);
    animation: float 6s ease-in-out infinite;
  }
`;

const FloatingCross = ({ x, y, delay, size }) => {
  return (
    <motion.div
      className="floating-cross"
      initial={{ opacity: 0, x, y }}
      animate={{ 
        opacity: [0, 0.2, 0],
        y: y - 50,
        transition: { 
          duration: 10 + Math.random() * 10,
          delay,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }}
      style={{
        fontSize: `${size}px`,
        zIndex: 1
      }}
    >
      ✝
    </motion.div>
  );
};

FloatingCross.propTypes = FloatingCrossPropTypes;

function Devotional() {
  const { blogs } = useAuth();
  const navigate = useNavigate();
  const [crosses, setCrosses] = useState([]);
  
  const devotionalBlogs = blogs?.filter(blog => blog.category === "Devotion")
    .reverse()
    .slice(0, 4);

  useEffect(() => {
    const newCrosses = [];
    for (let i = 0; i < 20; i++) {
      newCrosses.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        size: 10 + Math.random() * 20
      });
    }
    setCrosses(newCrosses);
  }, []);

  const handleBlogClick = (blogId) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(`/blog/${blogId}`);
  };

  const Card = ({ blog, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Transform mouse position to rotation
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
    
    // Add spring physics to rotation
    const springConfig = { stiffness: 150, damping: 15 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    
    const handleMouseMove = (e) => {
      if (!cardRef.current || !isHovered) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to center
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        key={blog._id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring" }}
        className="card-container"
        onClick={() => handleBlogClick(blog._id)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: isHovered ? 1.05 : 1,
          transition: "scale 0.3s ease"
        }}
      >
        <div className="floating-icons">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="floating-icon"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                fontSize: `${15 + i * 5}px`,
                color: i % 2 ? '#FF6B6B' : '#FF8E53',
                animationDelay: `${i * 0.5}s`
              }}
            >
              ✝
            </div>
          ))}
        </div>
        
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
        {/* Animated floating crosses in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {crosses.map(cross => (
            <FloatingCross 
              key={cross.id}
              x={`${cross.x}%`}
              y={`${cross.y}%`}
              delay={cross.delay}
              size={cross.size}
            />
          ))}
        </div>
        
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
            <h2 className="text-4xl sm:text-6xl font-bold text-rose-800 mb-6 leading-tight">
              Spiritual <span className="text-amber-600">Nourishment</span>
            </h2>
            <motion.p 
              className="text-rose-600 max-w-2xl mx-auto text-lg leading-relaxed"
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