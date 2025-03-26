

import { motion } from "framer-motion";
// Uncomment these when you have the images
// import team1 from "../assets/krish.jpg";
// import team2 from "../assets/aniket.jpg";
// import team3 from "../assets/dixit.jpg";

function About() {
  const teamMembers = [
    { 
      name: "Aniket Parmar", 
      role: "Frontend Developer", 
      // img: team1, 
      description: "Specializes in crafting responsive, aesthetic front-end experiences using React and Tailwind CSS.",
      animationDelay: 0.1
    },
    { 
      name: "Krish Kukadiya ", 
      role: "Backend Developer", 
      // img: team2, 
      description: "Develops robust backend architecture, APIs, and database integration for StoryScape.",
      animationDelay: 0.2
    },
    { 
      name: "Dixit Thummar", 
      role: "UI/UX Designer & Deployment", 
      // img: team3, 
      description: "Focuses on design, user experience, and deployment strategies for a polished product.",
      animationDelay: 0.3
    }
  ];

  const features = [
    "React, Tailwind CSS, and Redux for smooth UX",
    "Node.js, Express.js, MongoDB backend",
    "Cloudinary media management",
    "Dynamic admin dashboard",
    "Real-time like & comment features"
  ];

  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 py-16 px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600"
          >
            Our StoryScape Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            StoryScape is more than just a blog platform - it s a creative universe where stories come alive, 
            crafted with passion by three dedicated developers.
          </motion.p>
        </div>

        {/* Team Section */}
        <section className="mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-red-600"
          >
            The Minds Behind StoryScape
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: member.animationDelay }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-red-400"
              >
                <div className="h-48 bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <div className="text-5xl text-red-400 font-bold">{member.name.charAt(0)}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-red-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20 bg-white rounded-2xl shadow-md p-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-red-600">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  We envisioned StoryScape as a platform that breaks the mold of traditional blogging - 
                  where every story gets the spotlight it deserves and readers can discover content that 
                  truly resonates with them.
                </p>
                <p className="text-lg text-gray-700">
                  Our goal was to create an immersive experience that makes writing and reading 
                  stories as enjoyable as possible.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Core Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Creativity without boundaries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Community-driven content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Seamless user experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Innovative storytelling tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12 text-red-600"
          >
            Built With Cutting-Edge Technology
          </motion.h2>
          
          <div className="grid md:grid-cols-5 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md text-center border-t-2 border-red-200 hover:border-red-400 transition-all"
              >
                <div className="h-12 w-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                  {index + 1}
                </div>
                <p className="font-medium text-gray-800">{feature}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-8 shadow-inner"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-600">Join Our Storytelling Revolution</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            StoryScape is more than our project - it s our passion. We invite you to be part of this 
            growing community of storytellers and readers.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium shadow-md hover:bg-red-600 transition-colors"
            >
              Start Reading
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-red-500 border border-red-300 rounded-lg font-medium shadow-md hover:bg-red-50 transition-colors"
            >
              Start Writing
            </motion.button>
          </div>
          <p className="mt-8 text-gray-600">
            Created with ❤️ by <span className="text-red-600 font-semibold">Krish</span>, <span className="text-red-600 font-semibold">Aniket</span>, and <span className="text-red-600 font-semibold">Dixit</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;