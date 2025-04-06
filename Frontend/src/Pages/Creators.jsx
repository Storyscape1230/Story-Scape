import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DecorativeElements from "../components/DecorativeElements";

function Creators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/users/admins",
          { withCredentials: true }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log("Error fetching creators:", error);
      }
    };
    fetchCreators();
  }, []);

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 py-8 px-4">
      <DecorativeElements />

      <div className="max-w-[75%] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Meet Our <span className="text-red-500">Creators</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base text-gray-600 max-w-2xl mx-auto"
          >
            Visionaries shaping narratives through compelling storytelling
          </motion.p>
        </motion.div>

        {/* Creative grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div 
              key={creator._id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative group"
            >
              {/* Card container */}
              <div className="h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100/50 hover:border-red-200 transition-colors">
                {/* Full-width portrait */}
                <Link to={`/creator/${creator._id}`} className="block relative h-72 overflow-hidden">
                  <img
                    src={creator.photo.url}
                    alt={creator.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
                </Link>

                {/* Profile badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-red-700 text-sm font-medium">#{index + 1}</span>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {creator.name}
                      </h2>
                      <p className="text-red-100/90 font-medium">{creator.role}</p>
                    </div>
                    <Link
                      to={`/creator/${creator._id}`}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    >
                      <svg 
                        className="w-6 h-6 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Stats ribbon */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-medium">Featured Creator</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;