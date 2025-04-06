import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DecorativeElements from "../components/DecorativeElements";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-amber-50">
      <DecorativeElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Welcome to <span className="text-red-500">StoryScape</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Discover, create, and share your stories with the world
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/blogs"
              className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Explore Stories
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-red-500 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Start Writing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home; 