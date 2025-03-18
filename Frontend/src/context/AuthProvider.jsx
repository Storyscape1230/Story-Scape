import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [profile, setProfile] = useState(null); // Store final profile
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [loading, setLoading] = useState(true); // Loading state
  const [tempProfile, setTempProfile] = useState(null); // Temporary profile holder

  // Fetch user profile if the token exists
  const fetchProfile = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("No token found, skipping profile fetch.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:8001/api/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setTempProfile(data.user); // Store in temp state first
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);

      if (error.response?.status === 401) {
        localStorage.removeItem("jwt"); // Remove invalid token
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Once loading is done, move tempProfile to profile
  useEffect(() => {
    if (!loading && tempProfile) {
      setProfile(tempProfile);
      setIsAuthenticated(true);
    }
  }, [loading, tempProfile]);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8001/api/blogs/all-blogs",
        { withCredentials: true }
      );
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile, // Final profile state
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchProfile,
        loading, // Expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
