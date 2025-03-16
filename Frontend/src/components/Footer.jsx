<<<<<<< HEAD
import { FaGithub, FaLinkedin, FaRegHeart } from "react-icons/fa";
import { BsYoutube, BsArrowUpCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Footer = () => {
  const sections = [
    {
      title: "Explore",
      links: ["Blogs", "Creators", "About ", "Contact", "Documentation"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Community",
      links: ["Forum", "Events", "Open Source", "Contributors"],
    },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="pattern-dots pattern-gray-800 pattern-size-2 w-full h-full" />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-1">
           
            <Link to="/" className="flex items-center">
                      {/* Logo Image */}
                      <img
                        src={logo} // Use the imported logo
                        alt="StoryScape Logo"
                        className="h-5 w-5 mr-1" // Adjust size and spacing
                      />
                      {/* Logo Text */}
                      <span className=" font-bold tracking-tight hover:text-red-500 transition-colors ruslan-display-regular">
                        Story
                        <span className="text-red-500 ruslan-display-regular">Scape</span>
                      </span>
                    </Link>
            <p className="mt-4 text-sm text-gray-400">
              Crafting digital experiences that inspire and engage.
            </p>
          </div>

          {/* Dynamic sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-red-500 font-semibold uppercase text-sm tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
            <span>&copy; {new Date().getFullYear()} StoryScape</span>
            <FaRegHeart className="text-red-500 mx-1" />
            <span>Developed by krish, Ankit, Dixit.. </span>
          </div>

          {/* Social links */}
          <div className="flex space-x-6">
            {[FaGithub, BsYoutube, FaLinkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Scroll to top */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 text-red-500 hover:text-red-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          xxx
          whileTap={{ scale: 0.9 }}
        >
          <BsArrowUpCircle className="w-8 h-8" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
=======
  import { FaGithub, FaLinkedin, FaRegHeart } from "react-icons/fa";
  import { BsYoutube, BsArrowUpCircle } from "react-icons/bs";
  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";
  import logo from "../assets/logo.png";

  const Footer = () => {
    const sections = [
      {
        title: "Explore",
        links: ["Blogs", "Creators", "About ", "Contact", "Documentation"],
      },
      {
        title: "Legal",
        links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
      },
      {
        title: "Community",
        links: ["Forum", "Events", "Open Source", "Contributors"],
      },
    ];

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
      <footer className="bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="pattern-dots pattern-gray-800 pattern-size-2 w-full h-full" />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand section */}
            <div className="md:col-span-1">
            
              <Link to="/" className="flex items-center">
                        {/* Logo Image */}
                        <img
                          src={logo} // Use the imported logo
                          alt="StoryScape Logo"
                          className="h-5 w-5 mr-1" // Adjust size and spacing
                        />
                        {/* Logo Text */}
                        <span className=" font-bold tracking-tight hover:text-red-500 transition-colors ruslan-display-regular">
                          Story
                          <span className="text-red-500 ruslan-display-regular">Scape</span>
                        </span>
                      </Link>
              <p className="mt-4 text-sm text-gray-400">
                Crafting digital experiences that inspire and engage.
              </p>
            </div>

            {/* Dynamic sections */}
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className=" text-red-500 font-semibold uppercase text-sm tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
              <span>&copy; {new Date().getFullYear()} StoryScape</span>
              <FaRegHeart className="text-red-500 mx-1" />
              <span>Developed by krish, Ankit, Dixit.. </span>
            </div>

            {/* Social links */}
            <div className="flex space-x-6">
              {[FaGithub, BsYoutube, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 text-red-500 hover:text-red-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BsArrowUpCircle className="w-8 h-8" />
          </motion.button>
        </div>
      </footer>
    );
  };

  export default Footer;
>>>>>>> 8202448 (added)
