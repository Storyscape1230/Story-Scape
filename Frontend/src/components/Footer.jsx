import { FaGithub, FaLinkedin, FaRegHeart, FaTwitter } from "react-icons/fa";
import { BsYoutube, BsArrowUpCircle, BsDiscord } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const sections = [
    {
      title: "Explore",
      links: [
        { name: "Blogs", path: "/blogs" },
        { name: "Creators", path: "/creators" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/legal#privacy" },
        { name: "Terms of Service", path: "/legal#terms" },
        { name: "Cookie Policy", path: "/legal#cookies" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Forum", path: "/community#forum" },
        { name: "Events", path: "/community#events" },
        { name: "Open Source", path: "/community#opensource" },
        { name: "Contributors", path: "/community#contributors" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaGithub, url: "#", name: "GitHub" },
    { icon: BsYoutube, url: "#", name: "YouTube" },
    { icon: FaLinkedin, url: "#", name: "LinkedIn" },
    { icon: FaTwitter, url: "#", name: "Twitter" },
    { icon: BsDiscord, url: "#", name: "Discord" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-black text-gray-300 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent opacity-20" />
      </div>

      {/* Glowing orb effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="flex items-center group mr-4 transition-all duration-300 active:scale-95"
            >
              <img
                src={logo}
                alt="StoryScape Logo"
                className="h-6 w-6 mr-2 transition-all duration-300 group-hover:rotate-12 group-active:rotate-45"
              />
              <span className="text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-red-400 group-active:scale-105 ruslan-display-regular">
                Story<span className="text-red-500 ruslan-display-regular">Scape</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Crafting digital experiences that inspire and engage. Join our community of creators and storytellers.
            </p>
            
            {/* Newsletter signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-200 mb-2">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 w-full"
                />
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-red-500 font-semibold uppercase text-sm tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
            <span>&copy; {new Date().getFullYear()} StoryScape</span>
            <FaRegHeart className="text-red-500 mx-1 animate-pulse" />
            <span>Developed with passion by krish, Ankit, Dixit</span>
          </div>

          {/* Social links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="text-gray-400 hover:text-white transition-colors relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <social.icon className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-black/80 backdrop-blur-sm border border-red-500/30 rounded-full p-3 focus:outline-none z-50 group"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                boxShadow: "0 0 20px rgba(220, 38, 38, 0.2)"
              }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.5
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(220, 38, 38, 0.1)",
                borderColor: "rgb(239, 68, 68)",
                boxShadow: "0 0 30px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BsArrowUpCircle className="w-6 h-6 text-red-500" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
