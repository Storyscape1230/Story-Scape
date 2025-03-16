import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c660c9ce-c6f9-41f7-aa0f-8a24ea887b94",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Contact Card */}
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative z-10"
        variants={itemVariants}
        whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-4xl font-extrabold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            variants={itemVariants}
          >
            We'd love to hear from you! Reach out to us for any inquiries or
            feedback.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-8">
          {/* Contact Form */}
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="w-full md:w-1/2 md:pl-4"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h3>
            <ul className="space-y-6">
              <motion.li
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                <FaPhone className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">+91 9316624108</span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                <FaEnvelope className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">
                  storyscape1230@gmail.com
                </span>
              </motion.li>
              <motion.li
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">
                  Sabrgam, Surat, Gujarat
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;