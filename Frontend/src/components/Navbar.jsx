import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const isAdmin = profile?.role === "admin";
  const navigateTo = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      setShowUserDropdown(false);
    } catch (error) {
      toast.error("Failed to logout", error);
    }
  };

  return (
<<<<<<< HEAD
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="w-[90%] mx-auto px-2 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group mr-4">
            <img
              src={logo}
              alt="StoryScape Logo"
              className="h-6 w-6 mr-2 transition-transform group-hover:rotate-12"
            />
            <span className="text-xl font-bold tracking-tight group-hover:text-red-400 transition-colors ruslan-display-regular">
              Story<span className="text-red-500 ruslan-display-regular">Scape</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 hidden md:flex justify-center">
            <ul className="flex space-x-6">
              {["/", "/blogs", "/creators", "/about", "/contact"].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                </Link>
              ))}
            </ul>
=======
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
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="mx-6">
          <ul className="hidden md:flex space-x-6">
            {["/", "/blogs", "/creators", "/about", "/contact", "/save"].map(
              (path) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                </Link>
              )
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
>>>>>>> 6ad1dce931a9a3b04bc2ca61a8aeb21321f69258
          </div>

          {/* Right section - desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  {profile?.photo?.url ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover border border-gray-600"
                      src={profile.photo.url}
                      alt="User profile"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center border border-gray-600">
                      <AiOutlineUser className="text-white text-sm" />
                    </div>
                  )}
                </button>

                {showUserDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* Show My Profile only for non-admin users */}
                    {!isAdmin && (
                      <Link
                        to="/profile"
                        onClick={() => setShowUserDropdown(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-red-400"
                      >
                        My Profile
                      </Link>
                    )}
                    <Link
                      to="/save"
                      onClick={() => setShowUserDropdown(false)}
                      className="block px-3 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-red-400"
                    >
                      Saved Blogs
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserDropdown(false)}
                        className="block px-3 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-red-400"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-gray-700 hover:text-red-400 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 text-white transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {showMobileMenu ? (
                <IoCloseSharp size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-gray-900">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {["/", "/blogs", "/creators", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 hover:text-red-400"
              >
                {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                {/* Show My Profile only for non-admin users in mobile menu */}
                {!isAdmin && (
                  <Link
                    to="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 hover:text-red-400"
                  >
                    My Profile
                  </Link>
                )}
                <Link
                  to="/save"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 hover:text-red-400"
                >
                  Saved Blogs
                </Link>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 hover:text-red-400"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 hover:text-red-400"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          {!isAuthenticated && (
            <div className="px-4 pt-2 pb-4 border-t border-gray-800">
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full px-3 py-2 mb-2 text-center text-base font-medium rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full px-3 py-2 text-center text-base font-medium rounded-md border border-gray-600 hover:bg-gray-800 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
