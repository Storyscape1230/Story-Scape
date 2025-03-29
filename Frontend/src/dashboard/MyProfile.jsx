import { useAuth } from "../context/AuthProvider";
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

  // Initialize form data when profile changes
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
      // Validate file type and size
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
      className="min-h-screen md:ml-64 flex flex-col bg-gradient-to-br from-[#0A0F1C] via-[#0D1425] to-[#1A1F2E] relative overflow-hidden"
    >
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] opacity-10"></div>
        
        {/* Reduced Number of Floating Elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        
        {/* Static Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      </div>

      <div className="w-full p-4 md:p-8 space-y-8 relative z-10">
        {/* First Section - Profile Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden group"
        >
          {/* Simplified Border Effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[1px] bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.4rem]" />
          
          {/* Static Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/10 via-[#3B82F6]/5 to-transparent rounded-[2.4rem]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 rounded-[2.4rem]" />
          
          {/* Simplified Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/0 via-[#60A5FA]/20 to-[#60A5FA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.4rem]" />
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Profile Image */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#2A3B5C] to-[#1E3A8A] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={photoPreview || profile?.photo?.url || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="relative w-40 h-40 rounded-full border-4 border-[#0D1425] shadow-lg object-cover"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                  <div className="space-y-4">
                    <motion.h2 
                      whileHover={{ scale: 1.02 }}
                      className="text-5xl font-bold text-[#E5E7EB]"
                    >
                      {profile.name || "User Name"}
                    </motion.h2>
                    <p className="text-[#6B7280] text-xl">{profile.email}</p>
                    {profile.role === "admin" && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block bg-[#2A3B5C]/30 text-[#60A5FA] px-4 py-1 rounded-full text-sm font-medium border border-[#2A3B5C]/40"
                      >
                        Admin
                      </motion.span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-[#2A3B5C] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#2A3B5C] text-[#E5E7EB] font-semibold px-8 py-3 rounded-full shadow-lg shadow-[#2A3B5C]/20 transition flex items-center gap-3 border border-[#2A3B5C]/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second Section - User Details */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Phone Card */}
          <motion.div 
            whileHover="hover"
            className="relative bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.5rem] p-8 group"
          >
            {/* Simplified Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[1px] bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.4rem]" />
            
            {/* Static Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/10 via-[#3B82F6]/5 to-transparent rounded-[2.4rem]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 rounded-[2.4rem]" />
            
            {/* Simplified Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/0 via-[#60A5FA]/20 to-[#60A5FA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.4rem]" />
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#2A3B5C]/30 p-4 rounded-[1.5rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#60A5FA]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="text-[#6B7280] text-sm font-medium">Phone Number</p>
                <p className="text-[#E5E7EB] text-2xl font-semibold mt-1">
                  {profile.phone || "Not provided"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Role Card */}
          <motion.div 
            whileHover="hover"
            className="relative bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.5rem] p-8 group"
          >
            {/* Simplified Border Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-[1px] bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.4rem]" />
            
            {/* Static Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/10 via-[#3B82F6]/5 to-transparent rounded-[2.4rem]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 rounded-[2.4rem]" />
            
            {/* Simplified Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/0 via-[#60A5FA]/20 to-[#60A5FA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.4rem]" />
            
            <div className="relative flex flex-col items-center text-center space-y-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-[#2A3B5C]/30 p-4 rounded-[1.5rem]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#60A5FA]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.div>
              <div>
                <p className="text-[#6B7280] text-sm font-medium">User Role</p>
                <p className="text-[#E5E7EB] text-2xl font-semibold mt-1 capitalize">{profile.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Admin Privileges Card */}
          {profile.role === "admin" && (
            <motion.div 
              whileHover="hover"
              className="relative bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.5rem] p-8 group"
            >
              {/* Simplified Border Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1E40AF] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[1px] bg-[#0D1425]/90 backdrop-blur-xl rounded-[2.4rem]" />
              
              {/* Static Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/10 via-[#3B82F6]/5 to-transparent rounded-[2.4rem]" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 rounded-[2.4rem]" />
              
              {/* Simplified Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/0 via-[#60A5FA]/20 to-[#60A5FA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.4rem]" />
              
              <div className="relative flex flex-col items-center text-center space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#2A3B5C]/30 p-4 rounded-[1.5rem]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#60A5FA]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Admin Privileges</p>
                  <p className="text-[#E5E7EB] text-2xl font-semibold mt-1">Full access</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-[#112240] p-6 rounded-2xl w-full max-w-md border border-[#64FFDA]/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#CCD6F6]">Edit Profile</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowModal(false)}
                  className="text-[#8892B0] hover:text-[#CCD6F6]"
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
                {/* Profile Picture Upload */}
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
                      className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
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
                  <p className="text-sm text-[#8892B0] mt-2">Click to change photo</p>
                </motion.div>

                {/* Form Fields */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-[#8892B0] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461]/30 border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-[#8892B0] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461]/30 border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-[#8892B0] mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1D3461]/30 border border-[#64FFDA]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#64FFDA]/50 text-[#CCD6F6] placeholder-[#8892B0]/50"
                  />
                </motion.div>

                {/* Save and Cancel Buttons */}
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
                    className="px-4 py-2 bg-[#1D3461]/30 border border-[#64FFDA]/20 rounded-lg text-[#8892B0] hover:bg-[#1D3461]/50 transition"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#64FFDA] to-[#00B4D8] hover:from-[#00B4D8] hover:to-[#64FFDA] text-[#0A192F] font-semibold rounded-lg transition flex items-center border border-[#64FFDA]/20"
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