import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedRole = localStorage.getItem("savedRole");
    
    if (savedEmail && savedRole) {
      setEmail(savedEmail);
      setRole(savedRole);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("jwt", data.token);
      
      // Save credentials if remember me is checked
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedRole", role);
      } else {
        // Clear saved credentials if remember me is unchecked
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedRole");
      }
      
      toast.success(data.message || "User logged in successfully", {
        duration: 3000,
      });
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields",
        {
          duration: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-pink-100 to-red-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8"
      >
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
          <h1 className="text-center text-3xl font-extrabold mb-4 text-black-600">
            <span className="text-xl font-bold tracking-tight hover:text-red-500 transition-colors ruslan-display-regular">
              Story<span className="text-red-500 ruslan-display-regular">Scape</span>
            </span>
          </h1>

          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            name="role"
            autoComplete="username"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </motion.select>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            name="email"
            autoComplete="username"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            name="password"
            autoComplete="current-password"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-red-500 focus:ring-red-300 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember Me
            </label>
          </div>

          <p className="text-center text-sm">
            New User?{' '}
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 mt-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-colors"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
