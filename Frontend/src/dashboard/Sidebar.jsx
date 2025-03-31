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
      {/* Mobile Toggle */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50 p-3 bg-[#111827] cursor-pointer"
        style={{
          clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
        }}
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-[#E5E7EB]" />
      </div>

      {/* Sidebar */}
      <div
        className={`w-72 h-screen fixed top-0 left-0 bg-[#111827] transition-transform duration-300 transform sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        } z-40 flex flex-col overflow-y-auto`}
      >
        {/* Decorative Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2563EB]/0 via-[#2563EB]/20 to-[#2563EB]/0"></div>
          <div className="absolute -left-10 top-20 w-40 h-[1px] bg-[#2563EB]/20 rotate-45"></div>
          <div className="absolute -right-10 top-40 w-40 h-[1px] bg-[#2563EB]/20 -rotate-45"></div>
        </div>

        {/* Profile Section */}
        <div className="mt-10 px-6">
          <div className="relative">
            {/* Profile Image Container */}
            <div className="relative w-32 h-32 mx-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full border-2 border-[#2563EB]/20"
                    style={{
                      transform: `rotate(${i * 30}deg)`,
                      clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
                    }}
                  ></div>
                ))}
              </div>
              {/* Image */}
              <div className="relative w-24 h-24 mx-auto mt-4 group cursor-pointer">
                <img
                  className="w-full h-full object-cover rounded-lg transform rotate-12 group-hover:rotate-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-300"
                  src={profile?.photo?.url || "https://via.placeholder.com/150"}
                  alt="Profile"
                />
                <div className="absolute inset-0 border-2 border-[#2563EB]/40 rounded-lg transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300"></div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="mt-6 text-center">
              <h2 className="text-[#E5E7EB] text-xl font-bold tracking-wider">{profile?.name}</h2>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 mt-12 space-y-3">
          {[
            { icon: FaHome, label: "Home", action: gotoHome },
            { icon: FaBlog, label: "My Blogs", action: () => handleComponents("My Blogs") },
            { icon: FaPlus, label: "Create Blog", action: () => handleComponents("Create Blog") },
            { icon: FaUser, label: "My Profile", action: () => handleComponents("My Profile") }
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="group w-full relative p-3 flex items-center bg-transparent hover:bg-[#1f2937] rounded-md transition-all duration-300"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <item.icon className="text-[#E5E7EB]/70 group-hover:text-[#2563EB] text-lg transition-colors duration-300" />
              </div>
              <span className="ml-4 text-[#E5E7EB]/70 group-hover:text-white transition-colors duration-300">{item.label}</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BiSolidLeftArrowAlt className="text-[#2563EB] text-xl" />
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="group w-full relative p-3 flex items-center bg-transparent hover:bg-[#1f2937] rounded-md transition-all duration-300"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <FaSignOutAlt className="text-[#E5E7EB]/70 group-hover:text-red-500 text-lg transition-colors duration-300" />
            </div>
            <span className="ml-4 text-[#E5E7EB]/70 group-hover:text-red-500 transition-colors duration-300">Logout</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BiSolidLeftArrowAlt className="text-red-500 text-xl" />
            </div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </>
  );
}

// Add PropTypes validation
Sidebar.propTypes = {
  setComponent: PropTypes.func.isRequired,
};

export default Sidebar;