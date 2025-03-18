import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

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
      toast.error("An error occurred", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Floating Contact Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 md:p-12 relative z-10 transition-shadow duration-300 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            We love to hear from you! Reach out to us for any inquiries or
            feedback.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-8">
          {/* Contact Form */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
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
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/2 md:pl-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Contact Information
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <FaPhone className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">+91 9316624108</span>
              </li>
              <li className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">
                  storyscape1230@gmail.com
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <span className="text-lg text-gray-700">
                  Sabrgam, Surat, Gujarat
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;