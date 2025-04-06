import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
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
      await axios.get(
        "http://localhost:8001/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      toast.success("Logged out successfully", {
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
      setIsAuthenticated(false);
      navigateTo("/login");
      setShowUserDropdown(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout", {
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
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="w-[90%] mx-auto px-2 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group mr-4 transition-all duration-300 active:scale-95"
          >
            <img
              src={logo}
              alt="StoryScape Logo"
              className="h-6 w-6 mr-2 transition-all duration-300 group-hover:rotate-12 group-active:rotate-45"
            />
            <span className="text-xl font-bold tracking-tight transition-all duration-300 group-hover:text-red-400 group-active:scale-105 ruslan-display-regular">
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
                  className="relative px-1 py-1 hover:text-red-500 transition-all duration-300 text-sm
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
                    after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full
                    active:scale-95"
                >
                  {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                </Link>
              ))}
            </ul>
          </div>

          {/* Right section - desktop */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 focus:outline-none transition-all duration-200
                    hover:scale-105 active:scale-95 group"
                >
                  <div className="relative">
                    {profile?.photo?.url ? (
                      <img
                        className="h-10 w-10 rounded-full object-cover border-2 border-gray-600 
                          transition-all duration-300 group-hover:border-red-500 group-hover:ring-2 
                          group-hover:ring-red-500/30"
                        src={profile.photo.url}
                        alt="User profile"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 
                        flex items-center justify-center border-2 border-gray-600 transition-all duration-300
                        group-hover:border-red-400 group-hover:from-red-600 group-hover:to-red-800
                        group-hover:ring-2 group-hover:ring-red-500/30">
                        <AiOutlineUser className="text-white text-lg" />
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-0.5 
                      border border-black">
                      <div className="h-1.5 w-1.5"></div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-200 group-hover:text-red-400 
                      transition-colors duration-200">
                      {profile?.name || "User"}
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-red-300 transition-colors 
                      duration-200">
                      {profile?.role || "Member"}
                    </p>
                  </div>
                </button>

                {showUserDropdown && (
                  <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-xl shadow-2xl py-2 
                    bg-gray-800/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none 
                    animate-fadeIn transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <h3 className="text-sm font-medium text-gray-200">
                        {profile?.name || "User"}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {profile?.email || "user@example.com"}
                      </p>
                    </div>
                    <div className="py-1">
                      {!isAdmin && (
                        <Link
                          to="/profile"
                          onClick={() => setShowUserDropdown(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 
                            hover:text-red-400 transition-colors duration-200 group"
                        >
                          <AiOutlineUser className="mr-2 text-gray-400 group-hover:text-red-400 
                            transition-colors duration-200" />
                          My Profile
                        </Link>
                      )}
                      <Link
                        to="/save"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 
                          hover:text-red-400 transition-colors duration-200 group"
                      >
                        <svg className="mr-2 text-gray-400 group-hover:text-red-400 transition-colors 
                          duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                          stroke="currentColor" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Saved Blogs
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserDropdown(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 
                            hover:text-red-400 transition-colors duration-200 group"
                        >
                          <svg className="mr-2 text-gray-400 group-hover:text-red-400 transition-colors 
                            duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 
                          hover:bg-gray-700/50 hover:text-red-400 transition-colors duration-200 group"
                        data-form-type="other"
                        autoComplete="off"
                      >
                        <svg className="mr-2 text-gray-400 group-hover:text-red-400 transition-colors 
                          duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                          stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700/50 
                    hover:text-red-400 transition-all duration-300 active:scale-95
                    border border-gray-600 hover:border-red-500/50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 
                    to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 
                    active:scale-95 hover:shadow-lg hover:shadow-red-500/20"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                hover:text-white hover:bg-gray-800 focus:outline-none transition-all duration-300
                active:scale-90"
            >
              {showMobileMenu ? (
                <IoCloseSharp 
                  size={20} 
                  className="transition-transform duration-300 rotate-180"
                />
              ) : (
                <AiOutlineMenu 
                  size={20} 
                  className="transition-transform duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className={`md:hidden bg-gray-900 transition-all duration-300 
          ${showMobileMenu ? 'animate-slideDown' : 'animate-slideUp'}`}>
          <div className="px-4 pt-3 pb-4 space-y-2">
            {["/", "/blogs", "/creators", "/about", "/contact"].map((path) => (
              <Link
                key={path}
                to={path}
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 
                  hover:text-red-400 transition-all duration-200 active:bg-gray-700"
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
                    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 
                      hover:text-red-400 transition-all duration-200 active:bg-gray-700"
                  >
                    My Profile
                  </Link>
                )}
                <Link
                  to="/save"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 
                    hover:text-red-400 transition-all duration-200 active:bg-gray-700"
                >
                  Saved Blogs
                </Link>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-800 
                      hover:text-red-400 transition-all duration-200 active:bg-gray-700"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium rounded-md 
                    hover:bg-gray-800 hover:text-red-400 transition-all duration-200 active:bg-gray-700"
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
                className="block w-full px-3 py-2 mb-2 text-center text-base font-medium rounded-md 
                  bg-red-600 hover:bg-red-700 text-white transition-all duration-300 active:scale-95
                  hover:shadow-lg hover:shadow-red-500/20"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full px-3 py-2 text-center text-base font-medium rounded-md 
                  border border-gray-600 hover:bg-gray-800 text-white transition-all duration-300
                  active:scale-95"
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