import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiMail, FiPhone, FiCalendar, FiUser, FiCamera } from "react-icons/fi";
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
  }, [profile?.name, profile?.email, profile?.phone, profile?.photo?.url]);

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
        toast.success("Profile updated successfully");
        setShowModal(false);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-red-50 to-pink-50">
        <div className="text-center">
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Cover Photo with Edit Button */}
          <div className="h-32 bg-gradient-to-r from-red-400 to-red-500 relative">
            <button 
              onClick={() => setShowModal(true)}
              className="absolute top-4 right-4 bg-white/90 text-red-500 p-2 rounded-full shadow-sm hover:bg-white transition flex items-center"
            >
              <FiEdit className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>
          
          {/* Profile Content */}
          <div className="px-6 pb-8 pt-16 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
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
                  <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-200 flex items-center justify-center">
                    <FiUser className="text-red-400 w-10 h-10" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-red-500 mt-1">Member since {new Date(profile.createdAt).getFullYear()}</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center text-gray-700">
                  <FiMail className="text-red-400 mr-3" />
                  <span>{profile.email}</span>
                </div>
                
                {profile.phone && (
                  <div className="flex items-center justify-center text-gray-700">
                    <FiPhone className="text-red-400 mr-3" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center text-gray-700">
                  <FiCalendar className="text-red-400 mr-3" />
                  <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Profile</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <label className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer">
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
                      <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-200 flex items-center justify-center">
                        <FiUser className="text-red-400 w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <FiCamera className="text-white w-6 h-6 mb-1" />
                      <span className="text-white text-sm">Change Photo</span>
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
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;