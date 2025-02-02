import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative">
      {/* Logo Section */}
      <div className="text-3xl font-bold text-indigo-600 tracking-wide">
        STORY <span className="text-gray-800">SCAPE</span>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Links Section */}
      <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0 ${isMenuOpen ? "block" : "hidden"} md:flex`}>
        <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
        <Link to="/Blogs" className="text-gray-700 hover:text-indigo-600 font-medium">Blogs</Link>
        <Link to="/creators" className="text-gray-700 hover:text-indigo-600 font-medium">Creators</Link>
        <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About </Link>
        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact </Link>
      </div>

      {/* Login/Logout Section */}
      <div>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;  
