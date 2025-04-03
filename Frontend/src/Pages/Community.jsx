import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Community() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("forum");

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
    forum: {
      title: "Community Forum",
      content: [
        {
          heading: "Join the Discussion",
          text: "Connect with other writers, share your experiences, and engage in meaningful discussions about storytelling, writing techniques, and creative processes."
        },
        {
          heading: "Featured Topics",
          text: "Explore trending discussions, writing challenges, and collaborative projects. Get feedback on your work and share your expertise with others."
        },
        {
          heading: "Community Guidelines",
          text: "Our forum is built on respect and constructive dialogue. We encourage diverse perspectives while maintaining a supportive and inclusive environment."
        },
        {
          heading: "Getting Started",
          text: "New to the community? Start by introducing yourself, exploring existing discussions, and gradually engaging with other members."
        }
      ]
    },
    events: {
      title: "Events & Workshops",
      content: [
        {
          heading: "Writing Workshops",
          text: "Participate in regular online workshops led by experienced writers. Learn new techniques, get feedback, and improve your storytelling skills."
        },
        {
          heading: "Virtual Meetups",
          text: "Join monthly virtual meetups where writers share their work, discuss challenges, and celebrate successes together."
        },
        {
          heading: "Writing Challenges",
          text: "Take part in themed writing challenges that encourage creativity and help you develop your writing practice."
        },
        {
          heading: "Upcoming Events",
          text: "Stay updated with our calendar of events, including guest speaker sessions, panel discussions, and community celebrations."
        }
      ]
    },
    opensource: {
      title: "Open Source",
      content: [
        {
          heading: "Contribute to StoryScape",
          text: "Help us improve StoryScape by contributing to our open-source projects. Whether you're a developer, designer, or writer, there's a place for you."
        },
        {
          heading: "Development Guidelines",
          text: "Learn about our coding standards, contribution process, and how to get started with development on our platform."
        },
        {
          heading: "Project Roadmap",
          text: "Explore our planned features and improvements. Share your ideas and help shape the future of StoryScape."
        },
        {
          heading: "Community Projects",
          text: "Discover community-driven projects and initiatives that enhance the StoryScape ecosystem."
        }
      ]
    },
    contributors: {
      title: "Contributors",
      content: [
        {
          heading: "Recognizing Contributors",
          text: "We celebrate and acknowledge the valuable contributions of our community members who help make StoryScape better."
        },
        {
          heading: "Contributor Levels",
          text: "Learn about different contributor levels and how you can advance through active participation and valuable contributions."
        },
        {
          heading: "Featured Contributors",
          text: "Meet some of our most active contributors and learn about their journey with StoryScape."
        },
        {
          heading: "How to Contribute",
          text: "Find out various ways you can contribute, from code contributions to documentation, design, and community support."
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community <span className="text-red-500">Hub</span></h1>
          <p className="text-gray-600">Join our vibrant community of writers and storytellers</p>
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

        {/* Join Community Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Ready to join our community? Connect with us on social media or start participating in discussions.
          </p>
          <div className="flex justify-center space-x-4">
            {['Twitter', 'Discord', 'GitHub'].map((platform, index) => (
              <motion.a
                key={index}
                href="#"
                className="px-4 py-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {platform}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Community; 