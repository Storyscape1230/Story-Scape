import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
  const [profile, setProfile] = useState(null); // Initialize profile as null
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Retrieve token from localStorage
      console.log("Token:", token); // Log the token

      if (token) {
        const { data } = await axios.get(
          "http://localhost:8001/api/users/my-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Profile data:", data.user); // Log the profile data
        setProfile(data.user); // Update profile state
        setIsAuthenticated(true); // Set authentication status to true
      }
    } catch (error) {
      console.error("Error fetching profile:", error);

      // Clear token and redirect to login if the token is invalid or expired
      if (error.response?.status === 401) {
        localStorage.removeItem("jwt"); // Clear the token
        setIsAuthenticated(false); // Set authentication status to false
      }
    }
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8001/api/blogs/all-blogs",
        { withCredentials: true }
      );

      console.log("Blogs data:", data); // Log the blogs data
      setBlogs(data); // Update blogs state
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProfile(); // Fetch user profile
    fetchBlogs(); // Fetch blogs
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);