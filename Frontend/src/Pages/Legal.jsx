import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DecorativeElements from "../components/DecorativeElements";

function Legal() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("privacy");

  // Handle URL hash changes
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the # symbol
    if (hash && sections[hash]) {
      setActiveSection(hash);
      // Scroll to top when hash changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  const sections = {
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          heading: "Information We Collect",
          text: "We collect information that you provide directly to us, including when you create an account, post content, or communicate with us. This may include your name, email address, and any other information you choose to provide."
        },
        {
          heading: "How We Use Your Information",
          text: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our platform and users."
        },
        {
          heading: "Information Sharing",
          text: "We do not sell your personal information. We may share your information with third parties who assist us in operating our platform, conducting our business, or serving our users."
        },
        {
          heading: "Data Security",
          text: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      content: [
        {
          heading: "Acceptance of Terms",
          text: "By accessing and using StoryScape, you agree to be bound by these Terms of Service and all applicable laws and regulations."
        },
        {
          heading: "User Responsibilities",
          text: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account."
        },
        {
          heading: "Content Guidelines",
          text: "Users must not post content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable."
        },
        {
          heading: "Intellectual Property",
          text: "All content on StoryScape is protected by copyright, trademark, and other laws. You may not use our content without our express written permission."
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      content: [
        {
          heading: "What Are Cookies",
          text: "Cookies are small text files that are placed on your computer or mobile device when you visit our website."
        },
        {
          heading: "How We Use Cookies",
          text: "We use cookies to remember your preferences, understand how you use our platform, and improve your experience."
        },
        {
          heading: "Types of Cookies We Use",
          text: "We use essential cookies for basic functionality, analytics cookies to understand usage, and preference cookies to remember your settings."
        },
        {
          heading: "Managing Cookies",
          text: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed."
        }
      ]
    }
  };

  const handleSectionChange = (key) => {
    setActiveSection(key);
    // Update URL hash without triggering a page reload
    window.history.pushState(null, null, `#${key}`);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-pink-50 py-12 px-4">
      <DecorativeElements />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal <span className="text-red-500">Information</span></h1>
          <p className="text-gray-600">Important information about your use of StoryScape</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(sections).map(([key, section]) => (
            <motion.button
              key={key}
              onClick={() => handleSectionChange(key)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === key
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.title}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-8 relative"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-200 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-200 rounded-tr-xl"></div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {sections[activeSection].title}
          </h2>
          <div className="space-y-6">
            {sections[activeSection].content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-red-100 pb-6 last:border-0"
              >
                <h3 className="text-xl font-semibold text-red-800 mb-3">
                  {item.heading}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Decorative bottom elements */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-200 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-200 rounded-br-xl"></div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            If you have any questions about our legal policies, please contact us at{" "}
            <a href="mailto:legal@storyscape.com" className="text-red-500 hover:text-red-600">
              legal@storyscape.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Legal; 