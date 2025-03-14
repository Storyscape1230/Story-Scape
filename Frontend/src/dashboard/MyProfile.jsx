import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import axios from "axios";

function MyProfile() {
  const { profile, setProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    photo: profile?.photo?.url || "",
  });
  const [photoPreview, setPhotoPreview] = useState(profile?.photo?.url || "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    try {
      const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
      console.log("Token retrieved from localStorage:", token); // Log the token
  
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("photo", formData.photo);
  
      console.log("FormData being sent:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo ? "File attached" : "No file",
      });
  
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
  
      console.log("Profile update response:", data); // Log the response
  
      setProfile(data.user); // Update profile in context
      setShowModal(false);
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
  
      // Redirect to login if no token is found
      if (error.response?.status === 401) {
        localStorage.removeItem("jwt"); // Clear the token
        window.location.href = "/login"; // Redirect to login page
      }
    }
  };

  return (
    <div className="min-h-screen md:ml-64 flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-2xl transform transition-all duration-300 hover:scale-105">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/800x200"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {/* Profile Avatar */}
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
            <img
              src={profile?.photo?.url || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all duration-300"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {profile?.name || "User Name"}
          </h2>
          <p className="text-gray-500 mt-1">{profile?.role || "User Role"}</p>

          {/* User Info */}
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-gray-700">📧</span>
              <p className="text-gray-700">
                {profile?.email || "user@example.com"}
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-gray-700">📞</span>
              <p className="text-gray-700">
                {profile?.phone || "Not Provided"}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={photoPreview || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to upload</p>
              </div>

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Phone */}
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Save and Cancel Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
