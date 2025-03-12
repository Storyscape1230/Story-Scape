import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const fetchProfile = async () => {
    try {
      let token = localStorage.getItem("jwt");
      console.log(token);
      if (token) {
        const { data } = await axios.get(
          "http://localhost:8001/api/users/my-profile",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data.user);
        setProfile(data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8001/api/blogs/all-blogs",
          { withCredentials: true }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
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