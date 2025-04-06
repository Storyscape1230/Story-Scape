import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { LuImageUp } from "react-icons/lu";
import { motion } from "framer-motion";
import DecorativeElements from "../components/DecorativeElements";

function Register() {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhotoPreview(reader.result);
        setPhoto(file);
      };
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingMessage("Creating your account...");

    if (!name || !email || !phone || !password || !role || !education || !photo) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      setLoadingMessage("");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      await axios.post(
        "http://localhost:8001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success("Registration Successful!", {
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

      // Clear all form data before redirect
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      
      setIsLoading(false);
      setLoadingMessage("");
      
      // Use replace instead of push to prevent back navigation
      navigateTo('/login', { replace: true });
    } catch (error) {
      setIsLoading(false);
      setLoadingMessage("");
      toast.error(error.response?.data?.message || "Registration failed. Please try again.", {
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
        <form onSubmit={handleRegister} className="space-y-4" autoComplete="off">
          <h1 className="text-center text-3xl font-extrabold mb-4 text-black-600">
          <span className="text-xl font-bold tracking-tight hover:text-red-500 transition-colors ruslan-display-regular">
                Story
                <span className="text-red-500 ruslan-display-regular">
                  Scape
                </span>
              </span>
          </h1>

          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            autoComplete="off"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </motion.select>

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            autoComplete="off"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            name="password"
            autoComplete="new-password"
            data-form-type="other"
          />

          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            autoComplete="off"
          >
            <option value="">Select Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
            <option value="BCOM">BCOM</option>
            <option value="10th PASS">10th PASS</option>
            <option value="12th PASS">12th PASS</option>
            <option value="ABHAN">ABHAN</option>
          </motion.select>

          <div
            onClick={() => document.getElementById("photoInput").click()}
            className="w-full flex items-center justify-center cursor-pointer mb-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <LuImageUp size={30} />
                  <span className="text-xs mt-1">Upload Photo</span>
                </div>
              )}
            </motion.div>
            <input
              type="file"
              id="photoInput"
              onChange={changePhotoHandler}
              className="hidden"
            />
          </div>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 font-semibold hover:underline">
              Login here
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
              'Register'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Register;
