import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Profile() {
  const { profile, setProfile } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        photo: null,
      });
      setPhotoPreview(profile.photo?.url || "");
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData({ ...formData, photo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      const { data } = await axios.put(
        "http://localhost:8001/api/users/update-profile",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(data.user);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile"
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("jwt");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#0A0F1C] via-[#0D1425] to-[#1A1F2E]"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#2A3B5C] border-t-transparent rounded-full mx-auto"
          />
          <p className="text-lg mt-4 text-[#6B7280]">Loading profile...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen md:pl-72 flex flex-col relative bg-[#0B1120] overflow-hidden"
    >
      {/* Futuristic Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3B82F6]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Glowing orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3B82F6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#8B5CF6] opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="w-full px-4 sm:px-6 relative z-10 pb-8">
        {/* Main Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mt-6"
        >
          {/* Top Banner with Edit Button */}
          <div className="h-48 rounded-t-3xl bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#2563EB] p-[1px]">
            <div className="h-full w-full bg-[#1F2937] rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1),rgba(37,99,235,0.1))]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.2),transparent)]"></div>
              
              <div className="absolute top-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="relative group"
                >
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-6 py-3 bg-[#1F2937] rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className="text-white font-medium">Edit Profile</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-[#1F2937] rounded-b-3xl border border-[#4B5563] shadow-2xl">
            <div className="px-4 sm:px-8 pb-8 relative">
              <div className="relative -mt-24 mb-6 flex justify-center sm:justify-start">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative h-40 w-40 rounded-full border-4 border-[#1F2937] overflow-hidden">
                    <img
                      src={photoPreview || profile?.photo?.url || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
                  {profile.name || "User Name"}
                </h2>
                <p className="text-[#9CA3AF] mt-2 text-base sm:text-lg">{profile.email}</p>
                
                {profile.role === "admin" && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20">
                      Admin
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                  <div className="relative p-6 bg-[#374151] rounded-2xl border border-[#6B7280]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[#3B82F6]/10">
                        <svg className="w-6 h-6 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-sm">Phone</p>
                        <p className="text-white mt-1 font-medium">{profile.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>    
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                  <div className="relative p-6 bg-[#374151] rounded-2xl border border-[#6B7280]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[#2563EB]/10">
                        <svg className="w-6 h-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-sm">Role</p>
                        <p className="text-white mt-1 font-medium capitalize">{profile.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {profile.role === "admin" && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="group relative sm:col-span-2 lg:col-span-1"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                    <div className="relative p-6 bg-[#374151] rounded-2xl border border-[#6B7280]">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-[#3B82F6]/10 to-[#2563EB]/10">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-sm">Privileges</p>
                          <p className="text-white mt-1 font-medium">Full access</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1F2937] border border-[#6B7280] rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#F3F4F6]">Edit Profile</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="text-[#D1D5DB] hover:text-[#F3F4F6]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-[#FF6B6B]/20 text-[#FF6B6B] rounded-lg text-sm border border-[#FF6B6B]/30"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <label className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#64FFDA]/30 cursor-pointer">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={photoPreview || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 opacity-0"
                    />
                    <motion.div 
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </motion.div>
                  </label>
                  <p className="text-sm text-[#D1D5DB] mt-2">Click to change photo</p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461] border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461] border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461] border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                  />
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end space-x-3 pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-[#1D3461] border border-[#64FFDA]/20 rounded-lg text-[#8892B0] hover:bg-[#1D3461]/80 transition"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] text-[#0A192F] font-semibold rounded-lg transition flex items-center border border-[#64FFDA]/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full mr-2"
                      />
                    ) : null}
                    {isLoading ? "Saving..." : "Save Changes"}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Profile;