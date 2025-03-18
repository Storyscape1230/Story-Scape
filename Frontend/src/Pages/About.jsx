// import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";
// import team1 from "../assets/krish.jpg";
// import team2 from "../assets/aniket.jpg";
// import team3 from "../assets/dixit.jpg";

function About() {
  

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-6">About StoryScape</h1>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          StoryScape is a dynamic and interactive blog website created by a dedicated team of full-stack developers for their final year college project. The vision behind StoryScape is to provide a creative platform for individuals to share stories, ideas, and knowledge in an engaging, visually appealing space.
        </p>

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Meet The Creators</h2>

        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {/* {[ 
            { name: "Krish Kukadiya", role: "Frontend Developer", img: team1, description: "Krish specializes in crafting responsive, aesthetic front-end experiences using React and Tailwind CSS." },
            { name: "Aniket Parmar", role: "Backend Developer", img: team2, description: "Aniket is responsible for developing robust backend architecture, APIs, and database integration for StoryScape." },
            { name: "Dixit Thummar", role: "UI/UX Designer & Deployment", img: team3, description: "Dixit focuses on design, user experience, and deployment strategies, ensuring a smooth and polished product." } */}
          {/* ].map((member, index) => ( */}
            {/* <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <img src={member.img} alt={member.name} className="w-full h-56 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </motion.div>
          )) */}
        </div>

        <h2 className="text-2xl font-bold text-blue-700 mb-4">Purpose & Vision</h2>
        <p className="text-gray-700 mb-6">
          StoryScape aims to inspire creativity, share knowledge, and bring like-minded storytellers and readers together. With features like trending blogs, personalized likes & comments, and an admin dashboard, the platform supports both content creators and readers.
        </p>

        <h2 className="text-2xl font-bold text-blue-700 mb-4">Technical Highlights</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-10">
          <li>Built with React, Tailwind CSS, and Redux for smooth, responsive user experience.</li>
          <li>Robust backend using Node.js, Express.js, MongoDB, and secure authentication.</li>
          <li>Cloudinary integration for fast, scalable media management.</li>
          <li>Dynamic admin dashboard for managing blogs, users, comments, and analytics.</li>
          <li>Real-time like & comment features for interactive user engagement.</li>
        </ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-700">
            Created with ❤️ by <span className="text-blue-700 font-semibold">Krish Kukadiya</span>, <span className="text-blue-700 font-semibold">Aniket Parmar</span>, and <span className="text-blue-700 font-semibold">Dixit Thummar</span> for their final year project.
          </p>
          <p className="mt-2 text-gray-500">We hope StoryScape inspires storytelling and community building for everyone!</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;
