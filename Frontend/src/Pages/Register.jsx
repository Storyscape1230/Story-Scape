import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { LuImageUp } from "react-icons/lu";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  // Handle photo upload
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

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!name || !email || !phone || !password || !role || !education || !photo) {
      toast.error("Please fill all the required fields");
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
  
    // Log form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Handle success
      localStorage.setItem("jwt", data.token); // Store token in localStorage
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
  
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
  
      // Navigate to home page
      navigateTo("/");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              Cilli<span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>

            {/* Role Selection */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Education Selection */}
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
              required
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>

            {/* Photo Upload */}
            <div className="flex items-center mb-4">
              <div
                className="w-20 h-20 mr-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById("photoInput").click()}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <LuImageUp className="w-8 h-8" /> {/* Icon for no photo */}
                    <p className="mt-1 text-xs">Upload</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="photoInput"
                className="hidden"
                onChange={changePhotoHandler}
                required
              />
            </div>

            {/* Login Link */}
            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600 hover:underline">
                Login Now
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;