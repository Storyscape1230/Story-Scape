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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      const { data } = await axios.put(
        "http://localhost:5173/api/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen md:ml-64 flex justify-center items-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-xl transform transition-all duration-300 hover:scale-105">
        
        {/* Cover Image */}
        <div className="relative">
          <img src={profile?.photo?.url || "default-cover.jpg"} alt="Cover" className="w-full h-48 object-cover" />
          <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
            <img src={profile?.photo?.url || "default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-all duration-300" />
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 py-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">{profile?.name || "User Name"}</h2>
          <p className="text-gray-500 mt-1">{profile?.role || "User Role"}</p>

          <div className="mt-6 space-y-3">
            <p className="text-gray-700">📧 {profile?.email || "user@example.com"}</p>
            <p className="text-gray-700">📞 {profile?.phone || "Not Provided"}</p>
          </div>

          {/* Edit Profile Button */}
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition mt-6">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="photo" placeholder="Photo URL" value={formData.photo} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
