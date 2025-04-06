import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import DecorativeElements from "../components/DecorativeElements";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Verifying credentials...");

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
      
      // Add 2 second delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success("Login Successful!", {
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
      
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      setIsLoading(false);
      setLoadingMessage("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setLoadingMessage("");
      toast.error(error.response?.data?.message || "Invalid credentials", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 via-pink-100 to-red-100 p-4">
      <DecorativeElements />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8"
      >
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off" data-form-type="other">
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
            autoComplete="off"
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
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            required
            name="new-password"
            autoComplete="new-password"
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
            disabled={isLoading}
            className={`w-full py-3 mt-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {loadingMessage}
              </div>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
