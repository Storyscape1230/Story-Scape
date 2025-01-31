import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

// Context provider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) =>{
    const [blogs, setBlogs] = useState([]);  // Initialize as an empty array or null if needed
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get(""); // Specify valid URL here
                console.log(data);
                setBlogs(data);
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchBlogs();
    }, []);  // Empty array ensures this only runs once on mount

    return (
        <AuthContext.Provider value={{ blogs }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
