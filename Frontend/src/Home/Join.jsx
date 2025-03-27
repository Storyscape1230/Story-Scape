import { useState } from "react";
import { motion } from "framer-motion";
import joinBg from "../assets/Joinbackground.png"; // Add your background image

const Join = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={joinBg} 
          alt="Community background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-rose-700/30"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Join Our Storytelling Community
        </h2>
        <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
          Be the first to discover new stories and connect with fellow readers
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-grow px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300 text-rose-900"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-8 py-4 bg-rose-600 text-white font-medium rounded-full hover:bg-rose-700 transition-colors shadow-lg"
          >
            Subscribe
          </motion.button>
        </form>
        
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-rose-100 font-medium"
          >
            Welcome to our community! Check your inbox for confirmation.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Join;