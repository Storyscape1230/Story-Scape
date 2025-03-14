import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import { FaHome, FaBlog, FaUser, FaPlus, FaSignOutAlt } from "react-icons/fa"; // Added icons
import toast from "react-hot-toast";
import PropTypes from "prop-types";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:8001/api/users/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl text-white" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 h-screen shadow-lg fixed top-0 left-0 bg-gray-900 transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        } z-40 flex flex-col`}
      >
        {/* Close Sidebar Button for Mobile */}
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer p-2 bg-gray-800 rounded-full shadow-lg"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl text-white" />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center m-4 mt-8">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-2 flex items-center justify-center border-4 border-gray-700 shadow-lg">
            <img
              className="w-full h-full object-cover"
              src={profile?.photo?.url || "https://via.placeholder.com/150"}
              alt="Profile"
            />
          </div>
          <p className="text-lg font-semibold text-white">{profile?.name}</p>
          <p className="text-sm text-gray-400">{profile?.email}</p>
        </div>

        {/* Sidebar Buttons - Uses flex-grow to push Logout to the bottom */}
        <div className="flex flex-col flex-grow space-y-2 px-4 mt-6">
          <button
            onClick={gotoHome}
            className="w-full px-4 py-3 flex items-center space-x-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <FaHome className="text-xl" />
            <span>HOME</span>
          </button>
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-3 flex items-center space-x-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <FaBlog className="text-xl" />
            <span>MY BLOGS</span>
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-3 flex items-center space-x-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <FaPlus className="text-xl" />
            <span>CREATE BLOG</span>
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-3 flex items-center space-x-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-700 transition duration-300 shadow-lg"
          >
            <FaUser className="text-xl" />
            <span>MY PROFILE</span>
          </button>
        </div>

        {/* Logout Button at the Bottom */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center space-x-3 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-700 transition duration-300 shadow-lg"
          >
            <FaSignOutAlt className="text-xl" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </>
  );
}

// Add PropTypes validation
Sidebar.propTypes = {
  setComponent: PropTypes.func.isRequired,
};

export default Sidebar;