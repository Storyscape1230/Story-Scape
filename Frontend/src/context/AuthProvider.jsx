import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tempProfile, setTempProfile] = useState(null);

  // Fetch user profile if the token exists
  const fetchProfile = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("No token found, skipping profile fetch.");
      setLoading(false);
      setIsAuthenticated(false);
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

      setTempProfile(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);

      if (error.response?.status === 401) {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
        setTempProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Once loading is done, move tempProfile to profile
  useEffect(() => {
    if (!loading && tempProfile) {
      setProfile(tempProfile);
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

  // Function to handle login
  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/users/login",
        credentials,
        { withCredentials: true }
      );
      localStorage.setItem("jwt", data.token);
      await fetchProfile();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("jwt");
    setProfile(null);
    setTempProfile(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        fetchProfile,
        loading,
        login,
        logout,
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
