import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/logo.png"; // Import the logo image

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const isAdmin = profile?.role === "admin" || profile?.user?.role === "admin";
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:8001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success(data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Failed to logout", error);
    }
  };

  return (
    <nav className="bg-black text-white shadow-lg px-4 py-2">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {/* Logo Image */}
          <img
            src={logo} // Use the imported logo
            alt="StoryScape Logo"
            className="h-5 w-5 mr-1 " // Adjust size and spacing
          />
          {/* Logo Text */}
          <div className="items-center">
          <span className="text-xl font-bold tracking-tight hover:text-red-500 transition-colors ruslan-display-regular ">
            Story
            <span className="text-red-500 ruslan-display-regular">Scape</span>
          </span></div>
        </Link>

        {/* Desktop Links */}
        <div className="mx-6">
          <ul className="hidden md:flex space-x-6">
            {["/", "/blogs", "/creators", "/about", "/contact","/save"].map((path) => (
              <Link
                key={path}
                to={path}
                className="hover:text-red-500 transition-colors duration-300"
              >
                {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
              </Link>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex space-x-2">
          {isAuthenticated && isAdmin && (
            <Link
              to="/dashboard"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 transition-colors duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>
          )}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 transition-colors duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold hover:bg-red-800 transition-colors duration-300 px-4 py-2 rounded"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {show && (
        <div className="md:hidden absolute top-16 left-0 w-full h-screen bg-black z-50">
          <ul className="flex flex-col items-center justify-center space-y-8 text-xl h-full">
            {["/", "/blogs", "/creators", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setShow(false)}
                className="text-white hover:text-red-500 transition-colors duration-300"
              >
                {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;