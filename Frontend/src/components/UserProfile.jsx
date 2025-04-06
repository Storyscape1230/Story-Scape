import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiMail, FiPhone, FiCalendar, FiUser, FiCamera, FiX } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";

function UserProfile() {
  const { profile, setProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        photo: null
      });
      setPhotoPreview(profile.photo?.url || "");
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      
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

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
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

      if (data && data.user) {
        setProfile(data.user);
        toast.success("Profile updated successfully", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#000',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ef4444'
          },
        });
        setShowModal(false);
      } else {
        toast.error("Invalid response from server", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#000',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ef4444'
          },
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#000',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ef4444'
          },
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile", {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#000',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #ef4444'
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-90"
        >
          {/* Cover Photo with Gradient Overlay */}
          <div className="h-48 bg-gradient-to-r from-red-600 to-red-500 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <button 
              onClick={() => setShowModal(true)}
              className="absolute top-4 right-4 bg-white/90 text-red-600 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center hover:scale-105"
            >
              <FiEdit className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8 pt-20 relative">
            {/* Avatar with Glow Effect */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full blur opacity-30"></div>
                <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden">
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : profile.photo?.url ? (
                    <img 
                      src={profile.photo.url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                      <FiUser className="text-red-400 w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="text-center mt-4">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-gray-800"
              >
                {profile.name}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-red-500 mt-2 font-medium"
              >
                Member since {new Date(profile.createdAt).getFullYear()}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center justify-center text-gray-700 bg-red-50 p-3 rounded-xl hover:bg-red-100 transition-colors duration-300">
                  <FiMail className="text-red-500 mr-3 w-5 h-5" />
                  <span className="font-medium">{profile.email}</span>
                </div>
                
                {profile.phone && (
                  <div className="flex items-center justify-center text-gray-700 bg-red-50 p-3 rounded-xl hover:bg-red-100 transition-colors duration-300">
                    <FiPhone className="text-red-500 mr-3 w-5 h-5" />
                    <span className="font-medium">{profile.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center text-gray-700 bg-red-50 p-3 rounded-xl hover:bg-red-100 transition-colors duration-300">
                  <FiCalendar className="text-red-500 mr-3 w-5 h-5" />
                  <span className="font-medium">Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <label className="relative group">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:border-red-500">
                      {photoPreview ? (
                        <img 
                          src={photoPreview} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : profile.photo?.url ? (
                        <img 
                          src={profile.photo.url} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                          <FiUser className="text-red-400 w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FiCamera className="text-white w-8 h-8 mb-2" />
                        <span className="text-white text-sm font-medium">Change Photo</span>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
                
                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-red-50 transition-all duration-200 font-medium"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className={`px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserProfile;