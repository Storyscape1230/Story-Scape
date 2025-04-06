import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import DecorativeElements from "../components/DecorativeElements";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8001/api/users/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || result.error || "Failed to send message");
      }
  
      toast.success(result.message);
      reset();
    } catch (error) {
      console.error("Full error:", error);
      toast.error(error.message || "Failed to send message. Please try again later.");
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-red-500 text-2xl" />,
      title: "Call Us",
      value: "+91 9316624108",
      delay: 0.1,
    },
    {
      icon: <FaEnvelope className="text-red-500 text-2xl" />,
      title: "Email Us",
      value: "storyscape1230@gmail.com",
      delay: 0.2,
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500 text-2xl" />,
      title: "Visit Us",
      value: "Sabrgam, Surat, Gujarat",
      delay: 0.3,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-50 to-pink-50 py-12 px-4">
      <DecorativeElements />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Get in <span className="text-red-500">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Wed love to hear from you! Whether you have questions, feedback, or just want to say hello, our team is ready to help.
          </motion.p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 p-8 md:p-10"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.username ? "border-red-300" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50`}
                    {...register("username", { required: "Name is required" })}
                  />
                  {errors.username && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 font-medium block mt-1"
                    >
                      {errors.username.message}
                    </motion.span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-300" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 font-medium block mt-1"
                    >
                      {errors.email.message}
                    </motion.span>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? "border-red-300" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent placeholder-gray-400 text-gray-800 bg-gray-50`}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 font-medium block mt-1"
                    >
                      {errors.message.message}
                    </motion.span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 font-semibold flex items-center justify-center space-x-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <span>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <FaPaperPlane className="text-white" />
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <div className="w-full lg:w-1/2 bg-gradient-to-b from-red-50 to-pink-50 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h3>
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay, duration: 0.6 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-white p-3 rounded-full shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-700">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-center mt-2 text-gray-600">
                  Our location in Surat, Gujarat
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 mb-4">Or connect with us on social media</p>
          <div className="flex justify-center space-x-4">
            {["Twitter", "Facebook", "Instagram"].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -3 }}
                href="#"
                className="bg-white p-3 rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                {social}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;